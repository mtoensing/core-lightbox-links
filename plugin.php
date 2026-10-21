<?php
/**
 * Plugin Name: Core Lightbox Links
 * Description: Open links to image files in the native WordPress image lightbox.
 * Version: 0.1.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Marc Tönsing
 * License: GPL-2.0-or-later
 * Text Domain: core-lightbox-links
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load WordPress's existing lightbox resources on frontend pages.
 *
 * Detection and metadata registration for links happen entirely in JavaScript.
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script_module( '@wordpress/block-library/image/view' );
	wp_enqueue_script_module(
		'core-lightbox-links/view',
		plugins_url( 'view.js', __FILE__ ),
		array( '@wordpress/interactivity', '@wordpress/block-library/image/view' ),
		'0.1.0'
	);
	wp_enqueue_style( 'wp-block-image' );

	wp_interactivity_config(
		'core/image',
		array(
			'defaultAriaLabel' => __( 'Enlarged image' ),
			'closeButtonText'  => __( 'Close' ),
			'prevButtonText'   => __( 'Previous' ),
			'nextButtonText'   => __( 'Next' ),
		)
	);

	// Core prints the overlay when a lightbox-enabled Image Block is present.
	// Registering the same callback also covers pages containing only links.
	add_action( 'wp_footer', 'block_core_image_print_lightbox_overlay' );
} );
