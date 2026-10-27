<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

	require_once( ABSPATH . 'wp-admin/includes/file.php' );
	require_once( 'wp-gpx-maps-utils-nggallery.php' );

function wpgpxmaps_getAttachedImages( $dt, $lat, $lon, $dtoffset, &$error ) {
	$result = array();

	try {
		$attachments = get_children( array(
			'post_parent'    => get_the_ID(),
			'post_type'      => 'attachment',
			/* show all -1 */
			'numberposts'    => -1,
			'post_status'    => 'inherit',
			'post_mime_type' => 'image',
			'order'          => 'ASC',
			'orderby'        => 'menu_order ASC',
		) );

		foreach ( $attachments as $attachment_id => $attachment ) {
			$img_src      = wp_get_attachment_image_src( $attachment_id, 'full' );
			$img_thmb     = wp_get_attachment_image_src( $attachment_id, 'thumbnail' );
			$img_metadata = wp_get_attachment_metadata( $attachment_id );
			$img_file     = get_attached_file( $attachment_id );

			$item         = array();
			$item['data'] = wp_get_attachment_link( $attachment_id, array( 105, 105 ) );
			if ( false === strpos( $item['data'], 'alt=' ) ) {
				if (!empty(get_the_excerpt($attachment_id))) {
					$item['data'] = str_replace('src=','alt="' . esc_attr(get_the_excerpt($attachment_id)) . '" src=',$item['data']);
				} elseif (!empty(get_the_title($attachment_id))) {
					$item['data'] = str_replace('src=','alt="' . esc_attr(get_the_title($attachment_id)) . '" src=',$item['data']);
				} else {
					$item['data'] = str_replace('src=','alt="missing caption" src=',$item['data']);
				}
			}
			
			if ( is_callable( 'exif_read_data' ) ) {
				try {
					$exif = @exif_read_data( $img_file );
				} catch (Exception $e) {
					$exif = false;
				}
								
				if ( is_array( $exif ) ) {
					$item['lon'] = getExifGps( isset( $exif['GPSLongitude'] ) ? $exif['GPSLongitude'] : 0, isset( $exif['GPSLongitudeRef'] ) ? $exif['GPSLongitudeRef'] : '' );
					$item['lat'] = getExifGps( isset( $exif['GPSLatitude'] ) ? $exif['GPSLatitude'] : 0, isset( $exif['GPSLatitudeRef'] ) ? $exif['GPSLatitudeRef'] : '' );
					if ( ( $item['lat'] != 0 ) || ( $item['lon'] != 0 ) ) {
						$result[] = $item;
					} elseif ( isset( $exif['DateTimeOriginal'] ) ) {
						$_dt   = strtotime( $exif['DateTimeOriginal'] ) + $dtoffset;
						$_item = findItemCoordinate( $_dt, $dt, $lat, $lon );
						if ( $_item != null ) {
							$item['lat'] = $_item['lat'];
							$item['lon'] = $_item['lon'];
							$result[]    = $item;
						}
					}
				}
			} else {
				$error .= "Sorry, <a href='http://php.net/manual/en/function.exif-read-data.php' target='_blank' >exif_read_data</a> function not found! check your hosting.<br />";
			}
		}
	} catch ( Exception $e ) {
		$error .= 'Error When Retrieving attached images: ' . esc_html($e->getMessage()) . '<br />';
	}
	return $result;
}

function wp_gpx_maps_sitePath() {
	return substr( substr( __FILE__, 0, strrpos( __FILE__, 'wp-content' ) ), 0, -1 );
	// return substr(get_home_path(), 0, -1);
}

/**
 * GPX folder of the current user, relative to the uploads folder:
 * administrators use /gpx, editors and authors their own /gpx/<username>.
 */
function wpgpxmaps_gpxUploadSubdir() {
	if ( ! current_user_can( 'manage_options' ) && current_user_can( 'publish_posts' ) ) {
		return '/gpx/' . sanitize_file_name( wp_get_current_user()->user_login );
	}
	return '/gpx';
}

function gpxFolderPath() {
	$upload_dir = wp_upload_dir();
	$ret        = $upload_dir['basedir'] . wpgpxmaps_gpxUploadSubdir();
	return str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $ret );
}

