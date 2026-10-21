import { describe, expect, it } from 'vitest';
import {
	parseLeadSource,
	leadChannel,
	leadSourceRows,
	leadSummary,
	NOT_TRACKED,
} from './lead-source.js';

describe('lead source', () => {
	it.each([
		[{ referrer: 'www.google.nl' }, 'Google (organisch)'],
		[{ referrer: 'www.google.com', click: 'gclid' }, 'Google Ads'],
		[{ referrer: 'www.bing.com' }, 'Bing (organisch)'],
		[{ referrer: 'chatgpt.com' }, 'AI-chat (ChatGPT)'],
		[{ utm_source: 'chatgpt.com' }, 'AI-chat (ChatGPT)'],
		[{ referrer: 'www.perplexity.ai' }, 'AI-chat (Perplexity)'],
		[{ referrer: 'gemini.google.com' }, 'AI-chat (Gemini)'],
		[{ referrer: 'copilot.microsoft.com' }, 'AI-chat (Copilot)'],
		[{ referrer: 'claude.ai' }, 'AI-chat (Claude)'],
		[{ referrer: 'l.instagram.com' }, 'Instagram'],
		[{ referrer: 'www.tiktok.com' }, 'TikTok'],
		[{ referrer: 'lm.facebook.com' }, 'Facebook'],
		[{ click: 'fbclid' }, 'Facebook / Instagram'],
		[{ utm_source: 'instagram', utm_medium: 'bio' }, 'Instagram'],
		[{ utm_source: 'tiktok', utm_medium: 'paid' }, 'TikTok-advertentie'],
		[{ click: 'ttclid' }, 'TikTok-advertentie'],
		[
			{ utm_source: 'google', utm_medium: 'organic', utm_campaign: 'bedrijfsprofiel' },
			'Google Bedrijfsprofiel',
		],
		[{ utm_source: 'flyer', utm_medium: 'qr' }, 'flyer'],
		[{ referrer: 'www.example.org' }, 'Verwijzing via www.example.org'],
		[{}, 'Direct / onbekend'],
	])('%j -> %s', (source, channel) => {
		// every tracked visit has a landing page
		expect(leadChannel({ landing: '/', ...source })).toBe(channel);
	});

	it('without cookie consent nothing is tracked, and the visitor’s own answer is used', () => {
		expect(leadChannel({})).toBe(NOT_TRACKED);
		expect(leadSummary({}, 'instagram')).toBe('Instagram (zelf opgegeven)');
		expect(leadSummary({}, 'onzin')).toBe('onbekende bron');
		expect(leadSummary({ landing: '/', referrer: 'chatgpt.com' }, 'google')).toBe(
			'AI-chat (ChatGPT)'
		);
		expect(leadSourceRows({}, 'aanbeveling')).toEqual([
			['Zelf opgegeven', 'Via vrienden of familie'],
			['Bron (automatisch)', NOT_TRACKED],
		]);
	});

	it('keeps only known keys and short strings from the untrusted field', () => {
		const raw = JSON.stringify({
			referrer: 'www.google.nl',
			landing: '/rijschool-diemen',
			evil: '<script>',
			utm_campaign: 'x'.repeat(500),
			at: 42,
		});
		const source = parseLeadSource(raw);
		expect(source).toEqual({
			referrer: 'www.google.nl',
			landing: '/rijschool-diemen',
			utm_campaign: 'x'.repeat(120),
		});
	});

	it('ignores broken or oversized input', () => {
		expect(parseLeadSource('not json')).toEqual({});
		expect(parseLeadSource('x'.repeat(3000))).toEqual({});
		expect(parseLeadSource(null)).toEqual({});
		expect(parseLeadSource('"string"')).toEqual({});
	});

	it('shows only the rows that have a value, with Amsterdam time', () => {
		const rows = leadSourceRows({
			referrer: 'www.google.nl',
			landing: '/rijschool-diemen',
			form: '/prijzen',
			at: '2026-10-21T08:05:00.000Z',
		});
		expect(rows.map(([label]) => label)).toEqual([
			'Zelf opgegeven',
			'Bron (automatisch)',
			'Verwijzende site',
			'Eerste pagina',
			'Formulier ingevuld op',
			'Eerste bezoek',
		]);
		expect(rows.at(-1)[1]).toContain('10:05');
	});
});
