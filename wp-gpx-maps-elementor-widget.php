<?php
/**
 * Elementor widget class, loaded by wpgpxmaps_elementor_register_widget() when Elementor is active.
 *
 * @package WP-GPX-Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

/**
 * "GPX Map" widget: a track on a map with the elevation chart and the summary, rendered by the [sgpx] shortcode handler.
 */
class WPGPXMaps_Elementor_Widget extends Widget_Base {

	/** @var array|null Values of the plugin settings, for the "Plugin setting" choice. */
	private $defaults = null;

	public function get_name() {
		return 'wpgpxmaps-map';
	}

	public function get_title() {
		return __( 'GPX Map', 'wp-gpx-maps' );
	}

	public function get_icon() {
		return 'eicon-google-maps';
	}

	public function get_categories() {
		return array( 'general' );
	}

	public function get_keywords() {
		return array( 'gpx', 'map', 'track', 'elevation', 'gps', 'hiking', 'cycling', 'route' );
	}

	public function get_style_depends() {
		return array( 'output-style' );
	}

	/**
	 * Options of the widget, in the same groups and with the same names as the block.
	 */
	protected function register_controls() {

		$this->defaults = wpgpxmaps_block_defaults();

		/* GPX file */
		$this->start_controls_section( 'section_gpx', array( 'label' => __( 'GPX file', 'wp-gpx-maps' ) ) );

		$tracks = array( '' => '—' );
		foreach ( wpgpxmaps_track_files() as $track ) {
			$tracks[ $track['value'] ] = $track['label'];
		}
		$this->add_control(
			'gpx',
			array(
				'label'   => __( 'Uploaded track file', 'wp-gpx-maps' ),
				'type'    => Controls_Manager::SELECT2,
				'options' => $tracks,
				'default' => '',
			)
		);
		$this->add_control(
			'gpx_path',
			array(
				'label'       => __( 'Or GPX path / URL', 'wp-gpx-maps' ),
				'type'        => Controls_Manager::TEXT,
				'description' => __( 'Path from the site root, or the URL of a GPX file. Several files separated by commas show on one map.', 'wp-gpx-maps' ),
				'label_block' => true,
			)
		);
		$settings_url = current_user_can( 'manage_options' ) ? admin_url( 'options-general.php?page=WP-GPX-Maps' ) : admin_url( 'admin.php?page=WP-GPX-Maps' );
		$this->add_control(
			'gpx_upload',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => '<a href="' . esc_url( $settings_url ) . '" target="_blank">' . esc_html__( 'Upload GPX files', 'wp-gpx-maps' ) . '</a>',
				'content_classes' => 'elementor-descriptor',
			)
		);
		$this->end_controls_section();

		/* Map */
		$this->start_controls_section( 'section_map', array( 'label' => __( 'Map', 'wp-gpx-maps' ) ) );

