import { getLocale } from '$lib/paraglide/runtime';
import { cities } from '$lib/data/cities';

/**
 * The served places as a readable list ("Amsterdam, Diemen en Zaandam"), from the city data,
 * so texts stay right when a city is added or switched off.
 * @param {{ exclude?: string[] }} [options] slugs to leave out
 */
export function placeList({ exclude = [] } = {}) {
	const names = cities.filter((c) => !exclude.includes(c.slug)).map((c) => c.name);
	return new Intl.ListFormat(getLocale() === 'en' ? 'en-GB' : 'nl-NL', {
		style: 'long',
		type: 'conjunction',
	}).format(names);
}
