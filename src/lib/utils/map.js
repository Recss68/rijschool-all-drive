// Geometry for the service-area map. Municipality boundaries come from CBS/Kadaster
// (PDOK, CC BY 4.0) via scripts/build-region-map.mjs. The view is fitted around the
// municipalities we serve, so a new city file lands on the map by itself.
import regionMap from '$lib/data/region-map.json';

export const MAP_WIDTH = 600;
export const { features: MUNICIPALITIES, source: MAP_SOURCE, license: MAP_LICENSE } = regionMap;

/**
 * View bounds around the municipalities of all cities, with a margin (in degrees).
 * @param {{ municipality: string, coordinates: { lat: number, lon: number } }[]} cities
 */
export function mapBounds(cities, marginLat = 0.015, marginLon = 0.025) {
	const served = new Set(cities.map((c) => c.municipality).filter(Boolean));
	const points = [
		...MUNICIPALITIES.filter((f) => served.has(f.name)).flatMap((f) => f.rings.flat()),
		...cities.map((c) => [c.coordinates.lon, c.coordinates.lat]),
	];
	const lons = points.map((p) => p[0]);
	const lats = points.map((p) => p[1]);
	const bounds = {
		minLat: Math.min(...lats) - marginLat,
		maxLat: Math.max(...lats) + marginLat,
		minLon: Math.min(...lons) - marginLon,
		maxLon: Math.max(...lons) + marginLon,
	};
	// Longitude degrees are shorter at this latitude; correct so the map is not stretched
	const kx = Math.cos((((bounds.minLat + bounds.maxLat) / 2) * Math.PI) / 180);
	const scale = MAP_WIDTH / ((bounds.maxLon - bounds.minLon) * kx);
	return { ...bounds, kx, scale, height: (bounds.maxLat - bounds.minLat) * scale };
}

/** Projects a lat/lon onto viewBox coordinates. */
export function project(lat, lon, bounds) {
	return {
		x: (lon - bounds.minLon) * bounds.kx * bounds.scale,
		y: (bounds.maxLat - lat) * bounds.scale,
	};
}

/** SVG path for all rings of a municipality ([lon, lat] pairs). */
export function municipalityPath(feature, bounds) {
	return feature.rings
		.map(
			(ring) =>
				ring
					.map(([lon, lat], i) => {
						const { x, y } = project(lat, lon, bounds);
						return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
					})
					.join('') + 'Z'
		)
		.join('');
}
