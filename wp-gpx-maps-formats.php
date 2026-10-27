<?php
/**
 * Track file formats: GPX, TCX, KML / KMZ and FIT.
 *
 * Every reader returns the tracks of the file as arrays of raw points (wpgpxmaps_rawPoint), or false when the file
 * can't be read. wpgpxmaps_buildPoints() then computes distance, speed, grade and statistics in the same way for all
 * the formats.
 *
 * @package WP GPX Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * File names the plugin can show (uploads, Tracks tab, block, folder shortcode).
 */
function wpgpxmaps_trackFileRegex() {
	return '/\.(gpx|tcx|kml|kmz|fit)$/i';
}

function wpgpxmaps_rawPoint( $lat, $lon, $ele = 0, $time = null, $speed = 0, $hr = 0, $atemp = 0, $cad = 0 ) {
	return array(
		'lat'   => (float) $lat,
		'lon'   => (float) $lon,
		'ele'   => (float) $ele,
		'time'  => $time,
		'speed' => (float) $speed,
		'hr'    => (float) $hr,
		'atemp' => (float) $atemp,
		'cad'   => (float) $cad,
	);
}

/**
 * Seconds since 1970 (with hundredths) of an ISO 8601 date, or null.
 */
function wpgpxmaps_parseTime( $value ) {
	$value = trim( (string) $value );
	if ( '' == $value ) {
		return null;
	}
	$time = strtotime( $value );
	return false === $time ? null : $time + date_getDecimals( $value );
}

/**
 * Tracks of a file, whatever its format (recognized from the content, so downloaded copies work too).
 *
 * @return array|false Array of tracks, each an array of raw points; false when the file can't be read.
 */
function wpgpxmaps_readTracks( $filePath ) {

	$head = (string) @file_get_contents( $filePath, false, null, 0, 16 );

	if ( strlen( $head ) >= 12 && '.FIT' === substr( $head, 8, 4 ) ) {
		return wpgpxmaps_readFit( $filePath );
	}

	if ( "PK\x03\x04" === substr( $head, 0, 4 ) ) {
		$xml = wpgpxmaps_loadKmz( $filePath );
	} else {
		$xml = wpgpxmaps_loadXmlFile( $filePath );
	}

	if ( false === $xml ) {
		return false;
	}

	switch ( strtolower( $xml->getName() ) ) {
		case 'trainingcenterdatabase':
			return wpgpxmaps_readTcx( $xml );
		case 'kml':
			return wpgpxmaps_readKml( $xml );
		default:
			return wpgpxmaps_readGpx( $xml );
	}
}

/**
 * KMZ is a zip file with the KML inside (doc.kml, or the first .kml file).
 */
function wpgpxmaps_loadKmz( $filePath ) {
	if ( ! class_exists( 'ZipArchive' ) ) {
		return false;
	}
	$zip = new ZipArchive();
	if ( true !== $zip->open( $filePath ) ) {
		return false;
	}
	$kml = $zip->getFromName( 'doc.kml' );
	for ( $i = 0; false === $kml && $i < $zip->numFiles; $i++ ) {
		if ( preg_match( '/\.kml$/i', (string) $zip->getNameIndex( $i ) ) ) {
			$kml = $zip->getFromIndex( $i );
		}
	}
	$zip->close();
	return false === $kml ? false : @simplexml_load_string( $kml, 'SimpleXMLElement', LIBXML_NONET );
}

