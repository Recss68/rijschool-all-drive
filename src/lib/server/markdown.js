import { placeList } from '$lib/utils/places';
// Markdown versions of every public page, for AI agents that send `Accept: text/markdown`.
// Built from the same messages and data as the HTML pages, so both always say the same.
import { m } from '$lib/paraglide/messages.js';
import { business } from '$lib/data/business.js';
import { cities, getCity } from '$lib/data/cities';
import { services, getService } from '$lib/data/services';
import { getInfoPage } from '$lib/data/info';
import { privacy, terms } from '$lib/data/legal.js';
import { pickByLocale } from '$lib/utils/get-localized-data';
import { formatEuro } from '$lib/utils/format-euro';
import { fillPlaceholders, starterPackage } from '$lib/utils/placeholders';
import { faqItems } from '$lib/utils/faq';
import { cityAnswer } from '$lib/utils/city-copy';
import { absoluteUrl } from '$lib/seo/url.js';
import packagesNl from '$lib/data/pricing-packages.nl.json';
import packagesEn from '$lib/data/pricing-packages.en.json';

/** Converts the small amount of HTML used in messages to Markdown. */
export function htmlToMd(html) {
	return html
		.replace(/<br\s*\/?>/g, ' ')
		.replace(/<a href="([^"]+)">(.*?)<\/a>/g, (_, href, text) => `[${text}](${toAbsolute(href)})`)
		.replace(/<\/?(b|strong)>/g, '**')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function toAbsolute(href) {
	return href.startsWith('/') ? business.url + href : href;
}

const link = (label, path) => `[${label}](${absoluteUrl(path)})`;
const list = (items) =>
	items
		.filter(Boolean)
		.map((item) => `- ${item}`)
		.join('\n');
const faqMd = (heading, faq) =>
	`## ${heading}\n\n${faq.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n')}`;

function articlesMd(articles) {
	return articles
		.map((article) => {
			const parts = [`## ${article.heading}`];
			for (const p of article.paragraphs ?? []) parts.push(fillPlaceholders(p));
			const items = (article.items ?? []).filter(Boolean).map(fillPlaceholders);
			if (items.length) {
				parts.push(
					article.variant === 'steps'
						? items.map((item, i) => `${i + 1}. ${item}`).join('\n')
						: list(items)
				);
			}
			if (article.links?.length) {
				parts.push(list(article.links.map((l) => `[${l.label}](${l.href})`)));
			}
			return parts.join('\n\n');
		})
		.join('\n\n');
}

function contactMd() {
	return [
		`## ${m.footer_contact_heading()}`,
		list([
			`WhatsApp: ${business.whatsappUrl}`,
			`${m.contact_phone_label()}: ${business.phoneDisplay}`,
			`${m.contact_email_label()}: ${business.email}`,
			`${m.footer_hours_heading()}: ${m.footer_hours_weekdays()}, ${m.footer_hours_saturday()}, ${m.footer_hours_sunday()}`,
			`${m.contact_area_label()}: ${m.footer_area()}`,
			`KvK: ${business.kvk}`,
		]),
	].join('\n\n');
}

function packagesMd(ids) {
	const packages = pickByLocale({ nl: packagesNl, en: packagesEn });
	const rows = (ids ? ids.map((id) => packages.find((p) => p.id === id)) : packages).filter(
		Boolean
	);
	return rows
		.map((pkg) => {
			const details = [
				typeof pkg.lessons === 'number' &&
					m.pricing_lessons_line({ count: pkg.lessons, minutes: pkg.lessonMinutes }),
				pkg.includesExam ? m.pricing_incl_exam() : m.pricing_excl_exam(),
				...(pkg.includes ?? []),
			].filter(Boolean);
			return `### ${pkg.title}: ${formatEuro(pkg.price)}\n\n${list(details)}`;
		})
		.join('\n\n');
}

