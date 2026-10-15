// Cloudflare Turnstile: server-side verification of the token the widget adds to a form
// (field `cf-turnstile-response`). Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Cloudflare's official test secret that always passes (only used in development). */
const DEV_TEST_SECRET = '1x0000000000000000000000000000000AA';

/** Secret key from TURNSTILE_SECRET_KEY; in development Cloudflare's test key is used. */
export function turnstileSecret() {
	return env.TURNSTILE_SECRET_KEY || (dev ? DEV_TEST_SECRET : null);
}

/**
 * True when Cloudflare confirms the token. Fails closed: no token, no secret or a network
 * error means the submission is rejected.
 * @param {FormDataEntryValue | null} token
 * @param {{ secret: string | null, ip?: string, fetchFn?: typeof fetch }} options
 */
export async function verifyTurnstile(token, { secret, ip, fetchFn = fetch }) {
	if (!token || typeof token !== 'string') return false;
	if (!secret) {
		console.error('TURNSTILE_SECRET_KEY is not set: rejecting the form submission');
		return false;
	}
	const body = new URLSearchParams({ secret, response: token });
	if (ip) body.set('remoteip', ip);
	try {
		const res = await fetchFn(VERIFY_URL, { method: 'POST', body });
		const result = await res.json();
		return result.success === true;
	} catch (error) {
		console.error('Turnstile verification failed:', error);
		return false;
	}
}
