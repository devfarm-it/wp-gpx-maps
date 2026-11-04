<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPGPXMAPS_REVIEW_URL', 'https://wordpress.org/support/plugin/wp-gpx-maps/reviews/#new-post' );

if ( is_admin() ) {
	add_action( 'admin_init', 'wpgpxmaps_admin_init' );
	add_action( 'admin_menu', 'wpgpxmaps_admin_menu' );
	add_action( 'admin_notices', 'wpgpxmaps_show_review_notice' );
	add_action( 'admin_post_wpgpxmaps_review', 'wpgpxmaps_review_answer' );
}

function wpgpxmaps_admin_init() {
	wpgpxmaps_plugin_upgrade();

	if ( get_site_option( 'wpgpxmaps_show_notice' ) == 1 ) {
		if ( is_multisite() ) {
			add_action( 'network_admin_notices', 'wpgpxmaps_show_update_notice' );
		} else {
			add_action( 'admin_notices', 'wpgpxmaps_show_update_notice' );
		}
		add_action( 'wp_ajax_wpgpxmaps_dismiss_notice', 'wpgpxmaps_dismiss_notice' );
	}
}

/**
 * Roles and capabilities
 *
 * Capabilities for each user role that are relevant to this plugin:
 *
 * Admin:       Can manage settings. Can show, upload and delete all GPX files.
 * Editor:      Can not manage settings. Can show, upload and delete all GPX files.
 * Author:      Can not manage settings. Can show, upload and delete his only own files.
 * Contributor: Do not have access to the plugin.
 * Subscriber:  Do not have access to the plugin.
 *
 * @see https://wordpress.org/support/article/roles-and-capabilities/
 */
function wpgpxmaps_admin_menu() {
	if ( current_user_can( 'manage_options' ) ) {
		// Access only for Super Administrators and Administrators
		add_options_page( 'WP GPX Maps', 'WP GPX Maps', 'manage_options', 'WP-GPX-Maps', 'wpgpxmaps_html_page' );
	} elseif ( current_user_can( 'publish_posts' ) ) {
		// Access for Editors and Authors
		if ( get_option( 'wpgpxmaps_allow_users_upload' ) == 1 ) {
			add_menu_page( 'WP GPX Maps', 'WP GPX Maps', 'publish_posts', 'WP-GPX-Maps', 'wpgpxmaps_html_page' );
		}
	}
}

/**
 * Wrapper for the option 'wpgpxmaps_version'
 */
function wpgpxmaps_get_installed_version() {
	return get_option( 'wpgpxmaps_version' );
}

/**
 * Wrapper for the defined constant WPGPXMAPS_CURRENT_VERSION
 */
function wpgpxmaps_get_current_version() {
	return WPGPXMAPS_CURRENT_VERSION;
}

/**
 * Plugin upgrade
 */
function wpgpxmaps_plugin_upgrade() {
	$installed_version = wpgpxmaps_get_installed_version();

	if ( wpgpxmaps_get_current_version() == $installed_version ) {
		return;
	}

	delete_site_option( 'wpgpxmaps_version' );
	update_option( 'wpgpxmaps_version', wpgpxmaps_get_current_version() );

	/* The "what's new" notice only for a new 1.x version (1.10 -> 1.11), not for fixes (1.10.03 -> 1.10.04) */
	$minor = function ( $version ) {
		return implode( '.', array_slice( explode( '.', (string) $version ), 0, 2 ) );
	};
	if ( $minor( wpgpxmaps_get_current_version() ) !== $minor( $installed_version ) ) {
		delete_option( 'wpgpxmaps_show_notice', 0 );
		update_site_option( 'wpgpxmaps_show_notice', 1 );
	}

	/* The review request waits two weeks after the installation or the first update with this feature */
	if ( false === get_option( 'wpgpxmaps_review_after' ) ) {
		update_option( 'wpgpxmaps_review_after', time() + 14 * DAY_IN_SECONDS, false );
	}
}

/**
 * Show the update notice
 */