function wpgpxmaps_readGpx( $gpx ) {

	$tracks = array();

	$gpx->registerXPathNamespace( 'a', 'http://www.topografix.com/GPX/1/0' );
	$gpx->registerXPathNamespace( 'b', 'http://www.topografix.com/GPX/1/1' );

	$nodes = $gpx->xpath( '//trk | //a:trk | //b:trk ' );
	$nodes = is_array( $nodes ) ? $nodes : array();

	foreach ( $nodes as $_trk ) {

		// @ will remove the errors on namaspaces
		$trk = @simplexml_load_string( $_trk->asXML(), 'SimpleXMLElement', LIBXML_NONET );

		if ( false === $trk ) {
			continue;
		}

		$trk->registerXPathNamespace( 'a', 'http://www.topografix.com/GPX/1/0' );
		$trk->registerXPathNamespace( 'b', 'http://www.topografix.com/GPX/1/1' );

		$trkpts = $trk->xpath( '//trkpt | //a:trkpt | //b:trkpt' );
		$track  = array();

		foreach ( is_array( $trkpts ) ? $trkpts : array() as $trkpt ) {

			$hr    = 0;
			$atemp = 0;
			$cad   = 0;

			if ( isset( $trkpt->extensions ) ) {

				$arr = json_decode( wp_json_encode( $trkpt->extensions ), 1 );

				/* The namespace prefix depends on the device/app (ns3: Garmin, gpxtpx: Strava, none...) */
				$hr    = wpgpxmaps_getExtensionValue( $arr, 'hr' );
				$atemp = wpgpxmaps_getExtensionValue( $arr, 'atemp' );
				$cad   = wpgpxmaps_getExtensionValue( $arr, 'cad' );
			}

			$track[] = wpgpxmaps_rawPoint( $trkpt['lat'], $trkpt['lon'], $trkpt->ele, wpgpxmaps_parseTime( $trkpt->time ), $trkpt->speed, $hr, $atemp, $cad );
		}

		$tracks[] = $track;
	}

	if ( $nodes ) {
		return $tracks;
	}

	/* No track: use the route (Garmin route points first, then standard route points) */
	$gpx->registerXPathNamespace( 'gpxx', 'http://www.garmin.com/xmlschemas/GpxExtensions/v3' );

	$nodes = $gpx->xpath( '//gpxx:rpt' );
	if ( ! $nodes ) {
		$nodes = $gpx->xpath( '//rtept | //a:rtept | //b:rtept' );
	}

	$track = array();
	foreach ( is_array( $nodes ) ? $nodes : array() as $rtept ) {
		$track[] = wpgpxmaps_rawPoint( $rtept['lat'], $rtept['lon'], $rtept->ele );
	}
	return $track ? array( $track ) : array();
}

/**
 * Values of the descendants of a DOM element by local name (namespace ignored), first occurrence wins.
 */
function wpgpxmaps_domValues( $element, &$values = array() ) {
	foreach ( $element->childNodes as $child ) {
		if ( XML_ELEMENT_NODE !== $child->nodeType ) {
			continue;
		}
		/* DOMElement::$firstElementChild needs PHP 8 */
		$hasElements = false;
		foreach ( $child->childNodes as $grandchild ) {
			if ( XML_ELEMENT_NODE === $grandchild->nodeType ) {
				$hasElements = true;
				break;
			}
		}
		if ( $hasElements ) {
			wpgpxmaps_domValues( $child, $values );
		} elseif ( ! isset( $values[ $child->localName ] ) ) {
			$values[ $child->localName ] = trim( $child->textContent );
		}
	}
	return $values;
}

/**
 * Garmin Training Center (TCX): one track for every activity or course, laps joined.
 */
function wpgpxmaps_readTcx( $xml ) {

	$doc    = dom_import_simplexml( $xml )->ownerDocument;
	$tracks = array();

	foreach ( array( 'Activity', 'Course' ) as $tag ) {
		foreach ( $doc->getElementsByTagNameNS( '*', $tag ) as $container ) {
			$track = array();
			foreach ( $container->getElementsByTagNameNS( '*', 'Trackpoint' ) as $trackpoint ) {
				$v = wpgpxmaps_domValues( $trackpoint );
				if ( ! isset( $v['LatitudeDegrees'], $v['LongitudeDegrees'] ) ) {
					continue;
				}
				$cad     = isset( $v['Cadence'] ) ? $v['Cadence'] : ( isset( $v['RunCadence'] ) ? $v['RunCadence'] : 0 );
				$track[] = wpgpxmaps_rawPoint(
					$v['LatitudeDegrees'],
					$v['LongitudeDegrees'],
					isset( $v['AltitudeMeters'] ) ? $v['AltitudeMeters'] : 0,
					isset( $v['Time'] ) ? wpgpxmaps_parseTime( $v['Time'] ) : null,
					isset( $v['Speed'] ) ? $v['Speed'] : 0,
					isset( $v['Value'] ) ? $v['Value'] : 0,
					0,
					$cad
				);
			}
			if ( $track ) {
				$tracks[] = $track;
			}
		}
	}
	return $tracks;
}

