// Validation for the sign-up form (pure, so it can be unit tested).

export const TRANSMISSIONS = ['automaat', 'schakel', 'onbekend'];
export const PACKAGES = ['rij-start', 'door-rij', 'vol-gas', 'onbekend'];

const text = (data, name) => String(data.get(name) ?? '').trim();

/**
 * @param {FormData} data
 * @param {string[]} placeSlugs city slugs that can be chosen, plus 'anders'
 * @param {Date} [now] for tests
 * @returns {{ values: Record<string, string>, errors: Record<string, string> }}
 */
export function validateSignup(data, placeSlugs, now = new Date()) {
	const values = {
		transmissie: text(data, 'transmissie'),
		plaats: text(data, 'plaats'),
		plaats_anders: text(data, 'plaats_anders'),
		pakket: text(data, 'pakket') || 'onbekend',
		naam: text(data, 'naam'),
		geboortedatum: text(data, 'geboortedatum'),
		adres: text(data, 'adres'),
		telefoon: text(data, 'telefoon'),
		email: text(data, 'email'),
	};
	const errors = {};

	if (!TRANSMISSIONS.includes(values.transmissie)) errors.transmissie = 'required';
	if (![...placeSlugs, 'anders'].includes(values.plaats)) errors.plaats = 'required';
	else if (values.plaats === 'anders' && values.plaats_anders.length < 2)
		errors.plaats_anders = 'required';
	if (!PACKAGES.includes(values.pakket)) errors.pakket = 'required';
	if (values.naam.length < 2) errors.naam = 'required';
	if (!values.geboortedatum) errors.geboortedatum = 'required';
	else if (!isPlausibleBirthDate(values.geboortedatum, now)) errors.geboortedatum = 'birthdate';
	if (values.adres.length < 5) errors.adres = 'required';
	if (values.telefoon.replace(/[^\d]/g, '').length < 9) errors.telefoon = 'phone';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'email';

	return { values, errors };
}

/** Age in whole years on `now` for an ISO date (YYYY-MM-DD). */
export function ageOn(isoDate, now = new Date()) {
	const [y, m, d] = isoDate.split('-').map(Number);
	let age = now.getFullYear() - y;
	if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age -= 1;
	return age;
}

/** A real calendar date (YYYY-MM-DD) for someone aged 15 to 100. */
export function isPlausibleBirthDate(isoDate, now = new Date()) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return false;
	const [y, m, d] = isoDate.split('-').map(Number);
	const date = new Date(Date.UTC(y, m - 1, d));
	const real =
		date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
	const age = ageOn(isoDate, now);
	return real && age >= 15 && age <= 100;
}
