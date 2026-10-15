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
		'/rijschool-haarlem',
		'/en/driving-school-amsterdam',
		'/spoedcursus',
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
