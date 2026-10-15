// Downloads simplified municipality boundaries (CBS/Kadaster via PDOK, CC BY 4.0) for the
// region around Amsterdam and stores them in src/lib/data/region-map.json for the
// service-area map. Run again (`node scripts/build-region-map.mjs`) when a city outside
// the current area is added.
import { writeFileSync } from 'node:fs';

const YEAR = 2024;
// lat/lon box around the service area, with room for context (sea, IJmeer, neighbours)
const BBOX = { minLat: 52.2, maxLat: 52.56, minLon: 4.45, maxLon: 5.2 };

const url =
	`https://service.pdok.nl/cbs/gebiedsindelingen/${YEAR}/wfs/v1_0?service=WFS&version=2.0.0` +
	`&request=GetFeature&typeNames=gebiedsindelingen:gemeente_gegeneraliseerd` +
	`&outputFormat=application/json&srsName=EPSG:4326` +
	`&bbox=${BBOX.minLat},${BBOX.minLon},${BBOX.maxLat},${BBOX.maxLon},urn:ogc:def:crs:EPSG::4326`;

const geojson = await (await fetch(url)).json();
const round = (n) => Math.round(n * 1e4) / 1e4; // ~10 m, plenty for this scale

const features = geojson.features
	.map((f) => ({
		name: f.properties.statnaam,
		// MultiPolygon -> list of rings as [lon, lat] pairs
		rings: f.geometry.coordinates.flatMap((polygon) =>
			polygon.map((ring) => ring.map(([lon, lat]) => [round(lon), round(lat)]))
		),
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(
	new URL('../src/lib/data/region-map.json', import.meta.url),
	JSON.stringify({
		source: `CBS/Kadaster, gemeentegrenzen ${YEAR} (gegeneraliseerd), via PDOK`,
		license: 'CC BY 4.0',
		features,
	}) + '\n'
);
console.log(`Wrote ${features.length} municipalities`);
