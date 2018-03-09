<?php
/*
Plugin Name: WP-GPX-Maps
Plugin URI: http://www.devfarm.it/
Description: Draws a GPX track with altitude chart
Version: 1.5.00
Author: Bastianon Massimo
Author URI: http://www.devfarm.it/
*/

//error_reporting (E_ALL);

include 'wp-gpx-maps_utils.php';
include 'wp-gpx-maps_admin.php';

add_shortcode('sgpx','handle_WP_GPX_Maps_Shortcodes');
add_shortcode('sgpxf','handle_WP_GPX_Maps_folder_Shortcodes');
register_activation_hook(__FILE__,'WP_GPX_Maps_install'); 
register_deactivation_hook( __FILE__, 'WP_GPX_Maps_remove');
add_filter('plugin_action_links', 'WP_GPX_Maps_action_links', 10, 2);
add_action('wp_print_styles', 'print_WP_GPX_Maps_styles' );
add_action('wp_enqueue_scripts', 'enqueue_WP_GPX_Maps_scripts');
add_action('plugins_loaded' ,'WP_GPX_Maps_lang_init');

function WP_GPX_Maps_lang_init() {
   if (function_exists('load_plugin_textdomain')) {
      load_plugin_textdomain('wp-gpx-maps', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
   }
}

function WP_GPX_Maps_action_links($links, $file) {
    static $this_plugin;
 
    if (!$this_plugin) {
        $this_plugin = plugin_basename(__FILE__);
    }
 
    // check to make sure we are on the correct plugin
    if ($file == $this_plugin) {
        // the anchor tag and href to the URL we want. For a "Settings" link, this needs to be the url of your settings page
        $settings_link = '<a href="' . get_bloginfo('wpurl') . '/wp-admin/options-general.php?page=WP-GPX-Maps">Settings</a>';
        // add the link to the list
        array_unshift($links, $settings_link);
    }
 
    return $links;
}

function enqueue_WP_GPX_Maps_scripts()
{		
	$wpgpxmaps_googlemapsv3_apikey = get_option('wpgpxmaps_googlemapsv3_apikey');
	wp_enqueue_script( 'jquery' );	
	if ($wpgpxmaps_googlemapsv3_apikey)	{		
		wp_enqueue_script( 'googlemaps', '//maps.googleapis.com/maps/api/js?key='.$wpgpxmaps_googlemapsv3_apikey, null, null);					
	}	
	else {		
		wp_enqueue_script( 'googlemaps', '//maps.googleapis.com/maps/api/js', null, null);
	}	
	wp_enqueue_script( 'chartjs', '//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js', array(), "2.7.2" ); 
    wp_enqueue_script( 'WP-GPX-Maps', plugins_url('/WP-GPX-Maps.js', __FILE__), array('jquery','googlemaps','chartjs'), "1.5.00");
}

function print_WP_GPX_Maps_styles()
{
?>

<style type="text/css">
	.wpgpxmaps { clear:both; }
	#content .wpgpxmaps img,
	.entry-content .wpgpxmaps img,
	.wpgpxmaps img { max-width: none; width: none; padding:0; background:none; margin:0; border:none; }
	.wpgpxmaps .ngimages { display:none; }
	.wpgpxmaps .myngimages { border:1px solid #fff;position:absolute;cursor:pointer;margin:0;z-index:1; }
	.wpgpxmaps_summary .summarylabel { }
	.wpgpxmaps_summary .summaryvalue { font-weight: bold; }
	.wpgpxmaps .report { line-height:120%; }
	.wpgpxmaps .gmnoprint div:first-child {  }	
	.wpgpxmaps .wpgpxmaps_osm_footer {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 13px;
		margin: 0;
		z-index: 999;
		background: WHITE;
		font-size: 12px;
	}
	
	.wpgpxmaps .wpgpxmaps_osm_footer span {
		background: WHITE;
		padding: 0 6px 6px 6px;
		vertical-align: baseline;
		position: absolute;
		bottom: 0;
	}	
	
</style>
<?php
}

function findValue($attr, $attributeName, $optionName, $defaultValue)
{
	$val = '';
	if ( isset($attr[$attributeName]) )	{
		$val = $attr[$attributeName];
	}
	if ($val == '')	{
		$val = get_option($optionName);
	}
	if ($val == '' && isset($_GET[$attributeName]) && $attributeName != "download")	{
		$val = $_GET[$attributeName];
	}
	if ($val == '')	{
		$val = $defaultValue;
	}
	return $val;
}

function handle_WP_GPX_Maps_folder_Shortcodes($attr, $content=''){

	$folder =             findValue($attr, "folder",             "",                                 "");
	$pointsoffset =       findValue($attr, "pointsoffset",       "wpgpxmaps_pointsoffset",     		 10);
	$distanceType =       findValue($attr, "distanceType",        "wpgpxmaps_distance_type", 		 0);
	$donotreducegpx =     findValue($attr, "donotreducegpx",     "wpgpxmaps_donotreducegpx", 		 false);
	$uom =                findValue($attr, "uom",                "wpgpxmaps_unit_of_measure",        "0");
	
	// fix folder path
	$sitePath = sitePath();	
	$folder = trim($folder);
	$folder = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, $folder);
	$folder = $sitePath . $folder;	
	
	$files = scandir($folder);
	
	foreach($files as $file) {
	
		if (substr($file, - 4) == ".gpx" ) {
		
			$gpx = $folder . DIRECTORY_SEPARATOR . $file;
			$points = getPoints($gpx, $pointsoffset, $donotreducegpx, $distanceType);
				
			$points_maps = '';
			$points_graph_dist = '';
			$points_graph_ele = '';
				
			if (is_array ($points_x_lat))
			foreach(array_keys($points_x_lat) as $i) {
				
				$_lat = (float)$points_x_lat[$i];
				$_lon = (float)$points_x_lon[$i];
				
				if ( $_lat == 0 && $_lon == 0 )
				{
					$points_maps .= 'null,';
					$points_graph_dist .= 'null,';
					$points_graph_ele .= 'null,';

				}
				else {
					$points_maps .= '['.number_format((float)$points_x_lat[$i], 7 , '.' , '' ).','.number_format((float)$points_x_lon[$i], 7 , '.' , '' ).'],';	

					$_ele = (float)$points->ele[$i];	
					$_dist = (float)$points->dist[$i];	
					
					if ($uom == '1')
					{
						// Miles and feet			
						$_dist *= 0.000621371192;
						$_ele *= 3.2808399;
					} else if ($uom == '2')
					{
						// meters / kilometers
						$_dist = (float)($_dist / 1000);
					} else if ($uom == '3')
					{
						// meters / kilometers / nautical miles
						$_dist = (float)($_dist / 1000 / 1.852);
					} else if ($uom == '4')
					{
						// meters / miles
						$_dist *= 0.000621371192;
					} else if ($uom == '5')
					{
						// meters / kilometers / nautical miles and feet
						$_dist = (float)($_dist / 1000 / 1.852);
						$_ele *= 3.2808399;
					}
					
					$points_graph_dist .= number_format ( $_dist , 2 , '.' , '' ).',';
					$points_graph_ele .= number_format ( $_ele , 2 , '.' , '' ).',';
						
				}
			}	
			
			print_r($points);
		
		}
	}
}


function handle_WP_GPX_Maps_Shortcodes($attr, $content='')
{

	$error = '';

	$gpx =                findValue($attr, "gpx",                "",                          		 "");
	$w =                  findValue($attr, "width",              "wpgpxmaps_width",           		 "100%");
	$mh =                 findValue($attr, "mheight",            "wpgpxmaps_height",          		 "450px");
	$mt =                 findValue($attr, "mtype",              "wpgpxmaps_map_type",        		 "HYBRID");
	$gh =                 findValue($attr, "gheight",            "wpgpxmaps_graph_height",    		 "200px");
	$showCad =            findValue($attr, "showcad",            "wpgpxmaps_show_cadence",   		 false);
	$showHr =             findValue($attr, "showhr",             "wpgpxmaps_show_hr",   		 	 false);
	$showAtemp =          findValue($attr, "showatemp",          "wpgpxmaps_show_atemp",   		 	 false);
	$showW =              findValue($attr, "waypoints",          "wpgpxmaps_show_waypoint",   		 false);
	$showEle =            findValue($attr, "showele",            "wpgpxmaps_show_elevation",   		 "true");
	$showSpeed =          findValue($attr, "showspeed",          "wpgpxmaps_show_speed",      		 false);
	$showGrade =          findValue($attr, "showgrade",          "wpgpxmaps_show_grade",      		 false);	
	$zoomOnScrollWheel =  findValue($attr, "zoomonscrollwheel",  "wpgpxmaps_zoomonscrollwheel",      false);
	$donotreducegpx =     findValue($attr, "donotreducegpx",     "wpgpxmaps_donotreducegpx", 		 false);
	$pointsoffset =       findValue($attr, "pointsoffset",       "wpgpxmaps_pointsoffset",     		 10);
	$uom =                findValue($attr, "uom",                "wpgpxmaps_unit_of_measure",        "0");
	$uomspeed =           findValue($attr, "uomspeed",           "wpgpxmaps_unit_of_measure_speed",  "0");
	$color_map =          findValue($attr, "mlinecolor",         "wpgpxmaps_map_line_color",         "#3366cc");
	$color_graph =        findValue($attr, "glinecolor",         "wpgpxmaps_graph_line_color",       "#3366cc");
	$color_graph_speed =  findValue($attr, "glinecolorspeed",    "wpgpxmaps_graph_line_color_speed", "#ff0000");
	$color_graph_hr =  	  findValue($attr, "glinecolorhr",       "wpgpxmaps_graph_line_color_hr",    "#ff77bd");
	$color_graph_atemp =  findValue($attr, "glinecoloratemp",    "wpgpxmaps_graph_line_color_atemp", "#ff77bd");
	$color_graph_cad =    findValue($attr, "glinecolorcad",      "wpgpxmaps_graph_line_color_cad",   "#beecff");
	$color_graph_grade =  findValue($attr, "glinecolorgrade",    "wpgpxmaps_graph_line_color_grade",  "#beecff");
	
	$chartFrom1 =         findValue($attr, "chartfrom1",         "wpgpxmaps_graph_offset_from1",     "");
	$chartTo1 =           findValue($attr, "chartto1",           "wpgpxmaps_graph_offset_to1",       "");
	$chartFrom2 =         findValue($attr, "chartfrom2",         "wpgpxmaps_graph_offset_from2", 	 "");
	$chartTo2 =           findValue($attr, "chartto2",           "wpgpxmaps_graph_offset_to2", 		 "");
	$startIcon =          findValue($attr, "starticon",          "wpgpxmaps_map_start_icon", 		 "");
	$endIcon =            findValue($attr, "endicon",            "wpgpxmaps_map_end_icon", 			 "");
	$currentIcon =        findValue($attr, "currenticon",        "wpgpxmaps_map_current_icon", 		 "");
	$waypointIcon =       findValue($attr, "waypointicon",       "wpgpxmaps_map_waypoint_icon", 	 "");
	$ngGalleries =        findValue($attr, "nggalleries",        "wpgpxmaps_map_ngGalleries", 		 "");
	$ngImages =           findValue($attr, "ngimages",           "wpgpxmaps_map_ngImages", 		     "");
	// folgende Zeile hinzugefügt:
	$attachments =        findValue($attr, "attachments",        "wpgpxmaps_map_attachments", 	     false);
	$download =           findValue($attr, "download",           "wpgpxmaps_download", 		     	 "");
	$dtoffset =           findValue($attr, "dtoffset",           "wpgpxmaps_dtoffset", 		     	 0);
	$distanceType =       findValue($attr, "distanceType",       "wpgpxmaps_distance_type", 		 0);
	
	$skipcache =          findValue($attr, "skipcache",          "wpgpxmaps_skipcache", 	     	 "");
	
	$summary =            findValue($attr, "summary",            "wpgpxmaps_summary", 		     	 "");	
	$p_tot_len =          findValue($attr, "summarytotlen",      "wpgpxmaps_summary_tot_len",      	 false);
	$p_max_ele =          findValue($attr, "summarymaxele",      "wpgpxmaps_summary_max_ele",      	 false);
	$p_min_ele =          findValue($attr, "summaryminele",      "wpgpxmaps_summary_min_ele",      	 false);
	$p_total_ele_up =     findValue($attr, "summaryeleup",       "wpgpxmaps_summary_total_ele_up",   false);
	$p_total_ele_down =   findValue($attr, "summaryeledown",     "wpgpxmaps_summary_total_ele_down", false);
	$p_avg_speed =        findValue($attr, "summaryavgspeed",    "wpgpxmaps_summary_avg_speed",      false);
	$p_total_time =       findValue($attr, "summarytotaltime",   "wpgpxmaps_summary_total_time",     false);
	
	$usegpsposition =     findValue($attr, "usegpsposition",     "wpgpxmaps_usegpsposition",         false);
	$currentpositioncon = findValue($attr, "currentpositioncon", "wpgpxmaps_currentpositioncon", 	 "");
	
	$colors_map = "\"".implode("\",\"",(explode(" ",$color_map)))."\"";
	
	$gpxurl = $gpx;
		
	// Add file modification time to cache filename to catch new uploads with same file name
	$mtime = sitePath() . str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, trim($gpx));
	if(file_exists($mtime)) {
		$mtime = filemtime($mtime);
	} else {
		$mtime = 0;
	}
	$cacheFileName = "$gpx,$mtime,$w,$mh,$mt,$gh,$showEle,$showW,$showHr,$showAtemp,$showCad,$donotreducegpx,$pointsoffset,$showSpeed,$showGrade,$uomspeed,$uom,$distanceType,v1.3.9";

	$cacheFileName = md5($cacheFileName);
	
	$gpxcache = gpxCacheFolderPath();
	
	if(!(file_exists($gpxcache) && is_dir($gpxcache)))
		@mkdir($gpxcache,0755,true);
	
	$gpxcache.= DIRECTORY_SEPARATOR.$cacheFileName.".tmp";
	
	// Try to load cache
	if (file_exists($gpxcache) && !($skipcache == true)) {
	
		try {
			$cache_str = file_get_contents($gpxcache);
			$cache_obj = unserialize($cache_str);
			$points_maps = $cache_obj["points_maps"];
			$points_x_time = $cache_obj["points_x_time"];
			$points_x_lat = $cache_obj["points_x_lat"];
			$points_x_lon = $cache_obj["points_x_lon"];
			$points_graph_dist = $cache_obj["points_graph_dist"];
			$points_graph_ele = $cache_obj["points_graph_ele"];
			$points_graph_speed = $cache_obj["points_graph_speed"];
			$points_graph_hr = $cache_obj["points_graph_hr"];
			$points_graph_atemp = $cache_obj["points_graph_atemp"];
			$points_graph_cad = $cache_obj["points_graph_cad"];
			$points_graph_grade = $cache_obj["points_graph_grade"];
			$waypoints = $cache_obj["waypoints"];
			$max_ele = $cache_obj["max_ele"];
			$min_ele = $cache_obj["min_ele"];
			$max_time = $cache_obj["max_time"];
			$min_time = $cache_obj["min_time"];
			$total_ele_up = $cache_obj["total_ele_up"];
			$total_ele_down = $cache_obj["total_ele_down"];
			$avg_speed = $cache_obj["avg_speed"];
			$tot_len = $cache_obj["tot_len"];
			
		} catch (Exception $e) {
			$points_maps = '';
			$points_x_time = '';
			$points_x_lat = '';
			$points_x_lon = '';
			$points_graph_dist = '';
			$points_graph_ele = '';
			$points_graph_speed = '';
			$points_graph_hr = '';
			$points_graph_atemp = '';
			$points_graph_cad = '';
			$points_graph_grade = '';
			$waypoints= '';
			$max_ele = 0;
			$min_ele = 0;
			$max_time = 0;
			$min_time = 0;
			$total_ele_up = 0;
			$total_ele_down = 0;
			$avg_speed = 0;
			$tot_len = 0;
		}
	}
	
	$isGpxUrl = (preg_match('/^(http(s)?\:\/\/)/', trim($gpx)) == 1);

	if ((!isset($points_maps) || $points_maps == '') && $gpx != '')	{
	//if (true)	{
	
		$sitePath = sitePath();
		
		$gpx = trim($gpx);
		
		if ($isGpxUrl == true) {
			$gpx = downloadRemoteFile($gpx);
		}
		else {
			$gpx = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, $gpx);
			$gpx = $sitePath . $gpx;
		}

		if ($gpx == '')	{
			return "No gpx found";
		}
		
		$points = getPoints( $gpx, $pointsoffset, $donotreducegpx, $distanceType);
		
		$points_maps = '';
		$points_graph_dist = '';
		$points_graph_ele = '';
		$points_graph_speed = '';
		$points_graph_hr = '';
		$points_graph_atemp = '';
		$points_graph_cad = '';
		$points_graph_grade = '';
		$waypoints = '';

		$points_x_time = $points->dt;
		$points_x_lat = $points->lat;
		$points_x_lon = $points->lon;
		
		$max_ele = $points->maxEle;
		$min_ele = $points->minEle;
		$max_time = $points->maxTime;
		$min_time =  $points->minTime;
		$total_ele_up = $points->totalEleUp;
		$total_ele_down = $points->totalEleDown;
		$avg_speed = $points->avgSpeed;
		$tot_len = $points->totalLength;
			
		if (is_array ($points_x_lat))
		foreach(array_keys($points_x_lat) as $i) {
			
			$_lat = (float)$points_x_lat[$i];
			$_lon = (float)$points_x_lon[$i];
			
			if ( $_lat == 0 && $_lon == 0 )
			{
				$points_maps .= 'null,';
				$points_graph_dist .= 'null,';
				$points_graph_ele .= 'null,';
					
				if ($showSpeed == true) 
					$points_graph_speed .= 'null,';

				if ($showHr == true)
					$points_graph_hr .= 'null,';
					
				if ($showAtemp == true)
					$points_graph_atemp .= 'null,';
					
				if ($showCad == true)
					$points_graph_cad .= 'null,';
					
				if ($showGrade == true)
					$points_graph_grade .= 'null,';
					
			}
			else {
				$points_maps .= '['.number_format((float)$points_x_lat[$i], 7 , '.' , '' ).','.number_format((float)$points_x_lon[$i], 7 , '.' , '' ).'],';	

				$_ele = (float)$points->ele[$i];	
				$_dist = (float)$points->dist[$i];	
				
				if ($uom == '1')
				{
					// Miles and feet			
					$_dist *= 0.000621371192;
					$_ele *= 3.2808399;
				} else if ($uom == '2')
				{
					// meters / kilometers
					$_dist = (float)($_dist / 1000);
				} else if ($uom == '3')
				{
					// meters / kilometers / nautical miles
					$_dist = (float)($_dist / 1000 / 1.852);
 				} else if ($uom == '4')
				{
					// meters / miles
					$_dist *= 0.000621371192;
				} else if ($uom == '5')
				{
					// meters / kilometers / nautical miles and feet
					$_dist = (float)($_dist / 1000 / 1.852);
					$_ele *= 3.2808399;
				}
				
				$points_graph_dist .= number_format ( $_dist , 2 , '.' , '' ).',';
				$points_graph_ele .= number_format ( $_ele , 2 , '.' , '' ).',';
					
				if ($showSpeed == true) {
				
					$_speed = (float)$points->speed[$i];
					
					$points_graph_speed .= convertSpeed($_speed,$uomspeed).',';
				}
				
				if ($showHr == true) {
					$points_graph_hr .= number_format ( $points->hr[$i] , 2 , '.' , '' ).',';
				}
				
				if ($showAtemp == true) {
					$points_graph_atemp .= number_format ( $points->atemp[$i] , 1 , '.' , '' ).',';
				}
				
				if ($showCad == true) {
					$points_graph_cad .= number_format ( $points->cad[$i] , 2 , '.' , '' ).',';
				}
				
				if ($showGrade == true) {
					$points_graph_grade .= number_format ( $points->grade[$i] , 2 , '.' , '' ).',';
				}
				
			}
		}	

		if ($uom == '1') {
			// Miles and feet			
			$tot_len = round($tot_len * 0.000621371192, 2)." mi";
			$max_ele = round($max_ele * 3.2808399, 0)." ft";
			$min_ele = round($min_ele * 3.2808399, 0)." ft";
			$total_ele_up = round($total_ele_up * 3.2808399, 0)." ft";
			$total_ele_down = round($total_ele_down * 3.2808399, 0)." ft";			
		} 
		else if ($uom == '2') {
			// meters / kilometers
			$tot_len = round($tot_len / 1000, 2)." km";
			$max_ele = round($max_ele, 0) ." m";
			$min_ele = round($min_ele, 0) ." m";
			$total_ele_up = round($total_ele_up, 0) ." m";
			$total_ele_down = round($total_ele_down, 0) ." m";
		} 
		else if ($uom == '3') {
			// meters / kilometers / nautical miles
			$tot_len = round($tot_len / 1000/1.852, 2)." NM";
			$max_ele = round($max_ele, 0) ." m";
			$min_ele = round($min_ele, 0) ." m";
			$total_ele_up = round($total_ele_up, 0) ." m";
			$total_ele_down = round($total_ele_down, 0) ." m";
		}
		else if ($uom == '4') {
			// meters / kilometers / nautical miles
			$tot_len = round($tot_len * 0.000621371192, 2)." mi";
			$max_ele = round($max_ele, 0) ." m";
			$min_ele = round($min_ele, 0) ." m";
			$total_ele_up = round($total_ele_up, 0) ." m";
			$total_ele_down = round($total_ele_down, 0) ." m";
		}
		else if ($uom == '5') {
			// meters / kilometers / nautical miles and feet
			$tot_len = round($tot_len / 1000/1.852, 2)." NM";
			$max_ele = round($max_ele * 3.2808399, 0)." ft";
			$min_ele = round($min_ele * 3.2808399, 0)." ft";
			$total_ele_up = round($total_ele_up * 3.2808399, 0)." ft";
			$total_ele_down = round($total_ele_down * 3.2808399, 0)." ft";
		}
		else {
			// meters / meters
			$tot_len = round($tot_len, 0) ." m";
			$max_ele = round($max_ele, 0) ." m";
			$min_ele = round($min_ele, 0) ." m";
			$total_ele_up = round($total_ele_up, 0) ." m";
			$total_ele_down = round($total_ele_down, 0) ." m";
		}

		$avg_speed = convertSpeed($avg_speed,$uomspeed,true);
		$waypoints = '[]';
		
		if ($showW == true) {
			$wpoints = getWayPoints($gpx);
			/*
			foreach ($wpoints as $p) {
				$waypoints .= '['.number_format ( (float)$p[0] , 7 , '.' , '' ).','.number_format ( (float)$p[1] , 7 , '.' , '' ).',\''.unescape($p[4]).'\',\''.unescape($p[5]).'\',\''.unescape($p[7]).'\'],';
			}
			*/
			$waypoints = json_encode($wpoints);
		}

		if ($showEle == "false")
		{
			$points_graph_ele = "";
		}

		$p="/(,|,null,)$/";

		$points_maps = preg_replace($p, "", $points_maps);

		$points_graph_dist = preg_replace($p, "", $points_graph_dist);
		$points_graph_ele = preg_replace($p, "", $points_graph_ele);
		$points_graph_speed = preg_replace($p, "", $points_graph_speed);
		$points_graph_hr = preg_replace($p, "", $points_graph_hr);
		$points_graph_atemp = preg_replace($p, "", $points_graph_atemp);
		$points_graph_cad = preg_replace($p, "", $points_graph_cad);
		$points_graph_grade = preg_replace($p, "", $points_graph_grade);
					
		$waypoints = preg_replace($p, "", $waypoints);
		
		if (preg_match("/^(0,?)+$/", $points_graph_dist)) 
			$points_graph_dist = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_ele)) 
			$points_graph_ele = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_speed)) 
			$points_graph_speed = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_hr)) 
			$points_graph_hr = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_hr)) 
			$points_graph_hr = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_atemp)) 
			$points_graph_atemp = "";
			
		if (preg_match("/^(0,?)+$/", $points_graph_grade)) 
			$points_graph_grade = "";
		
	}
	
	$ngimgs_data = '';
	if ( $ngGalleries != '' || $ngImages != '' ) {
	
	//print_r($points);
	
		$ngimgs = getNGGalleryImages($ngGalleries, $ngImages, $points_x_time, $points_x_lat, $points_x_lon, $dtoffset, $error);
		$ngimgs_data ='';	
		foreach ($ngimgs as $img) {		
			$data = $img['data'];
			$data = str_replace("\n","",$data);
			$ngimgs_data .= '<span lat="'.$img['lat'].'" lon="'.$img['lon'].'">'.$data.'</span>';
		}
	}
