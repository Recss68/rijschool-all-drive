import { describe, expect, it } from 'vitest';
import { buildRobots, SEARCH_BOTS, USER_BOTS, TRAINING_BOTS } from './robots.js';

const robots = buildRobots('https://www.rijschoolalldrive.nl');

describe('robots.txt', () => {
	it('references the sitemap and llms.txt', () => {
		expect(robots).toContain('Sitemap: https://www.rijschoolalldrive.nl/sitemap.xml');
		expect(robots).toContain('https://www.rijschoolalldrive.nl/llms.txt');
	});

	it.each(['*', ...SEARCH_BOTS, ...USER_BOTS, ...TRAINING_BOTS])(
		'has an explicit Allow group for %s',
		(bot) => {
			expect(robots).toContain(`User-agent: ${bot}\nAllow: /`);
		}
	);

	it('blocks nothing', () => {
		expect(robots).not.toMatch(/Disallow: \/\S/);
	});
});
