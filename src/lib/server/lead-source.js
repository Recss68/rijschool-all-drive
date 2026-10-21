// Turns the hidden `herkomst` form field (see $lib/attribution.js) into a readable lead
// source for the school's emails, next to what the visitor chose under "How did you find
// us?". The hidden field is only filled with cookie consent. The field comes from the browser, so it is treated as
// untrusted: size-limited, only known keys, short strings (and escaped in the email).

import { foundViaLabel } from '$lib/data/found-via.js';

const KEYS = [
	'referrer',
	'landing',
	'form',
	'at',
	'click',
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
];

/** @param {unknown} raw */
export function parseLeadSource(raw) {
	if (typeof raw !== 'string' || !raw || raw.length > 2000) return {};
	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		return {};
	}
	if (!data || typeof data !== 'object') return {};
	/** @type {Record<string, string>} */
	const clean = {};
	for (const key of KEYS) {
		if (typeof data[key] === 'string' && data[key].trim())
			clean[key] = data[key].trim().slice(0, 120);
	}
	return clean;
}

// Hosts are matched on their end ("l.instagram.com" matches "instagram.com").
// AI chats come before search engines: gemini.google.com must not count as Google search.
const AI_CHATS = [
	['chatgpt.com', 'ChatGPT'],
	['chat.openai.com', 'ChatGPT'],
	['openai.com', 'ChatGPT'],
	['perplexity.ai', 'Perplexity'],
	['gemini.google.com', 'Gemini'],
	['bard.google.com', 'Gemini'],
	['copilot.microsoft.com', 'Copilot'],
	['claude.ai', 'Claude'],
	['you.com', 'You.com'],
	['meta.ai', 'Meta AI'],
	['deepseek.com', 'DeepSeek'],
	['mistral.ai', 'Mistral'],
	['grok.com', 'Grok'],
];
const SOCIAL = [
	['instagram.com', 'Instagram'],
	['tiktok.com', 'TikTok'],
	['facebook.com', 'Facebook'],
	['fb.com', 'Facebook'],
	['youtube.com', 'YouTube'],
	['linkedin.com', 'LinkedIn'],
	['lnkd.in', 'LinkedIn'],
	['snapchat.com', 'Snapchat'],
	['x.com', 'X (Twitter)'],
	['twitter.com', 'X (Twitter)'],
	['t.co', 'X (Twitter)'],
	['pinterest.com', 'Pinterest'],
	['reddit.com', 'Reddit'],
	['whatsapp.com', 'WhatsApp'],
	['wa.me', 'WhatsApp'],
];
const SEARCH = [
	['google.', 'Google'],
	['bing.com', 'Bing'],
	['duckduckgo.com', 'DuckDuckGo'],
	['yahoo.com', 'Yahoo'],
	['ecosia.org', 'Ecosia'],
	['startpage.com', 'Startpage'],
	['brave.com', 'Brave Search'],
];

const matches = (host, pattern) =>
	pattern.endsWith('.')
		? host.split('.').some((_, i, parts) => parts.slice(i).join('.').startsWith(pattern))
		: host === pattern || host.endsWith(`.${pattern}`);
const lookup = (host, list) => list.find(([pattern]) => matches(host, pattern))?.[1];

/** A utm_source value (a domain or a plain name like "instagram") to a known name. */
function namedSource(value) {
	const v = value.toLowerCase();
	const host = v.replace(/^https?:\/\//, '').split('/')[0];
	const ai = lookup(host, AI_CHATS) ?? AI_CHATS.find(([, name]) => name.toLowerCase() === v)?.[1];
	if (ai) return { kind: 'ai', name: ai };
	const social =
		lookup(host, SOCIAL) ??
		SOCIAL.find(([, name]) => name.toLowerCase().startsWith(v))?.[1] ??
		(v === 'ig' ? 'Instagram' : v === 'fb' ? 'Facebook' : undefined);
	if (social) return { kind: 'social', name: social };
	const search = lookup(host, SEARCH) ?? SEARCH.find(([, name]) => name.toLowerCase() === v)?.[1];
	if (search) return { kind: 'search', name: search };
	return { kind: 'other', name: value };
}

const PAID = /^(cpc|ppc|paid|paidsocial|paid_social|paid-social|ads?|display|cpm)$/i;
const CLICK_NAMES = {
	gclid: 'Google Ads',
	gbraid: 'Google Ads',
	wbraid: 'Google Ads',
	msclkid: 'Microsoft Ads',
	ttclid: 'TikTok-advertentie',
};

/**
 * Readable channel for a parsed lead source, most reliable signal first:
 * ad click id, then campaign tags (utm), then the referring site.
 * @param {Record<string, string>} source
 */
export function leadChannel(source) {
	// nothing was tracked: the visitor did not accept cookies (or blocks storage)
	if (!source.landing) return NOT_TRACKED;
	if (source.click && CLICK_NAMES[source.click]) return CLICK_NAMES[source.click];

	if (source.utm_source) {
		const { kind, name } = namedSource(source.utm_source);
		const medium = source.utm_medium ?? '';
		if (kind === 'ai') return `AI-chat (${name})`;
		if (PAID.test(medium)) return `${name}-advertentie`;
		if (source.utm_campaign?.toLowerCase().includes('bedrijfsprofiel'))
			return `${name} Bedrijfsprofiel`;
		if (kind === 'search') return `${name} (organisch)`;
		return name;
	}

	// Facebook and Instagram add fbclid to every outgoing link, paid or not
	if (source.click === 'fbclid') return 'Facebook / Instagram';

	const host = (source.referrer ?? '').toLowerCase();
	if (!host) return 'Direct / onbekend';
	const ai = lookup(host, AI_CHATS);
	if (ai) return `AI-chat (${ai})`;
	const social = lookup(host, SOCIAL);
	if (social) return social;
	const search = lookup(host, SEARCH);
	if (search) return `${search} (organisch)`;
	return `Verwijzing via ${host}`;
}

export const NOT_TRACKED = 'Niet bijgehouden (geen cookietoestemming)';

/**
 * Short source for the email subject: the tracked channel, else the visitor's own answer.
 * @param {Record<string, string>} source parsed lead source
 * @param {string} [foundVia] value of the "How did you find us?" field
 */
export function leadSummary(source, foundVia = '') {
	if (source.landing) return leadChannel(source);
	const answer = foundViaLabel(foundVia);
	return answer ? `${answer} (zelf opgegeven)` : 'onbekende bron';
}

const amsterdamTime = (iso) => {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	return new Intl.DateTimeFormat('nl-NL', {
		timeZone: 'Europe/Amsterdam',
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(date);
};

/**
 * Rows for the "Herkomst" section of the school's emails (values not yet escaped).
 * @param {Record<string, string>} source parsed lead source
 * @param {string} [foundVia] value of the "How did you find us?" field
 * @returns {[string, string][]}
 */
export function leadSourceRows(source, foundVia = '') {
	const campaign = [source.utm_campaign, source.utm_medium, source.utm_content]
		.filter(Boolean)
		.join(' · ');
	return /** @type {[string, string][]} */ (
		[
			['Zelf opgegeven', foundViaLabel(foundVia) || 'Niet ingevuld'],
			['Bron (automatisch)', leadChannel(source)],
			['Campagne', campaign],
			['Verwijzende site', source.referrer ?? ''],
			['Eerste pagina', source.landing ?? ''],
			['Formulier ingevuld op', source.form ?? ''],
			['Eerste bezoek', source.at ? amsterdamTime(source.at) : ''],
		].filter(([, value]) => value)
	);
}
