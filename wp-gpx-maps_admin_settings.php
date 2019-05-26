<?php

	if ( !current_user_can('manage_options') )

		return;
	$po = get_option('wpgpxmaps_pointsoffset');
	$showW = get_option("wpgpxmaps_show_waypoint");
	$donotreducegpx = get_option("wpgpxmaps_donotreducegpx");
	$t = get_option('wpgpxmaps_map_type');
	$uom = get_option('wpgpxmaps_unit_of_measure');
	$uomSpeed = get_option('wpgpxmaps_unit_of_measure_speed');
	$showEle = get_option("wpgpxmaps_show_elevation");
	$showSpeed = get_option('wpgpxmaps_show_speed');
	$showHr = get_option('wpgpxmaps_show_hr');
	$showAtemp = get_option('wpgpxmaps_show_atemp');
	$showCad = get_option('wpgpxmaps_show_cadence');
	$showGrade = get_option('wpgpxmaps_show_grade');
	$zoomonscrollwheel = get_option("wpgpxmaps_zoomonscrollwheel");
	$download = get_option("wpgpxmaps_download");
	$skipcache = get_option("wpgpxmaps_skipcache");
	$summary = get_option("wpgpxmaps_summary");
	$tot_len = get_option("wpgpxmaps_summary_tot_len");
	$min_ele = get_option("wpgpxmaps_summary_min_ele");
	$max_ele = get_option("wpgpxmaps_summary_max_ele");
	$total_ele_up = get_option("wpgpxmaps_summary_total_ele_up");
	$total_ele_down = get_option("wpgpxmaps_summary_total_ele_down");
	$avg_speed = get_option("wpgpxmaps_summary_avg_speed");
	$avg_cad = get_option("wpgpxmaps_summary_avg_cad");
	$avg_hr = get_option("wpgpxmaps_summary_avg_hr");
	$avg_temp = get_option("wpgpxmaps_summary_avg_temp");
	$total_time = get_option("wpgpxmaps_summary_total_time");
	$usegpsposition = get_option("wpgpxmaps_usegpsposition");
	$distanceType = get_option("wpgpxmaps_distance_type");


	if (empty($showEle))
		$showEle = "true";

	if (!($t))
		$t = 'HYBRID';

	if (!($po))
		$po = 10;
?>



