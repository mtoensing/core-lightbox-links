# Core Lightbox Links #
**Contributors:** [mtoensing](https://profiles.wordpress.org/mtoensing/)  
**Tags:** lightbox, images, links, gutenberg  
**Requires at least:** 7.0  
**Tested up to:** 7.1  
**Requires PHP:** 7.4  
**Stable tag:** 0.1.8  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Open ordinary image-file text links with the built-in WordPress Core Image Lightbox.

## Description ##

Core Lightbox Links extends the native WordPress image lightbox to text links pointing directly to JPG, JPEG, PNG, GIF, WebP, or AVIF files.

The plugin reuses the Core Image Lightbox and does not bundle another lightbox library. PHP identifies image links and renders hidden, genuine Core Image Block triggers. A small JavaScript click handler delegates to those triggers. No private Core store access or second lightbox implementation is used.

Image links that contain an image, links with a download or target attribute, and modified clicks retain their existing behavior. WordPress loads the native image triggers in the page. The native gallery navigation requires WordPress 7.0 or newer.

**Compatibility note:** WordPress does not currently provide a public interface for opening its Image Lightbox from an arbitrary text link. This plugin renders genuine Core Image and Gallery Blocks and forwards clicks to their native triggers. It does not access the private Core Image store. Future WordPress releases may require updates. Image links are processed when post content renders. Dynamically inserted links are not supported. The hidden image triggers load the linked images when the page loads, before visitors click a link. For external image URLs, visitors therefore connect directly to those external hosts. Only link to external images when this is appropriate for your site.

## Installation ##

1. Install the plugin folder in `wp-content/plugins/`.
2. Activate Core Lightbox Links.
3. Add a regular text link pointing directly to an image file in a post or page.

## Frequently Asked Questions ##

### Does it add another lightbox? ###

No. It reuses the native Core Image Lightbox.

### Does it work with external images? ###

It supports direct image URLs as long as the browser can load the image.

### What happens if an image cannot be loaded? ###

Clicking its text link follows the original URL. Gallery navigation skips images that are not loaded. Core's image counter includes all recognized text image links, including unavailable ones.

### Are images loaded lazily? ###

No. Linked images are loaded with the page so that Core can determine their dimensions. This can increase page traffic, particularly on pages with many large images.

## Changelog ##

### 0.1.8 ###
* Exclude links containing images or picture elements from text-link galleries.
* Skip unavailable images during native gallery navigation.
* Defer the frontend script and isolate its functions from other plugins.
* Clarify compatibility, external image requests, and preload behavior.
* Include the GPL license text.

### 0.1.7 ###
* Start the native zoom at the text link width and position while retaining the image aspect ratio.

### 0.1.6 ###
* Preserve intrinsic image proportions in hidden Core triggers, including gallery navigation, without viewport width constraints.
* Restore keyboard focus to the visible text link after closing the lightbox.

### 0.1.5 ###
* Prevent trigger image sizing from constraining enlarged gallery images.
* Group image links in each rendered post into a native Core Gallery for built-in next/previous navigation.
* Position the invisible native lightbox trigger over the clicked text link to correct the zoom origin.
* Fix empty native lightbox caused by hidden trigger styles affecting the overlay.
* Fix browser caching of an outdated JavaScript module after switching to a plain script.
* Initial experimental integration with the WordPress Core Image Lightbox.
