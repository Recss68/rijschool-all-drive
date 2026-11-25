import { fileSlugs } from '$lib/utils/file-slugs';

// Only the file names, not the pages: see params/city.js
const slugs = fileSlugs(import.meta.glob('../lib/data/services/*.js', { query: '?raw' }));

/** Matches the slugs of the service pages in $lib/data/services. */
export function match(param) {
	return slugs.has(param);
}
