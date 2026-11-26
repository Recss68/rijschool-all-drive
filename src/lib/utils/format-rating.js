import { getLocale } from '$lib/paraglide/runtime';
import { intlLocales } from './format-euro';

/**
 * Formats a review score for the current locale (4,8 in Dutch, 4.8 in English).
 * @param {number} rating
 * @returns {string}
 */
export function formatRating(rating) {
	return new Intl.NumberFormat(intlLocales[getLocale()] ?? 'nl-NL', {
		maximumFractionDigits: 1,
	}).format(rating);
}