/**
 * KML: every LineString and every gx:Track (with times) is a track, in the order of the file.
 */
function wpgpxmaps_readKml( $xml ) {

	$doc    = dom_import_simplexml( $xml )->ownerDocument;
	$xpath  = new DOMXPath( $doc );
	$tracks = array();

	foreach ( $xpath->query( '//*[local-name()="LineString" or local-name()="Track"]' ) as $node ) {

		$track = array();

		if ( 'LineString' === $node->localName ) {
			foreach ( $node->getElementsByTagNameNS( '*', 'coordinates' ) as $coordinates ) {
				foreach ( preg_split( '/\s+/', trim( $coordinates->textContent ) ) as $tuple ) {
					$c = explode( ',', $tuple );
					if ( count( $c ) >= 2 && is_numeric( $c[0] ) && is_numeric( $c[1] ) ) {
						$track[] = wpgpxmaps_rawPoint( $c[1], $c[0], isset( $c[2] ) && is_numeric( $c[2] ) ? $c[2] : 0 );
					}
				}
			}
		} else {
			/* gx:Track: the n-th <when> is the time of the n-th <gx:coord> ("lon lat alt") */
			$times = array();
			foreach ( $node->getElementsByTagNameNS( '*', 'when' ) as $when ) {
				$times[] = wpgpxmaps_parseTime( $when->textContent );
			}
			foreach ( $node->getElementsByTagNameNS( '*', 'coord' ) as $n => $coord ) {
				$c = preg_split( '/\s+/', trim( $coord->textContent ) );
				if ( count( $c ) >= 2 && is_numeric( $c[0] ) && is_numeric( $c[1] ) ) {
					$track[] = wpgpxmaps_rawPoint( $c[1], $c[0], isset( $c[2] ) && is_numeric( $c[2] ) ? $c[2] : 0, isset( $times[ $n ] ) ? $times[ $n ] : null );
				}
			}
		}

		if ( $track ) {
			$tracks[] = $track;
		}
	}
	return $tracks;
}

/**
 * Placemarks with a point in a KML file, as waypoints.
 */
function wpgpxmaps_readKmlWaypoints( $filePath ) {

	$head = (string) @file_get_contents( $filePath, false, null, 0, 4 );
	$xml  = "PK\x03\x04" === $head ? wpgpxmaps_loadKmz( $filePath ) : wpgpxmaps_loadXmlFile( $filePath );

	if ( false === $xml || 'kml' !== strtolower( $xml->getName() ) ) {
		return array();
	}

	$points = array();
	foreach ( dom_import_simplexml( $xml )->ownerDocument->getElementsByTagNameNS( '*', 'Placemark' ) as $placemark ) {
		$point = $placemark->getElementsByTagNameNS( '*', 'Point' )->item( 0 );
		if ( ! $point ) {
			continue;
		}
		$coordinates = $point->getElementsByTagNameNS( '*', 'coordinates' )->item( 0 );
		$c           = $coordinates ? explode( ',', trim( $coordinates->textContent ) ) : array();
		if ( count( $c ) < 2 || ! is_numeric( $c[0] ) || ! is_numeric( $c[1] ) ) {
			continue;
		}
		$v        = wpgpxmaps_domValues( $placemark );
		$points[] = array(
			'lat'  => (float) $c[1],
			'lon'  => (float) $c[0],
			'ele'  => isset( $c[2] ) ? (float) $c[2] : 0,
			'time' => '',
			'name' => esc_html( isset( $v['name'] ) ? $v['name'] : '' ),
			'desc' => esc_html( isset( $v['description'] ) ? wp_strip_all_tags( $v['description'] ) : '' ),
			'sym'  => '',
			'type' => '',
			'img'  => '',
		);
	}
	return $points;
}

