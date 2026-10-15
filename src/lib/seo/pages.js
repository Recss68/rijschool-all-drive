import { staticRoutes } from '$lib/i18n/routes.js';
import { cities } from '$lib/data/cities';
import { absoluteUrl } from './url.js';

/** Every public, indexable page with its Dutch base path and last real change. */
export function publicPages() {
	return [
		...staticRoutes
			.filter((route) => !route.noindex)
			.map((route) => ({ path: route.nl, updated: route.updated })),
		...cities.map((city) => ({ path: `/rijschool-${city.slug}`, updated: city.updated })),
	];
}

/** Absolute NL/EN URLs per page, for the sitemap. */
export function sitemapEntries() {
	return publicPages().map((page) => ({
		nl: absoluteUrl(page.path, 'nl'),
		en: absoluteUrl(page.path, 'en'),
		updated: page.updated,
	}));
}