		$engines = array(
			'maplibre' => 'MapLibre (recommended: 3D, no key)',
			'leaflet'  => 'Leaflet (2D)',
		);
		if ( strlen( (string) get_option( 'wpgpxmaps_mapbox_apikey' ) ) > 20 ) {
			$engines['mapbox'] = 'Mapbox (3D)';
		}
		$this->select( 'engine', __( 'Map engine', 'wp-gpx-maps' ), $engines );
		$this->select(
			'maplibrestyle',
			__( 'Map style', 'wp-gpx-maps' ),
			array(
				'liberty'  => 'Liberty (OpenFreeMap)',
				'bright'   => 'Bright (OpenFreeMap)',
				'positron' => 'Positron (OpenFreeMap)',
				'osm'      => 'Open Street Map',
				'topo'     => 'OpenTopoMap (hiking)',
			),
			$this->engine_is( 'maplibre' )
		);
		$this->select(
			'mapboxstyle',
			__( 'MapBox style', 'wp-gpx-maps' ),
			array(
				'standard'              => 'Standard',
				'standard-satellite'    => 'Standard Satellite',
				'streets-v12'           => 'Streets',
				'outdoors-v12'          => 'Outdoors',
				'light-v11'             => 'Light',
				'dark-v11'              => 'Dark',
				'satellite-v9'          => 'Satellite',
				'satellite-streets-v12' => 'Satellite Streets',
			),
			$this->engine_is( 'mapbox' )
		);
		$this->select(
			'mtype',
			__( 'Map type', 'wp-gpx-maps' ),
			array(
				'OSM1'  => 'Open Street Map',
				'OSM2'  => 'Open Cycle Map (Thunderforest API key, CyclOSM without)',
				'OSM3'  => 'Thunderforest Outdoors (API key)',
				'OSM4'  => 'Thunderforest Transport (API key)',
				'OSM5'  => 'Thunderforest Landscape (API key)',
				'OSM7'  => 'Open Street Map - Humanitarian',
				'OSM9'  => 'OpenTopoMap (hiking)',
				'OSM10' => 'Open Sea Map',
				'OSM11' => 'GSI Map (Japan)',
				'OSM12' => 'CyclOSM (cycling)',
			),
			$this->engine_is( 'leaflet' )
		);
		$is3d = $this->engine_is( array( 'maplibre', 'mapbox' ) );
		$this->toggle( 'mapbox3d', __( '3D terrain', 'wp-gpx-maps' ), $is3d );
		$this->text( 'exaggeration', __( 'Terrain height (1 = real, up to 3)', 'wp-gpx-maps' ), __( 'Empty = 1.5', 'wp-gpx-maps' ), $is3d );
		$this->toggle( 'hillshade', __( 'Shaded relief', 'wp-gpx-maps' ), $is3d );
		$this->toggle( 'fog', __( 'Fog and sky (seen with a tilted view)', 'wp-gpx-maps' ), $is3d );
		$this->text( 'pitch', __( 'View tilt (0-85)', 'wp-gpx-maps' ), __( 'For example 60 for a 3D view', 'wp-gpx-maps' ), $is3d );
		$this->text( 'bearing', __( 'View rotation (-180 to 180)', 'wp-gpx-maps' ), '', $is3d );
		$this->text( 'mheight', __( 'Map height', 'wp-gpx-maps' ), __( 'For example 450px', 'wp-gpx-maps' ) );
		$this->select(
			'colorby',
			__( 'Color the track by', 'wp-gpx-maps' ),
			array(
				'none'      => __( 'One color', 'wp-gpx-maps' ),
				'grade'     => __( 'Grade (climb / descent)', 'wp-gpx-maps' ),
				'speed'     => __( 'Speed', 'wp-gpx-maps' ),
				'hr'        => __( 'Heart rate', 'wp-gpx-maps' ),
				'elevation' => __( 'Elevation', 'wp-gpx-maps' ),
			)
		);
		$this->add_control(
			'mlinecolor',
			array(
				'label' => __( 'Track color', 'wp-gpx-maps' ),
				'type'  => Controls_Manager::COLOR,
			)
		);
		$this->toggle( 'startend', __( 'Start / finish markers', 'wp-gpx-maps' ) );
		$this->toggle( 'fadeedges', __( 'Soft edges (the map fades into the page)', 'wp-gpx-maps' ) );
		$this->select(
			'kmmarkers',
			__( 'Distance markers', 'wp-gpx-maps' ),
			array(
				'0'  => __( 'None', 'wp-gpx-maps' ),
				'1'  => '1 km / mi',
				'2'  => '2 km / mi',
				'5'  => '5 km / mi',
				'10' => '10 km / mi',
				'20' => '20 km / mi',
			)
		);
		$this->toggle( 'waypoints', __( 'Show waypoints', 'wp-gpx-maps' ) );
		$this->toggle( 'zoomonscrollwheel', __( 'Zoom with the mouse wheel', 'wp-gpx-maps' ) );
		$this->toggle( 'download', __( 'GPX download link', 'wp-gpx-maps' ) );
		$this->end_controls_section();

		/* Chart */
		$this->start_controls_section( 'section_chart', array( 'label' => __( 'Chart', 'wp-gpx-maps' ) ) );
		$this->text( 'gheight', __( 'Chart height', 'wp-gpx-maps' ), __( '0px hides the chart', 'wp-gpx-maps' ) );
		$this->toggle( 'showele', __( 'Altitude', 'wp-gpx-maps' ) );
		$this->add_control(
			'glinecolor',
			array(
				'label' => __( 'Altitude line color', 'wp-gpx-maps' ),
				'type'  => Controls_Manager::COLOR,
			)
		);
		$this->toggle( 'showspeed', __( 'Speed', 'wp-gpx-maps' ) );
		$this->toggle( 'showhr', __( 'Heart rate', 'wp-gpx-maps' ) );
		$this->toggle( 'showcad', __( 'Cadence', 'wp-gpx-maps' ) );
		$this->toggle( 'showatemp', __( 'Temperature', 'wp-gpx-maps' ) );
		$this->toggle( 'showgrade', __( 'Grade', 'wp-gpx-maps' ) );
		$this->select(
			'uom',
			__( 'Unit of measure', 'wp-gpx-maps' ),
			array(
				'0' => 'meters / meters',
				'1' => 'feet / miles',
				'2' => 'meters / kilometers',
				'3' => 'meters / nautical miles',
				'4' => 'meters / miles',
				'5' => 'feet / nautical miles',
			)
		);
		$this->select(
			'uomspeed',
			__( 'Speed unit', 'wp-gpx-maps' ),
			array(
				'0' => 'm/s',
				'1' => 'km/h',
				'2' => 'miles/h',
				'3' => 'min/km',
				'4' => 'min/miles',
				'5' => 'knots',
				'6' => 'min/100 meters',
			)
		);
		$this->end_controls_section();

