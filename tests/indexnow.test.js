import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { recentUrls, INDEXNOW_KEY } from '../scripts/indexnow.mjs';

describe('IndexNow', () => {
	it('the key file in static/ holds exactly the key the script sends', () => {
		expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{32}$/);
		expect(readFileSync(`static/${INDEXNOW_KEY}.txt`, 'utf8')).toBe(INDEXNOW_KEY);
	});

	it('only submits pages whose lastmod is recent', () => {
		const xml = `<urlset>
			<url>
				<loc>https://www.rijschoolalldrive.nl/</loc>
				<lastmod>2026-11-16</lastmod>
			</url>
			<url>
				<loc>https://www.rijschoolalldrive.nl/privacy</loc>
				<lastmod>2026-10-01</lastmod>
			</url>
		</urlset>`;
		const now = new Date('2026-11-17T12:00:00Z');
		expect(recentUrls(xml, 7, now)).toEqual(['https://www.rijschoolalldrive.nl/']);
		expect(recentUrls(xml, 3650, now)).toHaveLength(2);
	});

	it('the key file is served by the built site', async () => {
		const { PORT } = await import('./setup.js');
		const res = await fetch(`http://localhost:${PORT}/${INDEXNOW_KEY}.txt`);
		expect(res.status).toBe(200);
		expect(await res.text()).toBe(INDEXNOW_KEY);
	});
});