/**
 * Garmin FIT (binary): the "record" messages of the activity, as one track.
 * Reference: FIT protocol, https://developer.garmin.com/fit/protocol/
 */
function wpgpxmaps_readFit( $filePath ) {

	$data = @file_get_contents( $filePath );
	if ( false === $data ) {
		return false;
	}

	$size  = strlen( $data );
	$pos   = 0;
	$track = array();

	/* Several FIT files can be chained in one file */
	while ( $pos + 12 <= $size && '.FIT' === substr( $data, $pos + 8, 4 ) ) {

		$headerSize = ord( $data[ $pos ] );
		$dataSize   = unpack( 'V', substr( $data, $pos + 4, 4 ) )[1];
		$end        = min( $size, $pos + $headerSize + $dataSize );
		$pos       += $headerSize;

		$definitions = array();
		$timestamp   = 0;

		while ( $pos < $end ) {

			$header = ord( $data[ $pos++ ] );

			if ( $header & 0x80 ) {
				/* Compressed timestamp header: 5 bits of time offset from the last timestamp */
				$local  = ( $header >> 5 ) & 0x03;
				$offset = $header & 0x1F;
				if ( $timestamp ) {
					$timestamp = ( $timestamp & ~0x1F ) + $offset + ( $offset < ( $timestamp & 0x1F ) ? 0x20 : 0 );
				}
				$fixedTime = $timestamp ? $timestamp : null;
			} elseif ( $header & 0x40 ) {
				/* Definition message */
				if ( $pos + 5 > $end ) {
					break;
				}
				$local     = $header & 0x0F;
				$bigEndian = 1 === ord( $data[ $pos + 1 ] );
				$global    = unpack( $bigEndian ? 'n' : 'v', substr( $data, $pos + 2, 2 ) )[1];
				$count     = ord( $data[ $pos + 4 ] );
				$pos      += 5;
				$fields    = array();
				$length    = 0;
				for ( $i = 0; $i < $count && $pos + 3 <= $end; $i++, $pos += 3 ) {
					$fields[] = array( ord( $data[ $pos ] ), ord( $data[ $pos + 1 ] ), ord( $data[ $pos + 2 ] ) & 0x1F );
					$length  += ord( $data[ $pos + 1 ] );
				}
				if ( $header & 0x20 && $pos < $end ) {
					/* Developer fields: only their size matters */
					$devCount = ord( $data[ $pos++ ] );
					for ( $i = 0; $i < $devCount && $pos + 3 <= $end; $i++, $pos += 3 ) {
						$length += ord( $data[ $pos + 1 ] );
					}
				}
				$definitions[ $local ] = array(
					'global'    => $global,
					'bigEndian' => $bigEndian,
					'fields'    => $fields,
					'length'    => $length,
				);
				continue;
			} else {
				$local     = $header & 0x0F;
				$fixedTime = null;
			}

			/* Data message */
			if ( ! isset( $definitions[ $local ] ) ) {
				break;
			}
			$def = $definitions[ $local ];
			if ( $pos + $def['length'] > $end ) {
				break;
			}

			$values = array();
			$at     = $pos;
			foreach ( $def['fields'] as $field ) {
				$value = wpgpxmaps_fitValue( substr( $data, $at, $field[1] ), $field[2], $def['bigEndian'] );
				if ( null !== $value ) {
					$values[ $field[0] ] = $value;
				}
				$at += $field[1];
			}
			$pos += $def['length'];

			if ( isset( $values[253] ) ) {
				$timestamp = $values[253];
			} elseif ( null !== $fixedTime ) {
				$values[253] = $fixedTime;
			}

			/* Message 20 = record, with position */
			if ( 20 !== $def['global'] || ! isset( $values[0], $values[1] ) ) {
				continue;
			}

			$semicircles = 180 / 2147483648;
			$ele         = isset( $values[78] ) ? $values[78] : ( isset( $values[2] ) ? $values[2] : null );
			$speed       = isset( $values[73] ) ? $values[73] : ( isset( $values[6] ) ? $values[6] : 0 );

			$track[] = wpgpxmaps_rawPoint(
				$values[0] * $semicircles,
				$values[1] * $semicircles,
				null === $ele ? 0 : $ele / 5 - 500,
				isset( $values[253] ) ? $values[253] + 631065600 : null, // FIT time starts on 1989-12-31.
				$speed / 1000,
				isset( $values[3] ) ? $values[3] : 0,
				isset( $values[13] ) ? $values[13] : 0,
				isset( $values[4] ) ? $values[4] : 0
			);
		}

		/* File CRC */
		$pos = $end + 2;
	}

	return $track ? array( $track ) : array();
}

