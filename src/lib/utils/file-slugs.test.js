import { describe, expect, it } from 'vitest';
import { match as matchCity } from '../../params/city.js';
import { match as matchInfo } from '../../params/info.js';
import { match as matchService } from '../../params/service.js';
import { services } from '$lib/data/services';
import { infoPages } from '$lib/data/info';
import { cities } from '$lib/data/cities';

// The matchers only see file names, so a data file whose slug differs from its
// file name would silently stop matching: this keeps the two in line.
const cityFiles = import.meta.glob('../data/cities/*.js', { eager: true });

describe('route matchers', () => {
	it('match every service and info page by its slug', () => {
		for (const { slug } of services) expect(matchService(slug), slug).toBe(true);
		for (const { slug } of infoPages) expect(matchInfo(slug), slug).toBe(true);
		expect(matchService('rijschool-machtigen')).toBe(false);
		expect(matchInfo('spoedcursus')).toBe(false);
	});

	it('match every city file, also one that is switched off, and nothing else', () => {
		for (const { slug } of cities) expect(matchCity(slug), slug).toBe(true);
		for (const [path, mod] of Object.entries(cityFiles)) {
			if (path.endsWith('/index.js')) continue;
			expect(path.endsWith(`/${mod.city.slug}.js`), path).toBe(true);
		}
		expect(matchCity('machtigen')).toBe(false);
		expect(matchCity('index')).toBe(false);
	});
});
