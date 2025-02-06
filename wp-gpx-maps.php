<?php
/**
 * Plugin Name: WP-GPX-Maps
 * Plugin URI: http://www.devfarm.it/
 * Description: Draws a GPX track with altitude chart
 * Version: 1.7.11
 * Author: Bastianon Massimo
 * Author URI: http://www.devfarm.it/
 * Text Domain: wp-gpx-maps
 * Domain Path: /languages
 * License: GPL2
 *
 * @package WP-GPX-Maps
 */

// error_reporting (E_ALL);

/**
 * Version of the plugin
 */
define( 'WPGPXMAPS_CURRENT_VERSION', '1.7.10' );

require 'wp-gpx-maps-utils.php';
require 'wp-gpx-maps-admin.php';

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

	try {

		// If the function it's not available, require it.
		if ( ! function_exists( 'download_url' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		return download_url( $file_url );

	} catch ( Exception $e ) {
		print_r( $e );
		return '';
	}

}


function wpgpxmaps_enqueue_scripts() {

	if (false)
	{

		/* Output Style CSS */
		wp_register_style( 'output-style', plugins_url( 'css/wp-gpx-maps-output.css', __FILE__ ), array(), '1.0.0' );
		wp_enqueue_style( 'output-style' );

		/* Leaflet */
		wp_register_style( 'leaflet', plugins_url( '/ThirdParties/Leaflet_1.5.1/leaflet.css', __FILE__ ), array(), '1.5.1' );
		wp_enqueue_style( 'leaflet' );

		/* Leaflet.markercluster */
		wp_register_style( 'leaflet.markercluster', plugins_url( '/ThirdParties/Leaflet.markercluster-1.4.1/MarkerCluster.css', __FILE__ ), array(), '1.4.1,' );
		wp_enqueue_style( 'leaflet.markercluster' );

		/* Leaflet.Photo */
		wp_register_style( 'leaflet.Photo', plugins_url( '/ThirdParties/Leaflet.Photo/Leaflet.Photo.css', __FILE__ ), array(), '0' );
		wp_enqueue_style( 'leaflet.Photo' );

		/* Leaflet.fullscreen */
		wp_register_style( 'leaflet.fullscreen', plugins_url( '/ThirdParties/leaflet.fullscreen-1.4.5/Control.FullScreen.css', __FILE__ ), array(), '1.5.1' );
		wp_enqueue_style( 'leaflet.fullscreen' );

		wp_register_script( 'leaflet', plugins_url( '/ThirdParties/Leaflet_1.5.1/leaflet.js', __FILE__ ), array(), '1.5.1' );
		wp_register_script( 'leaflet.markercluster', plugins_url( '/ThirdParties/Leaflet.markercluster-1.4.1/leaflet.markercluster.js', __FILE__ ), array( 'leaflet' ), '1.4.1' );
		wp_register_script( 'leaflet.Photo', plugins_url( '/ThirdParties/Leaflet.Photo/Leaflet.Photo.js', __FILE__ ), array( 'leaflet', 'leaflet.markercluster' ), '0' );
		wp_register_script( 'leaflet.fullscreen', plugins_url( '/ThirdParties/leaflet.fullscreen-1.4.5/Control.FullScreen.js', __FILE__ ), array( 'leaflet' ), '1.4.5' );

		/* Chartjs */
		wp_register_script( 'chartjs', plugins_url( '/js/Chart.min.js', __FILE__ ), array(), '2.8.0' );

		wp_register_script( 'wp-gpx-maps', plugins_url( 'js/WP-GPX-Maps.js', __FILE__ ), array( 'jquery', 'leaflet', 'chartjs' ), '1.6.02' );

		wp_enqueue_script( 'output-style' );
		wp_enqueue_script( 'leaflet' );
		wp_enqueue_script( 'leaflet.markercluster' );
		wp_enqueue_script( 'leaflet.Photo' );
		wp_enqueue_script( 'leaflet.fullscreen' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'chartjs' );
		wp_enqueue_script( 'wp-gpx-maps' );

	}
	else
	{
		/* Output Style CSS */
		wp_register_style( 'output-style', plugins_url( 'assets/dist/style.css', __FILE__ ), array(), '1.0.0' );
		wp_enqueue_style( 'output-style' );

		wp_register_script_module( 'wp-gpx-maps', plugins_url( 'assets/dist/WP-GPX-Maps.es.js', __FILE__ ), array(), '1.6.02' );
		wp_enqueue_script_module( 'wp-gpx-maps' );

	}

}

function wpgpxmaps_findValue( $attr, $attributeName, $optionName, $defaultValue ) {

	$val = '';
	if ( isset( $attr[$attributeName] ) ) {
		$val = sanitize_text_field( $attr[$attributeName] );
	}
	if ( $val == '' ) {
		$val = sanitize_text_field( get_option( $optionName ) );
	}
	if ( $val == '' && isset( $_GET[$attributeName] ) && $attributeName != 'download' ) {
		$val = sanitize_text_field( $_GET[$attributeName] );
	}
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
	$sitePath = wp_gpx_maps_sitePath();
	$folder   = trim( $folder );
	$folder   = str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $folder );
	$folder   = $sitePath . sanitize_text_field( $folder );

	$files = scandir( $folder );

	foreach ( $files as $file ) {

		if ( strtolower( substr( $file, - 4 ) ) == '.gpx' ) {

			$gpx    = $folder . DIRECTORY_SEPARATOR . $file;
			$points = wpgpxmaps_getPoints( $gpx, $pointsoffset, $donotreducegpx, $distanceType );

			$points_maps       = '';
			$points_graph_dist = '';
			$points_graph_ele  = '';

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

}

function wpgpxmaps_handle_shortcodes( $attr, $content = '' ) {

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

	$colors_map = explode( ' ', $color_map );

	$gpxurl = esc_url( $gpx );

	/* Add file modification time to cache filename to catch new uploads with same file name */
	$mtime = wp_gpx_maps_sitePath() . str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, trim( $gpx ) );
	if ( file_exists( $mtime ) ) {
		$mtime = filemtime( $mtime );
	} else {
		$mtime = 0;
	}
	$cacheFileName = "$gpx,$mtime,$w,$mh,$mt,$gh,$showEle,$showW,$showHr,$showAtemp,$showCad,$donotreducegpx,$pointsoffset,$showSpeed,$showGrade,$unit_of_measure_speed,$unit_of_measure,$distanceType,v1.3.9";

	$cacheFileName = md5( $cacheFileName );

	global $wp_filesystem;
	if (empty($wp_filesystem)) {
		require_once (ABSPATH . '/wp-admin/includes/file.php');
		WP_Filesystem();
	}

	$gpxcache = gpxCacheFolderPath();

	if ( ! ( $wp_filesystem->exists( $gpxcache ) && $wp_filesystem->is_dir( $gpxcache ) ) )
	{
		$wp_filesystem->mkdir( $gpxcache, 0755, true );
		//@mkdir( $gpxcache, 0755, true );	
	}


	$gpxcache .= DIRECTORY_SEPARATOR . $cacheFileName . '.tmp';

	/* Try to load cache */
	if ( file_exists( $gpxcache ) && ! ( true == $skipcache ) ) {

		try {
			$cache_str          = $wp_filesystem->get_contents( $gpxcache );
			$cache_obj          = unserialize( $cache_str );
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

		} catch ( Exception $e ) {
			$points_maps        = '';
			$points_x_time      = '';
			$points_x_lat       = '';
			$points_x_lon       = '';
			$points_graph_dist  = '';
			$points_graph_ele   = '';
			$points_graph_speed = '';
			$points_graph_hr    = '';
			$points_graph_atemp = '';
			$points_graph_cad   = '';
			$points_graph_grade = '';
			$waypoints          = '';
			$max_ele            = 0;
			$min_ele            = 0;
			$max_time           = 0;
			$min_time           = 0;
			$total_ele_up       = 0;
			$total_ele_down     = 0;
			$avg_speed          = 0;
			$avg_cad            = 0;
			$avgv_hr            = 0;
			$avg_temp           = 0;
			$tot_len            = 0;

			echo ( esc_html($e->getMessage()) );
			echo ( esc_html("Error getting file $gpxcache from cache") );

		}
	}

	$isGpxUrl = ( preg_match( '/^(http(s)?\:\/\/)/', trim( $gpx ) ) == 1 );


	if ( ( ! isset( $points_maps ) || $points_maps == '' ) && $gpx != '' ) {
	// if (true) {

		$sitePath = wp_gpx_maps_sitePath();

		$gpx = trim( $gpx );

		if ( true == $isGpxUrl ) {
			$gpx = downloadRemoteFile( $gpx );
		} else {
			$gpx = str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $gpx );
			$gpx = $sitePath . $gpx;
		}
		if ( $gpx == '' ) {
			return "No gpx found";
		}

		$points = wpgpxmaps_getPoints( $gpx, $pointsoffset, $donotreducegpx, $distanceType );

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
					$points_graph_hr .= number_format( $points->hr[$i], 2, '.', '' ) . ',';
				}

				if ( true == $showAtemp ) {
					$points_graph_atemp .= number_format( $points->atemp[$i], 1, '.', '' ) . ',';
				}

				if ( true == $showCad ) {
					$points_graph_cad .= number_format( $points->cad[$i], 2, '.', '' ) . ',';
				}

				if ( true == $showGrade ) {
					$points_graph_grade .= number_format( $points->grade[$i], 2, '.', '' ) . ',';
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
			$wpoints   = wpgpxmaps_getWayPoints( $gpx );
			$waypoints = wp_json_encode( $wpoints );
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

		global $wp_filesystem;
		if (empty($wp_filesystem)) {
			require_once (ABSPATH . '/wp-admin/includes/file.php');
			WP_Filesystem();
		}

		$wp_filesystem->put_contents( $gpxcache, serialize( array(
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
		@chmod( $gpxcache, 0755 );
	}

	$hideGraph = ( '0' == $gh || '0px' == $gh );

	global $post;
	$r = $post->ID . '_' . rand( 1,5000000 );

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
		import { WPGPXMaps } from "'. "../wp-content/plugins/wp-gpx-maps/assets/dist/WP-GPX-Maps.es.js" . '";

		window.addEventListener("load", function() {

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
					waypoints          : ' . esc_js( $waypoints ) . ',
					unit               : "' . esc_js( $unit_of_measure ) . '",
					unitspeed          : "' . esc_js( $unit_of_measure_speed ) . '",
					color1             : '. json_encode( $colors_map ) . ',
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
					MapBox3dTerrain         : ' . esc_js( filter_var(get_option( 'wpgpxmaps_mapbox_3dterrain' ), FILTER_VALIDATE_BOOLEAN) ) . ',
					MapBoxFog           	: ' . esc_js( filter_var(get_option( 'wpgpxmaps_mapbox_fog' ), FILTER_VALIDATE_BOOLEAN) ) . ',

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
						backToCenter	: "' . esc_js( __( 'Back to center', 'wp-gpx-maps' ) ) . '"
					}
				});
	
		});

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
			$time_diff = date( 'H:i:s', ( $max_time - $min_time ) );
			$output   .= "<span class='totaltime'><span class='summarylabel'>" . esc_html__( 'Total time:', 'wp-gpx-maps' ) . "</span><span class='summaryvalue'> $time_diff</span></span><br />";
		}
		$output .= '</div>';
	}
	
	//$output .="--$download--";

	/* Print download link */
	if ( (true === $download || 'true' === $download ) && $gpxurl != '' ) {
		if ( true == $isGpxUrl ) {


		} else {

			$dummy  = ( defined( 'WP_SITEURL' ) ) ? WP_SITEURL : get_bloginfo( 'url' );
			$gpxurl = $dummy . $gpxurl;
		}
		$output .= "Download file: <a href='$gpxurl' target='_new' download>" . basename($gpxurl) . '</a>';
	}

	return $output;
}

function convertSeconds( $s ) {

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
		// Map
		'wpgpxmaps_map_type' => 'HYBRID',
		'wpgpxmaps_map_line_color' => '#3366cc',
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
		// Map
		'wpgpxmaps_map_type',
		'wpgpxmaps_map_line_color',
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
