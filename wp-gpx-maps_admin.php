<?php

if ( is_admin() ) {
	add_action( 'admin_menu', 'wpgpxmaps_admin_menu' );
}

/**
 * Roles and capabilities
 *
 * Capabilities for each user role that are relevant to this plugin:
 *
 * Super Admin: can manage settings; can publish, edit and delete all posts; can upload and delete all GPX files
 * Admin:       can manage settings; can publish, edit and delete all posts; can upload and delete all GPX files
 * Editor:      can not manage settings; can publish, edit and delete all posts; can upload and delete all GPX files
 * Author:      can not manage settings; can publish, edit and delete his own posts; can upload and delete his own files
 * Contributor: can not manage settings; can edit and delete his own posts; can not manage GPX files
 * Subscriber:  can not manage settings; can not manage posts; can not manage GPX files (has read status everywhere)
 *
 * @see https://wordpress.org/support/article/roles-and-capabilities/
 */
function wpgpxmaps_admin_menu() {

	if ( current_user_can( 'manage_options' ) ) {
		/* Access only for Super Administrators and Administrators */
		add_options_page( 'WP GPX Maps', 'WP GPX Maps', 'manage_options', 'WP-GPX-Maps', 'WP_GPX_Maps_html_page' );

	} elseif ( current_user_can( 'publish_posts' ) ) {
		/* Access for Editors and Authors */

		/* Contributor Authors and */
		$allow_users_upload = get_option( 'wpgpxmaps_allow_users_view' ) === 'true';

		if ( $allow_users_upload == 1 ) {
			add_menu_page( 'WP GPX Maps', 'WP GPX Maps', 'publish_posts', 'WP-GPX-Maps', 'WP_GPX_Maps_html_page' );
		}
	}
}

function wpgpxmaps_ilc_admin_tabs( $current ) {

	if ( current_user_can( 'manage_options' ) ) {
		/* Access for Super Administrators and Administrators */
		$tabs = array(
			'tracks'   => __( 'Tracks', 'wp-gpx-maps' ),
			'settings' => __( 'Settings', 'wp-gpx-maps' ),
			'help'     => __( 'Help', 'wp-gpx-maps' ),
		);

	} elseif ( current_user_can( 'publish_posts' ) ) {
		/* Access for Editors and Authors */
		$tabs = array(
			'tracks' => __( 'Tracks', 'wp-gpx-maps' ),
			'help'   => __( 'Help', 'wp-gpx-maps' ),
		);
	}

	echo '<h2 class="nav-tab-wrapper">';

	foreach ( $tabs as $tab => $name ) {
		$class = ( $tab == $current ) ? ' nav-tab-active' : '';
		echo "<a class='nav-tab$class' href='?page=WP-GPX-Maps&tab=$tab'>$name</a>";
	}

	echo '</h2>';
}

function WP_GPX_Maps_html_page() {

	$realGpxPath          = gpxFolderPath();
	$cacheGpxPath         = gpxCacheFolderPath();
	$relativeGpxPath      = relativeGpxFolderPath();
	$relativeGpxPath      = str_replace( '\\', '/', $relativeGpxPath );
	$relativeGpxCachePath = relativeGpxCacheFolderPath();
	$relativeGpxCachePath = str_replace( '\\', '/', $relativeGpxCachePath );
	$tab                  = $_GET['tab'];

	if ( $tab == '' )

		$tab = 'tracks';
	?>

	<div id="icon-themes" class="icon32"><br></div>

		<h2>
			<?php _e( 'Settings', 'wp-gpx-maps' ); ?>
		</h2>

	<?php
	if ( file_exists( $realGpxPath ) && is_dir( $realGpxPath ) ) {

		/* Directory exist! */

	} else {
		if ( ! @mkdir( $realGpxPath, 0755, true ) ) {
			echo '<div class=" notice notice-error"><p>';
			printf(
				/* translators: Relative path of the GPX folder */
				__( 'Can not create the folder %1s for GPX files. Please create the folder and make it writable! If not, you will must update the files manually!', 'wp-gpx-maps' ),
				'<span class="code"><strong>' . esc_html( $relativeGpxPath ) . '</strong></span>'
			);
			echo '</p></div>';
		}
	}
	if ( file_exists( $cacheGpxPath ) && is_dir( $cacheGpxPath ) ) {

		/* Directory exist! */

	} else {
		if ( ! @mkdir( $cacheGpxPath, 0755, true ) ) {
			echo '<div class=" notice notice-error"><p>';
			printf(
				/* translators: Relative path of the GPX cache folder */
				__( 'Can not create the cache folder %1s for the GPX files. Please create the folder and make it writable! If not, you will must update the files manually!', 'wp-gpx-maps' ),
				'<span class="code"><strong>' . esc_html( $relativeGpxCachePath ) . '</strong></span>'
			);
			echo '</p></div>';
		}
	}

	wpgpxmaps_ilc_admin_tabs( $tab );

	if ( 'tracks' == $tab ) {
		include 'wp-gpx-maps_admin_tracks.php';

	} elseif ( 'settings' == $tab  ) {
		include 'wp-gpx-maps_admin_settings.php';

	} elseif ( 'help' == $tab ) {
		include 'wp-gpx-maps_help.php';
	}
}

?>
