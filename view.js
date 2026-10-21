// Core derives the enlarged container's aspect ratio from imageRef.offsetWidth /
// offsetHeight. Match the link width while preserving the image aspect ratio,
// so Core expands from the link instead of shrinking from the full-size image.
function sizeTrigger( image ) {
	if ( ! image.naturalWidth || ! image.naturalHeight ) {
		return;
	}
	const figure = image.closest( 'figure.cll-native-trigger[id]' );
	const link = document.querySelector( `a[data-cll-target="${ figure.id }"]` );
	const rect = link?.getBoundingClientRect();
	const width = Math.max( rect?.width || 1, 1 );
	const height = width * image.naturalHeight / image.naturalWidth;
	figure.style.setProperty( 'width', `${ width }px`, 'important' );
	figure.style.setProperty( 'height', `${ height }px`, 'important' );
	figure.style.setProperty( 'left', `${ rect?.left || 0 }px`, 'important' );
	figure.style.setProperty( 'top', `${ rect?.top || 0 }px`, 'important' );
}

document.querySelectorAll( 'figure.cll-native-trigger[id] > img' ).forEach( ( image ) => {
	if ( image.complete ) {
		sizeTrigger( image );
	}
	image.addEventListener( 'load', () => sizeTrigger( image ) );
} );

// Core restores focus to its hidden button after closing. Return it to the
// visible text link instead, including after navigating to another image.
document.addEventListener( 'focusin', ( event ) => {
	const figure = event.target.closest?.( 'figure.cll-native-trigger[id]' );
	if ( figure ) {
		document.querySelector( `a[data-cll-target="${ figure.id }"]` )?.focus( { preventScroll: true } );
	}
} );

// Forward text links to genuine Core Image Block lightbox triggers.
document.addEventListener( 'click', ( event ) => {
	const link = event.target.closest?.( 'a[data-cll-target]' );
	if (
		! link || event.defaultPrevented || event.button !== 0 ||
		event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
		link.querySelector( 'img, picture' )
	) {
		return;
	}

	const figure = document.getElementById( link.dataset.cllTarget );
	const image = figure?.querySelector( 'img' );
	if ( ! image?.complete || ! image.naturalWidth ) {
		return;
	}

	// Anchor the animation at the link without imposing the link's aspect ratio.
	sizeTrigger( image );

	event.preventDefault();
	image.click();
} );