function wpgpxmaps_show_update_notice() {
	if ( ! current_user_can( 'manage_options' ) ) return;

	?>

	<div id="wpgpxmaps-notice" class="notice notice-info is-dismissible">
		<p>
			<strong>
				<?php echo 		sprintf(
					/* translators: %1s: Plugin versions number */
					esc_html__( 'What&lsquo;s new in WP GPX Maps %1s', 'wp-gpx-maps' ),
					esc_html( WPGPXMAPS_CURRENT_VERSION )
				) ?>
			</strong>
		</p>
		<p>
			<?php esc_html_e( 'New map effects for MapLibre and MapBox: fog and sky, shaded relief and the height of the 3D terrain, in Settings > WP GPX Maps > Map or for a single map in the block. Since 1.11: free MapLibre maps with 3D terrain, without an API key.', 'wp-gpx-maps' ); ?>
		</p>
		<p>
			<a href="https://www.youtube.com/watch?v=n55Yzw2ig7A" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Watch the 3-minute video', 'wp-gpx-maps' ); ?></a>
			&middot;
			<a href="https://wordpress.org/plugins/wp-gpx-maps/#developers" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Changelog', 'wp-gpx-maps' ); ?></a>
			&middot;
			<a href="<?php echo esc_url( WPGPXMAPS_REVIEW_URL ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Enjoying it? Leave a review', 'wp-gpx-maps' ); ?></a>
			&middot;
			<a id="wpgpxmaps-post-dismiss-notice" href="javascript:wpgpxmaps_dismiss_notice();"><?php esc_html_e( 'Dismiss this notice', 'wp-gpx-maps' ); ?></a>
		</p>
	</div>
	<script>
		function wpgpxmaps_dismiss_notice() {
			var data = {
				'action': 'wpgpxmaps_dismiss_notice',
				'_ajax_nonce': '<?php echo esc_js( wp_create_nonce( 'wpgpxmaps_dismiss_notice' ) ); ?>'
			};

			jQuery.post( ajaxurl, data, function( response ) {
				jQuery( '#wpgpxmaps-notice' ).hide();
			});
		}

		jQuery( document ).ready( function() {
			jQuery( 'body' ).on( 'click', '.notice-dismiss', function() {
				wpgpxmaps_dismiss_notice();
			});
		});
	</script>
	<?php
}

/**
 * Dismiss the update notice
 */
function wpgpxmaps_dismiss_notice() {
	check_ajax_referer( 'wpgpxmaps_dismiss_notice' );

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( null, 403 );
	}

	update_site_option( 'wpgpxmaps_show_notice', 0 );
	wp_send_json_success();
}

/**
 * Review request: two weeks after the installation (or the update), only to administrators, only on the dashboard,
 * the plugins page and the WP GPX Maps page, never together with the update notice. "Maybe later" asks again
 * after 30 days, "Leave a review" and "I already did" never again.
 */
function wpgpxmaps_show_review_notice() {
	if ( ! current_user_can( 'manage_options' ) || 1 == get_site_option( 'wpgpxmaps_show_notice' ) ) {
		return;
	}
	$after = (int) get_option( 'wpgpxmaps_review_after', 0 );
	if ( $after <= 0 || time() < $after ) {
		return;
	}
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen || ! in_array( $screen->id, array( 'dashboard', 'plugins', 'settings_page_WP-GPX-Maps' ), true ) ) {
		return;
	}
	$link = function ( $answer ) {
		return wp_nonce_url( admin_url( 'admin-post.php?action=wpgpxmaps_review&answer=' . $answer ), 'wpgpxmaps_review' );
	};
	?>
	<div class="notice notice-info">
		<p><?php esc_html_e( 'You have been using WP GPX Maps for a while: is it useful? A short review on wordpress.org helps other people find it, and keeps it free and maintained.', 'wp-gpx-maps' ); ?></p>
		<p>
			<a class="button button-primary" href="<?php echo esc_url( $link( 'rate' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Leave a review', 'wp-gpx-maps' ); ?></a>
			<a class="button" href="<?php echo esc_url( $link( 'later' ) ); ?>"><?php esc_html_e( 'Maybe later', 'wp-gpx-maps' ); ?></a>
			<a class="button-link" style="margin-left:8px" href="<?php echo esc_url( $link( 'done' ) ); ?>"><?php esc_html_e( 'I already did', 'wp-gpx-maps' ); ?></a>
		</p>
	</div>
	<?php
}

function wpgpxmaps_review_answer() {
	check_admin_referer( 'wpgpxmaps_review' );
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Sorry, you are not allowed to do this.', 'wp-gpx-maps' ), 403 );
	}
	$answer = isset( $_GET['answer'] ) ? sanitize_key( wp_unslash( $_GET['answer'] ) ) : '';
	if ( 'later' === $answer ) {
		update_option( 'wpgpxmaps_review_after', time() + 30 * DAY_IN_SECONDS, false );
		wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url() );
		exit;
	}
	/* Rated or already rated: never ask again */
	update_option( 'wpgpxmaps_review_after', -1, false );
	if ( 'rate' === $answer ) {
		// phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect -- fixed wordpress.org address
		wp_redirect( WPGPXMAPS_REVIEW_URL );
		exit;
	}
	wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url() );
	exit;
}

/**
 * Small box at the top of the WP GPX Maps page: review, sponsor, Pro waitlist.
 */
function wpgpxmaps_support_box() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wpgpxmaps-support-box" style="margin:12px 0;padding:10px 14px;background:#fff;border:1px solid #c3c4c7;border-left:4px solid #0F6E56">
		<?php esc_html_e( 'WP GPX Maps is free and open source.', 'wp-gpx-maps' ); ?>
		<a href="<?php echo esc_url( WPGPXMAPS_REVIEW_URL ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Leave a review', 'wp-gpx-maps' ); ?></a>
		&middot;
		<a href="https://github.com/sponsors/bastianonm" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Support the development', 'wp-gpx-maps' ); ?></a>
		&middot;
		<a href="https://devfarm.it/wp-gpx-maps-free-vs-pro/#waitlist" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WP GPX Maps Pro is coming: get notified', 'wp-gpx-maps' ); ?></a>
	</div>
	<?php
}

