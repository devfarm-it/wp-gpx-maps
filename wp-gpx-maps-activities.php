<?php
/**
 * Activities: a taxonomy for the kind of route (hiking, stroller-friendly, mountain bike, climbing...).
 *
 * - Taxonomy wpgpxmaps_activity on posts, pages and Media Library files, with checkboxes in the editor, quick and bulk
 *   edit, an archive page for each activity (/activity/mountain-bike/) and the activity names in the site search.
 * - Default activities, created once (they can be renamed or deleted), each with an emoji icon (editable).
 * - Public API (add-ons): WPGPXMAPS_ACTIVITY_TAXONOMY, wpgpxmaps_activity_icon( $term ), wpgpxmaps_post_activities( $post_id ).
 *
 * @package WP GPX Maps
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPGPXMAPS_ACTIVITY_TAXONOMY', 'wpgpxmaps_activity' );

add_action( 'init', 'wpgpxmaps_register_activities', 5 );
add_action( 'init', 'wpgpxmaps_default_activities', 20 );
add_filter( 'posts_search', 'wpgpxmaps_activity_search', 10, 2 );
add_action( WPGPXMAPS_ACTIVITY_TAXONOMY . '_add_form_fields', 'wpgpxmaps_activity_icon_add_field' );
add_action( WPGPXMAPS_ACTIVITY_TAXONOMY . '_edit_form_fields', 'wpgpxmaps_activity_icon_edit_field' );
add_action( 'created_' . WPGPXMAPS_ACTIVITY_TAXONOMY, 'wpgpxmaps_activity_icon_save' );
add_action( 'edited_' . WPGPXMAPS_ACTIVITY_TAXONOMY, 'wpgpxmaps_activity_icon_save' );

function wpgpxmaps_register_activities() {
	register_taxonomy(
		WPGPXMAPS_ACTIVITY_TAXONOMY,
		array( 'post', 'page', 'attachment' ),
		array(
			'labels'                => array(
				'name'          => __( 'Activities', 'wp-gpx-maps' ),
				'singular_name' => __( 'Activity', 'wp-gpx-maps' ),
				'menu_name'     => __( 'Activities', 'wp-gpx-maps' ),
				'all_items'     => __( 'All activities', 'wp-gpx-maps' ),
				'edit_item'     => __( 'Edit activity', 'wp-gpx-maps' ),
				'add_new_item'  => __( 'Add activity', 'wp-gpx-maps' ),
				'new_item_name' => __( 'New activity', 'wp-gpx-maps' ),
				'search_items'  => __( 'Search activities', 'wp-gpx-maps' ),
				'not_found'     => __( 'No activities found.', 'wp-gpx-maps' ),
			),
			'description'           => __( 'The kind of route: hiking, stroller-friendly, mountain bike, climbing...', 'wp-gpx-maps' ),
			/* Checkboxes in the editor and in quick / bulk edit, like categories */
			'hierarchical'          => true,
			'public'                => true,
			'show_in_rest'          => true,
			'show_admin_column'     => true,
			'rewrite'               => array( 'slug' => 'activity' ),
			'update_count_callback' => '_update_generic_term_count',
		)
	);
}

/**
 * Default activities and their icons.
 */
function wpgpxmaps_activity_defaults() {
	return array(
		'hiking'          => array( __( 'Hiking', 'wp-gpx-maps' ), '🥾' ),
		'walking'         => array( __( 'Walking', 'wp-gpx-maps' ), '🚶' ),
		'stroller'        => array( __( 'Stroller-friendly', 'wp-gpx-maps' ), '👶' ),
		'mountain-bike'   => array( __( 'Mountain bike', 'wp-gpx-maps' ), '🚵' ),
		'road-cycling'    => array( __( 'Road cycling', 'wp-gpx-maps' ), '🚴' ),
		'gravel'          => array( __( 'Gravel', 'wp-gpx-maps' ), '🚲' ),
		'trail-running'   => array( __( 'Trail running', 'wp-gpx-maps' ), '🏃' ),
		'climbing'        => array( __( 'Climbing / Via ferrata', 'wp-gpx-maps' ), '🧗' ),
		'snowshoeing'     => array( __( 'Snowshoeing', 'wp-gpx-maps' ), '❄️' ),
		'ski-touring'     => array( __( 'Ski touring', 'wp-gpx-maps' ), '⛷️' ),
	);
}

/**
 * Create the default activities once (also after an update, without the activation hook).
 */
function wpgpxmaps_default_activities() {
	if ( get_option( 'wpgpxmaps_activities_version' ) ) {
		return;
	}
	update_option( 'wpgpxmaps_activities_version', 1 );
	foreach ( wpgpxmaps_activity_defaults() as $slug => $activity ) {
		if ( ! term_exists( $slug, WPGPXMAPS_ACTIVITY_TAXONOMY ) ) {
			$term = wp_insert_term( $activity[0], WPGPXMAPS_ACTIVITY_TAXONOMY, array( 'slug' => $slug ) );
			if ( ! is_wp_error( $term ) ) {
				update_term_meta( $term['term_id'], 'wpgpxmaps_icon', $activity[1] );
			}
		}
	}
	/* The new /activity/... pages */
	flush_rewrite_rules( false );
}

