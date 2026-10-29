<?php
/**
 * Track files in the WordPress Media Library.
 *
 * - GPX, TCX, KML, KMZ and FIT files can be uploaded in the Media Library by the users who can upload tracks
 *   (administrators, and editors / authors when "Allow users to upload" is on).
 * - Every uploaded track file is checked before it is saved, also in the Tracks tab: it must be a readable track file
 *   and an XML file must not contain scripts, HTML or entities (an XML file served by the site could run a script).
 * - URLs of the site's own files are read as local files, so a file chosen in the Media Library is not downloaded.
 *
 * @package WP GPX Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'upload_mimes', 'wpgpxmaps_upload_mimes' );
add_filter( 'wp_check_filetype_and_ext', 'wpgpxmaps_check_filetype_and_ext', 10, 3 );
add_filter( 'wp_handle_upload_prefilter', 'wpgpxmaps_check_upload' );
add_filter( 'wp_handle_sideload_prefilter', 'wpgpxmaps_check_upload' );

/**
 * Users who can upload track files (same rule as the Tracks tab).
 */
function wpgpxmaps_userCanUploadTracks() {
	return current_user_can( 'manage_options' ) || ( current_user_can( 'publish_posts' ) && 1 == get_option( 'wpgpxmaps_allow_users_upload' ) );
}

function wpgpxmaps_upload_mimes( $mimes ) {
	if ( wpgpxmaps_userCanUploadTracks() ) {
		$mimes = array_merge( $mimes, wpgpxmaps_trackMimeTypes() );
	}
	return $mimes;
}

/**
 * WordPress compares the extension with the type of the content (e.g. text/xml for a GPX file) and refuses
 * the file when they don't match: track files are checked by wpgpxmaps_check_upload() instead.
 */
function wpgpxmaps_check_filetype_and_ext( $data, $file, $filename ) {
	if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
		return $data;
	}
	$types = wpgpxmaps_trackMimeTypes();
	$ext   = strtolower( pathinfo( (string) $filename, PATHINFO_EXTENSION ) );
	if ( isset( $types[ $ext ] ) && in_array( $types[ $ext ], get_allowed_mime_types(), true ) ) {
		$data['ext']  = $ext;
		$data['type'] = $types[ $ext ];
	}
	return $data;
}

function wpgpxmaps_check_upload( $file ) {
	if ( empty( $file['name'] ) || empty( $file['tmp_name'] ) || ! preg_match( wpgpxmaps_trackFileRegex(), $file['name'] ) ) {
		return $file;
	}
	$error = wpgpxmaps_checkTrackFile( $file['tmp_name'] );
	if ( '' !== $error ) {
		$file['error'] = $error;
	}
	return $file;
}

/**
 * Check a track file before it is saved.
 *
 * @return string Error message, '' when the file is fine.
 */
function wpgpxmaps_checkTrackFile( $path ) {

	$head = (string) @file_get_contents( $path, false, null, 0, 16 );

	if ( strlen( $head ) >= 12 && '.FIT' === substr( $head, 8, 4 ) ) {
		return false === wpgpxmaps_readFit( $path ) ? __( 'This FIT file can\'t be read.', 'wp-gpx-maps' ) : '';
	}

	$content = "PK\x03\x04" === substr( $head, 0, 4 ) ? wpgpxmaps_kmzContent( $path ) : @file_get_contents( $path );
	if ( false === $content || '' === trim( (string) $content ) ) {
		return __( 'This track file can\'t be read.', 'wp-gpx-maps' );
	}

	/* Scripts, HTML / SVG elements, event attributes and entities: not in a track file */
	if ( preg_match( '/<script|<!ENTITY|javascript\s*:|\son[a-z]+\s*=|xmlns(?::\w+)?\s*=\s*["\']http:\/\/www\.w3\.org\/(?:1999\/xhtml|2000\/svg)/i', $content ) ) {
		return __( 'This track file contains scripts or HTML and was not uploaded.', 'wp-gpx-maps' );
	}

	/*
	 * Some GPS programs add <?xml-stylesheet href="details.xsl"?>: harmless with a plain file name (browsers use only
	 * style sheets of the same site, and .xsl files can't be uploaded); refused with an address (http:, data:, //, /).
	 */
	if ( preg_match_all( '/<\?xml-stylesheet[^>]*>/i', $content, $sheets ) ) {
		foreach ( $sheets[0] as $sheet ) {
			if ( ! preg_match( '/href\s*=\s*["\'][\w.-]+\.xslt?["\']/i', $sheet ) ) {
				return __( 'This track file contains scripts or HTML and was not uploaded.', 'wp-gpx-maps' );
			}
		}
	}

	if ( false === wpgpxmaps_readTracks( $path ) ) {
		return __( 'This is not a valid GPX, TCX, KML or FIT file.', 'wp-gpx-maps' );
	}
	return '';
}

/**
 * Path from the site root of a URL of the site's own files (uploads, wp-content, WordPress folder),
 * so it is read as a local file. Other values are returned unchanged.
 */
function wpgpxmaps_siteRelativePath( $item ) {

	$item = trim( (string) $item );
	if ( ! preg_match( '/^https?:\/\//i', $item ) ) {
		return $item;
	}

	$strip = function ( $url ) {
		return untrailingslashit( preg_replace( '/^https?:\/\//i', '', strtok( (string) $url, '?#' ) ) );
	};

	$url     = $strip( $item );
	$uploads = wp_upload_dir();
	$site    = wp_normalize_path( wp_gpx_maps_sitePath() );
	$bases   = array(
		$uploads['baseurl'] => $uploads['basedir'],
		content_url()       => WP_CONTENT_DIR,
		site_url()          => ABSPATH,
	);

	foreach ( $bases as $base_url => $base_dir ) {
		$base_url = $strip( $base_url );
		if ( '' === $base_url || 0 !== strpos( $url . '/', $base_url . '/' ) ) {
			continue;
		}
		$path = wp_normalize_path( untrailingslashit( $base_dir ) . rawurldecode( substr( $url, strlen( $base_url ) ) ) );
		if ( 0 === strpos( $path, $site . '/' ) ) {
			return substr( $path, strlen( $site ) );
		}
	}
	return $item;
}

/**
 * Track files of the Media Library, newest first, for the list of the GPX Map block.
 *
 * @return array label, value (path from the site root) and modified (timestamp) of each file.
 */
function wpgpxmaps_mediaTracks() {
	$tracks      = array();
	$attachments = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'post_mime_type' => array_values( wpgpxmaps_trackMimeTypes() ),
			'posts_per_page' => 200,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
	foreach ( $attachments as $attachment ) {
		$url = wp_get_attachment_url( $attachment->ID );
		if ( ! $url ) {
			continue;
		}
		$tracks[] = array(
			/* translators: 1: title of the file in the Media Library, 2: file name */
			'label'    => sprintf( __( '%1$s (Media Library: %2$s)', 'wp-gpx-maps' ), get_the_title( $attachment ), basename( $url ) ),
			'value'    => wpgpxmaps_siteRelativePath( $url ),
			'modified' => (int) get_post_modified_time( 'U', true, $attachment ),
		);
	}
	return $tracks;
}
