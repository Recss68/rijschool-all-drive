import { describe, expect, it } from 'vitest';
import { validateSignup, isPlausibleBirthDate, ageOn } from './signup.js';

const form = (fields) => {
	const data = new FormData();
	for (const [k, v] of Object.entries(fields)) data.set(k, v);
	return data;
};
const valid = {
	transmissie: 'automaat',
	plaats: 'amsterdam',
	pakket: 'door-rij',
	naam: 'Jan Jansen',
	geboortedatum: '2008-03-14',
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

	it('refuses automatic lessons in a manual-only city, but accepts manual there', () => {
		const zaandam = { ...valid, plaats: 'zaandam' };
		const cities = ['amsterdam', 'zaandam'];
		const now = new Date('2026-10-28');
		expect(validateSignup(form(zaandam), cities, now, ['zaandam']).errors).toEqual({
			transmissie: 'unavailable',
		});
		for (const transmissie of ['schakel', 'onbekend'])
			expect(
				validateSignup(form({ ...zaandam, transmissie }), cities, now, ['zaandam']).errors
			).toEqual({});
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
			[
				'adres',
				'email',
				'geboortedatum',
				'naam',
				'pakket',
				'plaats',
				'telefoon',
				'transmissie',
			].sort()
		);
	});
});

describe('date of birth', () => {
	const now = new Date('2026-10-15');

	it('calculates the age on a given day', () => {
		expect(ageOn('2008-10-15', now)).toBe(18);
		expect(ageOn('2008-10-16', now)).toBe(17);
	});

	it.each([
		['2008-03-14', true],
		['2011-10-15', true],
		['2011-10-16', false], // 14 years old
		['1925-01-01', false], // over 100
		['2008-02-30', false], // not a real date
		['14-03-2008', false], // wrong format
		['2030-01-01', false], // in the future
	])('%s -> %s', (date, ok) => {
		expect(isPlausibleBirthDate(date, now)).toBe(ok);
	});
});
