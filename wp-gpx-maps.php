<?php
/**
 * Plugin Name: WP GPX Maps
 * Plugin URI: http://www.devfarm.it/
 * Description: Draws a GPX track with altitude chart
 * Version: 1.8.00
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Bastianon Massimo
 * Author URI: http://www.devfarm.it/
 * Text Domain: wp-gpx-maps
 * Domain Path: /languages
 * License: GPL2
 *
 * @package WP-GPX-Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// error_reporting (E_ALL);

/**
 * Version of the plugin
 */
define( 'WPGPXMAPS_CURRENT_VERSION', '1.8.00' );

/**
 * Version of the public hooks used by add-ons (WP GPX Maps Pro): raise it only when a hook changes
 * in a way that is not backward compatible. Hooks: wpgpxmaps_shortcode_atts, wpgpxmaps_map_extra,
 * wpgpxmaps_map_html, wpgpxmaps_block_shortcode_atts, wpgpxmaps_enqueue_scripts, wpgpxmaps_admin_tabs,
 * wpgpxmaps_admin_tab_{tab}; JavaScript event "wpgpxmaps:ready" on document.
 * Functions: wpgpxmaps_get_track_info( $gpx ), wpgpxmaps_module_url(); the module exports WPGPXMaps and Leaflet.
 */
define( 'WPGPXMAPS_API_VERSION', 1 );

require 'wp-gpx-maps-utils.php';
require 'wp-gpx-maps-admin.php';
require 'wp-gpx-maps-block.php';

define("wpgpxmaps_FEET_MILES", "1");
define("wpgpxmaps_METERS_KILOMETERS", "2");
define("wpgpxmaps_METERS_NAUTICALMILES", "3");
define("wpgpxmaps_METER_MILES", "4");
define("wpgpxmaps_FEET_NAUTICALMILES", "5");

define("wpgpxmaps_KM_PER_HOURS", "1");
define("wpgpxmaps_MILES_PER_HOURS", "2");
define("wpgpxmaps_MINUTES_PER_KM", "3");
define("wpgpxmaps_MINUTES_PER_MILES", "4");
define("wpgpxmaps_KNOTS", "5");
define("wpgpxmaps_MINUTES_PER_100METERS", "6");

add_shortcode( 'sgpx', 'wpgpxmaps_handle_shortcodes' );
add_shortcode( 'sgpxf', 'wpgpxmaps_handle_folder_shortcodes' );
register_activation_hook( __FILE__, 'wpgpxmaps_install_option' );
register_deactivation_hook( __FILE__, 'wpgpxmaps_remove_option' );
add_filter( 'plugin_action_links', 'wpgpxmaps_action_links', 10, 2 );
add_action( 'init', 'wpgpxmaps_register_assets' );
add_action( 'wp_enqueue_scripts', 'wpgpxmaps_enqueue_scripts' );
add_action( 'admin_enqueue_scripts', 'wpgpxmaps_enqueue_scripts_admin' );
add_action( 'plugins_loaded', 'wpgpxmaps_lang_init' );


