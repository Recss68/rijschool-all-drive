import { describe, expect, it } from 'vitest';
import { cities } from '$lib/data/cities';
import { MAP_WIDTH, MUNICIPALITIES, mapBounds, project } from './map.js';

describe('service-area map', () => {
	it.each(cities.map((c) => [c.slug, c]))(
		'%s has coordinates, a municipality on the map and a valid label side',
		(_, city) => {
			expect(city.coordinates.lat).toBeGreaterThan(52.2);
			expect(city.coordinates.lat).toBeLessThan(53);
			expect(city.coordinates.lon).toBeGreaterThan(4.4);
			expect(city.coordinates.lon).toBeLessThan(5.3);
			expect(MUNICIPALITIES.map((f) => f.name)).toContain(city.municipality);
			expect(['top', 'right', 'bottom', 'left']).toContain(city.mapLabel);
		}
	);

	it('fits every city inside the map', () => {
		const bounds = mapBounds(cities);
		for (const city of cities) {
			const { x, y } = project(city.coordinates.lat, city.coordinates.lon, bounds);
			expect(x).toBeGreaterThan(0);
			expect(x).toBeLessThan(MAP_WIDTH);
			expect(y).toBeGreaterThan(0);
			expect(y).toBeLessThan(bounds.height);
		}
	});
});
