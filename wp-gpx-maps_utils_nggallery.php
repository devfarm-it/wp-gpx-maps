<?php

	function wpgpxmaps_isNGGalleryActive() {
		if (!function_exists('is_plugin_active')) {
			require_once(wp_gpx_maps_sitePath() . '/wp-admin/includes/plugin.php');
		}
		return is_plugin_active("nextgen-gallery/nggallery.php");
	}
	
	function wpgpxmaps_isNGGalleryProActive() {
		if (!function_exists('is_plugin_active')) {
			require_once(wp_gpx_maps_sitePath() . '/wp-admin/includes/plugin.php');
		}
		return is_plugin_active("nextgen-gallery-pro/nggallery-pro.php");
	}
	

	function getNGGalleryImages($ngGalleries, $ngImages, $dt, $lat, $lon, $dtoffset, &$error)
	{
	
		$result = array();
		$galids = explode(',', $ngGalleries);
		$imgids = explode(',', $ngImages);
		
		if (!wpgpxmaps_isNGGalleryActive())
			return '';
		try {

			$pictures = array();
			foreach ($galids as $g) {						
				$pictures = array_merge($pictures, nggdb::get_gallery($g));
			}
			foreach ($imgids as $i) {
				array_push($pictures, nggdb::find_image($i));
			}
			
			// print_r ($pictures);
			
			foreach ($pictures as $p) {
			
				$item = array();
				$item["data"] = $p->thumbHTML;
				
				if (is_callable('exif_read_data'))
				{
					$exif = @exif_read_data($p->imagePath);	
					if ($exif !== false)
					{
						$item["lon"] = getExifGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
						$item["lat"] = getExifGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);
						if (($item["lat"] != 0) || ($item["lon"] != 0)) 
						{
							$result[] = $item;
						}
						else if (isset($p->imagedate))
						{
							$_dt = strtotime($p->imagedate) + $dtoffset;
							$_item = findItemCoordinate($_dt, $dt, $lat, $lon);
							if ($_item != null)
							{
								$item["lat"] = $_item["lat"];
								$item["lon"] = $_item["lon"];
								$result[] = $item;
							}
						}
					}
				}
				else
				{
					$error .= "Sorry, <a href='http://php.net/manual/en/function.exif-read-data.php' target='_blank' >exif_read_data</a> function not found! check your hosting..<br />";
				}
			}
			

/* START FIX NEXT GEN GALLERY 2.x */

			if ( class_exists("C_Component_Registry") )
			{

				$renderer  = C_Component_Registry::get_instance()->get_utility('I_Displayed_Gallery_Renderer');
				$params['gallery_ids']     = $ngGalleries;
				$params['image_ids']       = $ngImages;
				$params['display_type']    = NEXTGEN_GALLERY_BASIC_THUMBNAILS;
				$params['images_per_page'] = 999;
				// also add js references to get the gallery working
				$dummy = $renderer->display_images($params, $inner_content);
					
	/* START FIX NEXT GEN GALLERY PRO */	

				if (preg_match("/data-nplmodal-gallery-id=[\"'](.*?)[\"']/", $dummy, $m))
				{
					$galid = $m[1];
					if ($galid)
					{
						for($i = 0; $i < count($result); ++$i) 
						{
							$result[$i]["data"] = str_replace("%PRO_LIGHTBOX_GALLERY_ID%", $galid, $result[$i]["data"]);
						}
					}
				}
	/* END FIX NEXT GEN GALLERY PRO */
			}

/* END FIX NEXT GEN GALLERY 2.x */
			
		} catch (Exception $e) {
			$error .= 'Error When Retrieving NextGen Gallery galleries/images: $e <br />';
		}

		return $result;
	}
	
	function findItemCoordinate($imgdt, $dt, $lat, $lon)
	{
		foreach(array_keys($dt) as $i) 
		{
			if ($i!=0 && $imgdt >= $dt[$i-1] && $imgdt <= $dt[$i])
			{
				if ($lat[$i] != 0 && $lon[$i] != 0)
					return array( "lat" => $lat[$i], "lon" => $lon[$i] );
			}
		}
		return null;
	}
	
	function getExifGps($exifCoord, $hemi) 
	{
		$degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
		$minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
		$seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;
		$flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;
		return $flip * ($degrees + $minutes / 60 + $seconds / 3600);
	}

	function gps2Num($coordPart) 
	{
		$parts = explode('/', $coordPart);
		if (count($parts) <= 0)
			return 0;
		if (count($parts) == 1)
			return $parts[0];		
		$lat = floatval($parts[0]);
		$lon = floatval($parts[1]);
		if ($lon == 0)
			return $lat;
		return $lat / $lon;
	}

?>