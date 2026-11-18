<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'dependencies' => array( 'wp-api-fetch', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-server-side-render' ),
	/* Changes with every edit of index.js, so browsers never keep an old editor script */
	'version'      => (string) filemtime( __DIR__ . '/index.js' ),
);