// Folgende Zeilen hinzugefügt
	if ($attachments == true) {
		$attimgs = getAttachedImages($points_x_time, $points_x_lat, $points_x_lon, $dtoffset, $error);
		foreach ($attimgs as $img) {		
			$data = $img['data'];
			$data = str_replace("\n","",$data);
			$ngimgs_data .= '<span lat="'.$img['lat'].'" lon="'.$img['lon'].'">'.$data.'</span>';
		}
	}
	
	if (!($skipcache == true)) {
	
		@file_put_contents($gpxcache, 
					   serialize(array( "points_maps"         => $points_maps, 
										"points_x_time"       => $points_x_time,
										"points_x_lat"        => $points_x_lat,
										"points_x_lon"        => $points_x_lon,
										"points_graph_dist"   => $points_graph_dist, 
										"points_graph_ele"    => $points_graph_ele, 
										"points_graph_speed"  => $points_graph_speed, 
										"points_graph_hr"     => $points_graph_hr, 
										"points_graph_atemp"  => $points_graph_atemp, 
										"points_graph_cad"    => $points_graph_cad,
										"points_graph_grade"  => $points_graph_grade,
										"waypoints"           => $waypoints,
										"max_ele"             => $max_ele,
										"min_ele"             => $min_ele,
										"total_ele_up"        => $total_ele_up,
										"total_ele_down"      => $total_ele_down,
										"avg_speed"           => $avg_speed,
										"tot_len"             => $tot_len,
										"max_time"			  => $max_time,
										"min_time"			  => $min_time
										)
								), 
					   LOCK_EX);
		@chmod($gpxcache,0755);		
	}
	
	$hideGraph = ($gh == "0" || $gh == "0px");
	
	global $post;
	$r = $post->ID."_".rand(1,5000000);	
	
	$output = '
		<div id="wpgpxmaps_'.$r.'" class="wpgpxmaps">
			<div id="map_'.$r.'_cont" style="width:'.$w.'; height:'.$mh.';position:relative" >
				<div id="map_'.$r.'" style="width:'.$w.'; height:'.$mh.'"></div>
				<div id="wpgpxmaps_'.$r.'_osm_footer" class="wpgpxmaps_osm_footer" style="display:none;"><span> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</span></div>			
			</div>
			<canvas id="myChart_'.$r.'" class="plot" style="width:'.$w.'; height:'.$gh.'"></canvas>
			<div id="ngimages_'.$r.'" class="ngimages" style="display:none">'.$ngimgs_data.'</div>
			<div id="report_'.$r.'" class="report"></div>
		</div>
		'. $error .'
		<script type="text/javascript">
		
			jQuery(document).ready(function() {

				jQuery("#wpgpxmaps_'.$r.'").wpgpxmaps({ 
					targetId    : "'.$r.'",
					mapType     : "'.$mt.'",
					mapData     : ['.$points_maps.'],
					graphDist   : ['.($hideGraph ? '' : $points_graph_dist).'],
					graphEle    : ['.($hideGraph ? '' : $points_graph_ele).'],
					graphSpeed  : ['.($hideGraph ? '' : $points_graph_speed).'],
					graphHr     : ['.($hideGraph ? '' : $points_graph_hr).'],
					graphAtemp  : ['.($hideGraph ? '' : $points_graph_atemp).'],
					graphCad    : ['.($hideGraph ? '' : $points_graph_cad).'],
					graphGrade  : ['.($hideGraph ? '' : $points_graph_grade).'],
					waypoints   : '.$waypoints.',
					unit        : "'.$uom.'",
					unitspeed   : "'.$uomspeed.'",
					color1      : ['.$colors_map.'],
					color2      : "'.$color_graph.'",
					color3      : "'.$color_graph_speed.'",
					color4      : "'.$color_graph_hr.'",
					color5      : "'.$color_graph_cad.'",
					color6      : "'.$color_graph_grade.'",
					color7      : "'.$color_graph_atemp.'",
					chartFrom1  : "'.$chartFrom1.'",
					chartTo1    : "'.$chartTo1.'",
					chartFrom2  : "'.$chartFrom2.'",
					chartTo2    : "'.$chartTo2.'",
					startIcon   : "'.$startIcon.'",
					endIcon     : "'.$endIcon.'",
					currentIcon : "'.$currentIcon.'",
					waypointIcon : "'.$waypointIcon.'",
					currentpositioncon : "'.$currentpositioncon.'",
					usegpsposition : "'.$usegpsposition.'",
					zoomOnScrollWheel : "'.$zoomOnScrollWheel.'", 
					ngGalleries : ['.$ngGalleries.'],
					ngImages : ['.$ngImages.'],
					pluginUrl : "'.plugins_url().'",
					TFApiKey : "'.get_option('wpgpxmaps_openstreetmap_apikey').'",
					langs : { altitude              : "'.__("Altitude", "wp-gpx-maps").'",
							  currentPosition       : "'.__("Current Position", "wp-gpx-maps").'",
							  speed                 : "'.__("Speed", "wp-gpx-maps").'", 
							  grade                 : "'.__("Grade", "wp-gpx-maps").'", 
							  heartRate             : "'.__("Heart rate", "wp-gpx-maps").'", 
							  atemp             	: "'.__("Temperature", "wp-gpx-maps").'", 
							  cadence               : "'.__("Cadence", "wp-gpx-maps").'",
							  goFullScreen          : "'.__("Go Full Screen", "wp-gpx-maps").'",
							  exitFullFcreen        : "'.__("Exit Full Screen", "wp-gpx-maps").'",
							  hideImages            : "'.__("Hide Images", "wp-gpx-maps").'",
							  showImages            : "'.__("Show Images", "wp-gpx-maps").'",
							  backToCenter		    : "'.__("Back to center", "wp-gpx-maps").'"
							}
				});				
				
			});
	
		</script>';	

	// print summary
	if ($summary=='true' && ( $points_graph_speed != '' || $points_graph_ele != '' || $points_graph_dist != '') ) {
	
		$output .= "<div id='wpgpxmaps_summary_".$r."' class='wpgpxmaps_summary'>";
		if ($points_graph_dist != '' && $p_tot_len == 'true')
		{
			$output .= "<span class='totlen'><span class='summarylabel'>".__("Total distance", "wp-gpx-maps").":</span><span class='summaryvalue'> $tot_len</span></span><br />";
		}
		if ($points_graph_ele != '')
		{
			if ($p_max_ele == 'true')
				$output .= "<span class='maxele'><span class='summarylabel'>".__("Max elevation", "wp-gpx-maps").":</span><span class='summaryvalue'> $max_ele</span></span><br />";
			if ($p_min_ele == 'true')
				$output .= "<span class='minele'><span class='summarylabel'>".__("Min elevation", "wp-gpx-maps").":</span><span class='summaryvalue'> $min_ele</span></span><br />";
			if ($p_total_ele_up == 'true')
				$output .= "<span class='totaleleup'><span class='summarylabel'>".__("Total climbing", "wp-gpx-maps").":</span><span class='summaryvalue'> $total_ele_up</span></span><br />";
			if ($p_total_ele_down == 'true')
				$output .= "<span class='totaleledown'><span class='summarylabel'>".__("Total descent", "wp-gpx-maps").":</span><span class='summaryvalue'> $total_ele_down</span></span><br />";
		}
		if ($points_graph_speed != '' && $p_avg_speed == 'true')
		{
			$output .= "<span class='avgspeed'><span class='summarylabel'>".__("Average speed", "wp-gpx-maps").":</span><span class='summaryvalue'> $avg_speed</span></span><br />";
		}
		if ($p_total_time == 'true' && $max_time > 0)
		{		
			$time_diff = date("H:i:s", ($max_time - $min_time));
			$output .= "<span class='totaltime'><span class='summarylabel'>".__("Total Time", "wp-gpx-maps").":</span><span class='summaryvalue'> $time_diff</span></span><br />";			
		}
		$output .= "</div>";
	}
	
	// print download link
	if ($download=='true' && $gpxurl != '') {
		if ($isGpxUrl == true) {

		}
		else {
			// wpml fix
			$dummy = ( defined('WP_SITEURL') ) ? WP_SITEURL : get_bloginfo('url');
			$gpxurl = $dummy.$gpxurl;
		}		
		$output.="<a href='$gpxurl' target='_new' download>".__("Download", "wp-gpx-maps")."</a>";
	}

	return $output;
}

