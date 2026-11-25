// The names and links the layout needs on every page (footer, sign-up form). Loaded on the
// server so only these few fields reach the browser, not the full text of every page.
import { cities, offersAutomatic } from '$lib/data/cities';
import { services } from '$lib/data/services';
import { infoPages } from '$lib/data/info';

const siteLinks = {
	cities: cities.map((city) => ({
		slug: city.slug,
		name: city.name,
		manualOnly: !offersAutomatic(city),
	})),
	services: services.map(({ slug, nl, en }) => ({
		slug,
		nl: nl.linkTitle ?? nl.title,
		en: en.linkTitle ?? en.title,
	})),
	infoPages: infoPages.map(({ slug, nl, en }) => ({ slug, nl: nl.title, en: en.title })),
};

export function load() {
	return { siteLinks };
}
