<div id="wpgpxmaps-tab-faq">

	<div class="wpgpxmaps-container-tab-faq">

		<div class="wpgpxmaps-tab-faq">

			<h3 class="title"><?php _e( 'FAQ', 'wp-gpx-maps' ); ?></h3>

			<p>
			<strong><?php _e( 'How can I upload the GPX files?', 'wp-gpx-maps' ); ?></strong>
			</p>
				<p>
					&nbsp; <?php _e( '1. Method: Upload the GPX file using the uploader in the tab "Tracks".', 'wp-gpx-maps' ); ?>
				</p>
				<p>
					&nbsp;
					<?php
					_e( '2. Method: Upload the GPX file via FTP to your upload folder:', 'wp-gpx-maps' );
					echo ' ';
					?>
					<code><strong> <?php echo $relativeGpxPath; ?> </strong></code>
				</p>
			<p>
			<strong><?php _e( 'How can I use the GPX files?', 'wp-gpx-maps' ); ?></strong>
			</p>
				<p>
					&nbsp; <?php _e( 'Go to the tab "Tracks" and copy the shortcode from the list and paste it in the page or post.', 'wp-gpx-maps' ); ?>
				</p>
				<p>
					&nbsp;
					<?php
					_e( 'You can manually set the relative path to your GPX file. Please use this scheme:', 'wp-gpx-maps' );
					echo ' ';
					?>
					<code><strong>[sgpx gpx="<?php echo $relativeGpxPath; ?>yourgpxfile.gpx"]</strong></code>
				</p>
			<p>
			<strong><?php _e( 'Can I also integrate GPX files from other sites?', 'wp-gpx-maps' ); ?></strong>
			</p>
				<p>
					&nbsp;
					<?php
					_e( 'Yes, it&#8217s possible. Please use this scheme:', 'wp-gpx-maps' );
					echo ' ';
					?>
					<code><strong>[sgpx gpx="http://www.someone.com/somewhere/somefile.gpx"]</strong></code>
				</p>
			<p>
			<strong><?php _e( 'Can I change the attributes for each GPX shortcode?', 'wp-gpx-maps' ); ?></strong>
			</p>
				<p>
					&nbsp; <?php _e( 'Yes, it&#8217s possible. These changes ignore the default settings for each attribute.', 'wp-gpx-maps' ); ?>
				</p>
				<p>
					&nbsp;
					<?php
					_e( 'The Full set of optional attributes can be found below. Please use this scheme:', 'wp-gpx-maps' );
					echo ' ';
					?>
					<code><strong>[sgpx gpx="<?php echo $relativeGpxPath; ?>yourgpxfile.gpx &lt; <?php _e( 'read below all the optional attributes', 'wp-gpx-maps' ); ?> &gt;"]</strong></code>
				</p>

		</div>

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="4">
						<strong><?php _e( 'General', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Current value', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
				</thead>
			<tbody>
				<tr>
					<td>gpx</td>
					<td>
						<?php _e( 'relative path to the GPX file', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<code><strong>gpx="/wp-upload dir/gpx/yourgpxfile.gpx"</strong></code>
					</td>
					<td>
						<code><strong>gpx="<?php echo $relativeGpxPath; ?>yourgpxfile.gpx"</strong></code>
					</td>
				</tr>
				<tr>
					<td>width</td>
					<td>
						<?php _e( 'Map width', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Value in percent', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_width' ); ?>
					</td>
				</tr>
				<tr>
					<td>mheight</td>
					<td>
						<?php _e( 'Map height', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Value in pixels', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_height' ); ?>
					</td>
				</tr>
				<tr>
					<td>gheight</td>
					<td>
						<?php _e( 'Graph height', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Value in pixels', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_height' ); ?>
					</td>
				</tr>
				<tr>
					<td>download</td>
					<td>
						<?php _e( 'Allow users to download your GPX file', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_download' ); ?>
					</td>
				</tr>
				<tr>
					<td>skipcache</td>
					<td>
						<?php _e('Do not use cache. If TRUE might be very slow', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_skipcache' ); ?>
					</td>
				</tr>
				</tbody>
		</table>

		<br />

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="4">
						<strong><?php _e( 'Map', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Current value', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>mtype</td>
					<td>
						<?php _e( 'Map type', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<strong>HYBRID, ROADMAP, SATELLITE, TERRAIN</strong>
						<br />
						<strong>OSM1</strong> =	<?php _e( 'Open Street Map', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM2</strong> =	<?php _e( 'Open Cycle Map', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM4</strong> =	<?php _e( 'Open Cycle Map - Transport', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM5</strong> =	<?php _e( 'Open Cycle Map - Landscape', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM6</strong> =	<?php _e( 'MapToolKit - Terrain', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM7</strong> =	<?php _e( 'Open Street Map - Humanitarian map style', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM9</strong> =	<?php _e( 'Hike & Bike', 'wp-gpx-maps' ); ?>
						<br />
						<strong>OSM10</strong> = <?php _e( 'Open Sea Map', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_type' ); ?>
					</td>
				</tr>
				<tr>
					<td>mlinecolor</td>
					<td>
						<?php _e( 'Map line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#3366cc</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_line_color' ); ?>
					</td>
				</tr>
				<tr>
					<td>zoomonscrollwheel</td>
					<td>
						<?php _e( 'Zoom on map when mouse scroll wheel', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_zoomonscrollwheel' ); ?>
					</td>
				</tr>
				<tr>
					<td>waypoints</td>
					<td>
						<?php _e( 'Print the GPX waypoints inside the map', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_waypoint' ); ?>
					</td>
				</tr>
				<tr>
					<td>startIcon</td>
					<td>
						<?php _e( 'Start track icon', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_start_icon' ); ?>
					</td>
				</tr>
				<tr>
					<td>endIcon</td>
					<td>
						<?php _e( 'End track icon', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_end_icon' ); ?>
					</td>
				</tr>
				<tr>
					<td>currentIcon</td>
					<td>
						<?php _e( 'Current position icon (when mouse hover)', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_current_icon' ); ?>
					</td>
				</tr>
				<tr>
					<td>waypointicon</td>
					<td>
						<?php _e( 'Custom waypoint icon', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_map_waypoint_icon' ); ?>
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="4">
						<strong><?php _e( 'Diagram', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Current value', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>showele</td>
					<td>
						<?php _e( 'Show elevation data inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>true</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_elevation' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecolor</td>
					<td>
						<?php _e( 'Altitude line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#3366cc</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color' ); ?>
					</td>
				</tr>
				<tr>
					<td>uom</td>
					<td>
						<?php _e( 'Distance / Altitude unit of measure', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<strong>0</strong> = <?php _e( 'meters / meters', 'wp-gpx-maps' ); ?>
						<br />
						<strong>1</strong> = <?php _e( 'feet / miles', 'wp-gpx-maps' ); ?>
						<br />
						<strong>2</strong> = <?php _e( 'meters / kilometers', 'wp-gpx-maps' ); ?>
						<br />
						<strong>3</strong> = <?php _e( 'meters / nautical miles', 'wp-gpx-maps' ); ?>
						<br />
						<strong>4</strong> = <?php _e( 'meters / miles', 'wp-gpx-maps' ); ?>
						<br />
						<strong>5</strong> = <?php _e( 'feet / nautical miles', 'wp-gpx-maps' ); ?>
						<br />
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_unit_of_measure' ); ?>
					</td>
				</tr>
				<tr>
					<td>chartFrom1</td>
					<td>
						<?php _e( 'Minimum value for altitude chart', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_offset_from1' ); ?>
					</td>
				</tr>
				<tr>
					<td>chartTo1</td>
					<td>
						<?php _e( 'Maximum value for altitude chart', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_offset_to1' ); ?>
					</td>
				</tr>
				<tr>
					<td>showspeed</td>
					<td>
						<?php _e( 'Show speed inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_speed' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecolorspeed</td>
					<td>
						<?php _e( 'Speed line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#ff0000</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color_speed' ); ?>
					</td>
				</tr>
				<tr>
				<td>uomspeed</td>
					<td>
						<?php _e( 'Speed unit of measure', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<strong>0</strong> = <?php _e( 'm/s', 'wp-gpx-maps' ); ?>
						<br />
						<strong>1</strong> = <?php _e( 'km/h', 'wp-gpx-maps' ); ?>
						<br />
						<strong>2</strong> = <?php _e( 'miles/h', 'wp-gpx-maps' ); ?>
						<br />
						<strong>3</strong> = <?php _e( 'min/km', 'wp-gpx-maps' ); ?>
						<br />
						<strong>4</strong> = <?php _e( 'min/miles', 'wp-gpx-maps' ); ?>
						<br />
						<strong>5</strong> = <?php _e( 'Knots (nautical miles / hour)', 'wp-gpx-maps' ); ?>
						<br />
						<strong>6</strong> = <?php _e( 'min/100 meters', 'wp-gpx-maps' ); ?>
						<br />
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_unit_of_measure_speed' ); ?>
					</td>
				</tr>
				<tr>
					<td>chartFrom2</td>
					<td>
						<?php _e( 'Minimum value for speed chart', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_offset_from2' ); ?>
					</td>
				</tr>
				<tr>
					<td>chartTo2</td>
					<td>
						<?php _e( 'Maximum value for speed chart', 'wp-gpx-maps' ); ?>
					</td>
					<td></td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_offset_to2' ); ?>
					</td>
				</tr>
				<tr>
					<td>showhr</td>
					<td>
						<?php _e( 'Show heart rate inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_hr' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecolorhr</td>
					<td>
						<?php _e( 'Heart rate line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#ff77bd</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color_hr' ); ?>
					</td>
				</tr>
				<td>showatemp</td>
					<td>
						<?php _e( 'Show temperature inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_atemp' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecoloratemp</td>
					<td>
						<?php _e( 'Temperature line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#ff77bd</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color_atemp' ); ?>
					</td>
				</tr>
				<tr>
					<td>showcad</td>
					<td>
						<?php _e( 'Show cadence inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_cadence' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecolorcad</td>
					<td>
						<?php _e( 'Cadence line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#beecff</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color_cad' ); ?>
					</td>
				</tr>
				<tr>
					<td>showgrade</td>
					<td>
						<?php _e( 'Show grade inside the chart', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_show_grade' ); ?>
					</td>
				</tr>
				<tr>
					<td>glinecolorgrade</td>
					<td>
						<?php _e( 'Grade line color', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>#beecff</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_graph_line_color_grade' ); ?>
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="3">
						<strong><?php _e( 'Pictures', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>nggalleries</td>
					<td>
						<?php _e( 'NextGen Gallery', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Gallery ID or a list of Galleries ID separated by a comma', 'wp-gpx-maps' ); ?>
					</td>
				</tr>
				<tr>
					<td>ngimages</td>
					<td>
						<?php _e( 'NextGen Image', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Image ID or a list of Images ID separated by a comma', 'wp-gpx-maps' ); ?>
					</td>
				</tr>
				<tr>
					<td>attachments</td>
					<td>
						<?php _e( 'Show all images that are attached to post', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
				</tr>
				<tr>
					<td>dtoffset</td>
					<td>
						<?php _e( 'The difference between your GPX tool date and your camera date', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php _e( 'Value in seconds', 'wp-gpx-maps' ); ?>
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="4">
						<strong><?php _e( 'Summary table', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Current value', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>summary</td>
					<td>
						<?php _e( 'Print summary details of your GPX track', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary' ); ?>
					</td>
				</tr>
				<tr>
					<td>summarytotlen</td>
					<td>
						<?php _e( 'Print total distance in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_tot_len' ); ?>
					</td>
				</tr>
				<tr>
					<td>summarymaxele</td>
					<td>
						<?php _e( 'Print max. elevation in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_max_ele' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryminele</td>
					<td>
						<?php _e( 'Print min. elevation in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_min_ele' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryeleup</td>
					<td>
						<?php _e( 'Print total climbing in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_total_ele_up' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryeledown</td>
					<td>
						<?php _e( 'Print total descent in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_total_ele_down' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryavgspeed</td>
					<td>
						<?php _e( 'Print average speed in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_avg_speed' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryavgcad</td>
					<td>
						<?php _e( 'Print average cadence in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_avg_cad' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryavghr</td>
					<td>
						<?php _e( 'Print average heart rate in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_avg_hr' ); ?>
					</td>
				</tr>
				<tr>
					<td>summaryavgtemp</td>
					<td>
						<?php _e( 'Print average temperature in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_avg_temp' ); ?>
					</td>
				</tr>
				<tr>
					<td>summarytotaltime</td>
					<td>
						<?php _e( 'Print total time in summary table', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_summary_total_time' ); ?>
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<table class="widefat">
			<thead>
				<tr>
					<th colspan="4">
						<strong><?php _e( 'Advanced', 'wp-gpx-maps' ); ?></strong>
					</th>
				</tr>
				<tr>
					<th scope="col">
						<?php _e( 'Shortcode', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Description', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Possible values', 'wp-gpx-maps' ); ?>
					</th>
					<th scope="col">
						<?php _e( 'Current value', 'wp-gpx-maps' ); ?>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>pointsoffset</td>
					<td>
						<?php _e( 'Skip GPX points closer than XX meters', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>10</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_pointsoffset' ); ?>
					</td>
				</tr>
				<tr>
					<td>donotreducegpx</td>
					<td>
						<?php _e( 'Print all the GPX waypoints without reduce it', 'wp-gpx-maps' ); ?>
					</td>
					<td>
						<?php
						_e( 'Default is:', 'wp-gpx-maps' );
						echo ' ';
						?>
						<strong>false</strong>
					</td>
					<td>
						<?php echo get_option( 'wpgpxmaps_donotreducegpx' ); ?>
					</td>
				</tr>
			</tbody>
		</table>

	</div>

	<p>
		<a href="http://devfarm.it/forums/forum/wp-gpx-maps/" target="_blank" rel="noopener noreferrer"><?php _e( 'Bugs, problems, thanks and anything else here!', 'wp-gpx-maps' ); ?></a>
	</p>

</div>
