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

	// Core animates from the image's rectangle. Place the invisible trigger
	// over the text link before dispatching its native lightbox click.
	const rect = link.getBoundingClientRect();
	for ( const [ property, value ] of Object.entries( {
		position: 'fixed',
		left: `${ rect.left }px`,
		top: `${ rect.top }px`,
		width: `${ Math.max( rect.width, 1 ) }px`,
		height: `${ Math.max( rect.height, 1 ) }px`,
	} ) ) {
		figure.style.setProperty( property, value, 'important' );
	}

	event.preventDefault();
	image.click();
} );