/**
 * Value of a FIT field of base type $type, or null when it is invalid or of a type the plugin doesn't use.
 */
function wpgpxmaps_fitValue( $bytes, $type, $bigEndian ) {

	$sizes = array( 0x01 => 1, 0x02 => 1, 0x03 => 2, 0x04 => 2, 0x05 => 4, 0x06 => 4, 0x0A => 1, 0x0B => 2, 0x0C => 4 );

	if ( ! isset( $sizes[ $type ] ) || strlen( $bytes ) !== $sizes[ $type ] ) {
		return null;
	}

	switch ( $sizes[ $type ] ) {
		case 1:
			$value = ord( $bytes );
			break;
		case 2:
			$value = unpack( $bigEndian ? 'n' : 'v', $bytes )[1];
			break;
		default:
			$value = unpack( $bigEndian ? 'N' : 'V', $bytes )[1];
	}

	/* Invalid values: all bits set for unsigned types, maximum for signed ones, 0 for the "z" types */
	$invalid = array( 0x01 => 0x7F, 0x02 => 0xFF, 0x03 => 0x7FFF, 0x04 => 0xFFFF, 0x05 => 0x7FFFFFFF, 0x06 => 0xFFFFFFFF, 0x0A => 0, 0x0B => 0, 0x0C => 0 );
	if ( $value === $invalid[ $type ] ) {
		return null;
	}

	/* Signed types */
	if ( 0x01 === $type && $value >= 0x80 ) {
		$value -= 0x100;
	} elseif ( 0x03 === $type && $value >= 0x8000 ) {
		$value -= 0x10000;
	} elseif ( 0x05 === $type && $value >= 0x80000000 ) {
		$value -= 0x100000000;
	}
	return $value;
}

/**
 * Points for the map and the chart from the raw tracks: distance, speed, grade and statistics.
 * A point is kept every $gpxOffset meters; the speed of the skipped points is averaged.
 */
