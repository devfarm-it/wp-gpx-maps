<?php
/**
 * Elementor widget "GPX Map": the same map as the block and the [sgpx] shortcode, with the same options.
 * Loaded only when Elementor registers its widgets; options left on "Default" use the plugin settings.
 *
 * @package WP-GPX-Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'elementor/widgets/register', 'wpgpxmaps_elementor_register_widget' );
add_action( 'elementor/preview/enqueue_scripts', 'wpgpxmaps_elementor_preview_scripts' );
add_filter( 'wpgpxmaps_load_assets', 'wpgpxmaps_elementor_page_has_map' );

/**
 * In the editor preview, start the maps that Elementor inserts as HTML (elementor/preview.js).
 */
function wpgpxmaps_elementor_preview_scripts() {
	wp_enqueue_script(
		'wpgpxmaps-elementor-preview',
		plugins_url( 'elementor/preview.js', __FILE__ ),
		array( 'elementor-frontend' ),
		(string) filemtime( __DIR__ . '/elementor/preview.js' ),
		true
	);
	wp_enqueue_style( 'output-style' );
}

/**
 * Register the widget. The class extends an Elementor class, so it is defined only now.
 *
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 */
function wpgpxmaps_elementor_register_widget( $widgets_manager ) {
	require_once __DIR__ . '/wp-gpx-maps-elementor-widget.php';
	$widgets_manager->register( new WPGPXMaps_Elementor_Widget() );
}

/**
 * Load the map style in the head also on pages built with Elementor that contain the widget.
 *
 * @param bool $found True when the page already has a map.
 * @return bool
 */
function wpgpxmaps_elementor_page_has_map( $found ) {

	if ( $found || ! did_action( 'elementor/loaded' ) || ! is_singular() ) {
		return $found;
	}
	$data = get_post_meta( get_queried_object_id(), '_elementor_data', true );
	return is_string( $data ) && false !== strpos( $data, '"widgetType":"wpgpxmaps-map"' );
}

/**
 * Shortcode attributes from the widget settings: only the options that were set, so the others use the plugin settings.
 *
 * @param array $settings Widget settings.
 * @return array
 */
function wpgpxmaps_elementor_shortcode_atts( $settings ) {

	$atts = array();
	$gpx  = isset( $settings['gpx_path'] ) ? trim( (string) $settings['gpx_path'] ) : '';
	if ( '' === $gpx && ! empty( $settings['gpx'] ) ) {
		$gpx = (string) $settings['gpx'];
	}
	if ( '' === $gpx ) {
		return $atts;
	}
	$atts['gpx'] = $gpx;

	foreach ( array_keys( wpgpxmaps_block_options() ) as $key ) {
		if ( ! isset( $settings[ $key ] ) ) {
			continue;
		}
		$value = $settings[ $key ];
		/* Slider controls give array( 'size' => 450, 'unit' => 'px' ) */
		if ( is_array( $value ) ) {
			$value = isset( $value['size'] ) && '' !== (string) $value['size'] ? $value['size'] . ( isset( $value['unit'] ) ? $value['unit'] : '' ) : '';
		}
		if ( is_scalar( $value ) && '' !== (string) $value ) {
			$atts[ $key ] = (string) $value;
		}
	}

	/**
	 * Filters the shortcode attributes built from the Elementor widget, e.g. for options added by an add-on.
	 *
	 * @param array $atts     Shortcode attributes.
	 * @param array $settings Widget settings.
	 */
	return apply_filters( 'wpgpxmaps_elementor_shortcode_atts', $atts, $settings );
}
