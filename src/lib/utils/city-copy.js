// City texts that depend on the city's data: lesson types (Zaandam: manual only) and the
// nearest CBR exam centres. Shared by the city page and its Markdown version.
import { m } from '$lib/paraglide/messages.js';
import { business } from '$lib/data/business.js';
import { offersAutomatic } from '$lib/data/cities';
import { cbrLocations, distanceKm } from '$lib/data/cbr-locations.js';
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

const address = (location) => `${location.street}, ${location.postcode} ${location.city}`;

/**
 * Nearest CBR centres for a city: for the practical exam the closest one plus any other
 * within 3 km of it (Aalsmeer is about as close to Haarlem as to Amsterdam), and the
 * closest theory centre. Distances as the crow flies, rounded to whole km.
 */
export function cityExamCentres(city) {
	const ranked = (exam) =>
		cbrLocations
			.filter((location) => location[exam])
			.map((location) => ({
				...location,
				address: address(location),
				km: Math.max(1, Math.round(distanceKm(city.coordinates, location.coordinates))),
				exact: distanceKm(city.coordinates, location.coordinates),
			}))
			.sort((a, b) => a.exact - b.exact);
	const practical = ranked('practical');
	return {
		practical: practical.filter((l) => l.exact - practical[0].exact <= 3).slice(0, 2),
		theory: ranked('theory')[0],
	};
}

/** Generated FAQ item about where to take the practical exam. */
export function cityExamFaq(city) {
	const [nearest] = cityExamCentres(city).practical;
	return {
		q: m.city_exam_faq_q({ city: city.name }),
		a: m.city_exam_faq_a({ name: nearest.name, address: nearest.address, km: nearest.km }),
	};
}
