<div style="padding:10px;">

<h3 class="title"><?php _e( 'FAQ', 'wp-gpx-maps' ); ?></h3>

<p>
	<strong><?php _e( 'How can I upload the GPX files?', 'wp-gpx-maps' ); ?></strong>
</p>
<p>
	&nbsp; <?php _e( '1. Method: Upload the GPX file using the uploader in the tab "Tracks".', 'wp-gpx-maps' ); ?>
</p>
<p>
	&nbsp; <?php _e( '2. Method: Upload the GPX file via FTP to your upload folder:', 'wp-gpx-maps' ); echo ' '; ?> <strong> <?php echo $relativeGpxPath; ?> </strong>
</p>
<p>
	<strong><?php _e( 'How can I use the GPX files?', 'wp-gpx-maps' ); ?></strong>
</p>
<p>
	&nbsp; <?php _e( 'Go to the tab "Tracks" and copy the shortcode from the list and paste it in the pages/posts.', 'wp-gpx-maps' ); ?>
</p>
<p>
	&nbsp; <?php _e( 'You can manually set the relative path to your GPX file. Please use this scheme:', 'wp-gpx-maps' ); echo ' '; ?><strong>[sgpx gpx="<?php echo $relativeGpxPath; ?>&lt; gpx file name &gt;"]</strong>
</p>
<p>
	<strong><?php _e( 'Can I also integrate GPX files from other sites?', 'wp-gpx-maps' ); ?></strong>
</p>
<p>
	&nbsp; <?php _e( 'You can also use GPX file from other sites. Please use this scheme:', 'wp-gpx-maps' ); echo ' '; ?> <strong>[sgpx gpx="http://www.someone.com/somewhere/somefile.gpx"]</strong>
</p>
<p>
	<strong><?php _e( 'Can I change the attributes for each GPX shortcode?', 'wp-gpx-maps' ); ?></strong>
</p>
<p>
	&nbsp; <?php _e( 'Yes, you can. These changes ignore the default settings for each attribute.', 'wp-gpx-maps' ); ?>
</p>
<p>
	&nbsp; <?php _e( 'The Full set of optional attributes can be found below. Please use this scheme:', 'wp-gpx-maps' ); echo ' '; ?><strong>[sgpx gpx="<?php echo $relativeGpxPath; ?>&lt; gpx file name &gt; <em>&lt; <?php _e( 'read below all the optional attributes', 'wp-gpx-maps' ); ?> &gt;</em>"]</strong>
</p>

<br />

<h3 class="title"><?php _e( 'General', 'wp-gpx-maps' ); ?></h3>

