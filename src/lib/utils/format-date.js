import { getLocale } from '$lib/paraglide/runtime';

/** An ISO date as "9 november 2026" / "9 November 2026" in the current locale. */
export const formatDate = (date) =>
	new Date(date).toLocaleDateString(getLocale() === 'en' ? 'en-GB' : 'nl-NL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
