// City landing pages (/rijschool-[slug]). Every other .js file in this folder is one city:
// adding a city = adding one file. Routes, footer links and the "also active in" list
// pick it up automatically.
//
// Each city file exports `city` = {
//   slug, name, order, active? (false = temporarily off), updated (ISO date of last content change), wikipedia, coordinates { lat, lon }, municipality (CBS name, or null for a village inside a larger municipality: marker only), mapLabel ('top' | 'right' | 'bottom' | 'left'), nearby[] (slugs of 2-3 nearby cities to link to),
//   cbrExamLocation: null | string, // TODO per city: verify on cbr.nl before filling in
//   (faq answers may use {lessonPrice}, {fromPrice} and {fromLessons}, filled from the price data)
//   nl: { h1?, metaTitle, metaDescription, intro, areas[], practice[], districts?[{ name, text }], faq[{ q, a }] },
//   en: { ...same keys }
// }

const modules = import.meta.glob('./*.js', { eager: true });

export const cities = Object.entries(modules)
	.filter(([path]) => !path.endsWith('/index.js'))
	.map(([, mod]) => mod.city)
	// `active: false` switches a city off everywhere (page, sitemap, map, forms) without deleting it
	.filter((city) => city.active !== false)
	.sort((a, b) => a.order - b.order);

export const getCity = (slug) => cities.find((city) => city.slug === slug);
