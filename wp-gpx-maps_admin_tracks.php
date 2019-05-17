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
						$total = count($_FILES['uploadedfile']['name']);
						for($i=0; $i<$total; $i++) {
							$uploadingFileName = basename( $_FILES['uploadedfile']['name'][$i]);
							$target_path = $realGpxPath ."/". $uploadingFileName;
							if (preg_match($gpxRegEx, $target_path))
							{
								if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'][$i], $target_path)) {
									echo '<div class="notice notice-success"><p>';
									printf(
										/* translators: %s: GPX file name */
										__( 'The file %s has been successfully uploaded.', 'wp-gpx-maps' ),
										'<span class="code"><strong>' . esc_html ( $uploadingFileName ) . '</strong></span>'
									);
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
								_e( 'The file type is not supported!', 'wp-gpx-maps' );
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

				<?php echo '<div class=" notice notice-error"><p>';?>
				<p style='font-size:2em;'>
					<?php printf(
							/* translators: %s: Relative path of the GPX folder */
							__( 'Your folder for GPX files %s is not writable. Please change the folder permissions.', 'wp-gpx-maps' ),
							'<span class="code">' . esc_html ( $relativeGpxPath ) . '</span>'
						);?>
				</p>
				<?php echo '</p></div>';?>
	
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
						echo '<div class="notice notice-success"><p>';
						printf(
							/* translators: %s: GPX file name */
							__( 'The file %s has been successfully deleted.', 'wp-gpx-maps' ),
							'<span class="code"><strong>' . esc_html ( $entry ) . '</strong></span>'
						);
						echo '</p></div>';
					}
					else {
						echo '<div class=" notice notice-error"><p>';
						printf(
							/* translators: %s: GPX file name */
							__( 'The file %s could not be deleted.', 'wp-gpx-maps' ),
							'<span class="code"><strong>' . esc_html ( $entry ) . '</strong></span>'
						);
						echo '</p></div>';

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
		 newEl.innerHTML = '<?php _e( 'Uploading file...', 'wp-gpx-maps' )?>';
		 el.parentNode.insertBefore(newEl,el.nextSibling);
		 el.parentNode.submit()
	}

	jQuery('#table').bootstrapTable({
		columns: [{
			field: 'name',
			title: '<?php _e( 'File', 'wp-gpx-maps' )?>',
			sortable: true,
			formatter: function(value, row, index) {

				return [
					'<b>' + row.name + '</b><br />',
					'<a class="delete_gpx_row" href="/wp-admin/options-general.php?page=WP-GPX-Maps&_wpnonce=' + row.nonce + '" ><?php _e( 'Delete', 'wp-gpx-maps' ) ?></a>',
					' | ',
					'<a href="<?php echo $wpgpxmaps_gpxRelativePath ?>' + row.name + '"><?php _e( 'Download', 'wp-gpx-maps' ) ?></a>',
					' | ',
					'<?php _e( 'Shortcode:', 'wp-gpx-maps' ) ?> [sgpx gpx="<?php echo $relativeGpxPath ?>' + row.name + '"]',
				].join('')

			}
		}, {
			field: 'lastedit',
			title: '<?php _e( 'Last modified', 'wp-gpx-maps' )?>',
			sortable: true,
			formatter: function(value, row, index) {
					var d = new Date(value*1000);
					return d.toLocaleDateString() + " " + d.toLocaleTimeString();
				}
		}, {
			field: 'size',
			title: '<?php _e( 'File size', 'wp-gpx-maps' )?>',
			sortable: true,
			formatter: function(value, row, index) { return humanFileSize(value); }
		}],
		sortName : 'lastedit',
		sortOrder : 'desc',
		data: <?php echo json_encode( $myGpxFileNames ) ?>
	});

	jQuery('.delete_gpx_row').click(function(){
		return confirm("<?php _e( 'Are you sure you want to delete the file?', 'wp-gpx-maps' )?>");
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