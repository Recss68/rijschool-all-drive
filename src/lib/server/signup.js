// Validation for the sign-up form (pure, so it can be unit tested).

export const TRANSMISSIONS = ['automaat', 'schakel', 'onbekend'];
export const PACKAGES = ['rij-start', 'door-rij', 'vol-gas', 'onbekend'];

const text = (data, name) => String(data.get(name) ?? '').trim();

/**
 * @param {FormData} data
 * @param {string[]} placeSlugs city slugs that can be chosen, plus 'anders'
 * @returns {{ values: Record<string, string>, errors: Record<string, string> }}
 */
export function validateSignup(data, placeSlugs) {
	const values = {
		transmissie: text(data, 'transmissie'),
		plaats: text(data, 'plaats'),
		plaats_anders: text(data, 'plaats_anders'),
		pakket: text(data, 'pakket') || 'onbekend',
		naam: text(data, 'naam'),
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
	if (values.adres.length < 5) errors.adres = 'required';
	if (values.telefoon.replace(/[^\d]/g, '').length < 9) errors.telefoon = 'phone';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'email';

	return { values, errors };
}
