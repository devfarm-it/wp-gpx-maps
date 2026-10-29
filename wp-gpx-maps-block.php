<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Block "WP GPX Maps" (wp-gpx-maps/map).
 *
 * Dynamic block: the map is rendered on the server by the [sgpx] shortcode handler, so the block and the
 * shortcode share the same output and cache. Block attributes use the same names as the shortcode attributes.
 *
 * @package WP GPX Maps
 */

add_action( 'init', 'wpgpxmaps_register_block' );
add_action( 'enqueue_block_editor_assets', 'wpgpxmaps_block_editor_data' );
add_action( 'rest_api_init', 'wpgpxmaps_register_rest_routes' );

/**
 * Block attributes and the plugin setting that gives their default value.
 */
function wpgpxmaps_block_options() {
	return array(
		'mtype'            => 'wpgpxmaps_map_type',
		'mheight'          => 'wpgpxmaps_height',
		'gheight'          => 'wpgpxmaps_graph_height',
		'mlinecolor'       => 'wpgpxmaps_map_line_color',
		'colorby'          => 'wpgpxmaps_map_color_by',
		'mapboxstyle'      => 'wpgpxmaps_mapbox_type',
		'mapbox3d'         => 'wpgpxmaps_mapbox_3dterrain',
		'pitch'            => '',
		'bearing'          => '',
		'kmmarkers'        => 'wpgpxmaps_map_km_markers',
		'startend'         => 'wpgpxmaps_map_hide_start_end',
		'fadeedges'        => 'wpgpxmaps_fade_edges',
		'glinecolor'       => 'wpgpxmaps_graph_line_color',
		'uom'              => 'wpgpxmaps_unit_of_measure',
		'uomspeed'         => 'wpgpxmaps_unit_of_measure_speed',
		'showele'          => 'wpgpxmaps_show_elevation',
		'showspeed'        => 'wpgpxmaps_show_speed',
		'showhr'           => 'wpgpxmaps_show_hr',
		'showcad'          => 'wpgpxmaps_show_cadence',
		'showatemp'        => 'wpgpxmaps_show_atemp',
		'showgrade'        => 'wpgpxmaps_show_grade',
		'waypoints'        => 'wpgpxmaps_show_waypoint',
		'download'         => 'wpgpxmaps_download',
		'zoomonscrollwheel' => 'wpgpxmaps_zoomonscrollwheel',
		'summary'          => 'wpgpxmaps_summary',
		'summarytotlen'    => 'wpgpxmaps_summary_tot_len',
		'summarymaxele'    => 'wpgpxmaps_summary_max_ele',
		'summaryminele'    => 'wpgpxmaps_summary_min_ele',
		'summaryeleup'     => 'wpgpxmaps_summary_total_ele_up',
		'summaryeledown'   => 'wpgpxmaps_summary_total_ele_down',
		'summaryavgspeed'  => 'wpgpxmaps_summary_avg_speed',
		'summarytotaltime' => 'wpgpxmaps_summary_total_time',
		'summarymovingtime' => 'wpgpxmaps_summary_moving_time',
		'summarymaxspeed'  => 'wpgpxmaps_summary_max_speed',
		'summarymaxgrade'  => 'wpgpxmaps_summary_max_grade',
	);
}

function wpgpxmaps_register_block() {

	register_block_type(
		__DIR__ . '/blocks/map',
		array(
			'render_callback' => 'wpgpxmaps_render_block',
		)
	);
}