function convertSeconds($s){
	if ($s ==0)		return 0;
	$s =  1.0 / $s;
	$_sSecT = $s * 60; //sec/km
	$_sMin = floor ( $_sSecT / 60 );
	$_sSec = $_sSecT - $_sMin * 60;
	return $_sMin + $_sSec / 100;
}

function convertSpeed($speed,$uomspeed, $addUom = false){
	$uom = '';
	if ($uomspeed == '6') /* min/100 meters */	{		
		$speed = 1 / $speed * 100 / 60 ;		
		$uom = " min/100m";	
	} 	else if ($uomspeed == '5') /* knots */	{
		$speed *= 1.94384449;		
		$uom = " knots";
	} 	else if ($uomspeed == '4') /* min/mi */	{
		$speed = convertSeconds($speed * 0.037282272);			
		$uom = " min/mi";
	} 	else if ($uomspeed == '3') /* min/km */	{
		$speed = convertSeconds($speed * 0.06);		
		$uom = " min/km";
	} 	else if ($uomspeed == '2') /* miles/h */	{
		$speed *= 2.2369362920544025;		
		$uom = " mi/h";
	} 	else if ($uomspeed == '1') /* km/h */	{
		$speed *= 3.6;		
		$uom = " km/h";
	}	else	/* dafault m/s */	{				
		$uom = " m/s";			
	}	
	
	if ($addUom == true)	{		
		return number_format ( $speed , 2 , '.' , '' ) . $uom;	
	}	else	{		
		return number_format ( $speed , 2 , '.' , '' );	
	}
}

