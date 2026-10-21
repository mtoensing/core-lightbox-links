// Trigger a real Core Image Block lightbox without accessing its private store.
document.addEventListener( 'click', ( event ) => {
	const link = event.target.closest?.( 'a[data-cll-target]' );
	if (
		! link || event.defaultPrevented || event.button !== 0 ||
		event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
		link.querySelector( 'img, picture' )
	) {
		return;
	}

	const image = document.getElementById( link.dataset.cllTarget )?.querySelector( 'img' );
	if ( image?.complete && image.naturalWidth ) {
		event.preventDefault();
		image.click();
	}
} );
