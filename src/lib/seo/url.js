import { localizeHref, getLocale } from '$lib/paraglide/runtime';
import { business } from '$lib/data/business.js';

/**
 * Absolute URL on the primary host for a Dutch base path, in the given (or current) locale.
 * @param {string} path Dutch base path, e.g. '/prijzen'
 * @param {'nl' | 'en'} [locale]
 */
export function absoluteUrl(path, locale = getLocale()) {
	const href = localizeHref(path, { locale });
	return business.url + (href === '/' ? '/' : href.replace(/\/$/, ''));
}
