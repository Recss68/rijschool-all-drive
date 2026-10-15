import { getService } from '$lib/data/services';

/** Matches the slugs of the service pages in $lib/data/services. */
export function match(param) {
	return Boolean(getService(param));
}