function home() {
	const starter = starterPackage();
	return [
		`# ${htmlToMd(m.hero_title())}`,
		`${m.hero_subtitle()} ${m.hero_areas({ places: placeList() })}`,
		business.promoFreeInterimExam &&
			`**${m.promo_interim_exam({ price: formatEuro(business.prices.interimExam) })}**`,
		list([
			m.city_fact_types(),
			m.city_fact_languages(),
			m.city_fact_packages({ price: formatEuro(starter.price), count: starter.lessons }),
			m.city_fact_average({ min: business.averageLessons.min, max: business.averageLessons.max }),
			m.city_fact_instructor(),
			m.trial_fact_free(),
			business.reviews &&
				m.reviews_summary({
					rating: business.reviews.rating,
					count: business.reviews.count,
					source: business.reviews.source,
				}) + ` (${business.reviews.url})`,
		]),
		`## ${m.home_packages_heading()}`,
		packagesMd(['rij-start', 'door-rij', 'vol-gas']),
		link(m.header_prices(), '/prijzen'),
		`## ${m.home_benefits_heading()}`,
		list([1, 2, 3, 4].map((i) => `**${m[`benefit_${i}_title`]()}**: ${m[`benefit_${i}_desc`]()}`)),
		`## ${m.home_area_heading()}`,
		list(
			cities.map((c) =>
				link(pickByLocale(c).h1 ?? m.city_hero_title({ city: c.name }), `/rijschool-${c.slug}`)
			)
		),
		`## ${m.home_services_heading()}`,
		list(services.map((s) => link(pickByLocale(s).title, `/${s.slug}`))),
		`## ${m.home_process_heading()}`,
		[1, 2, 3, 4]
			.map((i) => `${i}. **${m[`process_step${i}_title`]()}**: ${m[`process_step${i}_desc`]()}`)
			.join('\n'),
		aboutMd(),
		contactMd(),
	];
}

function aboutMd() {
	return [
		`## ${m.about_heading()}`,
		m.about_intro(),
		[1, 2, 3, 4, 5, 6]
			.map((i) => `### ${m[`about_q${i}`]()}\n\n${m[`about_a${i}`]()}`)
			.join('\n\n'),
	].join('\n\n');
}

function ratesMd() {
	const labels = {
		trialLesson: `${m.rate_trial()} (${m.rate_trial_detail()})`,
		singleLesson: `${m.rate_lesson()} (${m.rate_lesson_detail()})`,
		interimExam: m.rate_interim_exam(),
		exam: m.rate_exam(),
		fearOfFailureExam: m.rate_fear_exam(),
		bnor: `${m.rate_bnor()} (${m.rate_bnor_detail()})`,
	};
	return [
		`## ${m.rates_heading()}`,
		list(business.singleRates.map((id) => `${labels[id]}: ${formatEuro(business.prices[id])}`)),
		m.lesson_duration_note(),
	].join('\n\n');
}

function rates() {
	return [
		`# ${m.rates_heading()}`,
		m.rates_page_text(),
		ratesMd(),
		link(m.rates_packages_link(), '/prijzen'),
		contactMd(),
	];
}

function prices() {
	return [
		`# ${m.prijzen_hero_title()}`,
		m.prijzen_hero_text(),
		m.prices_updated({ date: business.pricesUpdated }),
		packagesMd(),
		ratesMd(),
		`## ${m.prijzen_terms_heading()}`,
		list([
			business.promoFreeInterimExam &&
				m.prijzen_term_promo({ price: formatEuro(business.prices.interimExam) }),
			m.prijzen_term_extra_lesson({ price: formatEuro(business.prices.lesson) }),
			m.prijzen_term_exam({ price: formatEuro(business.prices.exam) }),
			m.prijzen_term_trial({ price: formatEuro(business.prices.trialLesson) }),
		]),
		faqMd(m.faq_heading(), faqItems()),
		contactMd(),
	];
}

function about() {
	return [
		`# ${m.overons_hero_title()}`,
		m.overons_hero_text(),
		aboutMd(),
		`## ${htmlToMd(m.overons_lessons_heading())}`,
		htmlToMd(m.overons_lessons_para1()),
		htmlToMd(m.overons_lessons_para2()),
		`## ${m.overons_instructors_heading()}`,
		m.team_note(),
		contactMd(),
	];
}

