# Core Lightbox Links #
**Contributors:** [mtoensing](https://profiles.wordpress.org/mtoensing/)  
**Tags:** lightbox, images, links, gutenberg  
**Requires at least:** 6.5  
**Tested up to:** 6.8  
**Requires PHP:** 7.4  
**Stable tag:** 0.1.0  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Open ordinary image-file text links with the built-in WordPress Core Image Lightbox.

## Description ##

Core Lightbox Links extends the native WordPress image lightbox to text links pointing directly to JPG, JPEG, PNG, GIF, WebP, or AVIF files.

The plugin reuses the Core Image Lightbox and does not bundle another lightbox library.

Links with a download attribute or target attribute are left unchanged. Modified clicks retain browser behavior. When an image cannot be loaded, the link remains navigable.

**Compatibility note:** WordPress does not currently provide a public interface for opening its Image Lightbox from an arbitrary text link. This plugin bridges to internal Core Image Lightbox state. Future WordPress releases may require updates.

## Installation ##

1. Install the plugin folder in `wp-content/plugins/`.
2. Activate Core Lightbox Links.
3. Add a regular text link pointing directly to an image file in a post or page.

## Frequently Asked Questions ##

### Does it add another lightbox? ###

No. It reuses the native Core Image Lightbox.

### Does it work with external images? ###

It supports direct image URLs as long as the browser can load the image.

## Changelog ##

### 0.1.0 ###
* Initial experimental integration with the WordPress Core Image Lightbox.
