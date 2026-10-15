import { describe, expect, it } from 'vitest';
import { validateSignup } from './signup.js';

const form = (fields) => {
	const data = new FormData();
	for (const [k, v] of Object.entries(fields)) data.set(k, v);
	return data;
};
const valid = {
	transmissie: 'automaat',
	plaats: 'haarlem',
	pakket: 'door-rij',
	naam: 'Jan Jansen',
	adres: 'Straatnaam 1, 1234 AB Haarlem',
	telefoon: '06 12345678',
	email: 'jan@example.com',
};
const places = ['amsterdam', 'haarlem'];

describe('validateSignup', () => {
	it('accepts a complete sign-up and trims values', () => {
		const { values, errors } = validateSignup(form({ ...valid, naam: '  Jan Jansen ' }), places);
		expect(errors).toEqual({});
		expect(values.naam).toBe('Jan Jansen');
	});

	it('defaults the package to "not sure yet"', () => {
		const { values, errors } = validateSignup(form({ ...valid, pakket: '' }), places);
		expect(errors).toEqual({});
		expect(values.pakket).toBe('onbekend');
	});

	it('requires the other town when "anders" is chosen', () => {
		expect(validateSignup(form({ ...valid, plaats: 'anders' }), places).errors).toHaveProperty(
			'plaats_anders'
		);
		expect(
			validateSignup(form({ ...valid, plaats: 'anders', plaats_anders: 'Purmerend' }), places)
				.errors
		).toEqual({});
	});

	it('reports every invalid field', () => {
		const { errors } = validateSignup(
			form({
				transmissie: 'motor',
				plaats: 'utrecht',
				pakket: 'x',
				telefoon: '123',
				email: 'nope',
			}),
			places
		);
		expect(Object.keys(errors).sort()).toEqual(
			['adres', 'email', 'naam', 'pakket', 'plaats', 'telefoon', 'transmissie'].sort()
		);
	});
});
