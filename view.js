/**
 * Add image-file text links to WordPress's existing core/image lightbox.
 *
 * WordPress has no public non-image trigger API. Keep the small internal state
 * adapter here, without changing rendered HTML or copying the lightbox UI.
 */
import { store } from '@wordpress/interactivity';

const { state, callbacks } = store( 'core/image' );
let nextId = 0;

document.addEventListener( 'click', async ( event ) => {
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

	const link = event.target.closest( 'a[href]' );
	if (
		! link ||
		link.hasAttribute( 'download' ) ||
		link.hasAttribute( 'target' ) ||
		link.hasAttribute( 'data-wp-interactive' ) ||
		link.closest( '.wp-lightbox-container, .wp-lightbox-overlay' ) ||
		link.querySelector( 'img, picture' )
	) {
		return;
	}

	const url = new URL( link.href, document.baseURI );
	if ( ! /\.(?:jpe?g|png|gif|webp|avif)$/i.test( url.pathname ) ) {
		return;
	}

	event.preventDefault();

	// Load on demand rather than downloading every linked image on page load.
	const image = new Image();
	image.src = url.href;
	try {
		await image.decode();
	} catch {
		// Failed images remain accessible as ordinary links.
		window.location.assign( url.href );
		return;
	}

	// Do not interrupt a lightbox already open while the image was loading.
	if ( state.overlayEnabled ) {
		return;
	}

	const id = `cll-${ ++nextId }`;
	state.metadata ??= {};
	state.metadata[ id ] = {
		uploadedSrc: url.href,
		currentSrc: url.href,
		lightboxSrcset: false,
		figureClassNames: 'wp-block-image',
		figureStyles: '',
		imgClassNames: '',
		imgStyles: '',
		targetWidth: 'none',
		targetHeight: 'none',
		scaleAttr: false,
		alt: link.textContent.trim(),
		galleryId: null,
		customAriaLabel: null,
		navigationButtonType: 'icon',
		triggerButtonAriaLabel: 'Enlarge',
		buttonRef: link,
		imageRef: {
			complete: true,
			naturalWidth: image.naturalWidth,
			naturalHeight: image.naturalHeight,
			get offsetWidth() {
				return Math.max( link.offsetWidth, 1 );
			},
			get offsetHeight() {
				return Math.max( link.offsetHeight, 1 );
			},
			getBoundingClientRect() {
				return link.getBoundingClientRect();
			},
		},
	};

	state.scrollTopReset = document.documentElement.scrollTop;
	state.scrollLeftReset = document.documentElement.scrollLeft;
	state.selectedImageId = id;
	state.selectedGalleryId = null;
	state.overlayEnabled = true;
	callbacks.setOverlayStyles();
} );