<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>

	<h3 class="title"><?php _e( 'General', 'wp-gpx-maps' ); ?></h3>

	<table class="form-table">
		<tr>
			<th scope="row"><?php _e( 'Map width:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_width" type="text" id="wpgpxmaps_width" value="<?php echo get_option('wpgpxmaps_width'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Map height:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_height" type="text" id="wpgpxmaps_height" value="<?php echo get_option('wpgpxmaps_height'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Graph height:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_height" type="text" id="wpgpxmaps_graph_height" value="<?php echo get_option('wpgpxmaps_graph_height'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Distance type:', 'wp-gpx-maps' ); ?></th>
			<td>
				<select name='wpgpxmaps_distance_type'>
					<option value="0" <?php if ($distanceType == '0' || $distanceType == '') echo 'selected'; ?>><?php _e( 'Normal (default)', 'wp-gpx-maps' ); ?></option>
					<option value="1" <?php if ($distanceType == '1') echo 'selected'; ?>><?php _e( 'Flat &#8594; (Only flat distance, don&#8217;t take care of altitude)', 'wp-gpx-maps' ); ?></option>
					<option value="2" <?php if ($distanceType == '2') echo 'selected'; ?>><?php _e( 'Climb &#8593; (Only climb distance)', 'wp-gpx-maps' ); ?></option>
				</select>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Cache:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_skipcache" type="checkbox" value="true" <?php if($skipcache == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Do not use cache', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'GPX Download:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_download" type="checkbox" value="true" <?php if($download == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><?php echo ' ' ; _e( 'Allow users to download your GPX file', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Use browser GPS position:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_usegpsposition" type="checkbox" value="true" <?php if($usegpsposition == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Allow users to use browser GPS in order to display their current position on map', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Thunderforest API Key (Open Cycle Map):', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_openstreetmap_apikey" type="text" id="wpgpxmaps_openstreetmap_apikey" value="<?php echo get_option('wpgpxmaps_openstreetmap_apikey'); ?>" style="width:400px" />
				<em>
				<?php printf(
					/* translators: 1: Link to documentation of Thunderforest API Key's 2: Additional link attribute */
					__( 'Go to <a href="%1s" %2s>Thunderforest API Key</a> and signing in to your Thunderforest account.', 'wp-gpx-maps' ),
					esc_url( 'http://www.thunderforest.com/docs/apikeys/' ),
					'target="_blank" rel="noopener noreferrer"'
				)
				 ?>
				</em>
			</td>
		</tr>

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_height,wpgpxmaps_graph_height,wpgpxmaps_width,wpgpxmaps_download,wpgpxmaps_skipcache,wpgpxmaps_distance_type,wpgpxmaps_usegpsposition,wpgpxmaps_openstreetmap_apikey" />
		<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'wp-gpx-maps' ) ?>" />
	</p>

</form>

	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>

	<h3 class="title"><?php _e( 'Summary table', 'wp-gpx-maps' ); ?></h3>

	<table class="form-table">
		<tr>
			<th scope="row"><?php _e( 'Summary table:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary" type="checkbox" value="true" <?php if($summary == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print summary details of your GPX track', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Total distance:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_tot_len" type="checkbox" value="true" <?php if($tot_len == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print total distance', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Max elevation:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_max_ele" type="checkbox" value="true" <?php if($max_ele == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print max elevation', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Min elevation:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_min_ele" type="checkbox" value="true" <?php if($min_ele == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print min elevation', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Total climbing:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_total_ele_up" type="checkbox" value="true" <?php if($total_ele_up == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print total climbing', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Total descent:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_total_ele_down" type="checkbox" value="true" <?php if($total_ele_down == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print total descent', 'wp-gpx-maps' ); ?></i>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Average speed:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_avg_speed" type="checkbox" value="true" <?php if($avg_speed == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print average speed', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Average cadence:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_avg_cad" type="checkbox" value="true" <?php if($avg_cad == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print average cadence', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Average heart rate:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_avg_hr" type="checkbox" value="true" <?php if($avg_hr == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print average heart rate', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Average temperature:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_avg_temp" type="checkbox" value="true" <?php if($avg_temp == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print average temperature', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Total time:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_summary_total_time" type="checkbox" value="true" <?php if($total_time == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Print total time', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_summary,wpgpxmaps_summary_tot_len,wpgpxmaps_summary_max_ele,wpgpxmaps_summary_min_ele,wpgpxmaps_summary_total_ele_up,wpgpxmaps_summary_total_ele_down,wpgpxmaps_summary_avg_speed,wpgpxmaps_summary_avg_cad,wpgpxmaps_summary_avg_hr,wpgpxmaps_summary_avg_temp,wpgpxmaps_summary_total_time" />
		<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'wp-gpx-maps' ) ?>" />
	</p>

</form>

	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>

	<h3 class="title"><?php _e( 'Map', 'wp-gpx-maps' ); ?></h3>

	<table class="form-table">

		<tr>
			<th scope="row"><?php _e( 'On mouse scroll wheel:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_zoomonscrollwheel" type="checkbox" value="true" <?php if($zoomonscrollwheel == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Enable zoom', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Waypoints support:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_waypoint" type="checkbox" value="true" <?php if($showW == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show waypoints', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Map line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_map_line_color" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_map_line_color'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Default map type:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input type="radio" name="wpgpxmaps_map_type" value="OSM1" <?php if ($t == 'OSM1') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Street Map', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM2" <?php if ($t == 'OSM2') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Cycle Map', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM4" <?php if ($t == 'OSM4') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Cycle Map - Transport', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM5" <?php if ($t == 'OSM5') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Cycle Map - Landscape', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM3" <?php if ($t == 'OSM3') echo 'checked'; ?>><?php echo ' ' ; _e( 'Hike & Bike', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM6" <?php if ($t == 'OSM6') echo 'checked'; ?>><?php echo ' ' ; _e( 'MapToolKit - Terrain', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM7" <?php if ($t == 'OSM7') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Street Map - Humanitarian map style', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM9" <?php if ($t == 'OSM9') echo 'checked'; ?>><?php echo ' ' ; _e( 'Hike & Bike', 'wp-gpx-maps' ); ?><br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM10" <?php if ($t == 'OSM10') echo 'checked'; ?>><?php echo ' ' ; _e( 'Open Sea Map', 'wp-gpx-maps' ); ?><br />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Start track icon:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_map_start_icon" value="<?php echo get_option('wpgpxmaps_map_start_icon'); ?>" style="width:400px" />
				<em><?php _e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'End track icon:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_map_end_icon" value="<?php echo get_option('wpgpxmaps_map_end_icon'); ?>" style="width:400px" />
				<em><?php _e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Current position icon:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_map_current_icon" value="<?php echo get_option('wpgpxmaps_map_current_icon'); ?>" style="width:400px" />
				<em><?php _e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Current GPS position icon:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_currentpositioncon" value="<?php echo get_option('wpgpxmaps_currentpositioncon'); ?>" style="width:400px" />
				<em><?php _e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Custom waypoint icon:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_map_waypoint_icon" value="<?php echo get_option('wpgpxmaps_map_waypoint_icon'); ?>" style="width:400px" />
				<em><?php _e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

    </table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_show_waypoint,wpgpxmaps_map_line_color,wpgpxmaps_map_type,wpgpxmaps_map_start_icon,wpgpxmaps_map_end_icon,wpgpxmaps_map_current_icon,wpgpxmaps_zoomonscrollwheel,wpgpxmaps_map_waypoint_icon,wpgpxmaps_currentpositioncon" />
		<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'wp-gpx-maps' ) ?>" />
	</p>

</form>
	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>

	<h3 class="title"><?php _e( 'Chart', 'wp-gpx-maps' ); ?></h3>

	<table class="form-table">

		<tr>
			<th scope="row"><?php _e( 'Altitude', 'wp-gpx-maps' ); ?></th>
			<td>
				<input type="checkbox" <?php if($showEle == "true"){echo('checked');} ?> onchange="wpgpxmaps_show_elevation.value = this.checked" onload="wpgpxmaps_show_elevation.value = this.checked" /><i><?php echo ' ' ; _e( 'Show altitude', 'wp-gpx-maps' ); ?></i>
				<input name="wpgpxmaps_show_elevation" type="hidden" value="<?php echo $showEle; ?>">
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Altitude line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Unit of measure:', 'wp-gpx-maps' ); ?></th>
			<td>
				<select name='wpgpxmaps_unit_of_measure'>
					<option value="0" <?php if ($uom == '0') echo 'selected'; ?>><?php _e( 'meters / meters', 'wp-gpx-maps' ); ?></option>
					<option value="1" <?php if ($uom == '1') echo 'selected'; ?>><?php _e( 'feet / miles', 'wp-gpx-maps' ); ?></option>
					<option value="2" <?php if ($uom == '2') echo 'selected'; ?>><?php _e( 'meters / kilometers', 'wp-gpx-maps' ); ?></option>
					<option value="3" <?php if ($uom == '3') echo 'selected'; ?>><?php _e( 'meters / nautical Miles', 'wp-gpx-maps' ); ?></option>
					<option value="4" <?php if ($uom == '4') echo 'selected'; ?>><?php _e( 'meters / miles', 'wp-gpx-maps' ); ?></option>
					<option value="5" <?php if ($uom == '5') echo 'selected'; ?>><?php _e( 'feet / nautical miles', 'wp-gpx-maps' ); ?></option>
				</select>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Altitude display offset:', 'wp-gpx-maps' ); ?></th>
			<td>
				<?php _e( 'From', 'wp-gpx-maps' ); ?>
				<input name="wpgpxmaps_graph_offset_from1" value="<?php echo get_option('wpgpxmaps_graph_offset_from1'); ?>" style="width:50px;" />
				<?php _e( 'to', 'wp-gpx-maps' ); ?>
				<input name="wpgpxmaps_graph_offset_to1" value="<?php echo get_option('wpgpxmaps_graph_offset_to1'); ?>" style="width:50px;" />
				<em><?php _e( '(leave empty for auto scale)', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Speed:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_speed" type="checkbox" value="true" <?php if($showSpeed == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show speed', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Speed line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color_speed" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_speed'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Speed unit of measure:', 'wp-gpx-maps' ); ?></th>
			<td>
				<select name='wpgpxmaps_unit_of_measure_speed'>
					<option value="0" <?php if ($uomSpeed == '0') echo 'selected'; ?>><?php _e( 'm/s', 'wp-gpx-maps' ); ?></option>
					<option value="1" <?php if ($uomSpeed == '1') echo 'selected'; ?>><?php _e( 'km/h', 'wp-gpx-maps' ); ?></option>
					<option value="2" <?php if ($uomSpeed == '2') echo 'selected'; ?>><?php _e( 'miles/h', 'wp-gpx-maps' ); ?></option>
					<option value="3" <?php if ($uomSpeed == '3') echo 'selected'; ?>><?php _e( 'min/km', 'wp-gpx-maps' ); ?></option>
					<option value="4" <?php if ($uomSpeed == '4') echo 'selected'; ?>><?php _e( 'min/miles', 'wp-gpx-maps' ); ?></option>
					<option value="5" <?php if ($uomSpeed == '5') echo 'selected'; ?>><?php _e( 'Knots (nautical miles / hour)', 'wp-gpx-maps' ); ?></option>
					<option value="6" <?php if ($uomSpeed == '6') echo 'selected'; ?>><?php _e( 'min/100 meters', 'wp-gpx-maps' ); ?></option>
				</select>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Speed display offset:', 'wp-gpx-maps' ); ?></th>
			<td>
				<?php _e( 'From', 'wp-gpx-maps' ); ?>
				<input name="wpgpxmaps_graph_offset_from2" value="<?php echo get_option('wpgpxmaps_graph_offset_from2'); ?>" style="width:50px;" />
				<?php _e( 'to', 'wp-gpx-maps' ); ?>
				<input name="wpgpxmaps_graph_offset_to2" value="<?php echo get_option('wpgpxmaps_graph_offset_to2'); ?>" style="width:50px;" />
				<em><?php _e( '(leave empty for auto scale)', 'wp-gpx-maps' ); ?></em>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Heart rate (where aviable):', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_hr" type="checkbox" value="true" <?php if($showHr == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show heart rate', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Heart rate line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color_hr" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_hr'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Temperature (where aviable):', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_atemp" type="checkbox" value="true" <?php if($showAtemp == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show temperature', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Temperature line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color_atemp" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_atemp'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Cadence (where aviable):', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_cadence" type="checkbox" value="true" <?php if($showCad == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show cadence', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Cadence line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color_cad" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_cad'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Grade:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_show_grade" type="checkbox" value="true" <?php if($showGrade == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Show grade - BETA', 'wp-gpx-maps' ); ?></i>
				<i><?php _e( '(Grade values depends on your GPS accuracy. If you have a poor GPS accuracy they might be totally wrong!)', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Grade line color:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_graph_line_color_grade" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_grade'); ?>" />
			</td>
		</tr>

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_unit_of_measure,wpgpxmaps_graph_line_color,wpgpxmaps_show_elevation,wpgpxmaps_show_speed,wpgpxmaps_graph_line_color_speed,wpgpxmaps_show_hr,wpgpxmaps_graph_line_color_hr,wpgpxmaps_unit_of_measure_speed,wpgpxmaps_graph_offset_from1,wpgpxmaps_graph_offset_to1,wpgpxmaps_graph_offset_from2,wpgpxmaps_graph_offset_to2,wpgpxmaps_graph_line_color_cad,wpgpxmaps_show_cadence,wpgpxmaps_show_grade,wpgpxmaps_graph_line_color_grade,wpgpxmaps_show_atemp,wpgpxmaps_graph_line_color_atemp" />
		<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'wp-gpx-maps' ) ?>" />
	</p>

</form>
	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>

	<h3 class="title"><?php _e( 'Advanced Options', 'wp-gpx-maps' ); ?></h3>
	<em><?php _e( '(Do not edit if you don&#8217;t know what you are doing!)', 'wp-gpx-maps' ); ?></em>

	<table class="form-table">

		<tr>
			<th scope="row"><?php _e( 'Skip GPX points closer than:', 'wp-gpx-maps' ); ?></th>
			<td>
			<input name="wpgpxmaps_pointsoffset" type="text" id="wpgpxmaps_pointsoffset" value="<?php echo $po ?>" style="width:50px;" /><i><?php echo ' ' ; _e( 'meters', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

		<tr>
			<th scope="row"><?php _e( 'Reduce GPX:', 'wp-gpx-maps' ); ?></th>
			<td>
				<input name="wpgpxmaps_donotreducegpx" type="checkbox" value="true" <?php if($donotreducegpx == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /><i><?php echo ' ' ; _e( 'Do not reduce GPX', 'wp-gpx-maps' ); ?></i>
			</td>
		</tr>

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
		<input name="page_options" type="hidden" value="wpgpxmaps_pointsoffset,wpgpxmaps_donotreducegpx" />
		<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'wp-gpx-maps' ) ?>" />
	</p>

</form>
	<hr />
