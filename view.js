import { store } from '@wordpress/interactivity';

const { state, callbacks } = store( 'core/image' );
let id = 0;

document.addEventListener( 'click', async ( event ) => {
	const link = event.target.closest?.( 'a[href]' );
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
		! link ||
		link.hasAttribute( 'download' ) ||
		link.hasAttribute( 'target' ) ||
		link.hasAttribute( 'data-wp-interactive' ) ||
		link.closest( '.wp-lightbox-container, .wp-lightbox-overlay' ) ||
		link.querySelector( 'img, picture' )
	) {
		return;
	}

	const url = new URL( link.href );
	if ( ! /\.(jpe?g|png|gif|webp|avif)$/i.test( url.pathname ) ) {
		return;
	}

	event.preventDefault();

	const image = new Image();
	image.src = url.href;
	try {
		await image.decode();
	} catch {
		window.location.assign( url.href );
		return;
	}
	if ( state.overlayEnabled ) {
		return;
	}

	const imageId = `cll-${ ++id }`;
	state.metadata ??= {};
	state.metadata[ imageId ] = {
		uploadedSrc: url.href,
		currentSrc: url.href,
		alt: link.textContent.trim(),
		figureClassNames: 'wp-block-image',
		navigationButtonType: 'icon',
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
			getBoundingClientRect: () => link.getBoundingClientRect(),
		},
	};
	state.scrollTopReset = document.documentElement.scrollTop;
	state.scrollLeftReset = document.documentElement.scrollLeft;
	state.selectedImageId = imageId;
	state.selectedGalleryId = null;
	state.overlayEnabled = true;
	callbacks.setOverlayStyles();
} );
