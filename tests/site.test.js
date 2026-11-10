// Integration tests against a production build (see tests/setup.js).
import { describe, expect, it, beforeAll } from 'vitest';
import { XMLValidator } from 'fast-xml-parser';
import { PORT } from './setup.js';
import { cities } from '../src/lib/data/cities/index.js';

const BASE = `http://localhost:${PORT}`;
const ORIGIN = 'https://www.rijschoolalldrive.nl';
const get = (path, headers = {}) => fetch(BASE + path, { headers, redirect: 'manual' });
const local = (url) => url.replace(ORIGIN, '') || '/';

let sitemapUrls = [];
beforeAll(async () => {
	const xml = await (await get('/sitemap.xml')).text();
	sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
});

describe('Markdown content negotiation', () => {
	it.each([
		'/',
		'/en/prices',
		'/rijschool-aalsmeer',
		'/en/driving-school-amsterdam',
		'/spoedcursus',
		'/opfriscursus',
		'/en/driving-assessment',
		'/rijles-voor-expats',
		'/en/driving-lessons-for-expats',
	])('%s returns Markdown for Accept: text/markdown', async (path) => {
		const res = await get(path, { accept: 'text/markdown' });
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
		expect(res.headers.get('vary')).toMatch(/accept/i);
		const body = await res.text();
		expect(body).toMatch(/^> Rijschool All Drive/);
		expect(body).toMatch(/\n# /);
	});

	it('returns unchanged HTML for browsers, with Vary: Accept', async () => {
		const res = await get('/', { accept: 'text/html' });
		expect(res.headers.get('content-type')).toMatch(/text\/html/);
		expect(res.headers.get('vary')).toMatch(/accept/i);
		expect(await res.text()).toMatch(/<h1/);
	});

	it('returns a Markdown 404 with status 404', async () => {
		const res = await get('/bestaat-niet-xyz', { accept: 'text/markdown' });
		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
		const body = await res.text();
		expect(body.length).toBeGreaterThanOrEqual(20);
		expect(body).toContain('/sitemap.xml');
		expect(body).toContain('/llms.txt');
	});

	it('keeps the HTML 404 for browsers', async () => {
		const res = await get('/bestaat-niet-xyz', { accept: 'text/html' });
		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toMatch(/text\/html/);
	});
});

describe('sitemap.xml, robots.txt and llms.txt', () => {
	it('sitemap is valid XML with every city in both languages', async () => {
		const xml = await (await get('/sitemap.xml')).text();
		expect(XMLValidator.validate(xml)).toBe(true);
		for (const city of cities) {
			expect(sitemapUrls).toContain(`${ORIGIN}/rijschool-${city.slug}`);
			expect(sitemapUrls).toContain(`${ORIGIN}/en/driving-school-${city.slug}`);
		}
	});

	it('robots.txt points to the sitemap and allows AI bots', async () => {
		const robots = await (await get('/robots.txt')).text();
		expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
		expect(robots).toContain('User-agent: GPTBot\nAllow: /');
		expect(robots).toContain('User-agent: ClaudeBot\nAllow: /');
	});

	it('llms.txt follows the format and lists every city', async () => {
		const llms = await (await get('/llms.txt')).text();
		expect(llms).toMatch(/^# Rijschool All Drive\n\n> /);
		for (const city of cities) expect(llms).toContain(`${ORIGIN}/rijschool-${city.slug}`);
	});
});

describe('every page in the sitemap', () => {
	it('is a 200 with one H1, canonical, hreflang pair, Open Graph and parsable JSON-LD', async () => {
		expect(sitemapUrls.length).toBeGreaterThan(0);
		for (const url of sitemapUrls) {
			const res = await get(local(url));
			expect(res.status, url).toBe(200);
			const html = await res.text();
			expect(html.match(/<h1/g), url).toHaveLength(1);
			expect(html, url).toContain(`<link rel="canonical" href="${url}"`);
			expect(html, url).toMatch(/<link rel="alternate" hreflang="nl" href="https:\/\//);
			expect(html, url).toMatch(/<link rel="alternate" hreflang="en" href="https:\/\//);
			expect(html, url).toMatch(/<link rel="alternate" hreflang="x-default"/);
			for (const tag of [
				'og:title',
				'og:description',
				'og:type',
				'og:url',
				'og:image',
				'og:locale',
			]) {
				expect(html, `${url} ${tag}`).toContain(`property="${tag}"`);
			}
			const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
			expect(blocks.length, url).toBeGreaterThan(0);
			for (const [, json] of blocks) expect(() => JSON.parse(json), url).not.toThrow();
			expect(html, url).toMatch(/<html lang="(nl|en)"/);
		}
	}, 60000);

	it.each(cities.flatMap((c) => [`/rijschool-${c.slug}`, `/en/driving-school-${c.slug}`]))(
		'%s has Service and BreadcrumbList schema',
		async (path) => {
			const html = await (await get(path)).text();
			const types = [
				...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
			].map(([, json]) => JSON.parse(json)['@type']);
			expect(types).toContain('Service');
			expect(types).toContain('BreadcrumbList');
		}
	);
});

describe('redirects', () => {
	it.each([
		['/about', '/over-ons'],
		['/en/about', '/en/about-us'],
		['/en/prijzen', '/en/prices'],
	])('%s -> 301 %s', async (from, to) => {
		const res = await get(from);
		expect(res.status).toBe(301);
		expect(new URL(res.headers.get('location'), BASE).pathname).toBe(to);
	});
});

describe('service area', () => {
	it('an inactive city (Haarlem) is off the site, the sitemap and llms.txt', async () => {
		expect((await get('/rijschool-haarlem')).status).toBe(404);
		const xml = await (await get('/sitemap.xml')).text();
		expect(xml).not.toContain('haarlem');
		const llms = await (await get('/llms.txt')).text();
		expect(llms).not.toContain('rijschool-haarlem');
	});

	it('the homepage links to the refresher course and driving assessment', async () => {
		const html = await (await get('/')).text();
		expect(html).toContain('href="/opfriscursus"');
		expect(html).toContain('href="/rijtest"');
		const en = await (await get('/en')).text();
		expect(en).toContain('href="/en/refresher-driving-course"');
		expect(en).toContain('href="/en/driving-assessment"');
	});

	it('the footer information column lists the refresher course and driving assessment', async () => {
		const html = await (await get('/prijzen')).text();
		const info = html.slice(html.indexOf('quick-menu-info'));
		expect(info).toContain('href="/opfriscursus"');
		expect(info).toContain('href="/rijtest"');
	});

	it('Zaandam is presented as manual only and left off the automatic lessons page', async () => {
		const html = await (await get('/rijschool-zaandam')).text();
		expect(html).toContain('Alleen schakellessen');
		// the page's own services list (the footer still lists every service)
		const services = html.slice(html.indexOf('id="onze-diensten"'));
		expect(services.slice(0, services.indexOf('</section>'))).not.toContain(
			'href="/automaat-rijles"'
		);
		const md = await (await get('/rijschool-zaandam', { accept: 'text/markdown' })).text();
		expect(md).toContain('alleen in een schakelauto');
		const automatic = await (await get('/automaat-rijles')).text();
		// the city cards (the footer still links every city)
		const cards = automatic
			.split('class="section related')
			.slice(1)
			.map((part) => part.slice(0, part.indexOf('</section>')))
			.find((part) => part.includes('href="/rijschool-'));
		expect(cards).not.toContain('href="/rijschool-zaandam"');
		expect(cards).toContain('href="/rijschool-diemen"');
		expect(automatic).not.toContain('"name":"Zaandam"');
	});

	it('city pages name the nearest CBR exam centre, also in the FAQ schema and Markdown', async () => {
		const html = await (await get('/rijschool-oostzaan')).text();
		expect(html).toContain('Examen in de buurt');
		expect(html).toContain('CBR Examencentrum Zaandam');
		expect(html).toContain('Waar doe ik mijn praktijkexamen als ik in Oostzaan woon?');
		const md = await (await get('/rijschool-oostzaan', { accept: 'text/markdown' })).text();
		expect(md).toContain('Kuilpad 1, 1509 AS Zaandam');
		const llms = await (await get('/llms.txt')).text();
		expect(llms).toContain('nearest CBR practical exam centre');
	});

	it('structured data covers the site, the instructor, articles and service prices', async () => {
		const types = async (path) =>
			[
				...(await (await get(path)).text()).matchAll(
					/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
				),
			]
				.map((m) => JSON.parse(m[1]))
				.flatMap((j) => [].concat(j['@type']).map((t) => ({ t, j })));
		const home = await types('/');
		for (const t of ['DrivingSchool', 'WebSite', 'Person', 'FAQPage'])
			expect(home.map((x) => x.t)).toContain(t);
		const org = home.find((x) => x.t === 'DrivingSchool').j;
		expect(org.aggregateRating.ratingValue).toBe(5);
		expect(org.hasMap).toMatch(/^https:\/\//);
		expect((await types('/over-ons')).map((x) => x.t)).toContain('AboutPage');
		const info = (await types('/theorie-examen-auto')).find((x) => x.t === 'Article');
		expect(info.j.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		const automatic = (await types('/automaat-rijles')).find((x) => x.t === 'Service');
		expect(automatic.j.offers).toMatchObject({ price: 65, priceCurrency: 'EUR' });
		expect((await types('/spoedcursus')).find((x) => x.t === 'Service').j.offers).toBeUndefined();
	});

	it('every service page links to all other services, and the footer lists them', async () => {
		const html = await (await get('/rijtest')).text();
		for (const slug of ['automaat-rijles', 'opfriscursus', 'rijles-voor-expats', 'spoedcursus'])
			expect(html).toContain(`href="/${slug}"`);
		const footer = html.slice(html.indexOf('quick-menu-services'));
		expect(footer).toContain('href="/schakel-rijles"');
	});

	it('single rates page lists every rate', async () => {
		const html = await (await get('/losse-tarieven')).text();
		for (const price of ['50', '65', '97,50', '290', '350', '375', '390'])
			expect(html).toContain(price);
		expect(html).toContain('Rijles per uur');
		expect(html).toContain('Let op: alleen bij afname van een pakket');
		const md = await (await get('/losse-tarieven', { accept: 'text/markdown' })).text();
		expect(md).toMatch(/Rijles per uur, 60 minuten: €\s65/);
		expect(md).toContain('alleen bij afname van een pakket');
	});
});