function contact() {
	return [
		`# ${m.contact_hero_title()}`,
		m.contact_hero_text(),
		contactMd(),
		`## ${m.contact_service_area_heading()}`,
		m.contact_service_area_text(),
		list(cities.map((c) => link(c.name, `/rijschool-${c.slug}`))),
	];
}

function serviceArea() {
	return [
		`# ${m.werkgebied_title()}`,
		m.werkgebied_lead(),
		list(
			cities.map(
				(c) =>
					`${link(pickByLocale(c).h1 ?? m.city_hero_title({ city: c.name }), `/rijschool-${c.slug}`)}: ${pickByLocale(c).areas.join(', ')}`
			)
		),
		m.werkgebied_note(),
		contactMd(),
	];
}

function legal(title, articles) {
	return [`# ${title}`, articlesMd(pickByLocale(articles))];
}

function city(slug) {
	const c = getCity(slug);
	const content = pickByLocale(c);
	return [
		`# ${content.h1 ?? m.city_hero_title({ city: c.name })}`,
		cityAnswer(c),
		content.intro,
		c.slug !== 'amsterdam' && m.city_no_branch({ city: c.name }),
		content.districts &&
			`## ${m.city_districts_heading()}\n\n${content.districts.map((d) => `### ${d.name}\n\n${d.text}`).join('\n\n')}`,
		`## ${m.city_areas_heading({ city: c.name })}`,
		list(content.areas),
		`## ${m.city_practice_heading()}`,
		list(content.practice),
		`## ${m.city_packages_heading({ city: c.name })}`,
		packagesMd(['rij-start', 'door-rij', 'vol-gas']),
		faqMd(
			m.city_faq_heading({ city: c.name }),
			content.faq.map(({ q, a }) => ({ q, a: fillPlaceholders(a) }))
		),
		`## ${m.city_others_heading()}`,
		list(
			c.nearby
				.map(getCity)
				.filter(Boolean)
				.map((o) => link(o.name, `/rijschool-${o.slug}`))
		),
		contactMd(),
	];
}

function service(slug) {
	const content = pickByLocale(getService(slug));
	return [
		`# ${content.title}`,
		fillPlaceholders(content.answer),
		articlesMd(content.articles),
		faqMd(
			m.service_faq_heading(),
			content.faq.map(({ q, a }) => ({ q, a: fillPlaceholders(a) }))
		),
		contactMd(),
	];
}

function info(slug) {
	const content = pickByLocale(getInfoPage(slug));
	return [`# ${content.title}`, content.intro, articlesMd(content.articles), contactMd()];
}

/**
 * Markdown for a Dutch base path, or null when the path is not a public page.
 * @param {string} path
 */
export function renderMarkdown(path) {
	const pages = {
		'/': home,
		'/prijzen': prices,
		'/losse-tarieven': rates,
		'/over-ons': about,
		'/contact': contact,
		'/werkgebied': serviceArea,
		'/privacy': () => legal(m.privacy_hero_title(), privacy),
		'/algemene-voorwaarden': () => legal(m.terms_hero_title(), terms),
	};
	let blocks;
	if (pages[path]) blocks = pages[path]();
	else if (path.startsWith('/rijschool-') && getCity(path.slice(11))) blocks = city(path.slice(11));
	else if (getService(path.slice(1))) blocks = service(path.slice(1));
	else if (getInfoPage(path.slice(1))) blocks = info(path.slice(1));
	else return null;

	const source = `> ${business.name} · ${absoluteUrl(path)}`;
	return [source, ...blocks].filter(Boolean).join('\n\n') + '\n';
}

/** Markdown body for unknown URLs (status stays 404). */
export function notFoundMarkdown() {
	return (
		[
			'# 404: page not found',
			`This page does not exist on ${business.name}.`,
			list([
				`[Home](${absoluteUrl('/')})`,
				`[Sitemap](${business.url}/sitemap.xml)`,
				`[llms.txt](${business.url}/llms.txt)`,
			]),
		].join('\n\n') + '\n'
	);
}
