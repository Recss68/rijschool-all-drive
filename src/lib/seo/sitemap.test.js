import { describe, expect, it } from 'vitest';
import { XMLValidator } from 'fast-xml-parser';
import { buildSitemap } from './sitemap.js';

const xml = buildSitemap([
	{ nl: 'https://example.nl/prijzen', en: 'https://example.nl/en/prices', updated: '2026-10-14' },
]);

describe('buildSitemap', () => {
	it('is valid XML in the sitemaps.org namespace', () => {
		expect(XMLValidator.validate(xml)).toBe(true);
		expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
	});

	it('lists both languages with reciprocal hreflang links', () => {
		expect(xml.match(/<url>/g)).toHaveLength(2);
		expect(xml.match(/hreflang="nl"/g)).toHaveLength(2);
		expect(xml.match(/hreflang="en"/g)).toHaveLength(2);
		expect(xml.match(/hreflang="x-default"/g)).toHaveLength(2);
		expect(xml).toContain('<lastmod>2026-10-14</lastmod>');
	});
});
