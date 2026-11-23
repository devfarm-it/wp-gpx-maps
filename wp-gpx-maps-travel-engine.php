<?php
/**
 * WP Travel Engine: map and elevation profile of a GPX, FIT, TCX or KML track on the trip pages.
 *
 * The trip editor gets a "GPX Map" box: the track files of the trip (one per day for stages), where the map goes in
 * the Map tab (instead of the image / iframe of the trip or above it) and whether distance, climbing and highest point
 * are added to the trip facts. The map uses the plugin settings, like the [sgpx] shortcode.
 * Nothing is loaded when WP Travel Engine is not active.
 *
 * @package WP-GPX-Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'plugins_loaded', 'wpgpxmaps_travel_engine_init', 20 );

function wpgpxmaps_travel_engine_init() {

	if ( ! defined( 'WP_TRAVEL_ENGINE_POST_TYPE' ) ) {
		return;
	}

	add_action( 'add_meta_boxes_' . WP_TRAVEL_ENGINE_POST_TYPE, 'wpgpxmaps_travel_engine_meta_box' );
	add_action( 'save_post_' . WP_TRAVEL_ENGINE_POST_TYPE, 'wpgpxmaps_travel_engine_save', 10, 2 );
	add_filter( 'wptravelengine_active_single_trip_tabs', 'wpgpxmaps_travel_engine_tabs', 10, 2 );
	add_filter( 'do_shortcode_tag', 'wpgpxmaps_travel_engine_map', 10, 3 );
	add_action( 'wp_travel_engine_trip_facts', 'wpgpxmaps_travel_engine_facts', 20 );
	add_filter( 'wpgpxmaps_load_assets', 'wpgpxmaps_travel_engine_page_has_map' );
}

/**
 * Settings of the GPX map of a trip.
 *
 * @param int $trip_id Trip (post) ID.
 * @return array gpx (comma separated files), position ('replace' or 'before'), facts (bool).
 */
function wpgpxmaps_travel_engine_settings( $trip_id ) {
	$settings = get_post_meta( $trip_id, '_wpgpxmaps_trip', true );
	$settings = is_array( $settings ) ? $settings : array();
	return array(
		'gpx'      => isset( $settings['gpx'] ) ? (string) $settings['gpx'] : '',
		'position' => isset( $settings['position'] ) && 'before' === $settings['position'] ? 'before' : 'replace',
		'facts'    => ! isset( $settings['facts'] ) || ! empty( $settings['facts'] ),
	);
}

/* ---------------------------------------------------------------- Trip editor */

function wpgpxmaps_travel_engine_meta_box() {
	add_meta_box(
		'wpgpxmaps_trip_track',
		__( 'GPX Map (WP GPX Maps)', 'wp-gpx-maps' ),
		'wpgpxmaps_travel_engine_meta_box_html',
		WP_TRAVEL_ENGINE_POST_TYPE,
		'side',
		'default'
	);
}

/**
 * @param WP_Post $post Trip.
 */