/**
 * Public API: emoji icon of an activity (term object or id), '📍' when it has none.
 */
function wpgpxmaps_activity_icon( $term ) {
	$term = get_term( $term, WPGPXMAPS_ACTIVITY_TAXONOMY );
	if ( ! $term || is_wp_error( $term ) ) {
		return '📍';
	}
	$icon = (string) get_term_meta( $term->term_id, 'wpgpxmaps_icon', true );
	if ( '' === $icon ) {
		$defaults = wpgpxmaps_activity_defaults();
		$icon     = isset( $defaults[ $term->slug ] ) ? $defaults[ $term->slug ][1] : '📍';
	}
	return $icon;
}

/**
 * Public API: activities of a post, each with id, slug, name, icon and link.
 */
function wpgpxmaps_post_activities( $post_id ) {
	$terms = get_the_terms( $post_id, WPGPXMAPS_ACTIVITY_TAXONOMY );
	if ( ! is_array( $terms ) ) {
		return array();
	}
	$activities = array();
	foreach ( $terms as $term ) {
		$link         = get_term_link( $term );
		$activities[] = array(
			'id'   => $term->term_id,
			'slug' => $term->slug,
			'name' => $term->name,
			'icon' => wpgpxmaps_activity_icon( $term ),
			'url'  => is_wp_error( $link ) ? '' : $link,
		);
	}
	return $activities;
}

/**
 * Site search: also the posts whose activity matches the words searched ("stroller", "mountain bike"...).
 */
function wpgpxmaps_activity_search( $search, $query ) {
	global $wpdb;

	if ( '' === $search || ! $query->is_search() || is_admin() ) {
		return $search;
	}
	$words = trim( (string) $query->get( 's' ) );
	if ( '' === $words ) {
		return $search;
	}

	$like = '%' . $wpdb->esc_like( $words ) . '%';
	$ids  = $wpdb->prepare(
		"SELECT tr.object_id FROM {$wpdb->term_relationships} tr
		INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
		INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id
		WHERE tt.taxonomy = %s AND ( t.name LIKE %s OR t.slug LIKE %s )",
		WPGPXMAPS_ACTIVITY_TAXONOMY,
		$like,
		$like
	);

	/* WordPress builds " AND ((...))": the posts of the activity are added with OR */
	return preg_replace( '/^\s*AND\s*\(/', " AND ( {$wpdb->posts}.ID IN ( {$ids} ) OR ", $search, 1 );
}

function wpgpxmaps_activity_icon_add_field() {
	echo '<div class="form-field"><label for="wpgpxmaps_icon">' . esc_html__( 'Icon', 'wp-gpx-maps' ) . '</label>';
	echo '<input type="text" name="wpgpxmaps_icon" id="wpgpxmaps_icon" value="" maxlength="8" style="width:6em" />';
	echo '<p>' . esc_html__( 'An emoji shown with the routes of this activity, e.g. 🥾 🚵 🧗', 'wp-gpx-maps' ) . '</p></div>';
	wp_nonce_field( 'wpgpxmaps_activity_icon', 'wpgpxmaps_activity_icon_nonce' );
}

function wpgpxmaps_activity_icon_edit_field( $term ) {
	echo '<tr class="form-field"><th scope="row"><label for="wpgpxmaps_icon">' . esc_html__( 'Icon', 'wp-gpx-maps' ) . '</label></th><td>';
	echo '<input type="text" name="wpgpxmaps_icon" id="wpgpxmaps_icon" value="' . esc_attr( wpgpxmaps_activity_icon( $term ) ) . '" maxlength="8" style="width:6em" />';
	echo '<p class="description">' . esc_html__( 'An emoji shown with the routes of this activity, e.g. 🥾 🚵 🧗', 'wp-gpx-maps' ) . '</p>';
	wp_nonce_field( 'wpgpxmaps_activity_icon', 'wpgpxmaps_activity_icon_nonce' );
	echo '</td></tr>';
}

function wpgpxmaps_activity_icon_save( $term_id ) {
	if ( ! isset( $_POST['wpgpxmaps_icon'], $_POST['wpgpxmaps_activity_icon_nonce'] )
		|| ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['wpgpxmaps_activity_icon_nonce'] ) ), 'wpgpxmaps_activity_icon' )
		|| ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	$icon = mb_substr( trim( sanitize_text_field( wp_unslash( $_POST['wpgpxmaps_icon'] ) ) ), 0, 4 );
	if ( '' === $icon ) {
		delete_term_meta( $term_id, 'wpgpxmaps_icon' );
	} else {
		update_term_meta( $term_id, 'wpgpxmaps_icon', $icon );
	}
}
