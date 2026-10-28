// City texts that depend on which lesson types are given there (Zaandam: manual only).
// Shared by the city page and its Markdown version.
import { m } from '$lib/paraglide/messages.js';
import { business } from '$lib/data/business.js';
import { offersAutomatic } from '$lib/data/cities';
import { formatEuro } from './format-euro';
import { starterPackage } from './placeholders';

/** "Manual and automatic lessons…" or "Manual lessons only…" */
export const cityTypesFact = (city) =>
	offersAutomatic(city) ? m.city_fact_types() : m.city_fact_types_manual();

/** Direct, factual answer at the top of a city page, for search engines and AI assistants. */
export function cityAnswer(city) {
	const starter = starterPackage();
	const params = {
		city: city.name,
		price: formatEuro(starter.price),
		count: starter.lessons,
		min: business.averageLessons.min,
		max: business.averageLessons.max,
	};
	return offersAutomatic(city) ? m.city_answer(params) : m.city_answer_manual(params);
}