function gpxCacheFolderPath() {
	$upload_dir  = wp_upload_dir();
	$uploadsPath = $upload_dir['basedir'];
	$ret         = $uploadsPath . DIRECTORY_SEPARATOR . 'gpx' . DIRECTORY_SEPARATOR . '~cache';
	return str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $ret );
}

function relativeGpxFolderPath() {
	$sitePath    = wp_gpx_maps_sitePath();
	$realGpxPath = gpxFolderPath();
	$ret         = str_replace( $sitePath, '', $realGpxPath ) . DIRECTORY_SEPARATOR;
	return str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $ret );
}

function relativeGpxCacheFolderPath() {
	$sitePath         = wp_gpx_maps_sitePath();
	$realGpxCachePath = gpxCacheFolderPath();
	$ret              = str_replace( $sitePath, '', $realGpxCachePath ) . DIRECTORY_SEPARATOR;
	return str_replace( array( '/', '\\' ), DIRECTORY_SEPARATOR, $ret );
}

function wpgpxmaps_recursive_remove_directory( $directory, $empty = false ) {
	if ( substr( $directory, -1 ) == '/' ) {
		$directory = substr( $directory, 0, -1 );
	}
	if ( ! file_exists( $directory ) || ! is_dir( $directory ) ) {
		return false;
	} elseif ( is_readable( $directory ) ) {
		$handle = opendir( $directory );
		while ( false !== ( $item = readdir( $handle ) ) ) {
			if ( $item != '.' && $item != '..' ) {
				$path = $directory . '/' . $item;
				if ( is_dir( $path ) ) {
					wpgpxmaps_recursive_remove_directory( $path );
				} else {
					wp_delete_file( $path );
				}
			}
		}
		closedir( $handle );
		if ( false == $empty ) {
			if ( ! rmdir( $directory ) ) { // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_rmdir -- empty cache folder, WP_Filesystem not needed
				return false;
			}
		}
	}
	return true;
}

function wpgpxmaps_getPoints( $gpxPath, $gpxOffset = 10, $donotreducegpx = false, $distancetype = 0) {

	if ( is_string( $gpxPath ) && '' != $gpxPath && file_exists( $gpxPath ) ) {
		$points = wpgpxmaps_parseXml( $gpxPath, $gpxOffset, $distancetype );
	} else {
		$points = wpgpxmaps_emptyPoints();
		echo esc_html__( 'WP GPX Maps Error: GPX file not found!', 'wp-gpx-maps' ) . ' ' . esc_html( is_string( $gpxPath ) ? basename( $gpxPath ) : '' );
	}

	/* Reduce the points to around 200 to speedup */
	if ( $donotreducegpx != true ) {
		$count = count( $points->lat );
		if ( $count > 200 ) {
			$f = round( $count/200 );
			if ( $f > 1 )
				for ( $i = $count - 1; $i > 0;$i-- )
			if ( $i % $f != 0 && isset( $points->lat[$i] ) ) {
				unset( $points->dt[$i] );
				unset( $points->lat[$i] );
				unset( $points->lon[$i] );
				unset( $points->ele[$i] );
				unset( $points->dist[$i] );
				unset( $points->speed[$i] );
				unset( $points->hr[$i] );
				unset( $points->atemp[$i] );
				unset( $points->cad[$i] );
				unset( $points->grade[$i] );
			}
		}
	}
	return $points;
}

/**
 * Empty result of wpgpxmaps_parseXml(), used when the file can't be read or parsed.
 */
function wpgpxmaps_emptyPoints() {
	$points = new stdClass;

	$points->dt    = array();
	$points->lat   = array();
	$points->lon   = array();
	$points->ele   = array();
	$points->dist  = array();
	$points->speed = array();
	$points->hr    = array();
	$points->atemp = array();
	$points->cad   = array();
	$points->grade = array();

	$points->maxTime      = 0;
	$points->minTime      = 0;
	$points->maxEle       = 0;
	$points->minEle       = 0;
	$points->totalEleUp   = 0;
	$points->totalEleDown = 0;
	$points->avgSpeed     = 0;
	$points->avgCad       = 0;
	$points->avgHr        = 0;
	$points->avgTemp      = 0;
	$points->totalLength  = 0;

	return $points;
}

/**
 * Find a value in the decoded <extensions> of a track point, ignoring the namespace prefix
 * (e.g. 'hr' matches ns3:hr, gpxtpx:hr and hr). Returns 0 when not found or not numeric.
 */