function downloadRemoteFile($remoteFile)
{
	try
	{
		$newfname = tempnam ( '/tmp', 'gpx' );	
		
		if (function_exists ( "file_put_contents" )) // PHP 5.1.0 +
		{					
			file_put_contents($newfname , fopen($remoteFile, 'r'));
			return $newfname;
		} 
		
		$file = fopen ($remoteFile, "rb");
		if ($file) {
			$newf = fopen ($newfname, "wb");

			if ($newf)
			while(!feof($file)) {
				fwrite($newf, fread($file, 1024 * 8 ), 1024 * 8 );
			}
		}

		if ($file) {
			fclose($file);
		}

		if ($newf) {
			fclose($newf);
		}
			
		return $newfname;		
		
	} catch (Exception $e) {
	
		print_r($e);
		
		return '';
	}
}

function unescape($value)
{
	$value = str_replace("'", "\'", $value);
	$value = str_replace(array("\n","\r"), "", $value);
	return $value;
}

function WP_GPX_Maps_install() {
	add_option("wpgpxmaps_width", '100%', '', 'yes');
	add_option("wpgpxmaps_graph_height", '200px', '', 'yes');
	add_option("wpgpxmaps_height", '450px', '', 'yes');
	add_option('wpgpxmaps_map_type','HYBRID','','yes');
	add_option('wpgpxmaps_show_waypoint','','','yes');
	add_option('wpgpxmaps_show_speed','','','yes');
	add_option('wpgpxmaps_pointsoffset','10','','yes');
	add_option('wpgpxmaps_donotreducegpx','true','','yes');
	add_option("wpgpxmaps_unit_of_measure", '0', '', 'yes');
	add_option("wpgpxmaps_unit_of_measure_speed", '0', '', 'yes');
	add_option("wpgpxmaps_graph_line_color", '#3366cc', '', 'yes');
	add_option("wpgpxmaps_graph_line_color_speed", '#ff0000', '', 'yes');
	add_option("wpgpxmaps_map_line_color", '#3366cc', '', 'yes');
	add_option("wpgpxmaps_graph_line_color_cad", '#beecff', '', 'yes');
	add_option("wpgpxmaps_graph_offset_from1", '', '', 'yes');
	add_option("wpgpxmaps_graph_offset_to1", '', '', 'yes');
	add_option("wpgpxmaps_graph_offset_from2", '', '', 'yes');
	add_option("wpgpxmaps_graph_offset_to2", '', '', 'yes');
	add_option("wpgpxmaps_map_start_icon", '', '', 'yes');
	add_option("wpgpxmaps_map_end_icon", '', '', 'yes');
	add_option("wpgpxmaps_map_current_icon", '', '', 'yes');
	add_option("wpgpxmaps_map_waypoint_icon", '', '', 'yes');
	add_option("wpgpxmaps_map_nggallery", '', '', 'yes');
	add_option("wpgpxmaps_show_hr", '', '', 'yes');
	add_option("wpgpxmaps_show_atemp", '', '', 'yes');
	add_option("wpgpxmaps_graph_line_color_hr", '#ff77bd', '', 'yes');
	add_option("wpgpxmaps_graph_line_color_atemp", '#ff77bd', '', 'yes');
	add_option('wpgpxmaps_show_cadence','','','yes');
	add_option('wpgpxmaps_zoomonscrollwheel','','','yes');
	add_option('wpgpxmaps_download','','','yes');
	add_option('wpgpxmaps_summary','','','yes');	
	add_option('wpgpxmaps_skipcache','','','yes');
}

