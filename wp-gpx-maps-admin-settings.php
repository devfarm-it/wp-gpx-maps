<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Settings Tab
 *
 * Contains all settings for the output.
 *
 * @package WP GPX Maps
 */

if ( ! current_user_can( 'manage_options' ) ){
	echo '<div class="notice notice-error">No permission<p>';	
	return;
}


/* General */
$distanceType   = get_option( 'wpgpxmaps_distance_type' );
$skipcache      = get_option( 'wpgpxmaps_skipcache' );
$download       = get_option( 'wpgpxmaps_download' );
$usegpsposition = get_option( 'wpgpxmaps_usegpsposition' );
/* Print Summary Table */
$summary        = get_option( 'wpgpxmaps_summary' );
$tot_len        = get_option( 'wpgpxmaps_summary_tot_len' );
$max_ele        = get_option( 'wpgpxmaps_summary_max_ele' );
$min_ele        = get_option( 'wpgpxmaps_summary_min_ele' );
$total_ele_up   = get_option( 'wpgpxmaps_summary_total_ele_up' );
$total_ele_down = get_option( 'wpgpxmaps_summary_total_ele_down' );
$avg_speed      = get_option( 'wpgpxmaps_summary_avg_speed' );
$avg_cad        = get_option( 'wpgpxmaps_summary_avg_cad' );
$avg_hr         = get_option( 'wpgpxmaps_summary_avg_hr' );
$avg_temp       = get_option( 'wpgpxmaps_summary_avg_temp' );
$total_time     = get_option( 'wpgpxmaps_summary_total_time' );
/* Map */
$t                 = get_option( 'wpgpxmaps_map_type' );
$zoomonscrollwheel = get_option( 'wpgpxmaps_zoomonscrollwheel' );
$showW             = get_option( 'wpgpxmaps_show_waypoint' );

/* MapBox */
$mapbox3dTerrain        = get_option( 'wpgpxmaps_mapbox_3dterrain' );
$mapboxMapType          = get_option( 'wpgpxmaps_mapbox_type' );
$mapboxCustomMapType    = get_option( 'wpgpxmaps_mapbox_customtype' );
$mapboxFog             	= get_option( 'wpgpxmaps_mapbox_fog' );
$mapboxLoadAnimation 	= get_option( 'wpgpxmaps_mapbox_load_animation');


/* Diagram */
$showEle   = get_option( 'wpgpxmaps_show_elevation' );
$uom       = get_option( 'wpgpxmaps_unit_of_measure' );
$showSpeed = get_option( 'wpgpxmaps_show_speed' );
$uomSpeed  = get_option( 'wpgpxmaps_unit_of_measure_speed' );
$showHr    = get_option( 'wpgpxmaps_show_hr' );
$showAtemp = get_option( 'wpgpxmaps_show_atemp' );
$showCad   = get_option( 'wpgpxmaps_show_cadence' );
$showGrade = get_option( 'wpgpxmaps_show_grade' );
/* Advanced */
$po             = get_option( 'wpgpxmaps_pointsoffset' );
$donotreducegpx = get_option( 'wpgpxmaps_donotreducegpx' );

if ( empty( $showEle ) )
	$showEle = 'true';

if ( ! ( $t ) )
	$t = 'HYBRID';

if ( ! ( $po ) )
	$po = 10;

function render_color_input($name, $label, $value, $style = 'width:50px;') {
	echo "<tr>
			<th scope='row'>".esc_html($label)."</th>
			<td><input name='".esc_attr($name)."' type='color' id='".esc_attr($name)."' value='".esc_attr($value)."' style='".esc_attr($style)."' /></td>
			</tr>";
}
	

function render_text_input($name, $label, $value, $style = 'width:50px;', $appendHtml = '') {
	echo "<tr>
			<th scope='row'>".esc_html($label)."</th>
			<td><input name='".esc_attr($name)."' type='text' id='".esc_attr($name)."' value='".esc_attr($value)."' style='".esc_attr($style)."' />".esc_html($appendHtml)."</td>
		  </tr>";
}

function render_checkbox($name, $label, $value) {
	$checked = $value ? 'checked' : '';
	echo "<tr>
			<th scope='row'>".esc_html($label)."</th>
			<td><input name='".esc_attr($name)."' type='checkbox' value='true' ".esc_attr($checked)." onchange='this.value = (this.checked)' />
			<i>".esc_html($label)."</i></td>
		  </tr>";
}

