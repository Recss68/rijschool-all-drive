import { describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile.js';

const reply = (body) => vi.fn(async () => ({ json: async () => body }));

describe('verifyTurnstile', () => {
	it('accepts a token that Cloudflare confirms, sending secret, token and IP', async () => {
		const fetchFn = reply({ success: true });
		expect(await verifyTurnstile('tok', { secret: 's3cret', ip: '1.2.3.4', fetchFn })).toBe(true);
		const [url, init] = fetchFn.mock.calls[0];
		expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
		expect(Object.fromEntries(init.body)).toEqual({
			secret: 's3cret',
			response: 'tok',
			remoteip: '1.2.3.4',
		});
	});

	it('rejects when Cloudflare says no', async () => {
		const fetchFn = reply({ success: false, 'error-codes': ['invalid-input-response'] });
		expect(await verifyTurnstile('tok', { secret: 's', fetchFn })).toBe(false);
	});

	it('fails closed without a token, without a secret or on a network error', async () => {
		const fetchFn = reply({ success: true });
		vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(await verifyTurnstile('', { secret: 's', fetchFn })).toBe(false);
		expect(await verifyTurnstile(null, { secret: 's', fetchFn })).toBe(false);
		expect(await verifyTurnstile('tok', { secret: null, fetchFn })).toBe(false);
		expect(fetchFn).not.toHaveBeenCalled();
		const broken = vi.fn(async () => {
			throw new Error('offline');
		});
		expect(await verifyTurnstile('tok', { secret: 's', fetchFn: broken })).toBe(false);
	});
});