function wpgpxmaps_getExtensionValue( $data, $name ) {
	if ( ! is_array( $data ) ) {
		return 0;
	}
	foreach ( $data as $key => $value ) {
		$parts = explode( ':', (string) $key );
		if ( end( $parts ) === $name && is_numeric( $value ) ) {
			return (float) $value;
		}
		if ( is_array( $value ) ) {
			$found = wpgpxmaps_getExtensionValue( $value, $name );
			if ( 0 != $found ) {
				return $found;
			}
		}
	}
	return 0;
}

/**
 * Load a GPX file without network access (no remote DTD or entities).
 */
function wpgpxmaps_loadXmlFile( $filePath ) {
	return @simplexml_load_file( $filePath, 'SimpleXMLElement', LIBXML_NONET );
}

function wpgpxmaps_parseXml( $filePath, $gpxOffset, $distancetype ) {
	$points = wpgpxmaps_emptyPoints();

	$gpx = wpgpxmaps_loadXmlFile( $filePath );

	if ( false === $gpx )
		return $points;

		$gpx->registerXPathNamespace( 'a', 'http://www.topografix.com/GPX/1/0' );
		$gpx->registerXPathNamespace( 'b', 'http://www.topografix.com/GPX/1/1' );
		$gpx->registerXPathNamespace( 'ns3', 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1' );

		$nodes = $gpx->xpath( '//trk | //a:trk | //b:trk ' );
		$nodes = is_array( $nodes ) ? $nodes : array();
		/* Normal GPX */

	if ( count( $nodes ) > 0 ) {

		foreach ( $nodes as $_trk ) {

			// @ will remove the errors on namaspaces

			$trk = @simplexml_load_string( $_trk->asXML(), 'SimpleXMLElement', LIBXML_NONET );

			if ( false === $trk )
				continue;

			$trk->registerXPathNamespace( 'a', 'http://www.topografix.com/GPX/1/0' );
			$trk->registerXPathNamespace( 'b', 'http://www.topografix.com/GPX/1/1' );
			$trk->registerXPathNamespace( 'ns3', 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1' );

			$trkpts = $trk->xpath( '//trkpt | //a:trkpt | //b:trkpt' );
			$trkpts = is_array( $trkpts ) ? $trkpts : array();

			$lastLat  = 0;
			$lastLon  = 0;
			$lastEle  = 0;
			$lastTime = 0;
			$dist     = 0;
			$lastOffset  = 0;
			$speedBuffer = array();

			foreach ( $trkpts as $trkpt ) {

				$lat   = (float) $trkpt['lat'];
				$lon   = (float) $trkpt['lon'];
				$ele   = (float) $trkpt->ele;
				$time  = (string) $trkpt->time;
				$speed = (float) $trkpt->speed;
				$hr    = 0;
				$atemp = 0;
				$cad   = 0;
				$grade = 0;

				if ( isset( $trkpt->extensions ) ) {

					$arr = json_decode( wp_json_encode( $trkpt->extensions ), 1 );

					/* The namespace prefix depends on the device/app (ns3: Garmin, gpxtpx: Strava, none...) */
					$hr    = wpgpxmaps_getExtensionValue( $arr, 'hr' );
					$atemp = wpgpxmaps_getExtensionValue( $arr, 'atemp' );
					$cad   = wpgpxmaps_getExtensionValue( $arr, 'cad' );
				}

				/* Empty extension elements are decoded as arrays: keep only numbers */
				$hr    = is_numeric( $hr ) ? (float) $hr : 0;
				$atemp = is_numeric( $atemp ) ? (float) $atemp : 0;
				$cad   = is_numeric( $cad ) ? (float) $cad : 0;

				if ( 0 == $lastLat && 0 == $lastLon ) {

					/* Base Case  */
					array_push( $points->dt, '' != $time ? strtotime( $time ) : false );
					array_push( $points->lat, (float) $lat );
					array_push( $points->lon, (float) $lon );
					array_push( $points->ele, (float) round( $ele, 2 ) );
					array_push( $points->dist, (float) round( $dist, 2 ) );
					array_push( $points->speed, 0 );
					array_push( $points->hr, (float) $hr );
					array_push( $points->atemp, (float) $atemp );
					array_push( $points->cad, (float) $cad );
					array_push( $points->grade, $grade );

					$lastLat  = $lat;
					$lastLon  = $lon;
					$lastEle  = $ele;
					$lastTime = $time;
				} else {
					
					/* Normal Case  */
					$offset = calculateDistance( (float) $lat, (float) $lon, (float) $ele, (float) $lastLat, (float) $lastLon, (float) $lastEle, $distancetype );
					$dist   = $dist + $offset;

					$points->totalLength = $dist;

					if ( $speed == 0 && '' != $time && '' != $lastTime ) {
							$datediff = (float) my_date_diff( $lastTime, $time );
						if ( $datediff != 0 ) {
							$speed = $offset / $datediff;
						}
					}

					if ( $ele != 0 && $lastEle != 0 && $offset != 0 ) {
						$deltaEle = (float) ( $ele - $lastEle );

						if ( (float) $ele > (float) $lastEle ) {
							$points->totalEleUp += $deltaEle;
						} else {
							$points->totalEleDown += $deltaEle;
						}
						$grade = $deltaEle / $offset * 100;
					}

					array_push( $speedBuffer, $speed );

					if ( ( (float) $offset + (float) $lastOffset ) > $gpxOffset ) {
						/* Bigger Offset -> write coordinate */
						$avgSpeed = 0;

						foreach ( $speedBuffer as $s ) {
							$avgSpeed += $s;
						}

						$avgSpeed    = $avgSpeed / count( $speedBuffer );
						$speedBuffer = array();

						$lastOffset = 0;

						array_push( $points->dt, '' != $time ? strtotime( $time ) : false );
						array_push( $points->lat, (float) $lat );
						array_push( $points->lon, (float) $lon );
						array_push( $points->ele, (float) round( $ele, 2 ) );
						array_push( $points->dist, (float) round( $dist, 2 ) );
						array_push( $points->speed, (float) round( $avgSpeed, 1 ) );
						array_push( $points->hr, $hr );
						array_push( $points->atemp,	$atemp );
						array_push( $points->cad, $cad );
						array_push( $points->grade, (float) round( $grade, 2 ) );
					} else {
						/* Smoller Offset -> continue.. */
						$lastOffset = (float) $lastOffset + (float) $offset;
					}
				}
				$lastLat  = $lat;
				$lastLon  = $lon;
				$lastEle  = $ele;
				$lastTime = $time;
			}
			array_push( $points->dt, null );
			array_push( $points->lat, null );
			array_push( $points->lon, null );
			array_push( $points->ele, null );
			array_push( $points->dist, null );
			array_push( $points->speed, null );
			array_push( $points->hr, null );
			array_push( $points->atemp, null );
			array_push( $points->cad, null );
			array_push( $points->grade, null );

			unset( $trkpts );
		}
		unset( $nodes );

		try {
			array_pop( $points->dt );
			array_pop( $points->lat );
			array_pop( $points->lon );
			array_pop( $points->ele );
			array_pop( $points->dist );
			array_pop( $points->speed );
			array_pop( $points->hr );
			array_pop( $points->atemp );
			array_pop( $points->cad );
			array_pop( $points->grade );

			$_time               = array_filter( $points->dt );
			$_ele                = array_filter( $points->ele );
			$_dist               = array_filter( $points->dist );

			if (count($_dist) > 0)		
			{
				$points->totalLength = max( $_dist );
			}

			if (count($_ele) > 0) {
				/* 	
					There might be cases where ele is not set in the gpx (0.00).
					array_filter will filter out those values and as a consequence min()/max() would fail. 
				*/
				$points->maxEle      = max( $_ele );
				$points->minEle      = min( $_ele );
			}

			if (count($_time) > 0)		
			{
				$points->maxTime     = max( $_time );
				$points->minTime     = min( $_time );
			}
			else
			{
				$points->maxTime     = null;
				$points->minTime     = null;
			}

			/* Calculating Average Speed */
			$_speed           = array_filter( $points->speed );
			if (count($_speed) > 0)
				$points->avgSpeed = array_sum( $_speed ) / count( $_speed );
			else
				$points->avgSpeed = null;

			/* Calculating Average Cadence */
			$_cad           = array_filter( $points->cad );
			if (count($_cad) > 0)
				$points->avgCad = (float) round( array_sum( $_cad ) / count( $_cad ), 0 );
			else
				$points->avgCad = null;

			/* Calculating Average Heart Rate */
			$_hr           = array_filter( $points->hr );
			if (count($_hr) > 0)
				$points->avgHr = (float) round( array_sum( $_hr ) / count( $_hr ), 0 );
			else
				$points->avgHr = null;

			/* Calculating Average Temperature */
			$_temp           = array_filter( $points->atemp );
			if (count($_temp) > 0)
				$points->avgTemp = (float) round( array_sum( $_temp ) / count( $_temp ), 1 );
			else
				$points->avgTemp = null;

		} catch ( Exception $e ) {
			print_r($e);
		}
	} else {

		/* GPX Garmin case */
		$gpx->registerXPathNamespace( 'gpxx', 'http://www.garmin.com/xmlschemas/GpxExtensions/v3' );

		$nodes = $gpx->xpath( '//gpxx:rpt' );
		$nodes = is_array( $nodes ) ? $nodes : array();

		if ( count( $nodes ) > 0 ) {

			$lastLat    = 0;
			$lastLon    = 0;
			$lastEle    = 0;
			$dist       = 0;
			$lastOffset = 0;

			/* GPX Garmin case */
			foreach ( $nodes as $rpt ) {

				$lat = (float) $rpt['lat'];
				$lon = (float) $rpt['lon'];
				if ( 0 == $lastLat && 0 == $lastLon ) {

					/* Base Case */
					array_push( $points->lat, (float) $lat );
					array_push( $points->lon, (float) $lon );
					array_push( $points->ele, 0 );
					array_push( $points->dist, 0 );
					array_push( $points->speed, 0 );
					array_push( $points->hr, 0 );
					array_push( $points->atemp, 0 );
					array_push( $points->cad, 0 );
					array_push( $points->grade, 0 );
					$lastLat = $lat;
					$lastLon = $lon;
				} else {

					/* Base Case */
					$offset = calculateDistance( $lat, $lon, 0, $lastLat, $lastLon, 0, $distancetype );
					$dist   = $dist + $offset;
					if ( ( (float) $offset + (float) $lastOffset ) > $gpxOffset ) {

						/* Bigger Offset -> write coordinate */
						$lastOffset = 0;
						array_push( $points->lat, (float) $lat );
						array_push( $points->lon, (float) $lon );
						array_push( $points->ele, 0 );
						array_push( $points->dist, 0 );
						array_push( $points->speed, 0 );
						array_push( $points->hr, 0 );
						array_push( $points->atemp, 0 );
						array_push( $points->cad, 0 );
						array_push( $points->grade, 0 );
					} else {

						/* Smoller Offset -> continue.. */
						$lastOffset = (float) $lastOffset + (float) $offset;
					}
				}
				$lastLat = $lat;
				$lastLon = $lon;
			}
			unset( $nodes );

		} else {

			/* GPX Strange case */
			$nodes = $gpx->xpath( '//rtept | //a:rtept | //b:rtept' );
			$nodes = is_array( $nodes ) ? $nodes : array();
			if ( count( $nodes ) > 0 ) {

				$lastLat    = 0;
				$lastLon    = 0;
				$lastEle    = 0;
				$dist       = 0;
				$lastOffset = 0;

				/* Garmin case */
				foreach ( $nodes as $rtept ) {

					$lat = (float) $rtept['lat'];
					$lon = (float) $rtept['lon'];
					if ( 0 == $lastLat && 0 == $lastLon ) {

						/* Base Case */
						array_push( $points->lat, (float) $lat );
						array_push( $points->lon, (float) $lon );
						array_push( $points->ele, 0 );
						array_push( $points->dist, 0 );
						array_push( $points->speed, 0 );
						array_push( $points->hr, 0 );
						array_push( $points->atemp, 0 );
						array_push( $points->cad, 0 );
						array_push( $points->grade, 0 );
						$lastLat = $lat;
						$lastLon = $lon;
					} else {

						/* Normal Case */
						$offset = calculateDistance( $lat, $lon, 0, $lastLat, $lastLon, 0, $distancetype );
						$dist   = $dist + $offset;
						if ( ( (float) $offset + (float) $lastOffset ) > $gpxOffset ) {

							/* Bigger Offset -> write coordinate */
							$lastOffset = 0;
							array_push( $points->lat, (float) $lat );
							array_push( $points->lon, (float) $lon );
							array_push( $points->ele, 0 );
							array_push( $points->dist, 0 );
							array_push( $points->speed, 0 );
							array_push( $points->hr, 0 );
							array_push( $points->atemp, 0 );
							array_push( $points->cad, 0 );
							array_push( $points->grade, 0 );
						} else {

							/* Smoller Offset -> continue.. */
							$lastOffset = (float) $lastOffset + (float) $offset;
						}
					}
					$lastLat = $lat;
					$lastLon = $lon;
				}
				unset( $nodes );
			}
		}
	}
	unset( $gpx );
	return $points;
}

function wpgpxmaps_getWayPoints( $gpxPath ) {
	$points = array();
	if ( is_string( $gpxPath ) && '' != $gpxPath && file_exists( $gpxPath ) ) {
		$gpx = wpgpxmaps_loadXmlFile( $gpxPath );

		if ( false === $gpx ) {
			echo esc_html__( 'WP GPX Maps Error: Can&#8217;t parse xml file!', 'wp-gpx-maps' ) . ' ' . esc_html( basename( $gpxPath ) );
			return $points;
		}

			$gpx->registerXPathNamespace( 'a', 'http://www.topografix.com/GPX/1/0' );
			$gpx->registerXPathNamespace( 'b', 'http://www.topografix.com/GPX/1/1' );
			$nodes = $gpx->xpath( '//wpt | //a:wpt | //b:wpt' );
			$nodes = is_array( $nodes ) ? $nodes : array();
			global $wpdb;

		if ( count( $nodes ) > 0 ) {
			/* Normal case */
			foreach ( $nodes as $wpt ) {
				$lat  = $wpt['lat'];
				$lon  = $wpt['lon'];
				$ele  = (string) $wpt->ele;
				$time = (string) $wpt->time;
				$name = (string) $wpt->name;
				$desc = (string) $wpt->desc;
				$sym  = (string) $wpt->sym;
				$type = (string) $wpt->type;
				$img  = '';

				if ( $sym ) {
					$img_name = 'map-marker-' . $sym;
					$img_id   = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'attachment'", $img_name ) );
					// phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery
					if ( ! is_null( $img_id ) ) {
						$img = wp_get_attachment_url( $img_id );
					}
				}

					array_push($points, array(
						'lat'  => (float) $lat,
						'lon'  => (float) $lon,
						'ele'  => (float) $ele,
						'time' => $time,
						'name' => esc_html($name),
						'desc' => esc_html($desc),
						'sym'  => esc_html($sym),
						'type' => esc_html($type),
						'img'  => esc_url($img),
					));
			}
		}
	}
	return $points;
}

/**
 * Values used to color the track (attribute colorby), one per map point and in the same order as the map data
 * (null where the tracks are separated). Returns an empty array when the GPX has no data for that value.
 *
 * grade: % slope averaged over about 100 m (raw GPS points change slope at every meter)
 * speed: in the speed unit of the chart; hr: bpm; elevation: m or ft as the chart.
 */
function wpgpxmaps_colorValues( $points, $colorby, $unit_of_measure, $unit_of_measure_speed ) {

	if ( ! in_array( $colorby, array( 'grade', 'speed', 'hr', 'elevation' ), true ) || ! is_array( $points->lat ) ) {
		return array();
	}

	$keys    = array_keys( $points->lat );
	$values  = array();
	$hasData = false;
	$feet    = ( wpgpxmaps_FEET_MILES == $unit_of_measure || wpgpxmaps_FEET_NAUTICALMILES == $unit_of_measure );

	foreach ( $keys as $n => $k ) {

		if ( null === $points->lat[ $k ] ) {
			$values[] = null;
			continue;
		}

		$value = null;

		if ( 'grade' == $colorby ) {
			/* Points about 50 m before and after (at least the next point on each side), inside the same track */
			$dist = (float) $points->dist[ $k ];
			$from = $n;
			$to   = $n;
			while ( $from > 0 && null !== $points->lat[ $keys[ $from - 1 ] ] && ( $from == $n || $dist - (float) $points->dist[ $keys[ $from - 1 ] ] <= 50 ) ) {
				$from--;
			}
			while ( $to < count( $keys ) - 1 && null !== $points->lat[ $keys[ $to + 1 ] ] && ( $to == $n || (float) $points->dist[ $keys[ $to + 1 ] ] - $dist <= 50 ) ) {
				$to++;
			}
			$run  = (float) $points->dist[ $keys[ $to ] ] - (float) $points->dist[ $keys[ $from ] ];
			$ele1 = (float) $points->ele[ $keys[ $from ] ];
			$ele2 = (float) $points->ele[ $keys[ $to ] ];
			if ( $run > 0 && 0 != $ele1 && 0 != $ele2 ) {
				$value = ( $ele2 - $ele1 ) / $run * 100;
			}
		} elseif ( 'speed' == $colorby ) {
			if ( (float) $points->speed[ $k ] > 0 ) {
				$value = (float) convertSpeed( $points->speed[ $k ], $unit_of_measure_speed );
			}
		} elseif ( 'hr' == $colorby ) {
			if ( (float) $points->hr[ $k ] > 0 ) {
				$value = (float) $points->hr[ $k ];
			}
		} elseif ( 'elevation' == $colorby ) {
			if ( 0 != (float) $points->ele[ $k ] ) {
				$value = (float) $points->ele[ $k ] * ( $feet ? 3.2808399 : 1 );
			}
		}

		if ( null !== $value ) {
			$hasData = true;
			$value   = round( $value, 1 );
		}
		/* Points without a value keep the color of the previous one: use the previous value */
		$values[] = ( null === $value && $n > 0 ) ? end( $values ) : $value;
	}

	return $hasData ? $values : array();
}

function toRadians( $degrees ) {
	return (float) ( $degrees * 3.1415926535897932385 / 180 );
}

function calculateDistance( $lat1, $lon1, $ele1, $lat2, $lon2, $ele2, $distancetype ) {
	/* Distance typ: Climb */
	if ( '2' == $distancetype ) {
		return (float) $ele1 - (float) $ele2;

		/* Distance typ: Flat */
	} elseif ( '1' == $distancetype ) {
		$alpha = (float) sin( (float) toRadians( (float) $lat2 - (float) $lat1 ) / 2 );
		$beta  = (float) sin( (float) toRadians( (float) $lon2 - (float) $lon1 ) / 2 );
		/* Distance in meters */
		$a    = (float) ( (float) $alpha * (float) $alpha ) + (float) ( (float) cos( (float) toRadians( $lat1 ) ) * (float) cos( (float) toRadians( $lat2 ) ) * (float) $beta * (float) $beta );
		$dist = 2 * 6369628.75 * (float) atan2( (float) sqrt( (float) $a ), (float) sqrt( 1 - (float) $a ) );
		return (float) sqrt( (float) pow( (float) $dist, 2 ) + pow( (float) $lat1 - (float) $lat2, 2 ) );

		/* Distance typ: Normal */
	} else {
		$alpha = (float) sin( (float) toRadians( (float) $lat2 - (float) $lat1 ) / 2 );
		$beta  = (float) sin( (float) toRadians( (float) $lon2 - (float) $lon1 ) / 2 );
		/* Distance in meters */
		$a    = (float) ( (float) $alpha * (float) $alpha ) + (float) ( (float) cos( (float) toRadians( $lat1 ) ) * (float) cos( (float) toRadians( $lat2 ) ) * (float) $beta * (float) $beta );
		$dist = 2 * 6369628.75 * (float) atan2( (float) sqrt( (float) $a ), (float) sqrt( 1 - (float) $a ) );
		$d    = (float) sqrt( (float) pow( (float) $dist, 2 ) + pow( (float) $lat1 - (float) $lat2, 2 ) );
		return sqrt( (float) pow( (float) $ele1 - (float) $ele2, 2 ) + (float) pow( (float) $d, 2 ) );
	}
}

function my_date_diff( $old_date, $new_date ) {
	$t1 = strtotime( $new_date );
	$t2 = strtotime( $old_date );

	/* Fix for milliceconds */
	$t1 += date_getDecimals( $new_date );
	$t2 += date_getDecimals( $old_date );

	$offset = (float) ( $t1 - $t2 );

	return $offset;
}

function date_getDecimals( $date ) {
	if ( preg_match( '(\.([0-9]{2})Z?)', $date, $matches ) ) {
		return (float) ( (float) $matches[1] / 100 );
	} else {
		return 0;
	}
}
