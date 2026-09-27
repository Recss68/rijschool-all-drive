import { getLocale } from '$lib/paraglide/runtime';

const intlLocales = { nl: 'nl-NL', en: 'en-GB' };

/**
 * Formats an amount in euros for the current locale. Whole amounts are shown
 * without decimals, other amounts with two.
 * @param {number} amount
 * @returns {string}
 */
export function formatEuro(amount) {
	const digits = Number.isInteger(amount) ? 0 : 2;
	return new Intl.NumberFormat(intlLocales[getLocale()] ?? 'nl-NL', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	}).format(amount);
}
