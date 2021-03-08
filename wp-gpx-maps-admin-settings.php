<?php
/**
 * Settings Tab
 *
 * Contains all settings for the output.
 *
 * @package WP GPX Maps
 */

if ( ! current_user_can( 'manage_options' ) )
	return;

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
$showName 		= get_option( 'wpgpxmaps_summary_show_name' );
$showDesc 		= get_option( 'wpgpxmaps_summary_show_desc' );
/* Map */
$t                 = get_option( 'wpgpxmaps_map_type' );
$zoomonscrollwheel = get_option( 'wpgpxmaps_zoomonscrollwheel' );
$showW             = get_option( 'wpgpxmaps_show_waypoint' );
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

if ( ! ( $t ) )
	$t = 'HYBRID';

if ( ! ( $po ) )
	$po = 10;

?>

<!-- The First Div (for body) starts in wp-gpx-admin.php -->

	<div class="wpgpxmaps-container-tab-settings">

		<form method="post" action="options.php">
			<?php wp_nonce_field( 'update-options' ); ?>

			<h3 class="title">
				<?php esc_html_e( 'General', 'wp-gpx-maps' ); ?>
			</h3>

			<table class="form-table">
				<tr>
					<th scope="row">
					<?php esc_html_e( 'Map width:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_width" type="text" id="wpgpxmaps_width" value="<?php echo get_option( 'wpgpxmaps_width' ); ?>" style="width:50px;" />
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Map height:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_height" type="text" id="wpgpxmaps_height" value="<?php echo get_option( 'wpgpxmaps_height' ); ?>" style="width:50px;" />
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Graph height:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_graph_height" type="text" id="wpgpxmaps_graph_height" value="<?php echo get_option( 'wpgpxmaps_graph_height' ); ?>" style="width:50px;" />
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Distance type:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<select name='wpgpxmaps_distance_type'>
						<option value="0" <?php if ( '0' == $distanceType || '' == $distanceType ) echo 'selected'; ?>>
							<?php esc_html_e( 'Normal (default)', 'wp-gpx-maps' ); ?>
						</option>
						<option value="1" <?php if ( '1' == $distanceType ) echo 'selected'; ?>>
							<?php esc_html_e( 'Flat &#8594; (Only flat distance, don&#8217;t take care of altitude)', 'wp-gpx-maps' ); ?>
						</option>
						<option value="2" <?php if ( '2' == $distanceType ) echo 'selected'; ?>>
							<?php esc_html_e( 'Climb &#8593; (Only climb distance)', 'wp-gpx-maps' ); ?>
						</option>
					</select>
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Cache:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_skipcache" type="checkbox" value="true" <?php if ( true == $skipcache ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
					<i>
						<?php esc_html_e( 'Do not use cache', 'wp-gpx-maps' ); ?>
					</i>
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'GPX Download:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_download" type="checkbox" value="true" <?php if ( true == $download ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
					<i>
						<?php esc_html_e( 'Allow users to download your GPX file', 'wp-gpx-maps' ); ?>
					</i>
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Use browser GPS position:', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_usegpsposition" type="checkbox" value="true" <?php if ( true == $usegpsposition ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
					<i>
					<?php esc_html_e( 'Allow users to use browser GPS in order to display their current position on map', 'wp-gpx-maps' ); ?>
					</i>
				</td>
			</tr>

			<tr>
				<th scope="row">
					<?php esc_html_e( 'Thunderforest API Key (Open Cycle Map):', 'wp-gpx-maps' ); ?>
				</th>
				<td>
					<input name="wpgpxmaps_openstreetmap_apikey" type="text" id="wpgpxmaps_openstreetmap_apikey" value="<?php echo get_option( 'wpgpxmaps_openstreetmap_apikey' ); ?>" style="width:400px" />
					<em>
						<a href="'http://www.thunderforest.com/docs/apikeys/" target="_blank" rel="noopener noreferrer">Thunderforest API Key and signing in to your Thunderforest account.</a>											
					</em>
				</td>
			</tr>

		</table>

		<p class="submit">
			<input type="hidden" name="action" value="update" />
			<input name="page_options" type="hidden" value="wpgpxmaps_height,wpgpxmaps_graph_height,wpgpxmaps_width,wpgpxmaps_download,wpgpxmaps_skipcache,wpgpxmaps_distance_type,wpgpxmaps_usegpsposition,wpgpxmaps_openstreetmap_apikey" />
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
		</p>

		</form>

		<hr />

		<form method="post" action="options.php">
			<?php wp_nonce_field( 'update-options' ); ?>

			<h3 class="title">
				<?php esc_html_e( 'Summary table', 'wp-gpx-maps' ); ?>
			</h3>

			<table class="form-table">
				<tr>
					<th scope="row">
						<?php esc_html_e( 'Summary table:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary" type="checkbox" value="true" <?php if ( true == $summary ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print summary details of your GPX track', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Total distance:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_tot_len" type="checkbox" value="true" <?php if ( true == $tot_len ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print total distance', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Max elevation:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_max_ele" type="checkbox" value="true" <?php if ( true == $max_ele ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print max elevation', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Min elevation:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_min_ele" type="checkbox" value="true" <?php if ( true == $min_ele ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print min elevation', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Total climbing:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_total_ele_up" type="checkbox" value="true" <?php if ( true == $total_ele_up ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print total climbing', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Total descent:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_total_ele_down" type="checkbox" value="true" <?php if ( true == $total_ele_down ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print total descent', 'wp-gpx-maps' ); ?>
						</i>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Average speed:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_avg_speed" type="checkbox" value="true" <?php if ( true == $avg_speed ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print average speed', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Average cadence:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_avg_cad" type="checkbox" value="true" <?php if ( true == $avg_cad ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print average cadence', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Average heart rate:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_avg_hr" type="checkbox" value="true" <?php if ( true == $avg_hr ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print average heart rate', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Average temperature:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_avg_temp" type="checkbox" value="true" <?php if ( true == $avg_temp ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print average temperature', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Total time:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_total_time" type="checkbox" value="true" <?php if ( true == $total_time ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Print total time', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Show name:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_show_name" type="checkbox" value="true" <?php if ( true == $showName ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show name from GPX metadata', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

								<tr>
					<th scope="row">
						<?php esc_html_e( 'Show description:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_summary_show_desc" type="checkbox" value="true" <?php if ( true == $showDesc ) { echo ( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show description from GPX metadata', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

			</table>

			<p class="submit">
				<input type="hidden" name="action" value="update" />
				<input name="page_options" type="hidden" value="wpgpxmaps_summary,wpgpxmaps_summary_tot_len,wpgpxmaps_summary_max_ele,wpgpxmaps_summary_min_ele,wpgpxmaps_summary_total_ele_up,wpgpxmaps_summary_total_ele_down,wpgpxmaps_summary_avg_speed,wpgpxmaps_summary_avg_cad,wpgpxmaps_summary_avg_hr,wpgpxmaps_summary_avg_temp,wpgpxmaps_summary_total_time,wpgpxmaps_summary_show_name,wpgpxmaps_summary_show_desc" />
				<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
			</p>

		</form>

		<hr />

		<form method="post" action="options.php">
			<?php wp_nonce_field( 'update-options' ); ?>

			<h3 class="title">
				<?php esc_html_e( 'Map', 'wp-gpx-maps' ); ?>
			</h3>

			<table class="form-table">

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Default map type:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input type="radio" name="wpgpxmaps_map_type" value="OSM1" <?php if ( 'OSM1' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map type */
							esc_html_e( 'Open Street Map', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM2" <?php if ( 'OSM2' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Open Cycle Map / Thunderforest - Open Cycle Map (API Key required)', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM3" <?php if ( 'OSM3' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Thunderforest - Outdoors (API Key required)', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM4" <?php if ( 'OSM4' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Thunderforest - Transport (API Key required)', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM5" <?php if ( 'OSM5' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Thunderforest - Landscape (API Key required)', 'wp-gpx-maps' );
							?>
						<br />
						<!-- <input type="radio" name="wpgpxmaps_map_type" value="OSM6" <?php if ( 'OSM6' == $t ) echo 'checked'; ?>>-->
							<?php
							/* translators: map provider / map type */
							//esc_html_e( 'MapToolKit - Terrain', 'wp-gpx-maps' );
							?>
						<!--<br />-->
						<input type="radio" name="wpgpxmaps_map_type" value="OSM7" <?php if ( 'OSM7' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Open Street Map - Humanitarian map style', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM9" <?php if ( 'OSM9' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Hike & Bike', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM10" <?php if ( 'OSM10' == $t ) echo 'checked'; ?>>
							<?php
							/* translators: map provider / map type */
							esc_html_e( 'Open Sea Map', 'wp-gpx-maps' );
							?>
						<br />
						<input type="radio" name="wpgpxmaps_map_type" value="OSM11" <?php if ( $t == 'OSM11' ) echo 'checked'; ?>>
							<?php
							echo ' ';
							_e( 'GSI Map (Japan)', 'wp-gpx-maps' );
							?>
						<br />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Map line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_map_line_color" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_map_line_color' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'On mouse scroll wheel:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_zoomonscrollwheel" type="checkbox" value="true" <?php if ( true == $zoomonscrollwheel ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Enable zoom', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Waypoints support:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_waypoint" type="checkbox" value="true" <?php if ( true == $showW ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show waypoints', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Start track icon:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_map_start_icon" type="text" value="<?php echo get_option( 'wpgpxmaps_map_start_icon' ); ?>" style="width:400px" />
						<em>
							<?php esc_html_e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'End track icon:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_map_end_icon" type="text" value="<?php echo get_option( 'wpgpxmaps_map_end_icon' ); ?>" style="width:400px" />
						<em>
							<?php esc_html_e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Current position icon:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_map_current_icon" type="text" value="<?php echo get_option( 'wpgpxmaps_map_current_icon' ); ?>" style="width:400px" />
						<em>
							<?php esc_html_e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Current GPS position icon:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_currentpositioncon" type="text" value="<?php echo get_option( 'wpgpxmaps_currentpositioncon' ); ?>" style="width:400px" />
						<em>
							<?php esc_html_e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Custom waypoint icon:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_map_waypoint_icon" type="text" value="<?php echo get_option( 'wpgpxmaps_map_waypoint_icon' ); ?>" style="width:400px" />
						<em>
							<?php esc_html_e( '(URL to image) Leave empty to hide.', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

			</table>

			<p class="submit">
				<input type="hidden" name="action" value="update" />
				<input name="page_options" type="hidden" value="wpgpxmaps_map_type,wpgpxmaps_map_line_color,wpgpxmaps_zoomonscrollwheel,wpgpxmaps_show_waypoint,wpgpxmaps_map_start_icon,wpgpxmaps_map_end_icon,wpgpxmaps_map_current_icon,wpgpxmaps_currentpositioncon,wpgpxmaps_map_waypoint_icon" />
				<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
			</p>

		</form>

		<hr />

		<form method="post" action="options.php">
			<?php wp_nonce_field( 'update-options' ); ?>

			<h3 class="title">
				<?php esc_html_e( 'Chart', 'wp-gpx-maps' ); ?>
			</h3>

			<table class="form-table">

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Altitude:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_elevation" type="checkbox" value="true" <?php if ( true == $showEle ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show altitude', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Altitude line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Unit of measure:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<select name='wpgpxmaps_unit_of_measure'>
							<option value="0" <?php if ( '0' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'meters / meters', 'wp-gpx-maps' );
								?>
							</option>
							<option value="1" <?php if ( '1' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'feet / miles', 'wp-gpx-maps' );
								?>
							</option>
							<option value="2" <?php if ( '2' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'meters / kilometers', 'wp-gpx-maps' );
								?>
							</option>
							<option value="3" <?php if ( '3' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'meters / nautical miles', 'wp-gpx-maps' );
								?>
							</option>
							<option value="4" <?php if ( '4' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'meters / miles', 'wp-gpx-maps' );
								?>
							</option>
							<option value="5" <?php if ( '5' == $uom ) echo 'selected'; ?>>
								<?php
								/* translators: chart axis labels */
								esc_html_e( 'feet / nautical miles', 'wp-gpx-maps' );
								?>
							</option>
						</select>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Altitude display offset:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<?php esc_html_e( 'From', 'wp-gpx-maps' ); ?>
						<input name="wpgpxmaps_graph_offset_from1" type="text" value="<?php echo get_option( 'wpgpxmaps_graph_offset_from1' ); ?>" style="width:50px;" />
						<?php esc_html_e( 'to', 'wp-gpx-maps' ); ?>
						<input name="wpgpxmaps_graph_offset_to1" type="text" value="<?php echo get_option( 'wpgpxmaps_graph_offset_to1' ); ?>" style="width:50px;" />
						<em>
							<?php esc_html_e( '(leave empty for auto scale)', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Speed:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_speed" type="checkbox" value="true" <?php if ( true == $showSpeed ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show speed', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Speed line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color_speed" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color_speed' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Speed unit of measure:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<select name='wpgpxmaps_unit_of_measure_speed'>
							<option value="0" <?php if ( '0' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'm/s', 'wp-gpx-maps' );
								?>
							</option>
							<option value="1" <?php if ( '1' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'km/h', 'wp-gpx-maps' );
								?>
							</option>
							<option value="2" <?php if ( '2' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'miles/h', 'wp-gpx-maps' );
								?>
							</option>
							<option value="3" <?php if ( '3' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'min/km', 'wp-gpx-maps' );
								?>
							</option>
							<option value="4" <?php if ( '4' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'min/miles', 'wp-gpx-maps' );
								?>
							</option>
							<option value="5" <?php if ( '5' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'Knots (nautical miles / hour)', 'wp-gpx-maps' );
								?>
							</option>
							<option value="6" <?php if ( '6' == $uomSpeed ) echo 'selected'; ?>>
								<?php
								/* translators: speed unit of measure */
								esc_html_e( 'min/100 meters', 'wp-gpx-maps' );
								?>
							</option>
						</select>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Speed display offset:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<?php esc_html_e( 'From', 'wp-gpx-maps' ); ?>
						<input name="wpgpxmaps_graph_offset_from2" type="text" value="<?php echo get_option( 'wpgpxmaps_graph_offset_from2' ); ?>" style="width:50px;" />
						<?php esc_html_e( 'to', 'wp-gpx-maps' ); ?>
						<input name="wpgpxmaps_graph_offset_to2" type="text" value="<?php echo get_option( 'wpgpxmaps_graph_offset_to2' ); ?>" style="width:50px;" />
						<em>
							<?php esc_html_e( '(leave empty for auto scale)', 'wp-gpx-maps' ); ?>
						</em>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Heart rate (where aviable):', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_hr" type="checkbox" value="true" <?php if ( true == $showHr ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show heart rate', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Heart rate line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color_hr" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color_hr' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Temperature (where aviable):', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_atemp" type="checkbox" value="true" <?php if ( true == $showAtemp ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show temperature', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Temperature line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color_atemp" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color_atemp' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Cadence (where aviable):', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_cadence" type="checkbox" value="true" <?php if ( true == $showCad ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show cadence', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Cadence line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color_cad" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color_cad' ); ?>" />
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Grade:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_show_grade" type="checkbox" value="true" <?php if ( true == $showGrade ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Show grade - BETA (Grade values depends on your GPS accuracy. If you have a poor GPS accuracy they might be totally wrong!)', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Grade line color:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_graph_line_color_grade" type="color" data-hex="true" value="<?php echo get_option( 'wpgpxmaps_graph_line_color_grade' ); ?>" />
					</td>
				</tr>

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

			<h3 class="title">
				<?php esc_html_e( 'Advanced Options', 'wp-gpx-maps' ); ?>
			</h3>
			<em>
				<?php esc_html_e( '(Do not edit if you don&#8217;t know what you are doing!)', 'wp-gpx-maps' ); ?>
			</em>

			<table class="form-table">

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Skip GPX points closer than:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_pointsoffset" type="text" id="wpgpxmaps_pointsoffset" value="<?php echo $po; ?>" style="width:50px;" />
						<i>
							<?php esc_html_e( 'meters', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<?php esc_html_e( 'Reduce GPX:', 'wp-gpx-maps' ); ?>
					</th>
					<td>
						<input name="wpgpxmaps_donotreducegpx" type="checkbox" value="true" <?php if ( true == $donotreducegpx ) { echo( 'checked' ); } ?> onchange="this.value = (this.checked)" />
						<i>
							<?php esc_html_e( 'Do not reduce GPX', 'wp-gpx-maps' ); ?>
						</i>
					</td>
				</tr>

			</table>

			<p class="submit">
				<input type="hidden" name="action" value="update" />
				<input name="page_options" type="hidden" value="wpgpxmaps_donotreducegpx,wpgpxmaps_pointsoffset" />
				<input type="submit" class="button-primary" value="<?php esc_html_e( 'Save Changes', 'wp-gpx-maps' ); ?>" />
			</p>

		</form>

	</div>

</div>
