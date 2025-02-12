<?php
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
		echo "<input type='radio' name='".esc_attr($name)."' id='".esc_attr($name.'-'.$value)."' value='".esc_attr($value)."' ".esc_attr($isChecked)." ><label for='".esc_attr($name.'-'.$value)."' /> ".esc_html( $text, 'wp-gpx-maps' )."</label> <br />";
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
			render_text_input('wpgpxmaps_width', 'Map width:', get_option('wpgpxmaps_width'));
			render_text_input('wpgpxmaps_height', 'Map height:', get_option('wpgpxmaps_height'));
			render_text_input('wpgpxmaps_graph_height', 'Graph height:', get_option('wpgpxmaps_graph_height'));
			render_select('wpgpxmaps_distance_type', 'Distance type:', [
				'0' => 'Normal (default)',
				'1' => 'Flat &#8594; (Only flat distance, don&#8217;t take care of altitude)',
				'2' => 'Climb &#8593; (Only climb distance)'
			], $distanceType);
			render_checkbox('wpgpxmaps_skipcache', 'Cache:', $skipcache);
			render_checkbox('wpgpxmaps_download', 'GPX Download:', $download);
			render_checkbox('wpgpxmaps_usegpsposition', 'Use browser GPS position:', $usegpsposition);
			render_text_input('wpgpxmaps_openstreetmap_apikey', 'Thunderforest API Key (Open Cycle Map):', get_option('wpgpxmaps_openstreetmap_apikey'), 'width:400px');
			render_text_input('wpgpxmaps_mapbox_apikey', 'Mapbox API Key:', get_option('wpgpxmaps_mapbox_apikey'), 'width:400px');

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
			render_checkbox('wpgpxmaps_summary', 'Summary table:', $summary);
			render_checkbox('wpgpxmaps_summary_tot_len', 'Total distance:', $tot_len);
			render_checkbox('wpgpxmaps_summary_max_ele', 'Max elevation:', $max_ele);
			render_checkbox('wpgpxmaps_summary_min_ele', 'Min elevation:', $min_ele);
			render_checkbox('wpgpxmaps_summary_total_ele_up', 'Total climbing:', $total_ele_up);
			render_checkbox('wpgpxmaps_summary_total_ele_down', 'Total descent:', $total_ele_down);
			render_checkbox('wpgpxmaps_summary_avg_speed', 'Average speed:', $avg_speed);
			render_checkbox('wpgpxmaps_summary_avg_cad', 'Average cadence:', $avg_cad);
			render_checkbox('wpgpxmaps_summary_avg_hr', 'Average heart rate:', $avg_hr);
			render_checkbox('wpgpxmaps_summary_avg_temp', 'Average temperature:', $avg_temp);
			render_checkbox('wpgpxmaps_summary_total_time', 'Total time:', $total_time);
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_summary,wpgpxmaps_summary_tot_len,wpgpxmaps_summary_max_ele,wpgpxmaps_summary_min_ele,wpgpxmaps_summary_total_ele_up,wpgpxmaps_summary_total_ele_down,wpgpxmaps_summary_avg_speed,wpgpxmaps_summary_avg_cad,wpgpxmaps_summary_avg_hr,wpgpxmaps_summary_avg_temp,wpgpxmaps_summary_total_time" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

	<hr />

	<form method="post" action="options.php">
		<?php wp_nonce_field( 'update-options' ); ?>

		<h3 class="title"><?php esc_html_e( 'Map', 'wp-gpx-maps' ); ?></h3>
		<table class="form-table">

			<?php
			
			render_radio('wpgpxmaps_map_type', 'Default map type:', [
				'OSM1' => 'Open Street Map',
				'OSM2' => 'Open Cycle Map / Thunderforest - Open Cycle Map (API Key required)',
				'OSM3' => 'Thunderforest - Outdoors (API Key required)',
				'OSM4' => 'Thunderforest - Transport (API Key required)',
				'OSM5' => 'Thunderforest - Landscape (API Key required)',
				'OSM6' => 'MapToolKit - Terrain',
				'OSM7' => 'Open Street Map - Humanitarian map style',
				'OSM9' => 'Hike & Bike',
				'OSM10' => 'Open Sea Map',
				'OSM11' => 'GSI Map (Japan)'
			], $t);		
			
			render_radio('wpgpxmaps_mapbox_type', 'MapBox default style:', [
				'standard' => 'Standard',
				'standard-satellite' => 'Standard Satelite',
				'streets-v12' => 'Streets',
				'outdoors-v12' => 'Outdoors',
				'light-v11' => 'Light',
				'dark-v11' => 'Dark',
				'satellite-v9' => 'Satellite',
				'satellite-streets-v12' => 'Satellite Streets',
				'navigation-day-v1' => 'Navigation Day',
				'navigation-night-v1' => 'Navigation Night'
			], $mapboxMapType);		

			render_text_input('wpgpxmaps_mapbox_customtype', 'Custom MapBox style:', $mapboxCustomMapType, 'width:400px;');
			
			render_radio('wpgpxmaps_mapbox_load_animation', 'MapBox animation on load:', [
				'0' => 'Disabled',
				'1' => 'Draw line from start to end',
			], $mapboxLoadAnimation);		

			render_checkbox('wpgpxmaps_mapbox_3dterrain', 'MapBox 3d terrain:', $mapbox3dTerrain);
			render_checkbox('wpgpxmaps_mapbox_fog', 'MapBox fog:', $mapboxFog);

			render_text_input('wpgpxmaps_map_line_color', 'Map line color:', get_option('wpgpxmaps_map_line_color'), 'width:100px;');
			render_checkbox('wpgpxmaps_zoomonscrollwheel', 'On mouse scroll wheel:', $zoomonscrollwheel);
			render_checkbox('wpgpxmaps_show_waypoint', 'Waypoints support:', $showW);
			render_text_input('wpgpxmaps_map_start_icon', 'Start track icon:', get_option('wpgpxmaps_map_start_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_end_icon', 'End track icon:', get_option('wpgpxmaps_map_end_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_current_icon', 'Current position icon:', get_option('wpgpxmaps_map_current_icon'), 'width:400px;');
			render_text_input('wpgpxmaps_currentpositioncon', 'Current GPS position icon:', get_option('wpgpxmaps_currentpositioncon'), 'width:400px;');
			render_text_input('wpgpxmaps_map_waypoint_icon', 'Custom waypoint icon:', get_option('wpgpxmaps_map_waypoint_icon'), 'width:400px;');
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_mapbox_load_animation,wpgpxmaps_mapbox_customtype,wpgpxmaps_mapbox_fog,wpgpxmaps_mapbox_type,wpgpxmaps_mapbox_3dterrain,wpgpxmaps_map_type,wpgpxmaps_map_line_color,wpgpxmaps_zoomonscrollwheel,wpgpxmaps_show_waypoint,wpgpxmaps_map_start_icon,wpgpxmaps_map_end_icon,wpgpxmaps_map_current_icon,wpgpxmaps_currentpositioncon,wpgpxmaps_map_waypoint_icon" />
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
			render_text_input('wpgpxmaps_graph_line_color', 'Altitude line color:', get_option('wpgpxmaps_graph_line_color'), 'width:100px;');
			render_select('wpgpxmaps_unit_of_measure', 'Unit of measure:', [
				'0' => 'meters / meters',
				'1' => 'feet / miles',
				'2' => 'meters / kilometers',
				'3' => 'meters / nautical miles',
				'4' => 'meters / miles',
				'5' => 'feet / nautical miles'
			], $uom);
			render_text_input('wpgpxmaps_graph_offset_from1', 'Altitude display offset from:', get_option('wpgpxmaps_graph_offset_from1'));
			render_text_input('wpgpxmaps_graph_offset_to1', 'Altitude display offset to:', get_option('wpgpxmaps_graph_offset_to1'));
			render_checkbox('wpgpxmaps_show_speed', 'Speed:', $showSpeed);
			render_text_input('wpgpxmaps_graph_line_color_speed', 'Speed line color:', get_option('wpgpxmaps_graph_line_color_speed'), 'width:100px;');
			render_select('wpgpxmaps_unit_of_measure_speed', 'Speed unit of measure:', [
				'0' => 'm/s',
				'1' => 'km/h',
				'2' => 'miles/h',
				'3' => 'min/km',
				'4' => 'min/miles',
				'5' => 'Knots (nautical miles / hour)',
				'6' => 'min/100 meters'
			], $uomSpeed);
			render_text_input('wpgpxmaps_graph_offset_from2', 'Speed display offset from:', get_option('wpgpxmaps_graph_offset_from2'));
			render_text_input('wpgpxmaps_graph_offset_to2', 'Speed display offset to:', get_option('wpgpxmaps_graph_offset_to2'));
			render_checkbox('wpgpxmaps_show_hr', 'Heart rate (where available):', $showHr);
			render_text_input('wpgpxmaps_graph_line_color_hr', 'Heart rate line color:', get_option('wpgpxmaps_graph_line_color_hr'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_atemp', 'Temperature (where available):', $showAtemp);
			render_text_input('wpgpxmaps_graph_line_color_atemp', 'Temperature line color:', get_option('wpgpxmaps_graph_line_color_atemp'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_cadence', 'Cadence (where available):', $showCad);
			render_text_input('wpgpxmaps_graph_line_color_cad', 'Cadence line color:', get_option('wpgpxmaps_graph_line_color_cad'), 'width:100px;');
			render_checkbox('wpgpxmaps_show_grade', 'Grade:', $showGrade);
			render_text_input('wpgpxmaps_graph_line_color_grade', 'Grade line color:', get_option('wpgpxmaps_graph_line_color_grade'), 'width:100px;');
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
			render_text_input('wpgpxmaps_pointsoffset', 'Skip GPX points closer than:', $po);
			render_checkbox('wpgpxmaps_donotreducegpx', 'Reduce GPX:', $donotreducegpx);
			?>
		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_donotreducegpx,wpgpxmaps_pointsoffset" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>
	</form>

</div>
