import { getCity } from '$lib/data/cities';

/** Matches the slugs of the city pages in $lib/data/cities, so /rijschool-machtigen etc. fall through. */
export function match(param) {
	return Boolean(getCity(param));
}
