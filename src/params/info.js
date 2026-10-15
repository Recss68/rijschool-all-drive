import { getInfoPage } from '$lib/data/info';

/** Matches the slugs of the informational pages in $lib/data/info. */
export function match(param) {
	return Boolean(getInfoPage(param));
}
