// Integration tests for the sign-up page and form action (no email is actually sent).
import { describe, expect, it } from 'vitest';
import { PORT } from './setup.js';

const BASE = `http://localhost:${PORT}`;

/** Posts the form like `use:enhance` does and returns the parsed action result. */
async function submit(fields) {
	const body = new FormData();
	for (const [k, v] of Object.entries(fields)) body.set(k, v);
	const res = await fetch(`${BASE}/aanmelden`, {
		method: 'POST',
		body,
		headers: { accept: 'application/json', 'x-sveltekit-action': 'true', origin: BASE },
	});
	const result = await res.json();
	return { ...result, data: result.data ? JSON.parse(result.data) : null };
}

const details = {
	transmissie: 'schakel',
	plaats: 'amsterdam',
	pakket: 'rij-start',
	naam: 'Jan Jansen',
	adres: 'Straatnaam 1, 1234 AB Amsterdam',
	telefoon: '06 12345678',
	email: 'jan@example.com',
};

describe('sign-up page', () => {
	it('renders in both languages, with noindex', async () => {
		for (const path of ['/aanmelden', '/en/sign-up']) {
			const res = await fetch(BASE + path);
			expect(res.status).toBe(200);
			const html = await res.text();
			expect(html).toContain('name="robots" content="noindex, follow"');
			expect(html).toContain('data-sitekey="1x00000000000000000000AA"');
		}
	});

	it('is not in the sitemap', async () => {
		const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
		expect(xml).not.toContain('/aanmelden');
		expect(xml).not.toContain('/sign-up');
	});
});

describe('sign-up action', () => {
	it('returns field errors for an incomplete form', async () => {
		const result = await submit({ transmissie: 'automaat' });
		expect(result.type).toBe('failure');
		expect(result.data).toBeTruthy();
	});

	it('rejects a submission without a Turnstile token', async () => {
		const result = await submit(details);
		expect(result.type).toBe('failure');
		expect(JSON.stringify(result.data)).toContain('captcha');
	});

	it('sends bots that fill the honeypot to the thank-you page, without sending', async () => {
		const result = await submit({ ...details, website: 'https://spam.example' });
		expect(result.type).toBe('redirect');
		expect(result.location).toBe('/bedankt?form=aanmelden');
	});
});

describe('thank-you page (Google Ads conversion URL)', () => {
	it.each(['/bedankt?form=aanmelden', '/bedankt?form=contact', '/en/thank-you?form=aanmelden'])(
		'%s renders with noindex',
		async (path) => {
			const res = await fetch(BASE + path);
			expect(res.status).toBe(200);
			const html = await res.text();
			expect(html).toContain('name="robots" content="noindex, follow"');
			expect(html).toMatch(/<h1/);
		}
	);

	it('is not in the sitemap', async () => {
		const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
		expect(xml).not.toContain('/bedankt');
		expect(xml).not.toContain('/thank-you');
	});
});

describe('custom 404 page', () => {
	it.each(['/bestaat-niet-xyz', '/en/does-not-exist'])(
		'%s keeps status 404 and offers a way back',
		async (path) => {
			const res = await fetch(BASE + path, { headers: { accept: 'text/html' } });
			expect(res.status).toBe(404);
			const html = await res.text();
			expect(html).toContain('class="error-page');
			expect(html).toContain('name="robots" content="noindex"');
			expect(html).toMatch(/href="\/(en)?"/);
		}
	);
});

describe('contact form', () => {
	it('rejects a message without a Turnstile token and renders the widget', async () => {
		const body = new FormData();
		for (const [k, v] of Object.entries({
			naam: 'Jan',
			email: 'jan@example.com',
			telefoon: '0612345678',
			onderwerp: 'Vraag',
			bericht: 'Hallo',
		}))
			body.set(k, v);
		const res = await fetch(`${BASE}/contact`, {
			method: 'POST',
			body,
			headers: { accept: 'application/json', 'x-sveltekit-action': 'true', origin: BASE },
		});
		const result = await res.json();
		expect(result.type).toBe('failure');
		expect(result.data).toContain('captcha');
		const html = await (await fetch(`${BASE}/contact`)).text();
		expect(html).toContain('data-sitekey="1x00000000000000000000AA"');
	});
});