function render_radio($name, $label, $options, $checked) {
	echo "<tr>
			<th scope='row'>".esc_html($label)."</th>
			<td>";
	foreach ($options as $value => $text) {
		$isChecked = $value == $checked ? 'checked' : '';
		echo "<input type='radio' name='".esc_attr($name)."' id='".esc_attr($name.'-'.$value)."' value='".esc_attr($value)."' ".esc_attr($isChecked)." ><label for='".esc_attr($name.'-'.$value)."'> ".esc_html( $text )."</label> <br />";
		//echo "<option value='$value' $isSelected>".esc_html($text)."</option>";
	}
	echo "</td></tr>";
}


function render_select($name, $label, $options, $selected) {
	echo "<tr>
			<th scope='row'>".esc_html($label)."</th>
			<td><select name='".esc_attr($name)."'>";
	foreach ($options as $value => $text) {
		$isSelected = $value == $selected ? 'selected' : '';
		echo "<option value='".esc_attr($value)."' ".esc_attr($isSelected).">".esc_html($text)."</option>";
	}
	echo "</select></td></tr>";
}

?>

<!-- The First Div (for body) starts in wp-gpx-admin.php -->

<div class="wpgpxmaps-container-tab-settings">

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'General', 'wp-gpx-maps' ); ?></h3>
		<table class="form-table">
			<?php
			render_text_input('wpgpxmaps_width', __( 'Map width:', 'wp-gpx-maps' ), get_option('wpgpxmaps_width'));
			render_text_input('wpgpxmaps_height', __( 'Map height:', 'wp-gpx-maps' ), get_option('wpgpxmaps_height'));
			render_text_input('wpgpxmaps_graph_height', __( 'Graph height:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_height'));
			render_select('wpgpxmaps_distance_type', __( 'Distance type:', 'wp-gpx-maps' ), [
				'0' => __( 'Normal (default)', 'wp-gpx-maps' ),
				'1' => __( 'Flat &#8594; (Only flat distance, don&#8217;t take care of altitude)', 'wp-gpx-maps' ),
				'2' => __( 'Climb &#8593; (Only climb distance)', 'wp-gpx-maps' )
			], $distanceType);
			render_checkbox('wpgpxmaps_skipcache', __( 'Do not use the cache:', 'wp-gpx-maps' ), $skipcache);
			render_checkbox('wpgpxmaps_download', __( 'GPX Download:', 'wp-gpx-maps' ), $download);
			render_checkbox('wpgpxmaps_usegpsposition', __( 'Use browser GPS position:', 'wp-gpx-maps' ), $usegpsposition);
			render_text_input('wpgpxmaps_openstreetmap_apikey', __( 'Thunderforest API Key (Open Cycle Map):', 'wp-gpx-maps' ), get_option('wpgpxmaps_openstreetmap_apikey'), 'width:400px');
			render_text_input('wpgpxmaps_mapbox_apikey', __( 'Mapbox API Key:', 'wp-gpx-maps' ), get_option('wpgpxmaps_mapbox_apikey'), 'width:400px');

			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_height,wpgpxmaps_graph_height,wpgpxmaps_width,wpgpxmaps_download,wpgpxmaps_skipcache,wpgpxmaps_distance_type,wpgpxmaps_usegpsposition,wpgpxmaps_openstreetmap_apikey,wpgpxmaps_mapbox_apikey" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Summary table', 'wp-gpx-maps' ); ?></h3>
		<table class="form-table">
			<?php
			render_checkbox('wpgpxmaps_summary', __( 'Summary table:', 'wp-gpx-maps' ), $summary);
			render_checkbox('wpgpxmaps_summary_tot_len', __( 'Total distance:', 'wp-gpx-maps' ), $tot_len);
			render_checkbox('wpgpxmaps_summary_max_ele', __( 'Max elevation:', 'wp-gpx-maps' ), $max_ele);
			render_checkbox('wpgpxmaps_summary_min_ele', __( 'Min elevation:', 'wp-gpx-maps' ), $min_ele);
			render_checkbox('wpgpxmaps_summary_total_ele_up', __( 'Total climbing:', 'wp-gpx-maps' ), $total_ele_up);
			render_checkbox('wpgpxmaps_summary_total_ele_down', __( 'Total descent:', 'wp-gpx-maps' ), $total_ele_down);
			render_checkbox('wpgpxmaps_summary_avg_speed', __( 'Average speed:', 'wp-gpx-maps' ), $avg_speed);
			render_checkbox('wpgpxmaps_summary_avg_cad', __( 'Average cadence:', 'wp-gpx-maps' ), $avg_cad);
			render_checkbox('wpgpxmaps_summary_avg_hr', __( 'Average heart rate:', 'wp-gpx-maps' ), $avg_hr);
			render_checkbox('wpgpxmaps_summary_avg_temp', __( 'Average temperature:', 'wp-gpx-maps' ), $avg_temp);
			render_checkbox('wpgpxmaps_summary_total_time', __( 'Total time:', 'wp-gpx-maps' ), $total_time);
			render_checkbox('wpgpxmaps_summary_moving_time', __( 'Moving time:', 'wp-gpx-maps' ), get_option('wpgpxmaps_summary_moving_time'));
			render_checkbox('wpgpxmaps_summary_max_speed', __( 'Max speed:', 'wp-gpx-maps' ), get_option('wpgpxmaps_summary_max_speed'));
			render_checkbox('wpgpxmaps_summary_max_grade', __( 'Max grade (climb / descent):', 'wp-gpx-maps' ), get_option('wpgpxmaps_summary_max_grade'));
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_summary,wpgpxmaps_summary_tot_len,wpgpxmaps_summary_max_ele,wpgpxmaps_summary_min_ele,wpgpxmaps_summary_total_ele_up,wpgpxmaps_summary_total_ele_down,wpgpxmaps_summary_avg_speed,wpgpxmaps_summary_avg_cad,wpgpxmaps_summary_avg_hr,wpgpxmaps_summary_avg_temp,wpgpxmaps_summary_total_time,wpgpxmaps_summary_moving_time,wpgpxmaps_summary_max_speed,wpgpxmaps_summary_max_grade" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Accessibility, search engines and AI', 'wp-gpx-maps' ); ?></h3>
		<p><?php esc_html_e( 'A map drawn by JavaScript is invisible to screen readers, search engines and AI assistants (ChatGPT, Perplexity, Google AI Overviews...). Every map can also describe its track in text and in schema.org structured data.', 'wp-gpx-maps' ); ?></p>
		<table class="form-table">
			<?php
			render_radio('wpgpxmaps_description', __( 'Text description of the track:', 'wp-gpx-maps' ), [
				'hidden' => __( 'For screen readers, search engines and AI, not shown on the page (default)', 'wp-gpx-maps' ),
				'visible' => __( 'Shown under the map', 'wp-gpx-maps' ),
				'off' => __( 'Off', 'wp-gpx-maps' )
			], get_option( 'wpgpxmaps_description' ) ? get_option( 'wpgpxmaps_description' ) : 'hidden');
			render_checkbox('wpgpxmaps_no_structured_data', __( 'Turn off the structured data (JSON-LD):', 'wp-gpx-maps' ), get_option( 'wpgpxmaps_no_structured_data' ));
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_description,wpgpxmaps_no_structured_data" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Map', 'wp-gpx-maps' ); ?></h3>
		<table class="form-table">

			<?php
			
			render_radio('wpgpxmaps_map_type', __( 'Default map type:', 'wp-gpx-maps' ), [
				'OSM1' => __( 'Open Street Map', 'wp-gpx-maps' ),
				'OSM2' => __( 'Thunderforest - Open Cycle Map (API Key required, CyclOSM without key)', 'wp-gpx-maps' ),
				'OSM3' => __( 'Thunderforest - Outdoors (API Key required)', 'wp-gpx-maps' ),
				'OSM4' => __( 'Thunderforest - Transport (API Key required)', 'wp-gpx-maps' ),
				'OSM5' => __( 'Thunderforest - Landscape (API Key required)', 'wp-gpx-maps' ),
				'OSM7' => __( 'Open Street Map - Humanitarian map style', 'wp-gpx-maps' ),
				'OSM9' => __( 'OpenTopoMap (hiking)', 'wp-gpx-maps' ),
				'OSM10' => __( 'Open Sea Map (sea marks over Open Street Map)', 'wp-gpx-maps' ),
				'OSM11' => __( 'GSI Map (Japan)', 'wp-gpx-maps' ),
				'OSM12' => __( 'CyclOSM (cycling)', 'wp-gpx-maps' )
			], $t);		
			
			render_radio('wpgpxmaps_mapbox_type', __( 'MapBox default style:', 'wp-gpx-maps' ), [
				'standard' => __( 'Standard', 'wp-gpx-maps' ),
				'standard-satellite' => __( 'Standard Satellite', 'wp-gpx-maps' ),
				'streets-v12' => __( 'Streets', 'wp-gpx-maps' ),
				'outdoors-v12' => __( 'Outdoors', 'wp-gpx-maps' ),
				'light-v11' => __( 'Light', 'wp-gpx-maps' ),
				'dark-v11' => __( 'Dark', 'wp-gpx-maps' ),
				'satellite-v9' => __( 'Satellite', 'wp-gpx-maps' ),
				'satellite-streets-v12' => __( 'Satellite Streets', 'wp-gpx-maps' ),
				'navigation-day-v1' => __( 'Navigation Day', 'wp-gpx-maps' ),
				'navigation-night-v1' => __( 'Navigation Night', 'wp-gpx-maps' )
			], $mapboxMapType);		

			render_text_input('wpgpxmaps_mapbox_customtype', __( 'Custom MapBox style:', 'wp-gpx-maps' ), $mapboxCustomMapType, 'width:400px;');
			
			render_radio('wpgpxmaps_mapbox_load_animation', __( 'MapBox animation on load:', 'wp-gpx-maps' ), [
				'0' => __( 'Disabled', 'wp-gpx-maps' ),
				'1' => __( 'Draw line from start to end', 'wp-gpx-maps' ),
			], $mapboxLoadAnimation);		

			render_checkbox('wpgpxmaps_mapbox_3dterrain', __( 'MapBox 3d terrain:', 'wp-gpx-maps' ), $mapbox3dTerrain);
			render_checkbox('wpgpxmaps_mapbox_fog', __( 'MapBox fog:', 'wp-gpx-maps' ), $mapboxFog);

			render_text_input('wpgpxmaps_map_line_color', __( 'Map line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_line_color'), 'width:100px;');
			render_select('wpgpxmaps_map_color_by', __( 'Track color by:', 'wp-gpx-maps' ), [
				'' => __( 'One color (map line color)', 'wp-gpx-maps' ),
				'grade' => __( 'Grade (climb / descent)', 'wp-gpx-maps' ),
				'speed' => __( 'Speed', 'wp-gpx-maps' ),
				'hr' => __( 'Heart rate', 'wp-gpx-maps' ),
				'elevation' => __( 'Elevation', 'wp-gpx-maps' )
			], get_option('wpgpxmaps_map_color_by'));
			render_checkbox('wpgpxmaps_map_hide_start_end', __( 'Hide start / finish markers:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_hide_start_end'));
			render_checkbox('wpgpxmaps_fade_edges', __( 'Soft edges (the map fades into the page):', 'wp-gpx-maps' ), get_option('wpgpxmaps_fade_edges'));
			render_text_input('wpgpxmaps_map_km_markers', __( 'Distance markers every:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_km_markers'), 'width:60px;', __( 'km / mi (empty = none)', 'wp-gpx-maps' ));
			render_checkbox('wpgpxmaps_zoomonscrollwheel', __( 'On mouse scroll wheel:', 'wp-gpx-maps' ), $zoomonscrollwheel);
			render_checkbox('wpgpxmaps_show_waypoint', __( 'Waypoints support:', 'wp-gpx-maps' ), $showW);
			render_text_input('wpgpxmaps_map_start_icon', __( 'Start track icon:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_start_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_end_icon', __( 'End track icon:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_end_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_current_icon', __( 'Current position icon:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_current_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_currentpositioncon', __( 'Current GPS position icon:', 'wp-gpx-maps' ), get_option('wpgpxmaps_currentpositioncon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_waypoint_icon', __( 'Custom waypoint icon:', 'wp-gpx-maps' ), get_option('wpgpxmaps_map_waypoint_icon'), 'width:400px;');
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_map_color_by,wpgpxmaps_map_hide_start_end,wpgpxmaps_fade_edges,wpgpxmaps_map_km_markers,wpgpxmaps_mapbox_load_animation,wpgpxmaps_mapbox_customtype,wpgpxmaps_mapbox_fog,wpgpxmaps_mapbox_type,wpgpxmaps_mapbox_3dterrain,wpgpxmaps_map_type,wpgpxmaps_map_line_color,wpgpxmaps_zoomonscrollwheel,wpgpxmaps_show_waypoint,wpgpxmaps_map_start_icon,wpgpxmaps_map_end_icon,wpgpxmaps_map_current_icon,wpgpxmaps_currentpositioncon,wpgpxmaps_map_waypoint_icon" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Chart', 'wp-gpx-maps' ); ?></h3>
		<table class="form-table">
			<tr>
				<th scope="row"><?php esc_html_e( 'Altitude:', 'wp-gpx-maps' ); ?></th>
				<td>
					<input type="checkbox" <?php if ( true == $showEle ) { echo( 'checked' ); } ?> onchange="wpgpxmaps_show_elevation.value = this.checked" onload="wpgpxmaps_show_elevation.value = this.checked" />
					<i><?php esc_html_e( 'Show altitude', 'wp-gpx-maps' ); ?></i>
					<input name="wpgpxmaps_show_elevation" type="hidden" value="<?php echo(esc_attr($showEle)) ?>">
				</td>
			</tr>
			<?php
			render_text_input('wpgpxmaps_graph_line_color', __( 'Altitude line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color'), 'width:100px;');
			render_select('wpgpxmaps_unit_of_measure', __( 'Unit of measure:', 'wp-gpx-maps' ), [
				'0' => __( 'meters / meters', 'wp-gpx-maps' ),
				'1' => __( 'feet / miles', 'wp-gpx-maps' ),
				'2' => __( 'meters / kilometers', 'wp-gpx-maps' ),
				'3' => __( 'meters / nautical miles', 'wp-gpx-maps' ),
				'4' => __( 'meters / miles', 'wp-gpx-maps' ),
				'5' => __( 'feet / nautical miles', 'wp-gpx-maps' )
			], $uom);
			render_text_input('wpgpxmaps_graph_offset_from1', __( 'Altitude display offset from:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_offset_from1'));
			render_text_input('wpgpxmaps_graph_offset_to1', __( 'Altitude display offset to:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_offset_to1'));
			render_checkbox('wpgpxmaps_show_speed', __( 'Speed:', 'wp-gpx-maps' ), $showSpeed);
			render_text_input('wpgpxmaps_graph_line_color_speed', __( 'Speed line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color_speed'), 'width:100px;');
			render_select('wpgpxmaps_unit_of_measure_speed', __( 'Speed unit of measure:', 'wp-gpx-maps' ), [
				'0' => __( 'm/s', 'wp-gpx-maps' ),
				'1' => __( 'km/h', 'wp-gpx-maps' ),
				'2' => __( 'miles/h', 'wp-gpx-maps' ),
				'3' => __( 'min/km', 'wp-gpx-maps' ),
				'4' => __( 'min/miles', 'wp-gpx-maps' ),
				'5' => __( 'Knots (nautical miles / hour)', 'wp-gpx-maps' ),
				'6' => __( 'min/100 meters', 'wp-gpx-maps' )
			], $uomSpeed);
			render_text_input('wpgpxmaps_graph_offset_from2', __( 'Speed display offset from:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_offset_from2'));
			render_text_input('wpgpxmaps_graph_offset_to2', __( 'Speed display offset to:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_offset_to2'));
			render_checkbox('wpgpxmaps_show_hr', __( 'Heart rate (where available):', 'wp-gpx-maps' ), $showHr);
			render_text_input('wpgpxmaps_graph_line_color_hr', __( 'Heart rate line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color_hr'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_atemp', __( 'Temperature (where available):', 'wp-gpx-maps' ), $showAtemp);
			render_text_input('wpgpxmaps_graph_line_color_atemp', __( 'Temperature line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color_atemp'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_cadence', __( 'Cadence (where available):', 'wp-gpx-maps' ), $showCad);
			render_text_input('wpgpxmaps_graph_line_color_cad', __( 'Cadence line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color_cad'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_grade', __( 'Grade:', 'wp-gpx-maps' ), $showGrade);
			render_text_input('wpgpxmaps_graph_line_color_grade', __( 'Grade line color:', 'wp-gpx-maps' ), get_option('wpgpxmaps_graph_line_color_grade'), 'width:100px;');
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_show_elevation,wpgpxmaps_graph_line_color,wpgpxmaps_unit_of_measure,wpgpxmaps_show_speed,wpgpxmaps_graph_line_color_speed,wpgpxmaps_show_hr,wpgpxmaps_graph_line_color_hr,wpgpxmaps_unit_of_measure_speed,wpgpxmaps_graph_offset_from1,wpgpxmaps_graph_offset_to1,wpgpxmaps_graph_offset_from2,wpgpxmaps_graph_offset_to2,wpgpxmaps_graph_line_color_cad,wpgpxmaps_show_cadence,wpgpxmaps_show_grade,wpgpxmaps_graph_line_color_grade,wpgpxmaps_show_atemp,wpgpxmaps_graph_line_color_atemp" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Advanced Options', 'wp-gpx-maps' ); ?></h3>
		<em><?php esc_html_e( '(Do not edit if you don&#8217;t know what you are doing!)', 'wp-gpx-maps' ); ?></em>
		<table class="form-table">
			<?php
			render_text_input('wpgpxmaps_pointsoffset', __( 'Skip GPX points closer than:', 'wp-gpx-maps' ), $po);
			render_checkbox('wpgpxmaps_donotreducegpx', __( 'Keep all GPX points (do not reduce):', 'wp-gpx-maps' ), $donotreducegpx);
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_donotreducegpx,wpgpxmaps_pointsoffset" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

</div>
