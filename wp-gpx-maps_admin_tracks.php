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
			wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_clearcache_nonce' . basename($pathAllFiles) )
			)
		{
			echo '<div class="notice notice-success"><p>';
	    	_e( 'Cache is now empty!', 'wp-gpx-maps' );
			echo '</p></div>';

			wpgpxmaps_recursive_remove_directory($cacheGpxPath, true);
		}

	}
	
	//if admin, you can upload files; BUT if uploaded from other users is checked and you are a Contributor, even other users can
	$allow_other_users_upload = wpgpxmaps_findValue($attr, 'allow_other_users_upload', 'wpgpxmaps_allow_users_upload', false);
	if((current_user_can('administrator')) || (current_user_can('contributor')) && ($allow_other_users_upload == true)){
		if ( is_writable ( $realGpxPath ) ){

		?>

			<div class="tablenav top">
			<?php
				echo '<form enctype="multipart/form-data" method="POST" style="float:left; margin:5px 20px 0 0" action="' . get_bloginfo('wpurl') . '/wp-admin/' . $menu_root . '?page=WP-GPX-Maps">'; ?>
					<?php _e( 'Choose a file to upload:', 'wp-gpx-maps' )?> <input name="uploadedfile[]" type="file" onchange="submitgpx(this);" multiple />
					<?php
						if ( isset($_FILES['uploadedfile']) )
						{
							//Sort
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
									_e( 'The file type is not supported!', 'wp-gpx-maps' );
									echo '</p></div>';
								}
							}
						}
					?>
				</form>

				<form method="POST" style="float:left; margin:5px 20px 0 0" action= "options-general.php?page=WP-GPX-Maps&_wpnonce=<?php echo wp_create_nonce( 'wpgpx_clearcache_nonce' ) ?> " >
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
	}
	$myGpxFileNames = array();
	
	if(current_user_can('delete_others_pages')){// admins and editors
		//change directory in which realgpxpath explore, because admins and editors can see everything
		$realGpxPath = str_replace('\\'.wp_get_current_user()->user_login,'',$realGpxPath);
	}
	
	if ( is_readable ( $realGpxPath ) && $handle = opendir($realGpxPath)) {
		$pathAllFiles = getPathFilesContents($realGpxPath, $results = array());
		for($i = 0; $i < sizeof($pathAllFiles,0); $i++){
			
			if (preg_match($gpxRegEx, basename($pathAllFiles[$i]) ))
			{
				if ( isset($_GET['_wpnonce'])
					&&
					wp_verify_nonce( $_GET['_wpnonce'], 'wpgpx_deletefile_nonce_' .$pathAllFiles[$i] )
					)
					{
					if ( file_exists($pathAllFiles[$i] ))
					{
						unlink($pathAllFiles[$i]);
						$pathAllFiles[$i] = null;
						echo '<div class="notice notice-success"><p>';
						_e( 'The file', 'wp-gpx-maps' ) ;
						echo ' ' . '<strong>' . basename($pathAllFiles[$i]) . '</strong>' . ' ';
						_e( 'has been successfully deleted.', 'wp-gpx-maps' ) ;
						echo '</p></div>';
					}
					else {
						echo '<div class=" notice notice-error"><p>';
						_e( 'The file', 'wp-gpx-maps' ) ;
						echo ' ' . '<strong>' . basename($pathAllFiles[$i]) . '</strong>' . ' ';
						_e( 'could not be deleted.', 'wp-gpx-maps' ) ;
						echo '</p></div>';

					}
				}
				else
				{
					if(!$pathAllFiles[$i] == null){
					
					$ArrayFile[] = array(
											'name' => basename($pathAllFiles[$i]),
											'size' => filesize( $pathAllFiles[$i] ),
											'lastedit' => filemtime( $pathAllFiles[$i] ),
											'nonce' => wp_create_nonce( 'wpgpx_deletefile_nonce_' . $pathAllFiles[$i] ),
											);
					}
				}

			}
		}
		closedir($handle);
	}
	$relativeGpxPath = str_replace(wp_get_current_user()->user_login,"",$relativeGpxPath);

	$wpgpxmaps_gpxRelativePath = get_site_url(null, '/wp-content/uploads/gpx/');
	
	$completePath = array();
	$localPath = array();
	
	for($i = 0; $i < count($pathAllFiles); $i++){
		$localPath[$i] = $pathAllFiles[$i];
		$completePath[$i] = get_site_url(null, str_replace("C:\\xampp\\htdocs\\wordpress\\","",$pathAllFiles[$i]));
		$completePath[$i] = str_replace("\\", "/", $completePath[$i]);
		$pathAllFiles[$i] = str_replace('C:\xampp\htdocs\wordpress','',$pathAllFiles[$i]);
		$pathAllFiles[$i] = str_replace('\\','/', $pathAllFiles[$i]);
	}									
											
	//objects array for rows on the table with shortcodes
	$arrayForOutput = array();
	for($i = 0; $i < count($pathAllFiles); $i++){
		//do not output temporary files or null objects
		if((strpos($pathAllFiles[$i], ".tmp" ) == false) && !($pathAllFiles[$i] == null)) $arrayForOutput[] = array(
											'index' => $i,
											'nomeSito' => get_site_url(),
											'pathPerDownload' => $completePath[$i],
											'pathPerShortcode' => $pathAllFiles[$i],
											'name' => basename($pathAllFiles[$i]),
											'size' => filesize( $localPath[$i] ),
											'lastedit' => filemtime( $localPath[$i] ),
											'nonce' => wp_create_nonce( 'wpgpx_deletefile_nonce_' .$localPath[$i] ),
											);
	}
	
?>

	<table id="table" class="wp-list-table widefat plugins"></table>

<script type="text/javascript">
	function copia(elementId){
		  // Create an auxiliary hidden input
		  var aux = document.createElement("input");

		  // Get the text from the element passed into the input
		  aux.setAttribute("value", document.getElementById(elementId).innerHTML);

		  // Append the aux input to the body
		  document.body.appendChild(aux);

		  // Highlight the content
		  aux.select();

		  // Execute the copy command
		  document.execCommand("copy");

		  // Remove the input from the body
		  document.body.removeChild(aux);
		  
		  alert("Successfully Copied!");
	}

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
					'<a class="delete_gpx_row" href=' + row.nomeSito + '/wp-admin/options-general.php?page=WP-GPX-Maps&_wpnonce=' + row.nonce + ' ><?php _e( 'Delete', 'wp-gpx-maps' ); ?></a>',
					' | ',
					'<a href="' + row.pathPerDownload + '"><?php _e( 'Download', 'wp-gpx-maps' ); ?></a>',
					' | ',
					'<?php _e( 'Shortcode:', 'wp-gpx-maps' ); ?>' + '<p style="display: inline" id="' + row.index + '"> [sgpx gpx="' + row.pathPerShortcode + '"]</p> ',
					' | ',
					'<p style="cursor:pointer; display:inline; color:#0073AA" onclick="copia(' + row.index + ')"><?php _e( 'Copy', 'wp-gpx-maps' ); ?></p>',
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
		data: <?php echo json_encode( $arrayForOutput ) ?>
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