function wpgpxmaps_block_editor_data() {

	/* Defaults from the plugin settings, so the editor shows the values the map will really use */
	$defaults = array();
	foreach ( wpgpxmaps_block_options() as $attribute => $option ) {
		$defaults[ $attribute ] = get_option( $option );
	}
	if ( '' == $defaults['showele'] ) {
		$defaults['showele'] = 'true';
	}
	if ( '' == $defaults['mtype'] ) {
		$defaults['mtype'] = 'OSM1';
	}
	if ( '' == $defaults['colorby'] ) {
		$defaults['colorby'] = 'none';
	}
	/* The setting is "hide start / finish markers", the block option is "show" */
	$defaults['startend'] = 'true' !== $defaults['startend'];

	$settings_url = current_user_can( 'manage_options' ) ? admin_url( 'options-general.php?page=WP-GPX-Maps' ) : admin_url( 'admin.php?page=WP-GPX-Maps' );

	wp_add_inline_script(
		generate_block_asset_handle( 'wp-gpx-maps/map', 'editorScript' ),
		'window.wpgpxmapsBlock = ' . wp_json_encode(
			array(
				'defaults'    => $defaults,
				'tracksUrl'   => $settings_url,
				'mimeTypes'   => array_values( wpgpxmaps_trackMimeTypes() ),
				'uploadsUrl'  => preg_replace( '/^https?:/i', '', wp_upload_dir()['baseurl'] ),
				'uploadsPath' => wpgpxmaps_siteRelativePath( wp_upload_dir()['baseurl'] ),
				'canUpload'   => current_user_can( 'manage_options' ) || ( current_user_can( 'publish_posts' ) && 1 == get_option( 'wpgpxmaps_allow_users_upload' ) ),
				'hasMapBoxKey' => strlen( (string) get_option( 'wpgpxmaps_mapbox_apikey' ) ) > 20,
			)
		) . ';',
		'before'
	);
}

/**
 * Render the block with the shortcode handler. Only attributes changed in the block are passed:
 * the others keep the value of the plugin settings, as with the shortcode.
 */
function wpgpxmaps_render_block( $attributes ) {

	$atts = array();
	foreach ( $attributes as $key => $value ) {
		if ( 'gpx' !== $key && ! array_key_exists( $key, wpgpxmaps_block_options() ) ) {
			continue;
		}
		if ( is_bool( $value ) ) {
			$atts[ $key ] = $value ? 'true' : 'false';
		} elseif ( is_scalar( $value ) && '' !== (string) $value ) {
			$atts[ $key ] = (string) $value;
		}
	}

	if ( empty( $atts['gpx'] ) ) {
		return '';
	}

	/**
	 * Filters the shortcode attributes built from the block, e.g. for block attributes added by an add-on.
	 *
	 * @param array $atts       Shortcode attributes.
	 * @param array $attributes Block attributes.
	 */
	$atts = apply_filters( 'wpgpxmaps_block_shortcode_atts', $atts, $attributes );

	return '<div ' . get_block_wrapper_attributes() . '>' . wpgpxmaps_handle_shortcodes( $atts ) . '</div>';
}

function wpgpxmaps_register_rest_routes() {

	register_rest_route(
		'wp-gpx-maps/v1',
		'/tracks',
		array(
			'methods'             => 'GET',
			'callback'            => 'wpgpxmaps_rest_tracks',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}

/**
 * Track files the current user can use: all of uploads/gpx for administrators, the own folder for authors,
 * and the track files of the Media Library. The value is the path relative to the site root, as expected by the gpx attribute.
 */
function wpgpxmaps_rest_tracks() {

	$tracks = wpgpxmaps_mediaTracks();
	$folder = realpath( gpxFolderPath() );
	$root   = realpath( wp_gpx_maps_sitePath() );

	$files = ( false === $folder || false === $root || ! is_dir( $folder ) )
		? array()
		: new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $folder, FilesystemIterator::SKIP_DOTS ) );

	foreach ( $files as $file ) {
		$path = $file->getPathname();
		if ( false !== strpos( $path, DIRECTORY_SEPARATOR . '~cache' ) || ! preg_match( wpgpxmaps_trackFileRegex(), $path ) ) {
			continue;
		}
		$tracks[] = array(
			'label'    => ltrim( str_replace( '\\', '/', substr( $path, strlen( $folder ) ) ), '/' ),
			'value'    => str_replace( '\\', '/', substr( $path, strlen( $root ) ) ),
			'modified' => $file->getMTime(),
		);
	}

	usort(
		$tracks,
		function ( $a, $b ) {
			return $b['modified'] - $a['modified'];
		}
	);

	return rest_ensure_response( $tracks );
}
