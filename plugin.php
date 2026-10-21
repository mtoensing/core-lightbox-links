<?php
/**
 * Plugin Name: Core Lightbox Links
 * Description: Open image-file text links in the native WordPress image lightbox.
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

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script( 'core-lightbox-links', plugins_url( 'view.js', __FILE__ ), array(), '0.1.0', true );
	wp_enqueue_style( 'wp-block-image' );
	wp_add_inline_style( 'wp-block-image', '.cll-native-trigger{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}' );
} );

add_filter( 'the_content', function ( $content ) {
	if ( is_admin() || false === stripos( $content, '<a ' ) ) {
		return $content;
	}

	$processor = new WP_HTML_Tag_Processor( $content );
	$triggers  = array();

	while ( $processor->next_tag( 'a' ) ) {
		$href = $processor->get_attribute( 'href' );

		if ( ! is_string( $href ) || ! preg_match( '/\.(?:jpe?g|png|gif|webp|avif)(?:[?#].*)?$/i', $href ) ||
			null !== $processor->get_attribute( 'download' ) ||
			null !== $processor->get_attribute( 'target' ) ||
			null !== $processor->get_attribute( 'data-wp-interactive' ) ) {
			continue;
		}

		$id = wp_unique_id( 'cll-' );
		$processor->set_attribute( 'data-cll-target', $id );

		$markup = '<figure class="wp-block-image cll-native-trigger" id="' . esc_attr( $id ) . '"><img src="' . esc_url( $href ) . '" alt="" loading="eager"></figure>';
		$triggers[] = render_block(
			array(
				'blockName'    => 'core/image',
				'attrs'        => array( 'lightbox' => array( 'enabled' => true ) ),
				'innerBlocks'  => array(),
				'innerHTML'    => $markup,
				'innerContent' => array( $markup ),
			)
		);
	}

	if ( ! $triggers ) {
		return $content;
	}

	return $processor->get_updated_html() . implode( '', $triggers );
}, 20 );
