<?php

	if ( !(is_admin()) )
		return;
	
	$is_admin = current_user_can( 'publish_posts' );
	
	if ( $is_admin != 1 )
		return;
	
	$gpxRegEx = '/.gpx$/i';
        if ( current_user_can('manage_options') ){
            $menu_root = "options-general.php";
        } else if ( current_user_can('publish_posts') ){
            $menu_root = "admin.php";
        }

	if ( isset($_POST['clearcache']) )
	{
		
		if ( isset($_GET['_wpnonce']) 
			&& 
			wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_clearcache_nonce' . $entry ) 
			) 
		{				
			echo "Cache is now empty!";
			wpgpxmaps_recursive_remove_directory($cacheGpxPath, true);			
		}
		
	}

	if ( is_writable ( $realGpxPath ) ){
	
	?>

		<div class="tablenav top">
<?php
            echo '<form enctype="multipart/form-data" method="POST" style="float:left; margin:5px 20px 0 0" action="' . get_bloginfo('wpurl') . '/wp-admin/' . $menu_root . '?page=WP-GPX-Maps">'; ?>
				Choose a file to upload: <input name="uploadedfile[]" type="file" onchange="submitgpx(this);" multiple />
				<?php
					if ( isset($_FILES['uploadedfile']) )									
					{					
						$total = count($_FILES['uploadedfile']['name']);
						for($i=0; $i<$total; $i++) {
							$uploadingFileName = basename( $_FILES['uploadedfile']['name'][$i]); 								
							$target_path = $realGpxPath ."/". $uploadingFileName; 						
							if (preg_match($gpxRegEx, $target_path))
							{				
								if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'][$i], $target_path)) {
									echo "<br />File <b>".  $uploadingFileName . "</b> has been uploaded";
								} else{
									echo "<br />There was an error uploading the file, please try again!";
								}		
							}
							else
							{
								echo "file not supported!";
							}														
						}
					}
				?>
			</form>
			
			<form method="POST" style="float:left; margin:5px 20px 0 0" action="/wp-admin/options-general.php?page=WP-GPX-Maps&_wpnonce=<?php echo wp_create_nonce( 'wpgpx_clearcache_nonce' ) ?>" >
				<input type="submit" name="clearcache" value="Clear Cache" />				
			</form>		
			
		</div>	
	
	<?php
	
	}
	else
	{
		?>
			<br />
			<br />
			<p style='font-size:2em;'>please make <b><?php echo $realGpxPath ?></b> folder writable. </p>
			<br />
			<br />
			
		<?php		
	}
	
	$myGpxFileNames = array();
	if ( is_readable ( $realGpxPath ) && $handle = opendir($realGpxPath)) {		
		while (false !== ($entry = readdir($handle))) {
			if (preg_match($gpxRegEx, $entry ))
			{

				if ( isset($_GET['_wpnonce']) 
					&& 
					wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_deletefile_nonce_' . $entry ) 
					) { 

					if ( file_exists($realGpxPath ."/". $entry) )
					{
						unlink($realGpxPath ."/". $entry);
						echo "<br/><b>$entry has been deleted.</b>";
					}
					else {
						echo "<br/><b>Can't delete $entry.</b>";
						
					}
				}
				else
				{
					$myFile = $realGpxPath . "/" . $entry;	
					$myGpxFileNames[] = array(
											'name' => $entry, 
											'size' => filesize( $myFile ),
											'lastedit' => filemtime( $myFile ),
											'nonce' => wp_create_nonce( 'wpgpx_deletefile_nonce_' . $entry ),
											);					

				}

			}
		}
		closedir($handle);
	} 
	
	if ( is_readable ( $realGpxPath ) && $handle = opendir($realGpxPath)) {		
			while (false !== ($entry = readdir($handle))) {
				if (preg_match($gpxRegEx,$entry ))
				{
					$filenames[] = $realGpxPath . "/" . $entry;
				}
			}
		closedir($handle);
	} 
	
	$wpgpxmaps_gpxRelativePath = get_site_url(null, '/wp-content/uploads/gpx/');
	
?>
	
	<table id="table" class="wp-list-table widefat plugins"></table>
	
<script type="text/javascript">

	function submitgpx(el)
	{
		 var newEl = document.createElement('span'); 
		 newEl.innerHTML = 'Uploading file...';
		 el.parentNode.insertBefore(newEl,el.nextSibling);  
		 el.parentNode.submit()
	}
	
	jQuery('#table').bootstrapTable({
		columns: [{
			field: 'name',
			title: 'File',
			sortable: true,
			formatter: function(value, row, index) { 

				return [
					'<b>' + row.name + '</b><br />',
					'<a class="delete_gpx_row" href="/wp-admin/options-general.php?page=WP-GPX-Maps&_wpnonce=' + row.nonce + '" >Delete</a>',
					' | ',
					'<a href="<?php echo $wpgpxmaps_gpxRelativePath ?>' + row.name + '">Download</a>',
					' | ',
					'Shortcode: [sgpx gpx="<?php echo $relativeGpxPath ?>' + row.name + '"]',
				].join('')
			
			}
		}, {
			field: 'lastedit',
			title: 'Last modified',
			sortable: true,
			formatter: function(value, row, index) { 
					var d = new Date(value*1000);
					return d.toLocaleDateString() + " " + d.toLocaleTimeString();
				}
		}, {
			field: 'size',
			title: 'File size',
			sortable: true,
			formatter: function(value, row, index) { return humanFileSize(value); }
		}],
		sortName : 'lastedit',
		sortOrder : 'desc', 
		data: <?php echo json_encode( $myGpxFileNames ) ?>
	});	
	
	jQuery('.delete_gpx_row').click(function(){
		return confirm("Are you sure you want to delete?");
	})
	
	function humanFileSize(bytes, si) {
		var thresh = si ? 1000 : 1024;
		if(Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si
			? ['kB','MB','GB','TB','PB','EB','ZB','YB']
			: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1)+' '+units[u];
	}


</script>

<style>
	#table tr:hover {
		background:#eeeeee;
	}
</style>
