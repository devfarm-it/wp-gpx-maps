<?php

	if ( !(is_admin()) )
		return;

	$is_admin = current_user_can( 'read' );

	if ( $is_admin != 1 )
		return;

	$gpxRegEx = '/.gpx$/i';
	if ( current_user_can('read') ){
		$menu_root = "options-general.php";
	} else if ( current_user_can('read') ){
		$menu_root = "admin.php";
	}

	if ( isset($_POST['clearcache']) )
	{

		if ( isset($_GET['_wpnonce'])
			&&
			wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_clearcache_nonce' . $entry )
			)
		{
			echo '<div class="notice notice-success"><p>';
	    	_e( 'Cache is now empty!', 'wp-gpx-maps' );
			echo '</p></div>';

			wpgpxmaps_recursive_remove_directory($cacheGpxPath, true);
		}

	}

	if ( is_writable ( $realGpxPath ) ){

	?>

		<div class="tablenav top">
		<?php
            echo '<form enctype="multipart/form-data" method="POST" style="float:left; margin:5px 20px 0 0" action="' . get_bloginfo('wpurl') . '/wp-admin/' . $menu_root . '?page=WP-GPX-Maps">'; ?>
				<?php _e( 'Choose a file to upload:', 'wp-gpx-maps' )?> <input name="uploadedfile[]" type="file" onchange="submitgpx(this);" multiple />
				<?php
					if ( isset($_FILES['uploadedfile']) )
					{
						//Ordinamento
						$total = count($_FILES['uploadedfile']['name']);
						for($i=0; $i<$total; $i++) {
							$uploadingFileName = basename( $_FILES['uploadedfile']['name'][$i]);
							$target_path = $realGpxPath ."/". $uploadingFileName;
							if (preg_match($gpxRegEx, $target_path))
							{
								if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'][$i], $target_path)) {
									echo '<div class="notice notice-success"><p>';
									_e( 'The file', 'wp-gpx-maps' ) ;
									echo ' ' . '<strong>' . $uploadingFileName . '</strong>' . ' ';
									_e( 'has been successfully uploaded.', 'wp-gpx-maps' );
									echo '</p></div>';
								} else{
									echo '<div class=" notice notice-error"><p>';
									_e( 'There was an error uploading the file, please try again!', 'wp-gpx-maps' );
									echo '</p></div>';
								}
							}
							else
							{
								echo '<div class="notice notice-warning"><p>';
								_e( 'The file type not supported!', 'wp-gpx-maps' );
								echo '</p></div>';
							}
						}
					}
				?>
			</form>

			<form method="POST" style="float:left; margin:5px 20px 0 0" action="/wp-admin/options-general.php?page=WP-GPX-Maps&_wpnonce=<?php echo wp_create_nonce( 'wpgpx_clearcache_nonce' ) ?>" >
				<input type="submit" name="clearcache" value="<?php _e( 'Clear Cache', 'wp-gpx-maps' ); ?>" />
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
	$current_user = wp_get_current_user();
	if($current_user->roles[0] == 'editor' || $current_user->roles[0] == 'administrator'){
		//cambia la directory dove guarda i file, poichè admin ed editor possono vederli tutti
		$realGpxPath = str_replace('\\'.$current_user->user_login,'',$realGpxPath);
		echo('SONO ADMIN, QUINDI IL PERCORSO DOVE VADO A GUARDARE è: '.$realGpxPath);
	}
	
	if ( is_readable ( $realGpxPath ) && $handle = opendir($realGpxPath)) {
		$pathAllFiles = getPathFilesContents($realGpxPath, $results = array());
		print_r($pathAllFiles);
		//while (false !== ($entry = readdir($handle))) {
		for($i = 0; $i < sizeof($pathAllFiles,0); $i++){
			//if (preg_match($gpxRegEx, $entry ))
			$file_name = basename($pathAllFiles[$i]);
			if (preg_match($gpxRegEx, $pathAllFiles[$i] ))
			{

				if ( isset($_GET['_wpnonce'])
					&&
					//wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_deletefile_nonce_' . $entry )
					wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_deletefile_nonce_' . $pathAllFiles[$i] )
					) {

					//if ( file_exists($realGpxPath ."/". $entry) )
					if ( file_exists($realGpxPath ."/". $pathAllFiles[$i]) )
					{
						//unlink($realGpxPath ."/". $entry);
						unlink($realGpxPath ."/". $pathAllFiles[$i]);
						//echo "<br/><b>$entry has been deleted.</b>";
						echo "<br/><b>$pathAllFiles[$i] has been deleted.</b>";
					}
					else {
						//echo "<br/><b>Can't delete $entry.</b>";
						echo "<br/><b>Can't delete $pathAllFiles[$i].</b>";
					}
				}
				else
				{
					//$myFile = $realGpxPath . "/" . $entry;
					$myFile = $pathAllFiles[$i];
					$myGpxFileNames[] = array(
											//'name' => $entry,
											'name' => $file_name,
											'size' => filesize( $myFile ),
											'lastedit' => filemtime( $myFile ),
											//'nonce' => wp_create_nonce( 'wpgpx_deletefile_nonce_' . $entry ),
											'nonce' => wp_create_nonce( 'wpgpx_deletefile_nonce_' . $pathAllFiles[$i] ),
											);

				}

			}
		}
		closedir($handle);
	}
	
	$relativeGpxPath = str_replace($current_user->name,"",$relativeGpxPath);
	print_r($relativeGpxPath);
	
	if ( is_readable ( $realGpxPath ) && $handle = opendir($realGpxPath)) {
			for($i = 0; $i < sizeof($pathAllFiles,0); $i++){
			//while (false !== ($entry = readdir($handle))) {
				
				//if (preg_match($gpxRegEx,$entry ))
				if (preg_match($gpxRegEx,$pathAllFiles[$i] ))
				{
					$filenames[] = $realGpxPath . "/" . $pathAllFiles[$i];
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
					'Shortcode: [sgpx gpx="<?php echo $pathAllFiles ?>' + row.name + '"]',
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