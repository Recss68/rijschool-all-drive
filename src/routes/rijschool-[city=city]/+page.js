import { error } from '@sveltejs/kit';
import { getCity } from '$lib/data/cities';

export function load({ params }) {
	// the matcher only knows the file names: a city that is switched off ends here
	if (!getCity(params.city)) error(404);
	return { slug: params.city };
}