function wpgpxmaps_buildPoints( $tracks, $gpxOffset, $distancetype ) {

	$points = wpgpxmaps_emptyPoints();
	$fields = array( 'dt', 'lat', 'lon', 'ele', 'dist', 'speed', 'hr', 'atemp', 'cad', 'grade' );

	foreach ( $tracks as $track ) {

		if ( ! $track ) {
			continue;
		}

		/* null between tracks */
		if ( $points->lat ) {
			foreach ( $fields as $f ) {
				$points->{$f}[] = null;
			}
		}

		$last        = null;
		$dist        = 0;
		$lastOffset  = 0;
		$speedBuffer = array();

		foreach ( $track as $p ) {

			$grade = 0;

			if ( null === $last ) {

				/* Base Case */
				$points->dt[]    = null !== $p['time'] ? (int) floor( $p['time'] ) : false;
				$points->lat[]   = $p['lat'];
				$points->lon[]   = $p['lon'];
				$points->ele[]   = (float) round( $p['ele'], 2 );
				$points->dist[]  = (float) round( $dist, 2 );
				$points->speed[] = 0;
				$points->hr[]    = $p['hr'];
				$points->atemp[] = $p['atemp'];
				$points->cad[]   = $p['cad'];
				$points->grade[] = $grade;

			} else {

				/* Normal Case */
				/* Elevation 0 means "not set": no vertical jump in the distance when one of the two points has none */
				$known  = 0 != $p['ele'] && 0 != $last['ele'];
				$offset = calculateDistance( $p['lat'], $p['lon'], $known ? $p['ele'] : 0, $last['lat'], $last['lon'], $known ? $last['ele'] : 0, $distancetype );
				$dist  += $offset;
				$speed  = $p['speed'];

				if ( 0 == $speed && null !== $p['time'] && null !== $last['time'] ) {
					$datediff = (float) ( $p['time'] - $last['time'] );
					if ( 0 != $datediff ) {
						$speed = $offset / $datediff;
					}
				}

				if ( 0 != $p['ele'] && 0 != $last['ele'] && 0 != $offset ) {
					$deltaEle = (float) ( $p['ele'] - $last['ele'] );
					if ( $deltaEle > 0 ) {
						$points->totalEleUp += $deltaEle;
					} else {
						/* Descent is shown as a positive number, like the climb */
						$points->totalEleDown -= $deltaEle;
					}
					$grade = $deltaEle / $offset * 100;
				}

				$speedBuffer[] = $speed;

				if ( ( (float) $offset + (float) $lastOffset ) > $gpxOffset ) {

					/* Bigger Offset -> write coordinate */
					$avgSpeed    = array_sum( $speedBuffer ) / count( $speedBuffer );
					$speedBuffer = array();
					$lastOffset  = 0;

					$points->dt[]    = null !== $p['time'] ? (int) floor( $p['time'] ) : false;
					$points->lat[]   = $p['lat'];
					$points->lon[]   = $p['lon'];
					$points->ele[]   = (float) round( $p['ele'], 2 );
					$points->dist[]  = (float) round( $dist, 2 );
					$points->speed[] = (float) round( $avgSpeed, 1 );
					$points->hr[]    = $p['hr'];
					$points->atemp[] = $p['atemp'];
					$points->cad[]   = $p['cad'];
					$points->grade[] = (float) round( $grade, 2 );

				} else {
					/* Smaller Offset -> continue.. */
					$lastOffset = (float) $lastOffset + (float) $offset;
				}
			}
			$last = $p;
		}
	}

	if ( ! $points->lat ) {
		return $points;
	}

	$_dist = array_filter( $points->dist );
	if ( $_dist ) {
		$points->totalLength = max( $_dist );
	}

	/* Elevation 0 means "not set" in many files: min()/max() only on the real values */
	$_ele = array_filter( $points->ele );
	if ( $_ele ) {
		$points->maxEle = max( $_ele );
		$points->minEle = min( $_ele );
	}

	$_time = array_filter( $points->dt );
	if ( $_time ) {
		$points->maxTime = max( $_time );
		$points->minTime = min( $_time );
	} else {
		$points->maxTime = null;
		$points->minTime = null;
	}

	$_speed           = array_filter( $points->speed );
	$points->avgSpeed = $_speed ? array_sum( $_speed ) / count( $_speed ) : null;

	$averages = array(
		'avgCad'  => array( 'cad', 0 ),
		'avgHr'   => array( 'hr', 0 ),
		'avgTemp' => array( 'atemp', 1 ),
	);
	foreach ( $averages as $stat => $def ) {
		$values         = array_filter( $points->{$def[0]} );
		$points->$stat = $values ? (float) round( array_sum( $values ) / count( $values ), $def[1] ) : null;
	}

	return $points;
}