function wpgpxmaps_lang_init() {

	if ( function_exists( 'load_plugin_textdomain' ) ) {
		load_plugin_textdomain( 'wp-gpx-maps', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

}

function wpgpxmaps_action_links( $links, $file ) {

	static $this_plugin;

	if ( ! $this_plugin ) {
		$this_plugin = plugin_basename( __FILE__ );
	}

	// Check to make sure we are on the correct plugin.
	if ( $file == $this_plugin ) {
		// the anchor tag and href to the URL we want. For a "Settings"
		// link, this needs to be the url of your settings page. Authors
		// access tracks via the admin page.
		if ( current_user_can( 'manage_options' ) ) {
			$menu_root = 'options-general.php';
		} elseif ( current_user_can( 'publish_posts' ) ) {
			$menu_root = 'admin.php';
		}
		$menu_root     = isset( $menu_root ) ? $menu_root : 'options-general.php';
		$settings_link = '<a href="' . esc_url( get_bloginfo( 'wpurl' ) . '/wp-admin/' . $menu_root . '?page=WP-GPX-Maps' ) . '">' . esc_html__( 'Settings', 'wp-gpx-maps' ) . '</a>';
		// Add the link to the list.
		array_unshift( $links, $settings_link );
	}
	return $links;

}

function wpgpxmaps_enqueue_scripts_admin( $hook ) {

	if ( strpos( $hook, 'WP-GPX-Maps' ) !== false ) {
		/* bootstrap-table */
		wp_register_script( 'bootstrap-table', plugins_url( '/js/bootstrap-table.js', __FILE__ ), array(), '1.13.2' );
		wp_enqueue_script( 'bootstrap-table' );
		wp_register_style( 'bootstrap-table', plugins_url( '/css/bootstrap-table.css', __FILE__ ), array(), '1.13.2' );
		wp_enqueue_style( 'bootstrap-table' );
	}

}


function downloadRemoteFile( $file_url ) {

	// If the function it's not available, require it.
	if ( ! function_exists( 'download_url' ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
	}

	$file = download_url( $file_url );

	if ( is_wp_error( $file ) ) {
		return '';
	}
	return $file;

}

/**
 * Resolve a GPX path relative to the site root and make sure it does not leave the site (path traversal).
 * Returns the absolute path or '' when the path is outside the allowed folders or does not exist.
 */
function wpgpxmaps_resolveLocalPath( $relativePath ) {

	$relativePath = trim( str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $relativePath ) );
	$path         = realpath( wp_gpx_maps_sitePath() . DIRECTORY_SEPARATOR . ltrim( $relativePath, DIRECTORY_SEPARATOR ) );

	if ( false === $path ) {
		return '';
	}

	$upload_dir = wp_upload_dir();
	$roots      = array( wp_gpx_maps_sitePath(), WP_CONTENT_DIR, $upload_dir['basedir'] );

	foreach ( $roots as $root ) {
		$root = realpath( $root );
		if ( false !== $root && 0 === strpos( $path, rtrim( $root, DIRECTORY_SEPARATOR ) . DIRECTORY_SEPARATOR ) ) {
			return $path;
		}
	}
	return '';

}


/**
 * Version of the JS module: plugin version plus the build time, so browsers reload it after every build.
 */
function wpgpxmaps_module_version() {
	$mtime = @filemtime( plugin_dir_path( __FILE__ ) . 'assets/dist/WP-GPX-Maps.es.js' );
	return WPGPXMAPS_CURRENT_VERSION . ( $mtime ? '.' . $mtime : '' );
}

/**
 * Public API (add-ons): URL of the map JavaScript module, which exports WPGPXMaps and Leaflet.
 */
function wpgpxmaps_module_url() {
	return add_query_arg( 'ver', wpgpxmaps_module_version(), plugins_url( 'assets/dist/WP-GPX-Maps.es.js', __FILE__ ) );
}

/**
 * Public API (add-ons): summary of a track, cached until the GPX files change.
 *
 * @param string $gpx Value of the gpx attribute (path from the site root or URL, several separated by commas).
 * @return array|null start / end [lat, lon], bounds [[south, west], [north, east]], length (m), eleUp / eleDown (m),
 *                    maxEle / minEle (m), duration (s, 0 when the GPX has no time), line (up to 100 [lat, lon] points,
 *                    null between tracks) or null when no file can be read.
 */
function wpgpxmaps_get_track_info( $gpx ) {

	$list  = array_values( array_filter( array_map( 'trim', explode( ',', (string) $gpx ) ) ) );
	$files = array();
	$key   = '';
	foreach ( $list as $item ) {
		$remote = ( 1 == preg_match( '/^(http(s)?\:\/\/)/', $item ) );
		$path   = $remote ? '' : wpgpxmaps_resolveLocalPath( $item );
		if ( ! $remote && '' == $path ) {
			continue;
		}
		$files[] = array( 'item' => $item, 'path' => $path, 'remote' => $remote );
		$key    .= $item . ( $remote ? '' : filemtime( $path ) ) . '|';
	}
	if ( ! $files ) {
		return null;
	}

	$transient = 'wpgpxmaps_info_' . md5( $key . 'v1' );
	$cached    = get_transient( $transient );
	if ( is_array( $cached ) ) {
		return $cached;
	}

	$parts = array();
	foreach ( $files as $file ) {
		$path = $file['remote'] ? downloadRemoteFile( $file['item'] ) : $file['path'];
		if ( '' == $path ) {
			continue;
		}
		/* Points every 50 m are enough for the summary */
		$parts[] = wpgpxmaps_getPoints( $path, 50, false, 0 );
		if ( $file['remote'] ) {
			wp_delete_file( $path );
		}
	}
	$points = $parts ? wpgpxmaps_mergePoints( $parts ) : null;
	$real   = $points ? array_filter( $points->lat, 'is_numeric' ) : array();
	if ( ! $real ) {
		return null;
	}

	$keys  = array_keys( $points->lat );
	$lats  = array_filter( $points->lat, 'is_numeric' );
	$lons  = array_filter( $points->lon, 'is_numeric' );
	$first = array_key_first( $real );
	$last  = array_key_last( $real );
	$step  = max( 1, (int) ceil( count( $keys ) / 100 ) );
	$line  = array();
	foreach ( $keys as $n => $k ) {
		if ( null === $points->lat[ $k ] ) {
			$line[] = null;
		} elseif ( 0 == $n % $step || $k === $last ) {
			$line[] = array( round( $points->lat[ $k ], 5 ), round( $points->lon[ $k ], 5 ) );
		}
	}

	$info = array(
		'start'    => array( (float) $points->lat[ $first ], (float) $points->lon[ $first ] ),
		'end'      => array( (float) $points->lat[ $last ], (float) $points->lon[ $last ] ),
		'bounds'   => array( array( min( $lats ), min( $lons ) ), array( max( $lats ), max( $lons ) ) ),
		'length'   => round( (float) $points->totalLength ),
		'eleUp'    => round( (float) $points->totalEleUp ),
		'eleDown'  => round( (float) $points->totalEleDown ),
		'maxEle'   => round( (float) $points->maxEle ),
		'minEle'   => round( (float) $points->minEle ),
		'duration' => ( $points->maxTime && $points->minTime ) ? (int) ( $points->maxTime - $points->minTime ) : 0,
		'line'     => $line,
	);

	set_transient( $transient, $info, $files[0]['remote'] ? DAY_IN_SECONDS : MONTH_IN_SECONDS );
	return $info;
}

/**
 * Register the map style and module on every request: the block editor needs them too (block.json "style").
 */
function wpgpxmaps_register_assets() {

	/* Output Style CSS */
	wp_register_style( 'output-style', plugins_url( 'assets/dist/style.css', __FILE__ ), array(), wpgpxmaps_module_version() );

	wp_register_script_module( 'wp-gpx-maps', plugins_url( 'assets/dist/WP-GPX-Maps.es.js', __FILE__ ), array(), wpgpxmaps_module_version() );

}

function wpgpxmaps_enqueue_scripts() {

	wp_enqueue_style( 'output-style' );
	wp_enqueue_script_module( 'wp-gpx-maps' );

	/** Fires after the map scripts are enqueued on the front end, for add-on scripts and styles. */
	do_action( 'wpgpxmaps_enqueue_scripts' );

}

function wpgpxmaps_findValue( $attr, $attributeName, $optionName, $defaultValue ) {

	$val = '';
	if ( isset( $attr[$attributeName] ) ) {
		$val = sanitize_text_field( $attr[$attributeName] );
		/* "false" in the shortcode must turn off an option enabled in the settings ('false' == true in PHP) */
		if ( in_array( strtolower( $val ), array( 'false', 'no', 'off' ), true ) ) {
			return false;
		}
	}
	if ( $val == '' && $optionName != '' ) {
		$val = sanitize_text_field( get_option( $optionName ) );
	}
	/* Values are never read from the query string: visitors must not be able to change shortcode parameters. */
	if ( $val == '' ) {
		$val = sanitize_text_field( $defaultValue );
	}
	return $val;

}

function wpgpxmaps_handle_folder_shortcodes( $attr, $content = '' ) {

	$folder         	= wpgpxmaps_findValue( $attr, 'folder', '', '' );
	$pointsoffset   	= wpgpxmaps_findValue( $attr, 'pointsoffset', 'wpgpxmaps_pointsoffset', 10 );
	$distanceType   	= wpgpxmaps_findValue( $attr, 'distanceType', 'wpgpxmaps_distance_type', 0 );
	$donotreducegpx 	= wpgpxmaps_findValue( $attr, 'donotreducegpx', 'wpgpxmaps_donotreducegpx', false );
	$unit_of_measure    = wpgpxmaps_findValue( $attr, 'uom', 'wpgpxmaps_unit_of_measure', '0' );

	/* Fix folder path */
	$folder = wpgpxmaps_resolveLocalPath( $folder );

	if ( '' == $folder || ! is_dir( $folder ) ) {
		return '';
	}

	$files = scandir( $folder );

	if ( false === $files ) {
		return '';
	}

	foreach ( $files as $file ) {

		if ( strtolower( substr( $file, - 4 ) ) == '.gpx' ) {

			$gpx    = $folder . DIRECTORY_SEPARATOR . $file;
			$points = wpgpxmaps_getPoints( $gpx, $pointsoffset, $donotreducegpx, $distanceType );

			$points_maps       = '';
			$points_graph_dist = '';
			$points_graph_ele  = '';

			$points_x_lat = $points->lat;
			$points_x_lon = $points->lon;

			if ( is_array( $points_x_lat ) )
			foreach ( array_keys( $points_x_lat ) as $i ) {
				$_lat = (float) $points_x_lat[$i];
				$_lon = (float) $points_x_lon[$i];

				if ( 0 == $_lat && 0 == $_lon ) {
					$points_maps       .= 'null,';
					$points_graph_dist .= 'null,';
					$points_graph_ele  .= 'null,';

				} else {
					$points_maps .= '[' . number_format( (float) $points_x_lat[$i], 7, '.', '' ) . ',' . number_format( (float) $points_x_lon[$i], 7, '.', '' ) . '],';

					$_ele  = (float) $points->ele[$i];
					$_dist = (float) $points->dist[$i];

					if ( wpgpxmaps_FEET_MILES == $unit_of_measure ) {
						/* feet / miles */
						$_dist *= 0.000621371192;
						$_ele  *= 3.2808399;

					} elseif ( wpgpxmaps_METERS_KILOMETERS == $unit_of_measure ) {
						/* meters / kilometers */
						$_dist = (float) ( $_dist / 1000 );

					} elseif ( wpgpxmaps_METERS_NAUTICALMILES == $unit_of_measure ) {
						/* meters / nautical miles */
						$_dist = (float) ( $_dist / 1000 / 1.852 );

					} elseif ( wpgpxmaps_METER_MILES == $unit_of_measure ) {
						/* meters / miles */
						$_dist *= 0.000621371192;

					} elseif ( wpgpxmaps_FEET_NAUTICALMILES == $unit_of_measure ) {
						/* feet / nautical miles */
						$_dist = (float) ( $_dist / 1000 / 1.852 );
						$_ele *= 3.2808399;
					}

					$points_graph_dist .= number_format( $_dist, 2, '.', '' ) . ',';
					$points_graph_ele  .= number_format( $_ele, 2, '.', '' ) . ',';

				}
			}
			//print_r( $points );
		}
	}

	return '';

}

function wpgpxmaps_handle_shortcodes( $attr, $content = '' ) {

	/* [sgpx] without attributes passes an empty string */
	$attr = is_array( $attr ) ? $attr : array();

	/**
	 * Filters the shortcode (and block) attributes before they are read, e.g. to add defaults or new attributes.
	 *
	 * @param array $attr Shortcode attributes.
	 */
	$attr = apply_filters( 'wpgpxmaps_shortcode_atts', $attr );

	$error = '';
	/* General */
	$gpx            = wpgpxmaps_findValue( $attr, 'gpx', '', '' );
	$w              = wpgpxmaps_findValue( $attr, 'width', 'wpgpxmaps_width', '100%' );
	$mh             = wpgpxmaps_findValue( $attr, 'mheight', 'wpgpxmaps_height', '450px' );
	$gh             = wpgpxmaps_findValue( $attr, 'gheight', 'wpgpxmaps_graph_height', '200px' );
	$distanceType   = wpgpxmaps_findValue( $attr, 'distanceType', 'wpgpxmaps_distance_type', 0 );
	$skipcache      = wpgpxmaps_findValue( $attr, 'skipcache', 'wpgpxmaps_skipcache', '' );
	$download       = wpgpxmaps_findValue( $attr, 'download', 'wpgpxmaps_download', '' );
	$usegpsposition = wpgpxmaps_findValue( $attr, 'usegpsposition', 'wpgpxmaps_usegpsposition', false );
	/* Print Summary Table */
	$summary          = wpgpxmaps_findValue( $attr, 'summary', 'wpgpxmaps_summary', false );
	$p_tot_len        = wpgpxmaps_findValue( $attr, 'summarytotlen', 'wpgpxmaps_summary_tot_len', false );
	$p_max_ele        = wpgpxmaps_findValue( $attr, 'summarymaxele', 'wpgpxmaps_summary_max_ele', false );
	$p_min_ele        = wpgpxmaps_findValue( $attr, 'summaryminele', 'wpgpxmaps_summary_min_ele', false );
	$p_total_ele_up   = wpgpxmaps_findValue( $attr, 'summaryeleup', 'wpgpxmaps_summary_total_ele_up', false );
	$p_total_ele_down = wpgpxmaps_findValue( $attr, 'summaryeledown', 'wpgpxmaps_summary_total_ele_down', false );
	$p_avg_speed      = wpgpxmaps_findValue( $attr, 'summaryavgspeed', 'wpgpxmaps_summary_avg_speed', false );
	$p_avg_cad        = wpgpxmaps_findValue( $attr, 'summaryavgcad', 'wpgpxmaps_summary_avg_cad', false );
	$p_avg_hr         = wpgpxmaps_findValue( $attr, 'summaryavghr', 'wpgpxmaps_summary_avg_hr', false );
	$p_avg_temp       = wpgpxmaps_findValue( $attr, 'summaryavgtemp', 'wpgpxmaps_summary_avg_temp', false );
	$p_total_time     = wpgpxmaps_findValue( $attr, 'summarytotaltime', 'wpgpxmaps_summary_total_time', false );
	$p_moving_time    = wpgpxmaps_findValue( $attr, 'summarymovingtime', 'wpgpxmaps_summary_moving_time', false );
	$p_max_speed      = wpgpxmaps_findValue( $attr, 'summarymaxspeed', 'wpgpxmaps_summary_max_speed', false );
	$p_max_grade      = wpgpxmaps_findValue( $attr, 'summarymaxgrade', 'wpgpxmaps_summary_max_grade', false );
	/* Map */
	$mt                 = wpgpxmaps_findValue( $attr, 'mtype', 'wpgpxmaps_map_type', 'HYBRID' );
	$color_map          = wpgpxmaps_findValue( $attr, 'mlinecolor', 'wpgpxmaps_map_line_color', '#3366cc' );
	$zoomOnScrollWheel  = wpgpxmaps_findValue( $attr, 'zoomonscrollwheel', 'wpgpxmaps_zoomonscrollwheel', false );
	$showW              = wpgpxmaps_findValue( $attr, 'waypoints', 'wpgpxmaps_show_waypoint', false );
	$startIcon          = wpgpxmaps_findValue( $attr, 'starticon', 'wpgpxmaps_map_start_icon', '' );
	$endIcon            = wpgpxmaps_findValue( $attr, 'endicon', 'wpgpxmaps_map_end_icon', '' );
	$currentpositioncon = wpgpxmaps_findValue( $attr, 'currentpositioncon', 'wpgpxmaps_currentpositioncon', '' );
	$currentIcon        = wpgpxmaps_findValue( $attr, 'currenticon', 'wpgpxmaps_map_current_icon', '' );
	$waypointIcon       = wpgpxmaps_findValue( $attr, 'waypointicon', 'wpgpxmaps_map_waypoint_icon', '' );
	/* Diagram - Elevation */
	$showEle     		= wpgpxmaps_findValue( $attr, 'showele', 'wpgpxmaps_show_elevation', true );
	$color_graph 		= wpgpxmaps_findValue( $attr, 'glinecolor', 'wpgpxmaps_graph_line_color', '#3366cc' );
	$unit_of_measure    = wpgpxmaps_findValue( $attr, 'uom', 'wpgpxmaps_unit_of_measure', '0' );
	$chartFrom1  		= wpgpxmaps_findValue( $attr, 'chartfrom1', 'wpgpxmaps_graph_offset_from1', '' );
	$chartTo1    		= wpgpxmaps_findValue( $attr, 'chartto1', 'wpgpxmaps_graph_offset_to1', '' );
	/* Diagram - Speed */
	$showSpeed         = wpgpxmaps_findValue( $attr, 'showspeed', 'wpgpxmaps_show_speed', false );
	$color_graph_speed = wpgpxmaps_findValue( $attr, 'glinecolorspeed', 'wpgpxmaps_graph_line_color_speed', '#ff0000' );
	$unit_of_measure_speed          = wpgpxmaps_findValue( $attr, 'uomspeed', 'wpgpxmaps_unit_of_measure_speed', '0' );
	$chartFrom2        = wpgpxmaps_findValue( $attr, 'chartfrom2', 'wpgpxmaps_graph_offset_from2', '' );
	$chartTo2          = wpgpxmaps_findValue( $attr, 'chartto2', 'wpgpxmaps_graph_offset_to2', '' );
	/* Diagram - Heart rate */
	$showHr				= wpgpxmaps_findValue( $attr, 'showhr', 'wpgpxmaps_show_hr', false );
	$color_graph_hr 	= wpgpxmaps_findValue( $attr, 'glinecolorhr', 'wpgpxmaps_graph_line_color_hr', '#ff77bd' );
	/* Diagram - Temperature */
	$showAtemp         	= wpgpxmaps_findValue( $attr, 'showatemp', 'wpgpxmaps_show_atemp', false );
	$color_graph_atemp 	= wpgpxmaps_findValue( $attr, 'glinecoloratemp', 'wpgpxmaps_graph_line_color_atemp', '#ff77bd' );
	/* Diagram - Cadence */
	$showCad         	= wpgpxmaps_findValue( $attr, 'showcad', 'wpgpxmaps_show_cadence', false );
	$color_graph_cad 	= wpgpxmaps_findValue( $attr, 'glinecolorcad', 'wpgpxmaps_graph_line_color_cad', '#beecff' );
	/* Diagram - Grade */
	$showGrade         	= wpgpxmaps_findValue( $attr, 'showgrade', 'wpgpxmaps_show_grade', false );
	$color_graph_grade 	= wpgpxmaps_findValue( $attr, 'glinecolorgrade', 'wpgpxmaps_graph_line_color_grade', '#beecff' );
	/* Pictures */
	$ngGalleries 		= wpgpxmaps_findValue( $attr, 'nggalleries', 'wpgpxmaps_map_ngGalleries', '' );
	$ngImages    		= wpgpxmaps_findValue( $attr, 'ngimages', 'wpgpxmaps_map_ngImages', '' );
	$attachments 		= wpgpxmaps_findValue( $attr, 'attachments', 'wpgpxmaps_map_attachments', false );
	$dtoffset    		= wpgpxmaps_findValue( $attr, 'dtoffset', 'wpgpxmaps_dtoffset', 0 );
	/* Advanced */
	$pointsoffset   	= wpgpxmaps_findValue( $attr, 'pointsoffset', 'wpgpxmaps_pointsoffset', 10 );
	$donotreducegpx 	= wpgpxmaps_findValue( $attr, 'donotreducegpx', 'wpgpxmaps_donotreducegpx', false );
	/* Track color: '' or 'none' (one color) or by grade, speed, heart rate, elevation */
	$colorby = (string) wpgpxmaps_findValue( $attr, 'colorby', 'wpgpxmaps_map_color_by', '' );
	/* Start / end markers are shown unless hidden in the shortcode (startend=false) or in the settings */
	if ( isset( $attr['startend'] ) ) {
		$startend = false !== wpgpxmaps_findValue( $attr, 'startend', '', true );
	} else {
		$startend = 'true' !== get_option( 'wpgpxmaps_map_hide_start_end' );
	}
	$kmmarkers = (float) wpgpxmaps_findValue( $attr, 'kmmarkers', 'wpgpxmaps_map_km_markers', 0 );
	if ( ! in_array( $colorby, array( 'grade', 'speed', 'hr', 'elevation' ), true ) ) {
		$colorby = '';
	}

	/* Gallery and image ids are printed inside a script: allow only comma separated numbers */
	$ngGalleries = implode( ',', array_filter( array_map( 'absint', explode( ',', $ngGalleries ) ) ) );
	$ngImages    = implode( ',', array_filter( array_map( 'absint', explode( ',', $ngImages ) ) ) );

	$colors_map = explode( ' ', $color_map );

	/* Several GPX files in one map: gpx="a.gpx,b.gpx" */
	$gpx_list = array_values( array_filter( array_map( 'trim', explode( ',', $gpx ) ) ) );

	/* One color per file when there are several files and only one color is set (mlinecolor="#c00 #00c" sets them) */
	$track_palette = array( '#3366cc', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#0891b2', '#ca8a04', '#db2777' );
	$track_colors  = array();
	$track_names   = array();
	if ( count( $gpx_list ) > 1 ) {
		foreach ( $gpx_list as $n => $item ) {
			$track_names[] = preg_replace( '/\.gpx$/i', '', basename( wp_parse_url( $item, PHP_URL_PATH ) ) );
		}
	}

	$gpxurl = esc_url_raw( $gpx );

	$points_x_time      = array();
	$points_x_lat       = array();
	$points_x_lon       = array();
	$points_graph_dist  = '';
	$points_graph_ele   = '';
	$points_graph_speed = '';
	$points_graph_hr    = '';
	$points_graph_atemp = '';
	$points_graph_cad   = '';
	$points_graph_grade = '';
	$points_color       = array();
	$waypoints          = '[]';
	$max_ele            = 0;
	$min_ele            = 0;
	$max_time           = 0;
	$min_time           = 0;
	$total_ele_up       = 0;
	$total_ele_down     = 0;
	$avg_speed          = 0;
	$avg_cad            = 0;
	$avg_hr             = 0;
	$avg_temp           = 0;
	$tot_len            = 0;
	$extra_stats        = array( 'movingTime' => 0, 'maxSpeed' => 0, 'maxGrade' => null, 'minGrade' => null );

	/* Add file modification time to cache filename to catch new uploads with same file name */
	$mtime = 0;
	foreach ( $gpx_list as $item ) {
		$local = preg_match( '/^(http(s)?\:\/\/)/', $item ) ? '' : wpgpxmaps_resolveLocalPath( $item );
		if ( '' != $local && file_exists( $local ) ) {
			$mtime = max( $mtime, filemtime( $local ) );
		}
	}
	$cacheFileName = "$gpx,$mtime,$w,$mh,$mt,$gh,$showEle,$showW,$showHr,$showAtemp,$showCad,$donotreducegpx,$pointsoffset,$showSpeed,$showGrade,$unit_of_measure_speed,$unit_of_measure,$distanceType,$colorby,v1.9.0";

	$cacheFileName = md5( $cacheFileName );

	$gpxcache = gpxCacheFolderPath();

	if ( ! ( file_exists( $gpxcache ) && is_dir( $gpxcache ) ) )
	{
		wp_mkdir_p( $gpxcache );
	}

	$gpxcache .= DIRECTORY_SEPARATOR . $cacheFileName . '.tmp';

	/* Try to load cache */
	if ( file_exists( $gpxcache ) && ! ( true == $skipcache ) ) {

		$cache_obj = @unserialize( (string) file_get_contents( $gpxcache ), array( 'allowed_classes' => false ) );

		if ( is_array( $cache_obj ) ) {
			$points_maps        = $cache_obj['points_maps'];
			$points_x_time      = $cache_obj['points_x_time'];
			$points_x_lat       = $cache_obj['points_x_lat'];
			$points_x_lon       = $cache_obj['points_x_lon'];
			$points_graph_dist  = $cache_obj['points_graph_dist'];
			$points_graph_ele   = $cache_obj['points_graph_ele'];
			$points_graph_speed = $cache_obj['points_graph_speed'];
			$points_graph_hr    = $cache_obj['points_graph_hr'];
			$points_graph_atemp = $cache_obj['points_graph_atemp'];
			$points_graph_cad   = $cache_obj['points_graph_cad'];
			$points_graph_grade = $cache_obj['points_graph_grade'];
			$points_color       = isset( $cache_obj['points_color'] ) && is_array( $cache_obj['points_color'] ) ? $cache_obj['points_color'] : array();
			$waypoints          = $cache_obj['waypoints'];
			$max_ele            = $cache_obj['max_ele'];
			$min_ele            = $cache_obj['min_ele'];
			$max_time           = $cache_obj['max_time'];
			$min_time           = $cache_obj['min_time'];
			$total_ele_up       = $cache_obj['total_ele_up'];
			$total_ele_down     = $cache_obj['total_ele_down'];
			$avg_speed          = $cache_obj['avg_speed'];
			$avg_cad            = $cache_obj['avg_cad'];
			$avg_hr             = $cache_obj['avg_hr'];
			$avg_temp           = $cache_obj['avg_temp'];
			$tot_len            = $cache_obj['tot_len'];
			$extra_stats        = isset( $cache_obj['extra_stats'] ) && is_array( $cache_obj['extra_stats'] ) ? $cache_obj['extra_stats'] : $extra_stats;
			$track_colors       = isset( $cache_obj['track_colors'] ) && is_array( $cache_obj['track_colors'] ) ? $cache_obj['track_colors'] : array();
		}
	}

	$points_maps = isset( $points_maps ) ? $points_maps : '';

	if ( $points_maps == '' && $gpx != '' ) {

		/* Local path or downloaded copy of every file */
		$gpx_files = array();
		foreach ( $gpx_list as $item ) {
			$remote = ( 1 == preg_match( '/^(http(s)?\:\/\/)/', $item ) );
			$path   = $remote ? downloadRemoteFile( $item ) : wpgpxmaps_resolveLocalPath( $item );
			if ( '' == $path ) {
				foreach ( $gpx_files as $file ) {
					if ( $file['remote'] ) {
						wp_delete_file( $file['path'] );
					}
				}
				return esc_html__( 'WP GPX Maps Error: GPX file not found!', 'wp-gpx-maps' ) . ( count( $gpx_list ) > 1 ? ' ' . esc_html( basename( $item ) ) : '' );
			}
			$gpx_files[] = array( 'path' => $path, 'remote' => $remote );
		}

		$parts = array();
		foreach ( $gpx_files as $n => $file ) {
			$part    = wpgpxmaps_getPoints( $file['path'], $pointsoffset, $donotreducegpx, $distanceType );
			$parts[] = $part;
			/* Every track of every file gets the color of its file */
			if ( count( $gpx_files ) > 1 && count( $colors_map ) == 1 ) {
				$segments = 1 + count( array_filter( $part->lat, 'is_null' ) );
				for ( $s = 0; $s < $segments; $s++ ) {
					$track_colors[] = $track_palette[ $n % count( $track_palette ) ];
				}
			}
		}

		$points = wpgpxmaps_mergePoints( $parts );

		$points_maps        = '';
		$points_graph_dist  = '';
		$points_graph_ele   = '';
		$points_graph_speed = '';
		$points_graph_hr    = '';
		$points_graph_atemp = '';
		$points_graph_cad   = '';
		$points_graph_grade = '';
		$waypoints          = '';

		$points_x_time = $points->dt;
		$points_x_lat  = $points->lat;
		$points_x_lon  = $points->lon;

		$points_color = wpgpxmaps_colorValues( $points, $colorby, $unit_of_measure, $unit_of_measure_speed );
		$extra_stats  = wpgpxmaps_extraStats( $points );

		$max_ele        = $points->maxEle;
		$min_ele        = $points->minEle;
		$max_time       = $points->maxTime;
		$min_time       = $points->minTime;
		$total_ele_up   = $points->totalEleUp;
		$total_ele_down = $points->totalEleDown;
		$avg_speed      = $points->avgSpeed;
		$avg_cad        = $points->avgCad;
		$avg_hr         = $points->avgHr;
		$avg_temp       = $points->avgTemp;
		$tot_len        = $points->totalLength;

		if ( is_array( $points_x_lat ) )
		foreach ( array_keys(
		$points_x_lat ) as $i ) {
			$_lat = (float) $points_x_lat[$i];
			$_lon = (float) $points_x_lon[$i];

			if ( 0 == $_lat && 0 == $_lon ) {
				$points_maps       .= 'null,';
				$points_graph_dist .= 'null,';
				$points_graph_ele  .= 'null,';

				if ( true == $showSpeed )
					$points_graph_speed .= 'null,';

				if ( true == $showHr )
					$points_graph_hr .= 'null,';

				if ( true == $showAtemp )
					$points_graph_atemp .= 'null,';

				if ( true == $showCad )
					$points_graph_cad .= 'null,';

				if ( true == $showGrade )
					$points_graph_grade .= 'null,';
			} else {
				$points_maps .= '[' . number_format( (float) $points_x_lat[$i], 7, '.', '' ) . ',' . number_format( (float) $points_x_lon[$i], 7, '.', '' ) . '],';

				$_ele  = (float) $points->ele[$i];
				$_dist = (float) $points->dist[$i];

				if ( wpgpxmaps_FEET_MILES == $unit_of_measure ) {
					/* feet / miles */
					$_dist *= 0.000621371192;
					$_ele  *= 3.2808399;

				} elseif ( wpgpxmaps_METERS_KILOMETERS == $unit_of_measure ) {
					/* meters / kilometers */
					$_dist = (float) ( $_dist / 1000 );

				} elseif ( wpgpxmaps_METERS_NAUTICALMILES == $unit_of_measure ) {
					/* meters / nautical miles */
					$_dist = (float) ( $_dist / 1000 / 1.852 );

				} elseif ( wpgpxmaps_METER_MILES == $unit_of_measure ) {
					/* meters / miles */
					$_dist *= 0.000621371192;

				} elseif ( wpgpxmaps_FEET_NAUTICALMILES == $unit_of_measure ) {
					/* feet / nautical miles */
					$_dist = (float) ( $_dist / 1000 / 1.852 );
					$_ele *= 3.2808399;
				}

				$points_graph_dist .= number_format( $_dist, 2, '.', '' ) . ',';
				$points_graph_ele  .= number_format( $_ele, 2, '.', '' ) . ',';

				if ( true == $showSpeed ) {
					$_speed              = (float) $points->speed[$i];
					$points_graph_speed .= convertSpeed( $_speed, $unit_of_measure_speed ) . ',';
				}

				if ( true == $showHr ) {
					$points_graph_hr .= number_format( (float) $points->hr[$i], 2, '.', '' ) . ',';
				}

				if ( true == $showAtemp ) {
					$points_graph_atemp .= number_format( (float) $points->atemp[$i], 1, '.', '' ) . ',';
				}

				if ( true == $showCad ) {
					$points_graph_cad .= number_format( (float) $points->cad[$i], 2, '.', '' ) . ',';
				}

				if ( true == $showGrade ) {
					$points_graph_grade .= number_format( (float) $points->grade[$i], 2, '.', '' ) . ',';
				}
			}
		}

		if ( wpgpxmaps_FEET_MILES == $unit_of_measure ) {
			/* feet / miles */
			$tot_len        = round( $tot_len * 0.000621371192, 2 ) . ' mi';
			$max_ele        = round( $max_ele * 3.2808399, 0 ) . ' ft';
			$min_ele        = round( $min_ele * 3.2808399, 0 ) . ' ft';
			$total_ele_up   = round( $total_ele_up * 3.2808399, 0 ) . ' ft';
			$total_ele_down = round( $total_ele_down * 3.2808399, 0 ) . ' ft';

		} elseif ( wpgpxmaps_METERS_KILOMETERS == $unit_of_measure ) {
			/* meters / kilometers */
			$tot_len        = round( $tot_len / 1000, 2 ) . ' km';
			$max_ele        = round( $max_ele, 0 ) . ' m';
			$min_ele        = round( $min_ele, 0 ) . ' m';
			$total_ele_up   = round( $total_ele_up, 0 ) . ' m';
			$total_ele_down = round( $total_ele_down, 0 ) . ' m';

		} elseif ( wpgpxmaps_METERS_NAUTICALMILES == $unit_of_measure ) {
			/* meters / nautical miles */
			$tot_len        = round( $tot_len / 1000 / 1.852, 2 ) . ' NM';
			$max_ele        = round( $max_ele, 0 ) . ' m';
			$min_ele        = round( $min_ele, 0 ) . ' m';
			$total_ele_up   = round( $total_ele_up, 0 ) . ' m';
			$total_ele_down = round( $total_ele_down, 0 ) . ' m';

		} elseif ( wpgpxmaps_METER_MILES == $unit_of_measure ) {
			/* meters / miles */
			$tot_len        = round( $tot_len * 0.000621371192, 2 ) . ' mi';
			$max_ele        = round( $max_ele, 0 ) . ' m';
			$min_ele        = round( $min_ele, 0 ) . ' m';
			$total_ele_up   = round( $total_ele_up, 0 ) . ' m';
			$total_ele_down = round( $total_ele_down, 0 ) . ' m';

		} elseif ( wpgpxmaps_FEET_NAUTICALMILES == $unit_of_measure ) {
			/* feet / nautical miles */
			$tot_len        = round( $tot_len / 1000 / 1.852, 2 ) . ' NM';
			$max_ele        = round( $max_ele * 3.2808399, 0 ) . ' ft';
			$min_ele        = round( $min_ele * 3.2808399, 0 ) . ' ft';
			$total_ele_up   = round( $total_ele_up * 3.2808399, 0 ) . ' ft';
			$total_ele_down = round( $total_ele_down * 3.2808399, 0 ) . ' ft';

		} else {
			/* meters / meters */
			$tot_len        = round( $tot_len, 0 ) . ' m';
			$max_ele        = round( $max_ele, 0 ) . ' m';
			$min_ele        = round( $min_ele, 0 ) . ' m';
			$total_ele_up   = round( $total_ele_up, 0 ) . ' m';
			$total_ele_down = round( $total_ele_down, 0 ) . ' m';
		}

		$avg_speed = convertSpeed( $avg_speed, $unit_of_measure_speed, true );
		$waypoints = '[]';

		if ( true == $showW ) {
			$wpoints = array();
			foreach ( $gpx_files as $file ) {
				$wpoints = array_merge( $wpoints, wpgpxmaps_getWayPoints( $file['path'] ) );
			}
			$waypoints = wp_json_encode( $wpoints );
		}
		foreach ( $gpx_files as $file ) {
			if ( $file['remote'] ) {
				/* Remove the temporary copy created by download_url() */
				wp_delete_file( $file['path'] );
			}
		}
		if ( false == $showEle ) {
			$points_graph_ele = '';
		}

		$p = '/(,|,null,)$/';

		$points_maps = preg_replace( $p, '', $points_maps );

		$points_graph_dist  = preg_replace( $p, '', $points_graph_dist );
		$points_graph_ele   = preg_replace( $p, '', $points_graph_ele );
		$points_graph_speed = preg_replace( $p, '', $points_graph_speed );
		$points_graph_hr    = preg_replace( $p, '', $points_graph_hr );
		$points_graph_atemp = preg_replace( $p, '', $points_graph_atemp );
		$points_graph_cad   = preg_replace( $p, '', $points_graph_cad );
		$points_graph_grade = preg_replace( $p, '', $points_graph_grade );

		$waypoints = preg_replace( $p, '', $waypoints );

		if ( preg_match( '/^(0,?)+$/', $points_graph_dist ) )
			$points_graph_dist = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_ele ) )
			$points_graph_ele = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_speed ) )
			$points_graph_speed = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_hr ) )
			$points_graph_hr = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_hr ) )
			$points_graph_hr = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_atemp ) )
			$points_graph_atemp = '';

		if ( preg_match( '/^(0,?)+$/', $points_graph_grade ) )
			$points_graph_grade = '';

	}

	$ngimgs_data = '';
	if ( $ngGalleries != '' || $ngImages != '' ) {
		$ngimgs      = getNGGalleryImages( $ngGalleries, $ngImages, $points_x_time, $points_x_lat, $points_x_lon, $dtoffset, $error );
		foreach ( $ngimgs as $img ) {
			$data         = $img['data'];
			$data         = str_replace( '\n', '', $data );
			$ngimgs_data .= '<span lat="' . $img['lat'] . '" lon="' . $img['lon'] . '">' . $data . '</span>';
		}
	}

	if ( true == $attachments ) {
		$attimgs = wpgpxmaps_getAttachedImages( $points_x_time, $points_x_lat, $points_x_lon, $dtoffset, $error );
		foreach ( $attimgs as $img ) {
			$data         = $img['data'];
			$data         = str_replace( '\n', '', $data );
			$ngimgs_data .= '<span lat="' . $img['lat'] . '" lon="' . $img['lon'] . '">' . $data . '</span>';
		}
	}

	if ( ! ( true == $skipcache ) ) {

		file_put_contents( $gpxcache, serialize( array(
			'points_maps'        => $points_maps,
			'points_x_time'      => $points_x_time,
			'points_x_lat'       => $points_x_lat,
			'points_x_lon'       => $points_x_lon,
			'points_graph_dist'  => $points_graph_dist,
			'points_graph_ele'   => $points_graph_ele,
			'points_graph_speed' => $points_graph_speed,
			'points_graph_hr'    => $points_graph_hr,
			'points_graph_atemp' => $points_graph_atemp,
			'points_graph_cad'   => $points_graph_cad,
			'points_graph_grade' => $points_graph_grade,
			'points_color'       => $points_color,
			'extra_stats'        => $extra_stats,
			'track_colors'       => $track_colors,
			'waypoints'          => $waypoints,
			'max_ele'            => $max_ele,
			'min_ele'            => $min_ele,
			'total_ele_up'       => $total_ele_up,
			'total_ele_down'     => $total_ele_down,
			'avg_speed'          => $avg_speed,
			'avg_cad'            => $avg_cad,
			'avg_hr'             => $avg_hr,
			'avg_temp'           => $avg_temp,
			'tot_len'            => $tot_len,
			'max_time'           => $max_time,
			'min_time'           => $min_time,
		)
	),
		LOCK_EX);
	}

	$hideGraph = ( '0' == $gh || '0px' == $gh );

	/* Waypoints are JSON: decode and encode again so the value is always valid and safe inside the script */
	$waypoints_json = json_decode( (string) $waypoints, true );
	$waypoints_json = wp_json_encode( is_array( $waypoints_json ) ? $waypoints_json : array(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT );

	$r = (int) get_the_ID() . '_' . wp_rand( 1, 5000000 );

	/* Same URL (and version) as the enqueued module, so the browser loads it only once */
	$module_url = wpgpxmaps_module_url();

	/**
	 * Filters extra data passed to the map script (params.extra), read by add-ons in the "wpgpxmaps:ready" event.
	 *
	 * @param array $extra Data, encoded as JSON.
	 * @param array $attr  Shortcode attributes.
	 */
	$extra = apply_filters( 'wpgpxmaps_map_extra', array(), $attr );
	$extra = is_array( $extra ) ? $extra : array();

	$output = '
		<div id="wpgpxmaps_' . esc_attr( $r ) . '" class="wpgpxmaps">
			<div id="map_' . esc_attr( $r ) . '_cont" style="width:' . esc_attr( $w ) . '; height:' . esc_attr( $mh ) . ';position:relative" >
				<div id="map_' . esc_attr( $r ) . '" style="width:' . esc_attr( $w ) . '; height:' . esc_attr( $mh ) . '"></div>
				<div id="wpgpxmaps_' . esc_attr( $r ) . '_osm_footer" class="wpgpxmaps_osm_footer" style="display:none;"><span> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</span></div>
			</div>
			<canvas id="myChart_' . esc_attr( $r ) . '" class="plot" style="width:' . esc_attr( $w ) . '; height:' . esc_attr( $gh ) . '"></canvas>
			<div id="ngimages_' . esc_attr( $r ) . '" class="ngimages" style="display:none">' . $ngimgs_data . '</div>
			<div id="report_' . esc_attr( $r ) . '" class="report"></div>
		</div>
		' . esc_html( $error ) . '
		<script type="module">
		import { WPGPXMaps } from "' . esc_url( $module_url ) . '";

		/* Start after the page has loaded, or at once if it already has (block editor preview, late-loaded content) */
		const wpgpxmapsStart_' . esc_js( $r ) . ' = function() {

			var wpgpxmaps_' . esc_js( $r ) . ' = new WPGPXMaps({
					targetId           : "' . esc_js( $r ) . '",
					mapType            : "' . esc_js( $mt ) . '",
					mapData            : [' . esc_js( $points_maps ) . '],
					graphDist          : [' . esc_js( $hideGraph ? '' : $points_graph_dist ) . '],
					graphEle           : [' . esc_js( $hideGraph ? '' : $points_graph_ele ) . '],
					graphSpeed         : [' . esc_js( $hideGraph ? '' : $points_graph_speed ) . '],
					graphHr            : [' . esc_js( $hideGraph ? '' : $points_graph_hr ) . '],
					graphAtemp         : [' . esc_js( $hideGraph ? '' : $points_graph_atemp ) . '],
					graphCad           : [' . esc_js( $hideGraph ? '' : $points_graph_cad ) . '],
					graphGrade         : [' . esc_js( $hideGraph ? '' : $points_graph_grade ) . '],
					waypoints          : ' . $waypoints_json . ',
					unit               : "' . esc_js( $unit_of_measure ) . '",
					unitspeed          : "' . esc_js( $unit_of_measure_speed ) . '",
					color1             : ' . wp_json_encode( $track_colors ? $track_colors : $colors_map, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ',
					trackNames         : ' . wp_json_encode( $track_names, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ',
					trackColors        : ' . wp_json_encode( array_slice( $track_palette, 0, count( $track_names ) ), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ',
					colorBy            : "' . esc_js( $points_color ? $colorby : '' ) . '",
					colorData          : ' . wp_json_encode( array_values( $points_color ) ) . ',
					startEnd           : ' . ( $startend ? 'true' : 'false' ) . ',
					kmMarkers          : ' . wp_json_encode( max( 0, $kmmarkers ) ) . ',
					extra              : ' . wp_json_encode( $extra, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ',
					color2             : "' . esc_js( $color_graph ) . '",
					color3             : "' . esc_js( $color_graph_speed ) . '",
					color4             : "' . esc_js( $color_graph_hr ) . '",
					color5             : "' . esc_js( $color_graph_cad ) . '",
					color6             : "' . esc_js( $color_graph_grade ) . '",
					color7             : "' . esc_js( $color_graph_atemp ) . '",
					chartFrom1         : "' . esc_js( $chartFrom1 ) . '",
					chartTo1           : "' . esc_js( $chartTo1 ) . '",
					chartFrom2         : "' . esc_js( $chartFrom2 ) . '",
					chartTo2           : "' . esc_js( $chartTo2 ) . '",
					startIcon          : "' . esc_js( $startIcon ) . '",
					endIcon            : "' . esc_js( $endIcon ) . '",
					currentIcon        : "' . esc_js( $currentIcon ) . '",
					waypointIcon       : "' . esc_js( $waypointIcon ) . '",
					currentpositioncon : "' . esc_js( $currentpositioncon ) . '",
					usegpsposition     : "' . esc_js( $usegpsposition ) . '",
					zoomOnScrollWheel  : "' . esc_js( $zoomOnScrollWheel ) . '",
					ngGalleries        : [' . esc_js( $ngGalleries ) . '],
					ngImages           : [' . esc_js( $ngImages ) . '],
					pluginUrl          : "' . esc_url( plugins_url() ) . '",
					TFApiKey           : "' . esc_js( get_option( 'wpgpxmaps_openstreetmap_apikey' ) ) . '",
					MapBoxApiKey           : "' . esc_js( get_option( 'wpgpxmaps_mapbox_apikey' ) ) . '",

					MapBoxMapType           : "' . esc_js( get_option( 'wpgpxmaps_mapbox_type' ) ) . '",
					MapBoxMapCustomType     : "' . esc_js( get_option( 'wpgpxmaps_mapbox_customtype' ) ) . '",
					MapBox3dTerrain         : "' . esc_js( filter_var(get_option( 'wpgpxmaps_mapbox_3dterrain' ), FILTER_VALIDATE_BOOLEAN) ) . '",
					MapBoxFog           	: "' . esc_js( filter_var(get_option( 'wpgpxmaps_mapbox_fog' ), FILTER_VALIDATE_BOOLEAN) ) . '",
					MapBoxAnimateOnLoading 	: "' . esc_js( get_option( 'wpgpxmaps_mapbox_load_animation' ) ) . '",

					langs              : {
						altitude        : "' . esc_js( __( 'Altitude', 'wp-gpx-maps' ) ) . '",
						currentPosition : "' . esc_js( __( 'Current position', 'wp-gpx-maps' ) ) . '",
						speed           : "' . esc_js( __( 'Speed', 'wp-gpx-maps' ) ) . '",
						grade           : "' . esc_js( __( 'Grade', 'wp-gpx-maps' ) ) . '",
						heartRate       : "' . esc_js( __( 'Heart rate', 'wp-gpx-maps' ) ) . '",
						atemp           : "' . esc_js( __( 'Temperature', 'wp-gpx-maps' ) ) . '",
						cadence         : "' . esc_js( __( 'Cadence', 'wp-gpx-maps' ) ) . '",
						goFullScreen    : "' . esc_js( __( 'Go full screen', 'wp-gpx-maps' ) ) . '",
						exitFullFcreen  : "' . esc_js( __( 'Exit full screen', 'wp-gpx-maps' ) ) . '",
						hideImages      : "' . esc_js( __( 'Hide images', 'wp-gpx-maps' ) ) . '",
						showImages      : "' . esc_js( __( 'Show images', 'wp-gpx-maps' ) ) . '",
						backToCenter	: "' . esc_js( __( 'Back to center', 'wp-gpx-maps' ) ) . '",
						start           : "' . esc_js( __( 'Start', 'wp-gpx-maps' ) ) . '",
						finish          : "' . esc_js( __( 'Finish', 'wp-gpx-maps' ) ) . '"
					}
				});

		};

		if (document.readyState === "complete") {
			wpgpxmapsStart_' . esc_js( $r ) . '();
		} else {
			window.addEventListener("load", wpgpxmapsStart_' . esc_js( $r ) . ');
		}

		</script>';

	/* Print summary */
	if ( true == $summary && ( $points_graph_speed != '' || $points_graph_ele != '' || $points_graph_dist != '' ) ) {

		$output .= "<div id='wpgpxmaps_summary_" . esc_attr( $r ) . "' class='wpgpxmaps_summary'>";
		if ( $points_graph_dist != '' && true == $p_tot_len ) {
			$output .= "<span class='totlen'><span class='summarylabel'>" . esc_html__( 'Total distance:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $tot_len</span></span><br />";
		}
		if ( $points_graph_ele != ' ' ) {
			if ( true == $p_max_ele )
				$output .= "<span class='maxele'><span class='summarylabel'>" . esc_html__( 'Max elevation:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $max_ele</span></span><br />";
			if ( true == $p_min_ele )
				$output .= "<span class='minele'><span class='summarylabel'>" . esc_html__( 'Min elevation:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $min_ele</span></span><br />";
			if ( true == $p_total_ele_up )
				$output .= "<span class='totaleleup'><span class='summarylabel'>" . esc_html__( 'Total climbing:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $total_ele_up</span></span><br />";
			if ( true == $p_total_ele_down )
				$output .= "<span class='totaleledown'><span class='summarylabel'>" . esc_html__( 'Total descent:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $total_ele_down</span></span><br />";
		}
		if ( $points_graph_speed != '' && true == $p_avg_speed ) {
			$output .= "<span class='avgspeed'><span class='summarylabel'>" . esc_html__( 'Average speed:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $avg_speed</span></span><br />";
		}
		if ( $points_graph_cad != '' && true == $p_avg_cad ) {
			$output .= "<span class='avgcad'><span class='summarylabel'>" . esc_html__( 'Average cadence:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $avg_cad</span></span><br />";
		}
		if ( $points_graph_hr != '' && true == $p_avg_hr ) {
			$output .= "<span class='avghr'><span class='summarylabel'>" . esc_html__( 'Average heart rate:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $avg_hr</span></span><br />";
		}
		if ( $points_graph_atemp != '' && true == $p_avg_temp ) {
			$output .= "<span class='avgtemp'><span class='summarylabel'>" . esc_html__( 'Average temperature:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $avg_temp</span></span><br />";
		}
		if ( true == $p_total_time && $max_time > 0 ) {
			/* Hours are not limited to 24, so long tracks are shown correctly */
			$time_diff = wpgpxmaps_formatDuration( $max_time - $min_time );
			$output   .= "<span class='totaltime'><span class='summarylabel'>" . esc_html__( 'Total time:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $time_diff</span></span><br />";
		}
		if ( true == $p_moving_time && $extra_stats['movingTime'] > 0 ) {
			$output .= "<span class='movingtime'><span class='summarylabel'>" . esc_html__( 'Moving time:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> " . esc_html( wpgpxmaps_formatDuration( $extra_stats['movingTime'] ) ) . '</span></span><br />';
		}
		if ( true == $p_max_speed && $extra_stats['maxSpeed'] > 0 ) {
			$output .= "<span class='maxspeed'><span class='summarylabel'>" . esc_html__( 'Max speed:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> " . esc_html( convertSpeed( $extra_stats['maxSpeed'], $unit_of_measure_speed, true ) ) . '</span></span><br />';
		}
		if ( true == $p_max_grade && null !== $extra_stats['maxGrade'] ) {
			$output .= "<span class='maxgrade'><span class='summarylabel'>" . esc_html__( 'Max grade:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> " . esc_html( round( $extra_stats['maxGrade'], 1 ) . '% / ' . round( $extra_stats['minGrade'], 1 ) . '%' ) . '</span></span><br />';
		}
		$output .= '</div>';
	}
	
	//$output .="--$download--";

	/* Print download link */
	if ( (true === $download || 'true' === $download ) && $gpxurl != '' ) {
		$links = array();
		foreach ( $gpx_list as $item ) {
			$url = esc_url_raw( $item );
			if ( 1 != preg_match( '/^(http(s)?\:\/\/)/', $item ) ) {
				$dummy = ( defined( 'WP_SITEURL' ) ) ? WP_SITEURL : get_bloginfo( 'url' );
				$url   = $dummy . $url;
			}
			$links[] = "<a href='" . esc_url( $url ) . "' target='_new' download>" . esc_html( basename( $url ) ) . '</a>';
		}
		$output .= 'Download file: ' . implode( ', ', $links );
	}

	/**
	 * Filters the HTML of a map (map, chart, summary and download link).
	 *
	 * @param string $output HTML.
	 * @param array  $attr   Shortcode attributes.
	 * @param string $r      Map id: the elements are #wpgpxmaps_{id}, #map_{id}, #myChart_{id}.
	 */
	return apply_filters( 'wpgpxmaps_map_html', $output, $attr, $r );
}

function convertSeconds( $s ) {

	$s = (float) $s;
	if ( 0 == $s )
		return 0;
	
	$s      = 1.0 / $s;
	$_sSecT = $s * 60; // sec/km
	$_sMin  = floor( $_sSecT / 60 );
	$_sSec  = $_sSecT - $_sMin * 60;
	return $_sMin + $_sSec / 100;
}

function convertSpeed( $speed, $unit_of_measure_speed, $addUom = false ) {

	$unit_of_measure = '';
	$speed           = (float) $speed;

	if ( wpgpxmaps_MINUTES_PER_100METERS == $unit_of_measure_speed && $speed != 0 ) {
		/* min/100 meters */
		$speed = 1 / $speed * 100 / 60;
		$unit_of_measure   = ' min/100m';

	} elseif ( wpgpxmaps_KNOTS == $unit_of_measure_speed ) {
		/* knots */
		$speed *= 1.94384449;
		$unit_of_measure    = ' knots';

	} elseif ( wpgpxmaps_MINUTES_PER_MILES == $unit_of_measure_speed ) {
		/* min/miles*/
		$speed = convertSeconds( $speed * 0.037282272 );
		$unit_of_measure   = ' min/mi';

	} elseif ( wpgpxmaps_MINUTES_PER_KM == $unit_of_measure_speed ) {
		/* min/km */
		$speed = convertSeconds( $speed * 0.06 );
		$unit_of_measure   = ' min/km';

	} elseif ( wpgpxmaps_MILES_PER_HOURS == $unit_of_measure_speed ) {
		/* miles/h */
		$speed *= 2.2369362920544025;
		$unit_of_measure    = ' mi/h';

	} elseif ( wpgpxmaps_KM_PER_HOURS == $unit_of_measure_speed ) {
		/* km/h */
		$speed *= 3.6;
		$unit_of_measure    = ' km/h';

	} else {
		/* default m/s */
		$unit_of_measure = ' m/s';
	}

	if ( true == $addUom ) {
		return number_format( $speed, 2, '.', '' ) . $unit_of_measure;
	} else {
		return number_format( $speed, 2, '.', '' );
	}

}

function unescape( $value ) {

	$value = str_replace( "'", "\'", $value );
	$value = str_replace( array( '\n', '\r' ), '', $value );
	return $value;

}

function wpgpxmaps_install_option() {
	$options = array(
		// General
		'wpgpxmaps_width' => '100%',
		'wpgpxmaps_height' => '450px',
		'wpgpxmaps_graph_height' => '200px',
		'wpgpxmaps_distance_type' => '0',
		'wpgpxmaps_skipcache' => '',
		'wpgpxmaps_download' => '',
		'wpgpxmaps_usegpsposition' => '',
		// Print Summary Table
		'wpgpxmaps_summary' => '',
		'wpgpxmaps_summary_tot_len' => '',
		'wpgpxmaps_summary_max_ele' => '',
		'wpgpxmaps_summary_min_ele' => '',
		'wpgpxmaps_summary_total_ele_up' => '',
		'wpgpxmaps_summary_total_ele_down' => '',
		'wpgpxmaps_summary_avg_speed' => '',
		'wpgpxmaps_summary_avg_cad' => '',
		'wpgpxmaps_summary_avg_hr' => '',
		'wpgpxmaps_summary_avg_temp' => '',
		'wpgpxmaps_summary_total_time' => '',
		'wpgpxmaps_summary_moving_time' => '',
		'wpgpxmaps_summary_max_speed' => '',
		'wpgpxmaps_summary_max_grade' => '',
		// Map
		'wpgpxmaps_map_type' => 'HYBRID',
		'wpgpxmaps_map_line_color' => '#3366cc',
		'wpgpxmaps_map_color_by' => '',
		'wpgpxmaps_map_hide_start_end' => '',
		'wpgpxmaps_map_km_markers' => '',
		'wpgpxmaps_zoomonscrollwheel' => '',
		'wpgpxmaps_show_waypoint' => '',
		'wpgpxmaps_map_start_icon' => '',
		'wpgpxmaps_map_end_icon' => '',
		'wpgpxmaps_currentpositioncon' => '',
		'wpgpxmaps_map_current_icon' => '',
		'wpgpxmaps_map_waypoint_icon' => '',
		// Diagram - Elevation
		'wpgpxmaps_show_elevation' => 'true',
		'wpgpxmaps_graph_line_color' => '#3366cc',
		'wpgpxmaps_unit_of_measure' => '0',
		'wpgpxmaps_graph_offset_from1' => '',
		'wpgpxmaps_graph_offset_to1' => '',
		// Diagram - Speed
		'wpgpxmaps_show_speed' => '',
		'wpgpxmaps_graph_line_color_speed' => '#ff0000',
		'wpgpxmaps_unit_of_measure_speed' => '0',
		'wpgpxmaps_graph_offset_from2' => '',
		'wpgpxmaps_graph_offset_to2' => '',
		// Diagram - Heart rate
		'wpgpxmaps_show_hr' => '',
		'wpgpxmaps_graph_line_color_hr' => '#ff77bd',
		// Diagram - Temperature
		'wpgpxmaps_show_atemp' => '',
		'wpgpxmaps_graph_line_color_atemp' => '#ff77bd',
		// Diagram - Cadence
		'wpgpxmaps_show_cadence' => '',
		'wpgpxmaps_graph_line_color_cad' => '#beecff',
		// Diagram - Grade
		'wpgpxmaps_show_grade' => '',
		'wpgpxmaps_graph_line_color_grade' => '#beecff',
		// Pictures
		'wpgpxmaps_map_nggallery' => '',
		// Advanced
		'wpgpxmaps_pointsoffset' => '10',
		'wpgpxmaps_donotreducegpx' => 'true',
		// Administration
		'wpgpxmaps_allow_users_upload' => '',
		'wpgpxmaps_show_notice' => ''
	);

	foreach ( $options as $key => $value ) {
		add_option( $key, $value, '', 'yes' );
	}
}

function wpgpxmaps_remove_option() {
	$options = array(
		// General
		'wpgpxmaps_width',
		'wpgpxmaps_height',
		'wpgpxmaps_graph_height',
		'wpgpxmaps_distance_type',
		'wpgpxmaps_skipcache',
		'wpgpxmaps_download',
		'wpgpxmaps_usegpsposition',
		// Print Summary Table
		'wpgpxmaps_summary',
		'wpgpxmaps_summary_tot_len',
		'wpgpxmaps_summary_max_ele',
		'wpgpxmaps_summary_min_ele',
		'wpgpxmaps_summary_total_ele_up',
		'wpgpxmaps_summary_total_ele_down',
		'wpgpxmaps_summary_avg_speed',
		'wpgpxmaps_summary_avg_cad',
		'wpgpxmaps_summary_avg_hr',
		'wpgpxmaps_summary_avg_temp',
		'wpgpxmaps_summary_total_time',
		'wpgpxmaps_summary_moving_time',
		'wpgpxmaps_summary_max_speed',
		'wpgpxmaps_summary_max_grade',
		// Map
		'wpgpxmaps_map_type',
		'wpgpxmaps_map_line_color',
		'wpgpxmaps_map_color_by',
		'wpgpxmaps_map_hide_start_end',
		'wpgpxmaps_map_km_markers',
		'wpgpxmaps_zoomonscrollwheel',
		'wpgpxmaps_show_waypoint',
		'wpgpxmaps_map_start_icon',
		'wpgpxmaps_map_end_icon',
		'wpgpxmaps_currentpositioncon',
		'wpgpxmaps_map_current_icon',
		'wpgpxmaps_map_waypoint_icon',
		// Diagram - Elevation
		'wpgpxmaps_show_elevation',
		'wpgpxmaps_graph_line_color',
		'wpgpxmaps_unit_of_measure',
		'wpgpxmaps_graph_offset_from1',
		'wpgpxmaps_graph_offset_to1',
		// Diagram - Speed
		'wpgpxmaps_show_speed',
		'wpgpxmaps_graph_line_color_speed',
		'wpgpxmaps_unit_of_measure_speed',
		'wpgpxmaps_graph_offset_from2',
		'wpgpxmaps_graph_offset_to2',
		// Diagram - Heart rate
		'wpgpxmaps_show_hr',
		'wpgpxmaps_graph_line_color_hr',
		// Diagram - Temperature
		'wpgpxmaps_show_atemp',
		'wpgpxmaps_graph_line_color_atemp',
		// Diagram - Cadence
		'wpgpxmaps_show_cadence',
		'wpgpxmaps_graph_line_color_cad',
		// Diagram - Grade
		'wpgpxmaps_show_grade',
		'wpgpxmaps_graph_line_color_grade',
		// Pictures
		'wpgpxmaps_map_nggallery',
		// Advanced
		'wpgpxmaps_pointsoffset',
		'wpgpxmaps_donotreducegpx',
		// Administration
		'wpgpxmaps_allow_users_upload',
		'wpgpxmaps_show_notice'
	);

	foreach ( $options as $key ) {
		delete_option( $key );
	}
}
