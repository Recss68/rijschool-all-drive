import { describe, expect, it } from 'vitest';
import { canonicalHostRedirect } from './host.js';

const url = (href) => new URL(href);

describe('canonical host', () => {
	it('sends the production vercel.app alias to www in one step, keeping path and query', () => {
		expect(
			canonicalHostRedirect(url('https://rijschool-all-drive.vercel.app/prijzen?x=1'), 'production')
		).toBe('https://www.rijschoolalldrive.nl/prijzen?x=1');
	});

	it('serves the main domain, previews and local runs as they are', () => {
		expect(
			canonicalHostRedirect(url('https://www.rijschoolalldrive.nl/'), 'production')
		).toBeNull();
		expect(canonicalHostRedirect(url('https://x-git-branch.vercel.app/'), 'preview')).toBeNull();
		expect(canonicalHostRedirect(url('http://localhost:4173/'), undefined)).toBeNull();
	});
});
