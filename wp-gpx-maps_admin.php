<?php


add_action('admin_menu', 'wpgpxmaps_admin_menu');

function wpgpxmaps_admin_menu() {	
	$ruolo = wp_get_current_user()->roles[0];
	
	if($ruolo != 'subscriber'){
		add_menu_page('WP GPX Maps', 'WP GPX Maps', 'read', 'WP-GPX-Maps', 'WP_GPX_Maps_html_page');
		add_options_page('WP GPX Maps', 'WP GPX Maps', 'read', 'WP-GPX-Maps', 'WP_GPX_Maps_html_page');
	}
}



function wpgpxmaps_ilc_admin_tabs( $current  ) {



	//if (current_user_can('read'))

	//{
	$ruolo = wp_get_current_user()->roles[0];
	if($ruolo == 'administrator'){
		$tabs = array(
				'tracks' => __( 'Tracks', 'wp-gpx-maps' ),
				'settings' => __( 'Settings', 'wp-gpx-maps' ),
				'help' => __( 'Help', 'wp-gpx-maps' )
				);
	}else{
		$tabs = array(
				'tracks' => __( 'Tracks', 'wp-gpx-maps' ),
				'help' => __( 'Help', 'wp-gpx-maps' )
				);
	}
	//}
	/*
	else if ( current_user_can('read') ) {

		$tabs = array(
				'tracks' => __( 'Tracks', 'wp-gpx-maps' ),
				'help' => __( 'Help', 'wp-gpx-maps' )
				);
	}*/



    echo '<h2 class="nav-tab-wrapper">';
		foreach( $tabs as $tab => $name ){

        $class = ( $tab == $current ) ? ' nav-tab-active' : '';

        echo "<a class='nav-tab$class' href='?page=WP-GPX-Maps&tab=$tab'>$name</a>";

    }

    echo '</h2>';

}


function getPathFilesContents($dir, &$results = array()){
    $files = scandir($dir);
    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $results[] = $path;
        } else if($value != "." && $value != "..") {
            getPathFilesContents($path, $results);
        }
    }

    return $results;
}



