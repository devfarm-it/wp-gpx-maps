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
	$$avg_hr = get_option("wpgpxmaps_summary_avg_hr");
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

	<h3 class="title">General</h3>

	<table class="form-table">
		<tr>
			<th scope="row">Width:</th>
			<td>
				<input name="wpgpxmaps_width" type="text" id="wpgpxmaps_width" value="<?php echo get_option('wpgpxmaps_width'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row">Map Height:</th>
			<td>
				<input name="wpgpxmaps_height" type="text" id="wpgpxmaps_height" value="<?php echo get_option('wpgpxmaps_height'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row">Graph Height:</th>
			<td>
				<input name="wpgpxmaps_graph_height" type="text" id="wpgpxmaps_graph_height" value="<?php echo get_option('wpgpxmaps_graph_height'); ?>" style="width:50px;" />
			</td>
		</tr>

		<tr>
			<th scope="row">Distance type:</th>
			<td>
				<select name='wpgpxmaps_distance_type'>
					<option value="0" <?php if ($distanceType == '0' || $distanceType == '') echo 'selected'; ?>>Normal (default)</option>
					<option value="1" <?php if ($distanceType == '1') echo 'selected'; ?>>Flat &#8594; (Only flat distance, don't take care of altitude)</option>
					<option value="2" <?php if ($distanceType == '2') echo 'selected'; ?>>Climb &#8593; (Only climb distance)</option>
				</select>
			</td>
		</tr>

		<tr>
			<th scope="row">Cache:</th>
			<td>
				<input name="wpgpxmaps_skipcache" type="checkbox" value="true" <?php if($skipcache == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Do not use cache</i>
			</td>
		</tr>

		<tr>
			<th scope="row">GPX Download:</th>
			<td>
				<input name="wpgpxmaps_download" type="checkbox" value="true" <?php if($download == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Allow users to download your GPX file</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Use browser GPS position:</th>
			<td>
				<input name="wpgpxmaps_usegpsposition" type="checkbox" value="true" <?php if($usegpsposition == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Allow users to use browser GPS in order to display their current position on map</i>
			</td>
		</tr>

		<tr>			
			<th scope="row">Thunderforest api key (Open Cycle Map):</th>			
			<td>				
				<input name="wpgpxmaps_openstreetmap_apikey" type="text" id="wpgpxmaps_openstreetmap_apikey" value="<?php echo get_option('wpgpxmaps_openstreetmap_apikey'); ?>" style="width:400px" /> <em> Go to <a href="http://www.thunderforest.com/docs/apikeys/" target="_blank">Thunderforest API Keys</a> and click &#8216;signing in to your Thunderforest account&#8217; </em>			
			</td>		
		</tr>	

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_height,wpgpxmaps_graph_height,wpgpxmaps_width,wpgpxmaps_download,wpgpxmaps_skipcache,wpgpxmaps_distance_type,wpgpxmaps_usegpsposition,wpgpxmaps_openstreetmap_apikey" />
		<input type="submit" class="button-primary" value="<?php _e('Save Changes', "wp_gpx_maps") ?>" />
	</p>

</form>

	<hr />


<form method="post" action="options.php">

	<?php wp_nonce_field('update-options') ?>
	<h3 class="title">Summary table</h3>
	<table class="form-table">

		<tr>
			<th scope="row">Summary table:</th>
			<td>
				<input name="wpgpxmaps_summary" type="checkbox" value="true" <?php if($summary == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print summary table</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Total distance:</th>
			<td>
				<input name="wpgpxmaps_summary_tot_len" type="checkbox" value="true" <?php if($tot_len == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Total distance</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Max Elevation:</th>
			<td>
				<input name="wpgpxmaps_summary_max_ele" type="checkbox" value="true" <?php if($max_ele == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Max Elevation</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Min Elevation:</th>
			<td>
				<input name="wpgpxmaps_summary_min_ele" type="checkbox" value="true" <?php if($min_ele == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Min Elevation</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Total climbing:</th>
			<td>
				<input name="wpgpxmaps_summary_total_ele_up" type="checkbox" value="true" <?php if($total_ele_up == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Total climbing</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Total descent:</th>
			<td>
				<input name="wpgpxmaps_summary_total_ele_down" type="checkbox" value="true" <?php if($total_ele_down == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Total descent</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Average Speed:</th>
			<td>
				<input name="wpgpxmaps_summary_avg_speed" type="checkbox" value="true" <?php if($avg_speed == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Average Speed</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Average Cadence:</th>
			<td>
				<input name="wpgpxmaps_summary_avg_cad" type="checkbox" value="true" <?php if($avg_cad == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Average Cadence</i>
			</td>
		</tr>
		
		<tr>
			<th scope="row">Average Heartrate:</th>
			<td>
				<input name="wpgpxmaps_summary_avg_hr" type="checkbox" value="true" <?php if($avg_hr == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Average Heart Rate</i>
			</td>
		</tr>
		
		<tr>
			<th scope="row">Average Temperature:</th>
			<td>
				<input name="wpgpxmaps_summary_avg_temp" type="checkbox" value="true" <?php if($avg_temp == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Average Temperature</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Total time:</th>
			<td>
				<input name="wpgpxmaps_summary_total_time" type="checkbox" value="true" <?php if($total_time == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Print Total time</i>
			</td>
		</tr>

	</table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_summary,wpgpxmaps_summary_tot_len,wpgpxmaps_summary_max_ele,wpgpxmaps_summary_min_ele,wpgpxmaps_summary_total_ele_up,wpgpxmaps_summary_total_ele_down,wpgpxmaps_summary_avg_speed,wpgpxmaps_summary_avg_cad,wpgpxmaps_summary_avg_hr,wpgpxmaps_summary_avg_temp,wpgpxmaps_summary_total_time" />
		<input type="submit" class="button-primary" value="<?php _e('Save Changes', "wp_gpx_maps") ?>" />
	</p>

</form>
	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>
	<h3 class="title">Map</h3>
	
	<table class="form-table">

		<tr>
			<th scope="row">On mouse scroll wheel:</th>
			<td>
				<input name="wpgpxmaps_zoomonscrollwheel" type="checkbox" value="true" <?php if($zoomonscrollwheel == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Enable zoom</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Waypoints Support:</th>
			<td>
				<input name="wpgpxmaps_show_waypoint" type="checkbox" value="true" <?php if($showW == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show Waypoints</i>
			</td>
		</tr>

		<tr>
			<th scope="row">Map line color:</th>
			<td>
				<input name="wpgpxmaps_map_line_color" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_map_line_color'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row">Default Map Type:</th>
			<td>
				<input type="radio" name="wpgpxmaps_map_type" value="OSM1" <?php if ($t == 'OSM1') echo 'checked'; ?>> Open Street Map<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM2" <?php if ($t == 'OSM2') echo 'checked'; ?>> Open Cycle Map<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM4" <?php if ($t == 'OSM4') echo 'checked'; ?>> Open Cycle Map - Transport<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM5" <?php if ($t == 'OSM5') echo 'checked'; ?>> Open Cycle Map - Landscape<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM3" <?php if ($t == 'OSM3') echo 'checked'; ?>> Hike & Bike<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM6" <?php if ($t == 'OSM6') echo 'checked'; ?>> MapToolKit - Terrain<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM7" <?php if ($t == 'OSM7') echo 'checked'; ?>> Open Street Map - Humanitarian map style<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM9" <?php if ($t == 'OSM9') echo 'checked'; ?>> Hike & Bike<br />
				<input type="radio" name="wpgpxmaps_map_type" value="OSM10" <?php if ($t == 'OSM10') echo 'checked'; ?>> Open Sea Map<br />
			</td>
		</tr>

		<tr>
			<th scope="row">Start Icon:</th>
			<td>
				<input name="wpgpxmaps_map_start_icon" value="<?php echo get_option('wpgpxmaps_map_start_icon'); ?>" style="width:400px" /> <em>(Url to image) Leave empty to hide</em>
			</td>
		</tr>

		<tr>
			<th scope="row">End Icon:</th>
			<td>
				<input name="wpgpxmaps_map_end_icon" value="<?php echo get_option('wpgpxmaps_map_end_icon'); ?>" style="width:400px" /> <em>(Url to image) Leave empty to hide</em>
			</td>
		</tr>

		<tr>
			<th scope="row">Current Position Icon:</th>
			<td>
				<input name="wpgpxmaps_map_current_icon" value="<?php echo get_option('wpgpxmaps_map_current_icon'); ?>" style="width:400px" /> <em>(Url to image) Leave empty for default</em>
			</td>
		</tr>

		<tr>
			<th scope="row">Current GPS Position Icon:</th>
			<td>
				<input name="wpgpxmaps_currentpositioncon" value="<?php echo get_option('wpgpxmaps_currentpositioncon'); ?>" style="width:400px" /> <em>(Url to image) Leave empty for default</em>
			</td>
		</tr>

		<tr>
			<th scope="row">Custom Waypoint Icon:</th>
			<td>
				<input name="wpgpxmaps_map_waypoint_icon" value="<?php echo get_option('wpgpxmaps_map_waypoint_icon'); ?>" style="width:400px" /> <em>(Url to image) Leave empty for default</em>
			</td>
		</tr>

    </table>

	<p class="submit">
		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_show_waypoint,wpgpxmaps_map_line_color,wpgpxmaps_map_type,wpgpxmaps_map_start_icon,wpgpxmaps_map_end_icon,wpgpxmaps_map_current_icon,wpgpxmaps_zoomonscrollwheel,wpgpxmaps_map_waypoint_icon,wpgpxmaps_currentpositioncon" />
		<input type="submit" class="button-primary" value="<?php _e('Save Changes', "wp_gpx_maps") ?>" />
	</p>

</form>
	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>
	<h3 class="title">Chart</h3>

	<table class="form-table">

		<tr>
			<th scope="row">Show altitude:</th>
			<td>
				<input type="checkbox" <?php if($showEle == "true"){echo('checked');} ?> onchange="wpgpxmaps_show_elevation.value = this.checked" onload="wpgpxmaps_show_elevation.value = this.checked" /> <i>Show Altitude</i>
				<input name="wpgpxmaps_show_elevation" type="hidden" value="<?php echo $showEle; ?>">
			</td>
		</tr>

		<tr>
			<tr>
				<th scope="row">Altitude line color:</th>
				<td>
					<input name="wpgpxmaps_graph_line_color" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color'); ?>" />
				</td>
			</tr>		

			<th scope="row">Unit of measure:</th>

			<td>
				<select name='wpgpxmaps_unit_of_measure'>
					<option value="0" <?php if ($uom == '0') echo 'selected'; ?>>meters/meters</option>
					<option value="1" <?php if ($uom == '1') echo 'selected'; ?>>feet/miles</option>
					<option value="2" <?php if ($uom == '2') echo 'selected'; ?>>meters/kilometers</option>
					<option value="3" <?php if ($uom == '3') echo 'selected'; ?>>meters/nautical miles</option>
					<option value="4" <?php if ($uom == '4') echo 'selected'; ?>>meters/miles</option>
					<option value="5" <?php if ($uom == '5') echo 'selected'; ?>>feet/nautical miles</option>
				</select>
			</td>
		</tr>

		<tr>
			<th scope="row">Altitude display offset:</th>
			<td>
				From
				<input name="wpgpxmaps_graph_offset_from1" value="<?php echo get_option('wpgpxmaps_graph_offset_from1'); ?>" style="width:50px;" />
				To
				<input name="wpgpxmaps_graph_offset_to1" value="<?php echo get_option('wpgpxmaps_graph_offset_to1'); ?>" style="width:50px;" />
				<em>(leave empty for auto scale)</em>
			</td>
		</tr>

		<tr>
			<th scope="row">Show speed:</th>
			<td>
				<input name="wpgpxmaps_show_speed" type="checkbox" value="true" <?php if($showSpeed == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show Speed</i>
			</td>
		</tr>		

		<tr>
			<th scope="row">Speed line color:</th>
			<td>
				<input name="wpgpxmaps_graph_line_color_speed" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_speed'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row">Speed unit of measure:</th>
			<td>
				<select name='wpgpxmaps_unit_of_measure_speed'>
					<option value="0" <?php if ($uomSpeed == '0') echo 'selected'; ?>>m/s</option>
					<option value="1" <?php if ($uomSpeed == '1') echo 'selected'; ?>>km/h</option>
					<option value="2" <?php if ($uomSpeed == '2') echo 'selected'; ?>>miles/h</option>
					<option value="3" <?php if ($uomSpeed == '3') echo 'selected'; ?>>min/km</option>
					<option value="4" <?php if ($uomSpeed == '4') echo 'selected'; ?>>min/miles</option>
					<option value="5" <?php if ($uomSpeed == '5') echo 'selected'; ?>>Nautical Miles/Hour (Knots)</option>										<option value="6" <?php if ($uomSpeed == '6') echo 'selected'; ?>>min/100 meters</option>
				</select>
			</td>
		</tr>	

		<tr>
			<th scope="row">Speed display offset:</th>
			<td>
				From
				<input name="wpgpxmaps_graph_offset_from2" value="<?php echo get_option('wpgpxmaps_graph_offset_from2'); ?>" style="width:50px;" />
				To
				<input name="wpgpxmaps_graph_offset_to2" value="<?php echo get_option('wpgpxmaps_graph_offset_to2'); ?>" style="width:50px;" />
				<em>(leave empty for auto scale)</em>
			</td>
		</tr>

		<tr>
			<th scope="row">Show Heart Rate (where aviable):</th>
			<td>
				<input name="wpgpxmaps_show_hr" type="checkbox" value="true" <?php if($showHr == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show heart rate</i>
			</td>
		</tr>		

		<tr>
			<th scope="row">Heart rate line color:</th>
			<td>
				<input name="wpgpxmaps_graph_line_color_hr" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_hr'); ?>" />
			</td>
		</tr>

		

		<tr>
			<th scope="row">Show Temperature (where aviable):</th>
			<td>
				<input name="wpgpxmaps_show_atemp" type="checkbox" value="true" <?php if($showAtemp == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show Temperature</i>
			</td>
		</tr>	
		
		<tr>
			<th scope="row">Temperature line color:</th>
			<td>
				<input name="wpgpxmaps_graph_line_color_atemp" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_atemp'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row">Show Cadence (where aviable):</th>
			<td>
				<input name="wpgpxmaps_show_cadence" type="checkbox" value="true" <?php if($showCad == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show Cadence</i>
			</td>
		</tr>		

		<tr>
			<th scope="row">Cadence line color:</th>
			<td>
				<input name="wpgpxmaps_graph_line_color_cad" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_cad'); ?>" />
			</td>
		</tr>

		<tr>
			<th scope="row">Show Grade:</th>
			<td>
				<input name="wpgpxmaps_show_grade" type="checkbox" value="true" <?php if($showGrade == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Show Grade - BETA</i>
				<br />
				<i>(Grade values depends on your gps accuracy. If you have a poor gps accuracy they might be totally wrong!)</i>
			</td>
		</tr>		

		<tr>
			<th scope="row">Grade line color:</th>
			<td>
				<input name="wpgpxmaps_graph_line_color_grade" type="color" data-hex="true" value="<?php echo get_option('wpgpxmaps_graph_line_color_grade'); ?>" />
			</td>
		</tr>

	</table>

	<p class="submit">

		<input type="hidden" name="action" value="update" />
    	<input name="page_options" type="hidden" value="wpgpxmaps_unit_of_measure,wpgpxmaps_graph_line_color,wpgpxmaps_show_elevation,wpgpxmaps_show_speed,wpgpxmaps_graph_line_color_speed,wpgpxmaps_show_hr,wpgpxmaps_graph_line_color_hr,wpgpxmaps_unit_of_measure_speed,wpgpxmaps_graph_offset_from1,wpgpxmaps_graph_offset_to1,wpgpxmaps_graph_offset_from2,wpgpxmaps_graph_offset_to2,wpgpxmaps_graph_line_color_cad,wpgpxmaps_show_cadence,wpgpxmaps_show_grade,wpgpxmaps_graph_line_color_grade,wpgpxmaps_show_atemp,wpgpxmaps_graph_line_color_atemp" />
		<input type="submit" class="button-primary" value="<?php _e('Save Changes', "wp_gpx_maps") ?>" />
	</p>

</form>
	<hr />

<form method="post" action="options.php">
	<?php wp_nonce_field('update-options') ?>
	<h3 class="title">Advanced options	<small>(Do not edit if you don't know what you are doing!)</small></h3>

	<table class="form-table">

		<tr>
			<th scope="row"></th>
			<td>
				<i>Skip points closer than </i> <input name="wpgpxmaps_pointsoffset" type="text" id="wpgpxmaps_pointsoffset" value="<?php echo $po ?>" style="width:50px;" /> <i>meters</i>.
			</td>
		</tr>		

		<tr>
			<th scope="row"></th>
			<td>
				<input name="wpgpxmaps_donotreducegpx" type="checkbox" value="true" <?php if($donotreducegpx == true){echo('checked');} ?> onchange="this.value = (this.checked)"  /> <i>Do not reduce gpx</i>.
			</td>
		</tr>	

	</table>

	<input type="hidden" name="action" value="update" />
	<input name="page_options" type="hidden" value="wpgpxmaps_pointsoffset,wpgpxmaps_donotreducegpx" />

	<p class="submit">
		<input type="submit" class="button-primary" value="<?php _e('Save Changes', "wp_gpx_maps") ?>" />
	</p>

</form>

<hr />