function wpgpxmaps_travel_engine_meta_box_html( $post ) {

	$settings = wpgpxmaps_travel_engine_settings( $post->ID );
	wp_nonce_field( 'wpgpxmaps_trip_track', 'wpgpxmaps_trip_nonce' );
	?>
	<p>
		<label for="wpgpxmaps_trip_gpx"><strong><?php esc_html_e( 'Track files', 'wp-gpx-maps' ); ?></strong></label>
		<input type="text" class="widefat" style="max-width:100%;box-sizing:border-box" id="wpgpxmaps_trip_gpx" name="wpgpxmaps_trip[gpx]" list="wpgpxmaps_trip_files" value="<?php echo esc_attr( $settings['gpx'] ); ?>" placeholder="/wp-content/uploads/my-trek.gpx">
		<datalist id="wpgpxmaps_trip_files">
			<?php foreach ( wpgpxmaps_track_files() as $file ) : ?>
				<option value="<?php echo esc_attr( $file['value'] ); ?>"><?php echo esc_html( $file['label'] ); ?></option>
			<?php endforeach; ?>
		</datalist>
		<span class="description">
			<?php
			echo wp_kses(
				sprintf(
					/* translators: %s: link to the Media Library */
					__( 'GPX, FIT, TCX or KML file from the <a href="%s">Media Library</a>. For a trip in stages, one file per day separated by commas: each day gets its own color.', 'wp-gpx-maps' ),
					esc_url( admin_url( 'media-new.php' ) )
				),
				array( 'a' => array( 'href' => array() ) )
			);
			?>
		</span>
	</p>
	<p>
		<label for="wpgpxmaps_trip_position"><strong><?php esc_html_e( 'In the Map tab', 'wp-gpx-maps' ); ?></strong></label>
		<select class="widefat" style="max-width:100%;box-sizing:border-box" id="wpgpxmaps_trip_position" name="wpgpxmaps_trip[position]">
			<option value="replace" <?php selected( $settings['position'], 'replace' ); ?>><?php esc_html_e( 'Instead of the trip map', 'wp-gpx-maps' ); ?></option>
			<option value="before" <?php selected( $settings['position'], 'before' ); ?>><?php esc_html_e( 'Above the trip map', 'wp-gpx-maps' ); ?></option>
		</select>
	</p>
	<p>
		<label><input type="checkbox" name="wpgpxmaps_trip[facts]" value="1" <?php checked( $settings['facts'] ); ?>> <?php esc_html_e( 'Add distance, climbing and highest point to the trip facts', 'wp-gpx-maps' ); ?></label>
	</p>
	<p class="description">
		<?php
		echo wp_kses(
			sprintf(
				/* translators: %s: link to the plugin settings */
				__( 'Map type, colors, chart and summary: <a href="%s">Settings &gt; WP GPX Maps</a>. The Map tab must be enabled in the WP Travel Engine settings.', 'wp-gpx-maps' ),
				esc_url( admin_url( 'options-general.php?page=WP-GPX-Maps' ) )
			),
			array( 'a' => array( 'href' => array() ) )
		);
		?>
	</p>
	<?php
}

/**
 * @param int     $post_id Trip ID.
 * @param WP_Post $post    Trip.
 */
