# Repository Instructions

Follow the SimpleTOC development principles: stay close to WordPress Core and Gutenberg, keep changes minimal, use official APIs where possible, escape and sanitize dynamic PHP values, and avoid unnecessary dependencies.

## Documentation
- Edit `readme.txt` for plugin documentation, not `README.md`.
- The GitHub Actions readme workflow generates `README.md`.
- Keep `readme.txt` Stable tag and `plugin.php` Version aligned.

## Deployment
- Commit approved changes directly to `main` under the repository owner's account. Do not create pull requests.
- Never add AI attribution to commits.
- Never publish or deploy to WordPress.org without an explicit request saying "veröffentlichen auf WordPress.org".
- Do not create release tags without that authorization.
- Review workflow triggers before changing or triggering release automation.

## Code
- Reuse the WordPress Core Image Lightbox. Do not ship a second lightbox library.
- Prefer the smallest maintainable integration over custom UI.
- WordPress Core's image store is private. Never access it directly via `store( 'core/image' )`.
- Use genuine Core Image Block triggers and forward text-link clicks to them.
- Test image links, failed image loads, modified clicks, keyboard close/focus, and native Image Block compatibility.