function WP_GPX_Maps_html_page() {
	
	$realGpxPath = gpxFolderPath();

	$cacheGpxPath = gpxCacheFolderPath();

	$relativeGpxPath = relativeGpxFolderPath();
	//$relativeGpxPath = str_replace($current_user->name,"",$relativeGpxPath);
	$relativeGpxPath = str_replace("\\","/", $relativeGpxPath);

	$tab = $_GET['tab'];


	if ($tab == '')

		$tab = 'tracks';

?>

	<div id="icon-themes" class="icon32"><br></div>

		<h2><?php _e( 'Settings', 'wp-gpx-maps' ); ?></h2>

<?php

	if(file_exists($realGpxPath) && is_dir($realGpxPath))

	{

		//dir exsist!

	}

	else

	{

		if (!@mkdir($realGpxPath,0755,true)) {
			echo '<div class=" notice notice-error"><p>';
			_e( 'Can\'t create', 'wp-gpx-maps' );
			echo ' ' . '<strong>' . $realGpxPath . '</strong>' . ' ';
			_e( 'folder. Please create it and make it writable! If not, you will must update the file manually!', 'wp-gpx-maps' );
			echo '</p></div>';
		}

	}

	if(file_exists($cacheGpxPath) && is_dir($cacheGpxPath))

	{

		//dir exsist!

	}

	else

	{

		if (!@mkdir($cacheGpxPath,0755,true)) {
			echo '<div class=" notice notice-error"><p>';
			_e( 'Can\'t create', 'wp-gpx-maps' );
			echo ' ' . '<strong>' . cacheGpxPath . '</strong>' . ' ';
			_e( 'folder. Please create it and make it writable! If not, you will must update the file manually!', 'wp-gpx-maps' );
			echo '</p></div>';
		}

	}



	wpgpxmaps_ilc_admin_tabs($tab);

	if ($tab == "tracks")

	{

		include 'wp-gpx-maps_admin_tracks.php';

	}

	else if ($tab == "settings")

	{

		include 'wp-gpx-maps_admin_settings.php';

	}

	else if ($tab == "help")

	{

?>



	<div style="padding:10px;">

		<b>The fastest way to use this plugin:</b><br /> upload the file using the uploader in the first tab, than copy the shortcode from the list and paste it in the pages/posts.

		<p>You can manually set the relative path to your gpx: <b>[sgpx gpx="<?php echo $relativeGpxPath; ?>&lt gpx file name &gt"]</b>.</p>

		<p>You can also use gpx from other sites: <b>[sgpx gpx="http://www.someone.com/somewhere/somefile.gpx"]</b></p>

		<hr />

		<p>

			<i>Full set of attributes:</i> <b>[sgpx gpx="<?php echo $relativeGpxPath; ?>&lt gpx file name &gt" </b>

													&nbsp;&nbsp;&nbsp;<em>&gt&gt read below all the optional attributes &lt&lt</em>&nbsp;&nbsp;&nbsp;

											<b>]</b>



			<ul>

<li><b>gpx</b>: relative path to gpx

</li><li><b>width</b>: width in pixels

</li><li><b>mheight</b>: map height

</li><li><b>gheight</b>: graph height

</li><li><b>mtype</b>: map available types are: HYBRID, ROADMAP, SATELLITE, TERRAIN, OSM1 (Open Street Map), OSM2 (Open Cycle Map), OSM3 (Hike & Bike), OSM4 (Open Cycle Map - Transport), OSM5 (Open Cycle Map - Landscape), OSM6 (MapToolKit - Terrain)

</li><li><b>waypoints</b>: print the gpx waypoints inside the map (default is FALSE)

</li><li><b>donotreducegpx</b>: print all the point without reduce it (default is FALSE)

</li><li><b>pointsoffset</b>: skip points closer than XX meters(default is 10)

</li><li><b>uom</b>: distance/altitude possible unit of measure are: 0, 1, 2, 3, 4, 5 (0 = meters, 1 = feet/miles, 2 = meters/kilometers, 3 = meters/nautical miles, 4 = meters/miles, 5 = feet/nautical miles)

</li><li><b>mlinecolor</b>: map line color (default is #3366cc)

</li><li><b>glinecolor</b>: altitude line color (default is #3366cc)

</li><li><b>showspeed</b>: show speed inside the chart (default is FALSE)

</li><li><b>showhr</b>: show heart rate inside the chart (default is FALSE)

</li><li><b>showele</b>: show elevation data inside the chart (default is TRUE)

</li><li><b>showcad</b>: show cadence inside the chart (default is FALSE)

</li><li><b>showgrade</b>: show grade inside the chart (default is FALSE)

</li><li><b>glinecolorspeed</b>: speed line color (default is #ff0000)

</li><li><b>glinecolorhr</b>: heart rate line color (default is #ff77bd)

</li><li><b>glinecolorcad</b>: cadence line color (default is #beecff)

</li><li><b>glinecolorgrade</b>: grade line color (default is #beecff)

</li><li><b>uomspeed</b>: unit of measure for speed are: 0, 1, 2, 3, 4, 5 (0 = m/s, 1 = km/h, 2 = miles/h, 3 = min/km, 4 = min/miles, 5 = Nautical Miles/Hour (Knots), 6 = min/100 meters)

</li><li><b>chartFrom1</b>: minimun value for altitude chart

</li><li><b>chartTo1</b>: maxumin value for altitude chart

</li><li><b>chartFrom2</b>: minimun value for speed chart

</li><li><b>chartTo2</b>: maxumin value for speed chart

</li><li><b>startIcon</b>: Start track icon

</li><li><b>endIcon</b>: End track icon

</li><li><b>currentIcon</b>: Current position icon (when mouse hover)

</li><li><b>waypointicon</b>: waypoint custom icon

</li><li><b>nggalleries</b>: NextGen Gallery id or a list of Galleries id separated by a comma

</li><li><b>ngimages</b>: NextGen Image id or a list of Images id separated by a comma

</li><li><b>dtoffset</b>: the difference (in seconds) between your gpx tool date and your camera date

</li><li><b>zoomonscrollwheel</b>: zoom on map when mouse scroll wheel

</li><li><b>download</b>: Allow users to download your GPX file

</li><li><b>skipcache</b>: Do not use cache. If TRUE might be very slow (default is FALSE)

</li><li><b>summary</b>: Print summary details of your GPX (default is FALSE)

</li><li><b>summarytotlen</b>: Print Total distance in summary table (default is FALSE)

</li><li><b>summarymaxele</b>: Print Max Elevation in summary table (default is FALSE)

</li><li><b>summaryminele</b>: Print Min Elevation in summary table (default is FALSE)

</li><li><b>summaryeleup</b>: Print Total climbing in summary table (default is FALSE)

</li><li><b>summaryeledown</b>: Print Total descent in summary table (default is FALSE)

</li><li><b>summaryavgspeed</b>: Print Average Speed in summary table (default is FALSE)

</li><li><b>summaryavgcad</b>: Print Average Cadence in summary table (default is FALSE)

</li><li><b>summaryavghr</b>: Print Average Heart Rate in summary table (default is FALSE)

</li><li><b>summaryavgtemp</b>: Print Average Temperature in summary table (default is FALSE)

</li><li><b>summarytotaltime</b>: Print Total time in summary table (default is FALSE)  </li>

			</ul>



			<p>

				<a href="http://devfarm.it/forums/forum/wp-gpx-maps/">Bugs, problems, thanks and anything else here!</a>

			</p>



		</p>

	</div>



<?php

	}



}

?>
