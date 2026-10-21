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

add_action( 'init', function () {
	wp_register_script_module(
		'core-lightbox-links/view',
		plugins_url( 'view.js', __FILE__ ),
		array( '@wordpress/interactivity', '@wordpress/block-library/image/view' ),
		'0.1.0'
	);
} );

add_filter( 'the_content', function ( $content ) {
	if ( is_admin() || ! str_contains( strtolower( $content ), '<a ' ) ) {
		return $content;
	}

	$processor = new WP_HTML_Tag_Processor( $content );
	$found     = false;

	while ( $processor->next_tag( 'a' ) ) {
		$href = $processor->get_attribute( 'href' );
		if ( ! is_string( $href ) || ! preg_match( '/\.(?:jpe?g|png|gif|webp|avif)(?:[?#].*)?$/i', $href ) ) {
			continue;
		}

		// Preserve links with specialized behavior, including existing lightboxes.
		if ( $processor->get_attribute( 'download' ) !== null ||
			$processor->get_attribute( 'data-wp-interactive' ) !== null ||
			$processor->get_attribute( 'target' ) !== null ) {
			continue;
		}

		$id = wp_unique_id( 'cll-' );
		$processor->set_attribute( 'data-cll-image', $id );
		$processor->set_attribute( 'data-wp-interactive', 'core/image' );
		$processor->set_attribute( 'data-wp-context', wp_json_encode( array( 'imageId' => $id ) ) );
		$processor->set_attribute( 'data-wp-on--click', 'actions.showLightbox' );

		wp_interactivity_state(
			'core/image',
			array(
				'metadata' => array(
					$id => array(
						'uploadedSrc'            => esc_url_raw( $href ),
						'lightboxSrcset'         => false,
						'figureClassNames'       => 'wp-block-image',
						'figureStyles'           => '',
						'imgClassNames'          => '',
						'imgStyles'              => '',
						'targetWidth'            => 'none',
						'targetHeight'           => 'none',
						'scaleAttr'              => false,
						'alt'                    => '',
						'galleryId'              => null,
						'customAriaLabel'        => null,
						'navigationButtonType'   => 'icon',
						'triggerButtonAriaLabel' => __( 'Enlarge' ),
					),
				),
			)
		);
		$found = true;
	}

	if ( $found ) {
		wp_enqueue_script_module( 'core-lightbox-links/view' );
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
		add_action( 'wp_footer', 'block_core_image_print_lightbox_overlay' );
	}

	return $processor->get_updated_html();
}, 20 );
