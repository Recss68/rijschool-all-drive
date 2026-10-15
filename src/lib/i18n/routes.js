// Single source for localized URLs. Used by Paraglide (vite.config.js), the sitemap,
// hreflang tags and llms.txt. Plain JS without $lib imports, so vite.config.js can load it.
//
// Dutch is the base locale and has no prefix; English lives under /en with translated slugs.
// City pages are matched by `cityRoute`, so a new city needs no entry here.

// `updated` = last real content change (sitemap lastmod); bump it when you edit a page.
/** @type {{ nl: string, en: string, updated: string, noindex?: boolean }[]} */
export const staticRoutes = [
	{ nl: '/', en: '/en', updated: '2026-10-14' },
	{ nl: '/prijzen', en: '/en/prices', updated: '2026-10-15' },
	{ nl: '/losse-tarieven', en: '/en/single-rates', updated: '2026-10-15' },
	{ nl: '/over-ons', en: '/en/about-us', updated: '2026-10-14' },
	{ nl: '/contact', en: '/en/contact', updated: '2026-10-14' },
	{ nl: '/werkgebied', en: '/en/service-area', updated: '2026-10-14' },
	{ nl: '/privacy', en: '/en/privacy', updated: '2026-10-14' },
	{ nl: '/algemene-voorwaarden', en: '/en/terms-and-conditions', updated: '2026-10-14' },
	// sign-up form: reachable, but not indexed and not in the sitemap
	{ nl: '/aanmelden', en: '/en/sign-up', updated: '2026-10-14', noindex: true },
	// thank-you page after a successful form (conversion URL for Google Ads)
	{ nl: '/bedankt', en: '/en/thank-you', updated: '2026-10-14', noindex: true },
	// services
	{ nl: '/automaat-rijles', en: '/en/automatic-driving-lessons', updated: '2026-10-14' },
	{ nl: '/schakel-rijles', en: '/en/manual-driving-lessons', updated: '2026-10-14' },
	{ nl: '/proefles', en: '/en/trial-lesson', updated: '2026-10-14' },
	{
		nl: '/rijangst-en-faalangstexamen',
		en: '/en/driving-anxiety-and-fear-of-failure-exam',
		updated: '2026-10-14',
	},
	{ nl: '/spoedcursus', en: '/en/intensive-driving-course', updated: '2026-10-14' },
	// information
	{
		nl: '/rijbewijs-aanvragen',
		en: '/en/applying-for-your-driving-licence',
		updated: '2026-10-14',
	},
	{ nl: '/theorie-examen-auto', en: '/en/car-theory-exam', updated: '2026-10-14' },
	{ nl: '/theorie-examen-aanvragen', en: '/en/booking-your-theory-exam', updated: '2026-10-14' },
	{ nl: '/rijschool-machtigen', en: '/en/authorising-your-driving-school', updated: '2026-10-14' },
];

export const cityRoute = {
	nl: '/rijschool-:city',
	en: '/en/driving-school-:city',
	updated: '2026-10-14',
};

/** Paraglide urlPatterns: specific routes first, then cities, then a catch-all. */
export const urlPatterns = [
	...staticRoutes.map(({ nl, en }) => ({
		pattern: nl,
		localized: [
			['en', en],
			['nl', nl],
		],
	})),
	{
		pattern: cityRoute.nl,
		localized: [
			['en', cityRoute.en],
			['nl', cityRoute.nl],
		],
	},
	{
		pattern: '/:path(.*)?',
		localized: [
			['en', '/en/:path(.*)?'],
			['nl', '/:path(.*)?'],
		],
	},
];
