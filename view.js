/**
 * Connect image-file text links to the existing core/image lightbox store.
 *
 * Core exposes no public API for non-image triggers. This adapter supplies the
 * image reference expected by Core; it does not render a second lightbox.
 */
import { store } from '@wordpress/interactivity';

const { state } = store( 'core/image' );

document.querySelectorAll( 'a[data-cll-image]' ).forEach( ( link ) => {
	const id = link.getAttribute( 'data-cll-image' );
	const metadata = state.metadata?.[ id ];
	if ( ! metadata ) {
		return;
	}

	const image = new Image();
	image.src = metadata.uploadedSrc;
	metadata.buttonRef = link;

	// Core uses the clicked image geometry for its zoom animation. For text
	// links, use the anchor rectangle as the starting point.
	metadata.imageRef = {
		get complete() {
			return image.complete && image.naturalWidth > 0;
		},
		get naturalWidth() {
			return image.naturalWidth;
		},
		get naturalHeight() {
			return image.naturalHeight;
		},
		get offsetWidth() {
			return Math.max( link.offsetWidth, 1 );
		},
		get offsetHeight() {
			return Math.max( link.offsetHeight, 1 );
		},
		getBoundingClientRect() {
			return link.getBoundingClientRect();
		},
	};
	metadata.currentSrc = metadata.uploadedSrc;

	link.addEventListener( 'click', ( event ) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return;
		}

		// Keep native browser navigation when the image cannot be loaded.
		if ( metadata.imageRef.complete ) {
			event.preventDefault();
		}
	} );
} );
