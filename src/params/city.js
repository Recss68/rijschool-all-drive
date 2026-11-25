import { fileSlugs } from '$lib/utils/file-slugs';

// Matchers also run in the browser: reading only the file names keeps the full text of every
// city page out of the bundle of every page. The glob is lazy and on `?raw`, a separate module id,
// so the real modules are not split into one chunk per file either. A city that is switched off
// (`active: false`) still matches here; its page load answers with a 404.
const slugs = fileSlugs(import.meta.glob('../lib/data/cities/*.js', { query: '?raw' }));

/** Matches the slugs of the city pages in $lib/data/cities, so /rijschool-machtigen etc. fall through. */
export function match(param) {
	return slugs.has(param);
}