function wpgpxmaps_travel_engine_save( $post_id, $post ) {

	if ( ! isset( $_POST['wpgpxmaps_trip_nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wpgpxmaps_trip_nonce'] ) ), 'wpgpxmaps_trip_track' ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$input = isset( $_POST['wpgpxmaps_trip'] ) && is_array( $_POST['wpgpxmaps_trip'] ) ? wp_unslash( $_POST['wpgpxmaps_trip'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized below, field by field.

	$files = array();
	foreach ( explode( ',', isset( $input['gpx'] ) ? (string) $input['gpx'] : '' ) as $file ) {
		$file = trim( sanitize_text_field( $file ) );
		if ( '' !== $file ) {
			$files[] = $file;
		}
	}

	if ( ! $files ) {
		delete_post_meta( $post_id, '_wpgpxmaps_trip' );
		return;
	}

	update_post_meta(
		$post_id,
		'_wpgpxmaps_trip',
		array(
			'gpx'      => implode( ',', $files ),
			'position' => isset( $input['position'] ) && 'before' === $input['position'] ? 'before' : 'replace',
			'facts'    => ! empty( $input['facts'] ),
		)
	);
}

/* ---------------------------------------------------------------- Trip page */

/**
 * Shortcode attributes of the map of a trip.
 *
 * @param int $trip_id Trip ID.
 * @return array Empty when the trip has no track.
 */
function wpgpxmaps_travel_engine_shortcode_atts( $trip_id ) {

	$settings = wpgpxmaps_travel_engine_settings( $trip_id );
	if ( '' === $settings['gpx'] ) {
		return array();
	}

	/**
	 * Filters the [sgpx] attributes of the map on a WP Travel Engine trip page (e.g. summary="true", mtype="OSM9").
	 *
	 * @param array $atts    Shortcode attributes, gpx included.
	 * @param int   $trip_id Trip ID.
	 */
	return (array) apply_filters( 'wpgpxmaps_travel_engine_shortcode_atts', array( 'gpx' => $settings['gpx'] ), $trip_id );
}

/**
 * WP Travel Engine hides the Map tab of a trip without map image or iframe: keep it when the trip has a track.
 *
 * @param array   $settings WP Travel Engine settings, with the visible tabs in trip_tabs['id'].
 * @param WP_Post $post     Trip.
 * @return array
 */
function wpgpxmaps_travel_engine_tabs( $settings, $post ) {

	if ( ! $post instanceof WP_Post || ! wpgpxmaps_travel_engine_shortcode_atts( $post->ID ) || empty( $settings['trip_tabs']['field'] ) ) {
		return $settings;
	}

	$all = get_option( 'wp_travel_engine_settings', array() );
	$all = ( isset( $all['trip_tabs']['id'] ) && is_array( $all['trip_tabs']['id'] ) ) ? $all['trip_tabs'] : wte_get_default_settings_tab();

	$visible = isset( $settings['trip_tabs']['id'] ) && is_array( $settings['trip_tabs']['id'] ) ? $settings['trip_tabs']['id'] : array();
	$ids     = array();
	foreach ( $all['id'] as $key => $id ) {
		$is_map  = isset( $all['field'][ $id ] ) && 'map' === $all['field'][ $id ];
		$enabled = ! isset( $all['enable'][ $id ] ) || 'no' !== $all['enable'][ $id ];
		/* Same order as the settings */
		if ( isset( $visible[ $key ] ) || ( $is_map && $enabled ) ) {
			$ids[ $key ] = $id;
		}
	}
	$settings['trip_tabs']['id'] = $ids;
	return $settings;
}

/**
 * The map of the Map tab ([wte_trip_map]): the GPX map instead of the trip map, or above it.
 *
 * @param string $output Shortcode output.
 * @param string $tag    Shortcode name.
 * @param array  $attr   Shortcode attributes.
 * @return string
 */
function wpgpxmaps_travel_engine_map( $output, $tag, $attr ) {

	if ( 'wte_trip_map' !== $tag ) {
		return $output;
	}
	$trip_id = ! empty( $attr['id'] ) ? absint( $attr['id'] ) : get_the_ID();
	$atts    = $trip_id ? wpgpxmaps_travel_engine_shortcode_atts( $trip_id ) : array();
	if ( ! $atts ) {
		return $output;
	}

	$map = '<div class="wpgpxmaps-travel-engine">' . wpgpxmaps_handle_shortcodes( $atts ) . '</div>';
	return 'before' === wpgpxmaps_travel_engine_settings( $trip_id )['position'] ? $map . $output : $map;
}

/**
 * Distance, climbing and highest point of the track in the trip facts box.
 */
function wpgpxmaps_travel_engine_facts() {

	$trip_id  = get_the_ID();
	$settings = $trip_id ? wpgpxmaps_travel_engine_settings( $trip_id ) : null;
	if ( ! $settings || '' === $settings['gpx'] || ! $settings['facts'] ) {
		return;
	}
	$info = wpgpxmaps_get_track_info( $settings['gpx'] );
	if ( ! $info || $info['length'] <= 0 ) {
		return;
	}

	$uom   = (string) get_option( 'wpgpxmaps_unit_of_measure', '2' );
	$uom   = '0' === $uom ? '2' : $uom;
	$facts = array(
		'distance' => array( __( 'Distance', 'wp-gpx-maps' ), wpgpxmaps_formatLength( $info['length'], $uom ) ),
	);
	if ( $info['eleUp'] > 0 ) {
		$facts['climbing'] = array( __( 'Total climbing', 'wp-gpx-maps' ), wpgpxmaps_formatHeight( $info['eleUp'], $uom ) );
	}
	if ( $info['maxEle'] > 0 ) {
		$facts['highest'] = array( __( 'Highest point', 'wp-gpx-maps' ), wpgpxmaps_formatHeight( $info['maxEle'], $uom ) );
	}

	/**
	 * Filters the facts of the track added to the trip facts: key => array( label, value ).
	 *
	 * @param array $facts   Facts.
	 * @param array $info    Track info (wpgpxmaps_get_track_info()).
	 * @param int   $trip_id Trip ID.
	 */
	$facts = (array) apply_filters( 'wpgpxmaps_travel_engine_facts', $facts, $info, $trip_id );
	if ( ! $facts ) {
		return;
	}
	?>
	<div class="secondary-trip-info wpgpxmaps-trip-facts">
		<div class="wte-trip-facts">
			<ul class="trip-facts-value">
				<?php foreach ( $facts as $key => $fact ) : ?>
					<li>
						<div class="trip-facts-text wpgpxmaps-fact-<?php echo esc_attr( $key ); ?>">
							<label><?php echo esc_html( $fact[0] ); ?></label>
							<div class="value"><?php echo esc_html( $fact[1] ); ?></div>
						</div>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
	<?php
}

/**
 * Load the map style in the head of the trip pages with a track.
 *
 * @param bool $found True when the page already has a map.
 * @return bool
 */
function wpgpxmaps_travel_engine_page_has_map( $found ) {
	return $found || ( is_singular( WP_TRAVEL_ENGINE_POST_TYPE ) && wpgpxmaps_travel_engine_shortcode_atts( get_queried_object_id() ) );
}