		/* Summary */
		$this->start_controls_section( 'section_summary', array( 'label' => __( 'Summary', 'wp-gpx-maps' ) ) );
		$this->toggle( 'summary', __( 'Show summary table', 'wp-gpx-maps' ) );
		$summary = array(
			'summarytotlen'     => __( 'Total distance', 'wp-gpx-maps' ),
			'summarymaxele'     => __( 'Max elevation', 'wp-gpx-maps' ),
			'summaryminele'     => __( 'Min elevation', 'wp-gpx-maps' ),
			'summaryeleup'      => __( 'Total climbing', 'wp-gpx-maps' ),
			'summaryeledown'    => __( 'Total descent', 'wp-gpx-maps' ),
			'summaryavgspeed'   => __( 'Average speed', 'wp-gpx-maps' ),
			'summarytotaltime'  => __( 'Total time', 'wp-gpx-maps' ),
			'summarymovingtime' => __( 'Moving time', 'wp-gpx-maps' ),
			'summarymaxspeed'   => __( 'Max speed', 'wp-gpx-maps' ),
			'summarymaxgrade'   => __( 'Max grade', 'wp-gpx-maps' ),
		);
		foreach ( $summary as $name => $label ) {
			$this->toggle( $name, $label );
		}
		$this->add_control(
			'settings_note',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Options not changed here use the values of Settings > WP GPX Maps.', 'wp-gpx-maps' ),
				'content_classes' => 'elementor-descriptor',
				'separator'       => 'before',
			)
		);
		$this->end_controls_section();
	}

	/**
	 * The map, or in the editor a message until a file is chosen.
	 */
	protected function render() {

		$atts = wpgpxmaps_elementor_shortcode_atts( $this->get_settings_for_display() );

		if ( empty( $atts['gpx'] ) ) {
			if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
				echo '<div class="elementor-alert elementor-alert-info">' . esc_html__( 'Choose a GPX file to show the track on a map.', 'wp-gpx-maps' ) . '</div>';
			}
			return;
		}

		echo wpgpxmaps_handle_shortcodes( $atts ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- the map HTML is escaped by the shortcode handler.
	}

	/**
	 * Label of the "use the plugin setting" choice, with the value of the setting.
	 *
	 * @param string $name    Option name.
	 * @param array  $options Choices of a select, to name the current value.
	 */
	private function default_label( $name, $options = array() ) {

		$value = isset( $this->defaults[ $name ] ) ? $this->defaults[ $name ] : '';
		if ( is_bool( $value ) || 'true' === $value || 'false' === $value || '' === $value ) {
			$on    = true === $value || 'true' === $value;
			$value = $on ? __( 'Yes', 'wp-gpx-maps' ) : __( 'No', 'wp-gpx-maps' );
		} elseif ( isset( $options[ $value ] ) ) {
			$value = $options[ $value ];
		}
		/* translators: %s: value of the plugin setting, e.g. "Yes" or "OpenTopoMap (hiking)" */
		return sprintf( __( 'Plugin setting (%s)', 'wp-gpx-maps' ), $value );
	}

	/**
	 * Yes / no option that can also keep the plugin setting.
	 */
	private function toggle( $name, $label, $condition = array() ) {
		$this->add_control(
			$name,
			array(
				'label'      => $label,
				'type'       => Controls_Manager::SELECT,
				'default'    => '',
				'options'    => array(
					''      => $this->default_label( $name ),
					'true'  => __( 'Yes', 'wp-gpx-maps' ),
					'false' => __( 'No', 'wp-gpx-maps' ),
				),
				'conditions' => $condition ? $condition : null,
			)
		);
	}

	/**
	 * Choice among fixed values that can also keep the plugin setting.
	 */
	private function select( $name, $label, $options, $condition = array() ) {
		$this->add_control(
			$name,
			array(
				'label'       => $label,
				'type'        => Controls_Manager::SELECT,
				'default'     => '',
				'options'     => array( '' => $this->default_label( $name, $options ) ) + $options,
				'label_block' => true,
				'conditions'  => $condition ? $condition : null,
			)
		);
	}

	/**
	 * Free text, empty for the plugin setting.
	 */
	private function text( $name, $label, $placeholder = '', $condition = array() ) {
		$default = isset( $this->defaults[ $name ] ) ? (string) $this->defaults[ $name ] : '';
		$this->add_control(
			$name,
			array(
				'label'       => $label,
				'type'        => Controls_Manager::TEXT,
				'placeholder' => '' !== $default ? $default : $placeholder,
				'description' => '' !== $default ? $placeholder : '',
				'conditions'  => $condition ? $condition : null,
			)
		);
	}

	/**
	 * Condition: the map uses one of these engines (chosen in the widget, or the plugin setting when not chosen).
	 *
	 * @param string|array $engines Engine names.
	 */
	private function engine_is( $engines ) {

		$engines = (array) $engines;
		$terms   = array(
			array(
				'name'     => 'engine',
				'operator' => 'in',
				'value'    => $engines,
			),
		);
		if ( in_array( $this->defaults['engine'], $engines, true ) ) {
			$terms[] = array(
				'name'     => 'engine',
				'operator' => '===',
				'value'    => '',
			);
		}
		return array(
			'relation' => 'or',
			'terms'    => $terms,
		);
	}
}