function WP_GPX_Maps_remove() {
	delete_option('wpgpxmaps_width');
	delete_option('wpgpxmaps_graph_height');
	delete_option('wpgpxmaps_height');
	delete_option('wpgpxmaps_map_type');
	delete_option('wpgpxmaps_show_waypoint');
	delete_option('wpgpxmaps_show_speed');
	delete_option('wpgpxmaps_pointsoffset');
	delete_option('wpgpxmaps_donotreducegpx');
	delete_option('wpgpxmaps_unit_of_measure');
	delete_option('wpgpxmaps_unit_of_measure_speed');
	delete_option('wpgpxmaps_graph_line_color');
	delete_option('wpgpxmaps_map_line_color');
	delete_option('wpgpxmaps_graph_line_color_speed');
	delete_option('wpgpxmaps_graph_offset_from1');
	delete_option('wpgpxmaps_graph_offset_to1');
	delete_option('wpgpxmaps_graph_offset_from2');
	delete_option('wpgpxmaps_graph_offset_to2');
	delete_option('wpgpxmaps_map_start_icon');
	delete_option('wpgpxmaps_map_end_icon');
	delete_option('wpgpxmaps_map_current_icon');
	delete_option('wpgpxmaps_map_waypoint_icon');
	delete_option('wpgpxmaps_map_nggallery');
	delete_option('wpgpxmaps_show_hr');
	delete_option('wpgpxmaps_show_atemp');
	delete_option('wpgpxmaps_graph_line_color_hr');
	delete_option('wpgpxmaps_graph_line_color_atemp');
	delete_option('wpgpxmaps_show_cadence');
	delete_option('wpgpxmaps_graph_line_color_cad');
	delete_option('wpgpxmaps_zoomonscrollwheel');
	delete_option('wpgpxmaps_download');
	delete_option('wpgpxmaps_summary');
	delete_option('wpgpxmaps_skipcache');
}

?>
