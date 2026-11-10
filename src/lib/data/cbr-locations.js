// CBR exam centres in and around our service area, from cbr.nl (checked 09-11-2026):
// - car practical exam (B): https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/auto-praktijk
// - car theory exam (B):    https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/auto-theorie
// Coordinates from PDOK Locatieserver (the government's address register). No other centre
// near the service area holds the car practical exam (none in Hoofddorp, Almere or Leiden;
// Sassenheim is marked temporary by the CBR, so it is left out).
// CBR: "Je hoeft het examen niet in of vlakbij je eigen woonplaats te doen."

export const cbrPracticalListUrl =
	'https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/auto-praktijk';
export const cbrBookingUrl =
	'https://www.cbr.nl/nl/veelgestelde-vragen/hoe-reserveer-ik-mijn-praktijkexamen';

export const cbrLocations = [
	{
		name: 'CBR Examencentrum Amsterdam',
		street: 'Naritaweg 150',
		postcode: '1043 CA',
		city: 'Amsterdam',
		coordinates: { lat: 52.38803, lon: 4.820914 },
		practical: true,
		theory: true,
		url: 'https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/examencentrum-amsterdam-5',
	},
	{
		name: 'CBR Examencentrum Zaandam',
		street: 'Kuilpad 1',
		postcode: '1509 AS',
		city: 'Zaandam',
		coordinates: { lat: 52.463964, lon: 4.827417 },
		practical: true,
		theory: false,
		url: 'https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/examencentrum-zaandam',
	},
	{
		name: 'CBR Examencentrum Haarlem',
		street: 'Professor Eijkmanlaan 2-4',
		postcode: '2035 XB',
		city: 'Haarlem',
		coordinates: { lat: 52.367485, lon: 4.663623 },
		practical: true,
		theory: true,
		url: 'https://www.cbr.nl/nl/service/nl/route-locaties/cbr-locatie/examencentrum-haarlem',
	},
];

/** Straight-line distance in km (haversine). */
export function distanceKm(a, b) {
	const rad = (deg) => (deg * Math.PI) / 180;
	const dLat = rad(b.lat - a.lat);
	const dLon = rad(b.lon - a.lon);
	const h =
		Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
	return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * The nearest CBR centre for a city, as the crow flies.
 * @param {{ coordinates: { lat: number, lon: number } }} city
 * @param {'practical' | 'theory'} exam
 */
export function nearestCbrLocation(city, exam = 'practical') {
	return cbrLocations
		.filter((location) => location[exam])
		.map((location) => ({ ...location, km: distanceKm(city.coordinates, location.coordinates) }))
		.sort((a, b) => a.km - b.km)[0];
}