function wpgpxmaps_ilc_admin_tabs( $current ) {
	$tabs = array();
	if ( current_user_can( 'manage_options' ) ) {
		// Access for Super Administrators and Administrators
		$tabs = array(
			'tracks'         => __( 'Tracks', 'wp-gpx-maps' ),
			'settings'       => __( 'Settings', 'wp-gpx-maps' ),
			'administration' => __( 'Administration', 'wp-gpx-maps' ),
			'help'           => __( 'Help', 'wp-gpx-maps' ),
		);
	} elseif ( current_user_can( 'publish_posts' ) ) {
		// Access for Editors and Authors
		$tabs = array(
			'tracks' => __( 'Tracks', 'wp-gpx-maps' ),
			'help'   => __( 'Help', 'wp-gpx-maps' ),
		);
	}

	/**
	 * Filters the tabs of the WP GPX Maps admin page. Add-ons print their tab with the action wpgpxmaps_admin_tab_{tab}.
	 *
	 * @param array $tabs Tab slug => label.
	 */
	$tabs = apply_filters( 'wpgpxmaps_admin_tabs', $tabs );

	echo '<h2 class="nav-tab-wrapper">';
	foreach ( $tabs as $tab => $name ) {
		$class = ( $tab == $current ) ? ' nav-tab-active' : '';
		echo "<a class='nav-tab".esc_attr($class)."' href='?page=WP-GPX-Maps&tab=" . esc_attr($tab) . "'>".esc_html($name)."</a>";
	}
	echo '</h2>';
}

function wpgpxmaps_html_page() {
	$realGpxPath          = gpxFolderPath();
	$cacheGpxPath         = gpxCacheFolderPath();
	$relativeGpxPath      = relativeGpxFolderPath();
	$relativeGpxPath      = str_replace( '\\', '/', $relativeGpxPath );
	$relativeGpxCachePath = relativeGpxCacheFolderPath();
	$relativeGpxCachePath = str_replace( '\\', '/', $relativeGpxCachePath );

	// Only selects which tab to show (compared against a fixed list below), no data is changed: no nonce needed.
	$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'tracks'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

	?>

<div class="wrap">

	<div id="icon-themes" class="icon32"> </div>

	<h1 class="header-title">
		<?php
		printf(
			/* translators: %1s: Plugin versions number */
			esc_html__( 'WP GPX Maps %1s', 'wp-gpx-maps' ),
			esc_attr(WPGPXMAPS_CURRENT_VERSION) 
		);
		?>
	</h1>

	<!-- The First Div (for body) ends in the respective file for the corresponding tab -->

	<?php

	wpgpxmaps_support_box();

	if ( file_exists( $realGpxPath ) && is_dir( $realGpxPath ) ) {
		// Directory exists
	} else {
		if ( ! wp_mkdir_p( $realGpxPath ) ) {
			echo '<div class=" notice notice-error"><p>';
			printf(
				/* translators: %1s: Relative path of the GPX folder */
				esc_html__( 'Can&lsquo;t create the folder %1s for GPX files. Please create the folder and make it writable! If not, you will must update the files manually!', 'wp-gpx-maps' ),
				'<span class="code"><strong>' . esc_html( $relativeGpxPath ) . '</strong></span>'
			);
			echo '</p></div>';
		}
	}
	if ( file_exists( $cacheGpxPath ) && is_dir( $cacheGpxPath ) ) {
		// Directory exists
	} else {
		if ( ! wp_mkdir_p( $cacheGpxPath ) ) {
			echo '<div class=" notice notice-error"><p>';
			printf(
				/* translators: %1s: Relative path of the GPX cache folder */
				esc_html__( 'Can&lsquo;t create the cache folder %1s for the GPX files. Please create the folder and make it writable! If not, you will must update the files manually!', 'wp-gpx-maps' ),
				'<span class="code"><strong>' . esc_html( $relativeGpxCachePath ) . '</strong></span>'
			);
			echo '</p></div>';
		}
	}

	wpgpxmaps_ilc_admin_tabs( $tab );

	if ( 'tracks' == $tab ) {
		include 'wp-gpx-maps-admin-tracks.php';
	} elseif ( 'settings' == $tab ) {
		include 'wp-gpx-maps-admin-settings.php';
	} elseif ( 'administration' == $tab ) {
		include 'wp-gpx-maps-admin-administration.php';
	} elseif ( 'help' == $tab ) {
		include 'wp-gpx-maps-help.php';
	} else {
		/** Prints the content of a tab added with the wpgpxmaps_admin_tabs filter. */
		do_action( 'wpgpxmaps_admin_tab_' . $tab );
	}
}
?>