<table class="shortcodes"><colgroup> <col width="100px" /></colgroup>
	<tbody>
	<tr>
		<td><strong><?php _e( 'Shortcode', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Description', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Possible values', 'wp-gpx-maps' ); ?></strong></td>
	</tr>
	<tr>
		<td>gpx</td>
		<td><?php _e( 'relative path to GPX file', 'wp-gpx-maps' ); ?></td>
		<td> gpx="<?php echo $relativeGpxPath; ?>&lt; gpx file name &gt;</td>
	</tr>
	<tr>
		<td>width</td>
		<td><?php _e( 'Map width', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Value in pixels', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>mheight</td>
		<td><?php _e( 'Map height', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Value in pixels', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>gheight</td>
		<td><?php _e( 'Graph height', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Value in pixels', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>download</td>
		<td><?php _e( 'Allow users to download your GPX file', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>False</strong></td>
	</tr>
		<tr>
		<td>skipcache</td>
		<td><?php _e('Do not use cache. If TRUE might be very slow', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>False</strong></td>
	</tr>
	<tr>
		<td>allow other users uploads</td>
		<td><?php _e( 'Allow other non-admin users to uploads and see gpx files', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '?><strong>False</strong></td>
	</tr>
	</tbody>
</table>

<h3 class="title"><?php _e( 'Map', 'wp-gpx-maps' ); ?></h3>

<table class="shortcodes"><colgroup> <col width="100px" /></colgroup>
	<tbody>
	<tr>
		<td><strong><?php _e( 'Shortcode', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Description', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Possible values', 'wp-gpx-maps' ); ?></strong></td>
	</tr>
	<tr>
		<td>mtype</td>
		<td><?php _e( 'Map type', 'wp-gpx-maps' ); ?></td>
		<td><strong>HYBRID, ROADMAP, SATELLITE, TERRAIN, OSM1 (Open Street Map), OSM2 (Open Cycle Map), OSM3 (Hike & Bike), OSM4 (Open Cycle Map - Transport), OSM5 (Open Cycle Map - Landscape), OSM6 (MapToolKit - Terrain)</strong></td>
	</tr>
	<tr>
		<td>mlinecolor</td>
		<td><?php _e( 'Map line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#3366cc</strong></td>
	</tr>
	<tr>
		<td>zoomonscrollwheel</td>
		<td><?php _e( 'Zoom on map when mouse scroll wheel', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>False</strong></td>
	</tr>
	<tr>
		<td>waypoints</td>
		<td><?php _e( 'Print the GPX waypoints inside the map', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>False</strong></td>
	</tr>
	<tr>
		<td>donotreducegpx</td>
		<td><?php _e( 'Print all the GPX waypoints without reduce it', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>False</strong></td>
	</tr>
	<tr>
		<td>pointsoffset</td>
		<td><?php _e( 'Skip GPX points closer than XX meters', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>10</strong></td>
	</tr>
	<tr>
		<td>startIcon</td>
		<td><?php _e( 'Start track icon', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>endIcon</td>
		<td><?php _e( 'End track icon', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>currentIcon</td>
		<td><?php _e( 'Current position icon (when mouse hover)', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>waypointicon</td>
		<td><?php _e( 'Custom waypoint icon', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	</tbody>
</table>

<h3 class="title"><?php _e( 'Diagram', 'wp-gpx-maps' ); ?></h3>

<table class="shortcodes"><colgroup> <col width="100px" /></colgroup>
	<tbody>
	<tr>
		<td><strong><?php _e( 'Shortcode', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Description', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Possible values', 'wp-gpx-maps' ); ?></strong></td>
	</tr>
	<tr>
		<td>glinecolor</td>
		<td><?php _e( 'Altitude line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#3366cc</strong></td>
	</tr>
	<tr>
		<td>uom</td>
		<td><?php _e( 'Distance / Altitude unit of measure', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( '<strong>0</strong> = meters/meters, <strong>1</strong> = feet/miles, <strong>2</strong> = meters/kilometers, <strong>3</strong> = meters/nautical miles, <strong>4</strong> = meters/miles, <strong>5</strong> = feet/nautical miles', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>chartFrom1</td>
		<td><?php _e( 'Minimum value for altitude chart', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>chartTo1</td>
		<td><?php _e( 'Maximum value for altitude chart', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>showspeed</td>
		<td><?php _e( 'Show speed inside the chart', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>glinecolorspeed</td>
		<td><?php _e( 'Speed line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#ff0000</strong></td>
	</tr>
	<tr>
		<td>uomspeed</td>
		<td><?php _e( 'Speed unit of measure', 'wp-gpx-maps' ); ?></td>
		<td><strong>0</strong> = m/s, <strong>1</strong> = km/h, <strong>2</strong> = miles/h, <strong>3</strong> = min/km, <strong>4</strong> = min/miles, <strong>5</strong> = Nautical Miles/Hour (Knots), <strong>6</strong> = min/100 meters)</td>
	</tr>
	<tr>
		<td>chartFrom2</td>
		<td><?php _e( 'Minimum value for speed chart', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>chartTo2</td>
		<td><?php _e( 'Maximum value for speed chart', 'wp-gpx-maps' ); ?></td>
		<td></td>
	</tr>
	<tr>
		<td>showhr</td>
		<td><?php _e( 'Show heart rate inside the chart', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>glinecolorhr</td>
		<td><?php _e( 'Heart rate line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#ff77bd</strong></td>
	</tr>
		<tr>
		<td>showele</td>
		<td><?php _e( 'Show elevation data inside the chart', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>TRUE</strong></td>
	</tr>
	<tr>
		<td>showcad</td>
		<td><?php _e( 'Show cadence inside the chart', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>glinecolorcad</td>
		<td><?php _e( 'Cadence line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#beecff</strong></td>
	</tr>
	<tr>
		<td>showgrade</td>
		<td><?php _e( 'Show grade inside the chart', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>glinecolorgrade</td>
		<td><?php _e( 'Grade line color', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>#beecff</strong></td>
	</tr>
	</tbody>
</table>

<h3 class="title"><?php _e( 'Pictures', 'wp-gpx-maps' ); ?></h3>

<table class="shortcodes"><colgroup> <col width="100px" /></colgroup>
	<tbody>
	<tr>
		<td><strong><?php _e( 'Shortcode', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Description', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Possible values', 'wp-gpx-maps' ); ?></strong></td>
	</tr>
	<tr>
		<td>nggalleries</td>
		<td><?php _e( 'NextGen Gallery', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Gallery ID or a list of Galleries ID separated by a comma', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>ngimages</td>
		<td><?php _e( 'NextGen Image', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Image ID or a list of Images ID separated by a comma', 'wp-gpx-maps' ); ?></td>
	</tr>
	<tr>
		<td>attachments</td>
		<td><?php _e( 'Show all images that are attached to post', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>dtoffset</td>
		<td><?php _e( 'The difference between your GPX tool date and your camera date', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Value in seconds', 'wp-gpx-maps' ); ?></td>
	</tr>
	</tbody>
</table>

<h3 class="title"><?php _e( 'Summary table', 'wp-gpx-maps' ); ?></h3>

<table class="shortcodes"><colgroup> <col width="100px" /></colgroup>
	<tbody>
	<tr>
		<td><strong><?php _e( 'Shortcode', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Description', 'wp-gpx-maps' ); ?></strong></td>
		<td><strong><?php _e( 'Possible values', 'wp-gpx-maps' ); ?></strong></td>
</tr>
	<tr>
		<td>summary</td>
		<td><?php _e( 'Show summary details of your GPX track', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summarytotlen</td>
		<td><?php _e( 'Print summary details of your GPX file', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summarymaxele</td>
		<td><?php _e( 'Print max. elevation in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryminele</td>
		<td><?php _e( 'Print min. elevation in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryeleup</td>
		<td><?php _e( 'Print total climbing in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryeledown</td>
		<td><?php _e( 'Print total descent in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryavgspeed</td>
		<td><?php _e( 'Print average speed in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryavgcad</td>
		<td><?php _e( 'Print average cadence in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryavghr</td>
		<td><?php _e( 'Print average heart rate in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summaryavgtemp</td>
		<td><?php _e( 'Print average temperature in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	<tr>
		<td>summarytotaltime</td>
		<td><?php _e( 'Print total time in summary table', 'wp-gpx-maps' ); ?></td>
		<td><?php _e( 'Default is:', 'wp-gpx-maps' ); echo ' '; ?> <strong>FALSE</strong></td>
	</tr>
	</tbody>
</table>

<p>
	<a href="http://devfarm.it/forums/forum/wp-gpx-maps/"><?php _e( 'Bugs, problems, thanks and anything else here!', 'wp-gpx-maps' ); ?></a>
</p>