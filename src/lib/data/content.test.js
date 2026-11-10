import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { cities } from './cities';
import { services } from './services';
import { infoPages } from './info';
import { staticRoutes } from '$lib/i18n/routes.js';
import instructorsNl from './instructors.nl.json';
import packagesNl from './pricing-packages.nl.json';
import packagesEn from './pricing-packages.en.json';
import { business } from './business.js';
import instructorsEn from './instructors.en.json';

const MIN_UNIQUE_WORDS = 120;
const MAX_OVERLAP = 0.35;

/** The text that makes a city page unique (template text is excluded). */
function uniqueText(city, locale) {
	const c = city[locale];
	return [
		c.intro,
		...c.areas,
		...c.practice,
		...(c.districts ?? []).flatMap((d) => [d.name, d.text]),
		...c.faq.flatMap((f) => [f.q, f.a]),
	].join(' ');
}
const words = (text) => text.toLowerCase().match(/[\p{L}\d]+/gu) ?? [];
const shingles = (w, n = 4) =>
	new Set(w.slice(0, -n + 1).map((_, i) => w.slice(i, i + n).join(' ')));

describe.each(cities.map((c) => [c.slug, c]))('city %s', (slug, city) => {
	it.each(['nl', 'en'])('has enough unique content (%s)', (locale) => {
		const own = words(uniqueText(city, locale));
		expect(own.length).toBeGreaterThanOrEqual(MIN_UNIQUE_WORDS);

		const mine = shingles(own);
		const others = new Set(
			cities
				.filter((o) => o.slug !== slug)
				.flatMap((o) => [...shingles(words(uniqueText(o, locale)))])
		);
		const overlap = [...mine].filter((s) => others.has(s)).length / mine.size;
		expect(overlap).toBeLessThanOrEqual(MAX_OVERLAP);
	});

	it.each(['nl', 'en'])('has search snippets within limits (%s)', (locale) => {
		expect(city[locale].metaTitle.length).toBeLessThanOrEqual(60);
		expect(city[locale].metaDescription.length).toBeGreaterThanOrEqual(120);
		expect(city[locale].metaDescription.length).toBeLessThanOrEqual(170);
	});

	it('links to existing nearby cities and has a lastmod date', () => {
		expect(city.nearby.length).toBeGreaterThanOrEqual(2);
		for (const near of city.nearby) expect(cities.some((c) => c.slug === near)).toBe(true);
		expect(city.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe('services and information pages', () => {
	it.each([...services, ...infoPages].map((p) => [p.slug]))(
		'/%s has an English route with a translated slug',
		(slug) => {
			const route = staticRoutes.find((r) => r.nl === `/${slug}`);
			expect(route?.en).toMatch(/^\/en\//);
		}
	);

	it.each(['spoedcursus', 'rijtest'])('never shows a price for /%s (price on request)', (slug) => {
		const service = services.find((s) => s.slug === slug);
		expect(service.showPrice).toBe(false);
		expect(JSON.stringify(service)).not.toMatch(/€|\{(lesson|from|exam)Price\}/);
	});

	it('the rijtest page never presents itself as the official CBR assessment', () => {
		const { nl, en } = services.find((s) => s.slug === 'rijtest');
		expect(JSON.stringify(nl)).toContain('geen officieel examen');
		expect(JSON.stringify(en)).toContain('not an official exam');
	});
});

describe('privacy', () => {
	const files = (dir) =>
		readdirSync(dir).flatMap((name) => {
			const path = join(dir, name);
			if (name === 'paraglide') return [];
			return statSync(path).isDirectory() ? files(path) : [path];
		});
	const source = [...files('src'), 'messages/nl.json', 'messages/en.json']
		.filter((f) => /\.(js|svelte|json)$/.test(f) && !f.endsWith('.test.js'))
		.map((f) => readFileSync(f, 'utf8'))
		.join('\n');

	it('does not publish a street address (service-area business)', () => {
		expect(source).not.toMatch(/Lieftinck|1067\s?VW/i);
	});

	it('only names the head instructor', () => {
		expect(instructorsNl).toHaveLength(1);
		expect(instructorsEn).toHaveLength(1);
		expect(instructorsNl[0].name).toBe('Sebahattin Yildiz');
	});
});

describe('package prices', () => {
	// Package price = lessons × hourly rate + CBR exam (when included) + theory and
	// interim test for the Plus packages. Keeps prices right when a rate changes.
	it.each([
		['nl', packagesNl],
		['en', packagesEn],
	])('follow the rates in business.js (%s)', (_, packages) => {
		const { lesson, exam, theory, interimExam } = business.prices;
		for (const pkg of packages.filter((p) => typeof p.lessons === 'number')) {
			const expected =
				pkg.lessons * lesson +
				(pkg.includesExam ? exam : 0) +
				(pkg.group === 'extra' ? theory + interimExam : 0);
			expect(pkg.price, pkg.id).toBe(expected);
		}
	});
});

describe('lesson types per city', () => {
	it('Zaandam only offers manual lessons, every other city both', async () => {
		const { cities, manualOnlySlugs, offersAutomatic } = await import('./cities');
		expect(manualOnlySlugs).toEqual(['zaandam']);
		for (const city of cities) expect(offersAutomatic(city)).toBe(city.slug !== 'zaandam');
	});
});

describe('expats page', () => {
	it('never promises a practical exam in English (CBR: Dutch, interpreter allowed)', async () => {
		const { getService } = await import('./services');
		const { nl, en } = getService('rijles-voor-expats');
		expect(JSON.stringify(nl)).toContain('praktijkexamen af in het Nederlands');
		expect(JSON.stringify(en)).toContain('practical exam in Dutch');
		// the FAQ may ask the question, but nothing may promise it
		expect(JSON.stringify(en)).not.toMatch(
			/(take|do) the practical exam in English|practical exam can be taken in English/i
		);
	});
});

describe('nearest CBR exam centres', () => {
	it('picks the closest centres per city, as the crow flies', async () => {
		const { getCity, cities } = await import('./cities');
		const { cityExamCentres } = await import('$lib/utils/city-copy');
		const names = (slug) => cityExamCentres(getCity(slug)).practical.map((c) => c.city);
		expect(names('zaandam')).toEqual(['Zaandam']);
		expect(names('amsterdam')).toEqual(['Amsterdam']);
		// Aalsmeer is about as close to Haarlem as to Amsterdam: both are shown
		expect(names('aalsmeer')).toEqual(['Haarlem', 'Amsterdam']);
		// Zaandam has no theory exams: the nearest theory centre is elsewhere
		expect(cityExamCentres(getCity('zaandam')).theory.city).toBe('Amsterdam');
		for (const city of cities) {
			const { practical } = cityExamCentres(city);
			expect(practical[0].km).toBeLessThanOrEqual(20);
			expect(practical[0].url).toMatch(/^https:\/\/www\.cbr\.nl\//);
		}
	});
});
