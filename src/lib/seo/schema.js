// JSON-LD builders. Everything is derived from the same data the pages render,
// so the structured data always matches the visible content.
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime';
import { business } from '$lib/data/business.js';
import { cities } from '$lib/data/cities';
import { pickByLocale } from '$lib/utils/get-localized-data';
import { absoluteUrl } from './url.js';
import packagesNl from '$lib/data/pricing-packages.nl.json';
import packagesEn from '$lib/data/pricing-packages.en.json';

export const ORG_ID = `${business.url}/#organization`;

/** The three main packages that are promoted on the home page. */
export const MAIN_PACKAGE_IDS = ['rij-start', 'door-rij', 'vol-gas'];

const city = (c) => ({
	'@type': 'City',
	name: c.name,
	...(c.wikipedia && { sameAs: c.wikipedia }),
});

export function organization() {
	const packages = pickByLocale({ nl: packagesNl, en: packagesEn });
	const { team, openingHours, area } = business;
	return {
		'@context': 'https://schema.org',
		'@type': ['DrivingSchool', 'LocalBusiness'],
		'@id': ORG_ID,
		name: business.name,
		url: absoluteUrl('/'),
		logo: business.url + business.logo,
		image: `${business.url}/images/og-rijschool-all-drive.jpg`,
		description: m.meta_home_description(),
		telephone: business.phone,
		email: business.email,
		priceRange: '€€',
		currenciesAccepted: 'EUR',
		address: {
			'@type': 'PostalAddress',
			addressLocality: area.locality,
			addressRegion: area.region,
			addressCountry: area.country,
		},
		areaServed: cities.map(city),
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: openingHours.days.map((d) => `https://schema.org/${dayNames[d]}`),
			opens: openingHours.opens,
			closes: openingHours.closes,
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: business.phone,
			email: business.email,
			contactType: 'customer service',
			availableLanguage: business.lessonLanguages,
			areaServed: 'NL',
		},
		availableLanguage: business.lessonLanguages,
		sameAs: [
			business.googleBusinessUrl,
			business.social.instagram,
			business.social.tiktok,
			business.kvkUrl,
		].filter(Boolean),
		identifier: {
			'@type': 'PropertyValue',
			propertyID: 'KvK',
			value: business.kvk,
		},
		numberOfEmployees: { '@type': 'QuantitativeValue', value: team.size },
		employee: {
			'@type': 'Person',
			name: team.headInstructor.name,
			jobTitle: getLocale() === 'en' ? 'Head instructor' : 'Hoofdinstructeur',
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: m.home_packages_heading(),
			itemListElement: MAIN_PACKAGE_IDS.map((id) => packages.find((p) => p.id === id)).map(
				(pkg) => ({
					'@type': 'Offer',
					name: pkg.title,
					price: pkg.price,
					priceCurrency: 'EUR',
					url: absoluteUrl('/prijzen'),
					description: m.schema_offer_description({ count: pkg.lessons }),
					itemOffered: { '@type': 'Service', name: pkg.title },
				})
			),
		},
	};
}

const dayNames = {
	Mo: 'Monday',
	Tu: 'Tuesday',
	We: 'Wednesday',
	Th: 'Thursday',
	Fr: 'Friday',
	Sa: 'Saturday',
	Su: 'Sunday',
};

/**
 * @param {{ name: string, path: string }[]} items Dutch base paths; Home is added automatically
 */
export function breadcrumbs(items) {
	const list = [{ name: m.header_home(), path: '/' }, ...items];
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: list.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			...(item.path && { item: absoluteUrl(item.path) }),
		})),
	};
}

/**
 * @param {{ name: string, description: string, path: string, serviceType?: string, cityData?: any, offers?: any }} opts
 */
export function service({ name, description, path, serviceType, cityData, offers }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		description,
		url: absoluteUrl(path),
		...(serviceType && { serviceType }),
		provider: { '@id': ORG_ID },
		areaServed: cityData ? city(cityData) : cities.map(city),
		availableLanguage: business.lessonLanguages,
		...(offers && { offers }),
	};
}

/** @param {{ q: string, a: string }[]} faq */
export function faqPage(faq) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map(({ q, a }) => ({
			'@type': 'Question',
			name: q,
			acceptedAnswer: { '@type': 'Answer', text: a },
		})),
	};
}

/** WebPage for /prijzen with the date the prices were last changed. */
export function pricesPage() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: m.meta_prijzen_title(),
		url: absoluteUrl('/prijzen'),
		dateModified: business.pricesUpdated,
		about: { '@id': ORG_ID },
	};
}
