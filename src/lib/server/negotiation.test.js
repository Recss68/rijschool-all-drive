import { describe, expect, it } from 'vitest';
import { wantsMarkdown, redirects } from './negotiation.js';

describe('wantsMarkdown', () => {
	it.each([
		['text/markdown', true],
		['text/markdown, text/html;q=0.8', true],
		['text/html, text/markdown;q=0.5', false],
		['text/html,application/xhtml+xml,*/*;q=0.8', false],
		['text/markdown;q=0', false],
		[null, false],
	])('%s -> %s', (accept, expected) => {
		expect(wantsMarkdown(accept)).toBe(expected);
	});
});

describe('redirects', () => {
	it('sends /about to the about page in both languages', () => {
		expect(redirects['/about']).toBe('/over-ons');
		expect(redirects['/en/about']).toBe('/en/about-us');
	});
});
