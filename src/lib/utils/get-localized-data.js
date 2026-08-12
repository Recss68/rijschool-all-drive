import { getLocale } from '$lib/paraglide/runtime';

/**
 * Picks the data set matching the current locale, falling back to Dutch.
 * @template T
 * @param {{ nl: T, en: T }} data
 * @returns {T}
 */
export function pickByLocale(data) {
	return data[getLocale()] ?? data.nl;
}
