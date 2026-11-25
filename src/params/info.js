import { fileSlugs } from '$lib/utils/file-slugs';

// Only the file names, not the pages: see params/city.js
const slugs = fileSlugs(import.meta.glob('../lib/data/info/*.js', { query: '?raw' }));

/** Matches the slugs of the informational pages in $lib/data/info. */
export function match(param) {
	return slugs.has(param);
}
