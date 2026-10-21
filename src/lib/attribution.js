// Lead source: where a visitor came from (search engine, AI chat, social media, campaign
// link), so the school's form emails can show it. Only with cookie consent: before the
// choice the source is held in memory only; after "accept" it is kept in sessionStorage for
// this visit and sent along with a form the visitor submits. "Decline" deletes it.
// Without consent visitors can still say how they found us in the form itself.

const KEY = 'alldrive-lead-source';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
// Ad click ids: only their presence is kept, never the value
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid', 'ttclid'];

/** The first page of this page load, in memory until the visitor accepts cookies. */
let pending = null;
let allowed = false;

function read() {
	try {
		return JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
	} catch {
		return null;
	}
}

function persist() {
	if (!pending || read()) return;
	try {
		sessionStorage.setItem(KEY, JSON.stringify(pending));
	} catch {
		// storage blocked: the source is still sent from memory during this page load
	}
}

/** Reads where this visit came from; stored only once cookies are accepted. */
export function captureLeadSource() {
	if (pending) return;
	const url = new URL(location.href);
	let referrer = '';
	try {
		const host = document.referrer ? new URL(document.referrer).hostname : '';
		if (host && host !== location.hostname) referrer = host;
	} catch {
		// unreadable referrer: treat as direct
	}
	/** @type {Record<string, string>} */
	const source = { referrer, landing: url.pathname, at: new Date().toISOString() };
	for (const key of PARAMS) {
		const value = url.searchParams.get(key);
		if (value) source[key] = value.slice(0, 100);
	}
	const clickId = CLICK_IDS.find((key) => url.searchParams.has(key));
	if (clickId) source.click = clickId;
	pending = source;
	if (allowed) persist();
}

/**
 * Follows the cookie choice: accepted keeps the source for this visit, declined deletes it.
 * @param {boolean | null} analytics consent.analytics (null = no choice yet)
 */
export function applyLeadSourceConsent(analytics) {
	allowed = analytics === true;
	if (allowed) {
		persist();
		return;
	}
	if (analytics === false) {
		try {
			sessionStorage.removeItem(KEY);
		} catch {
			// nothing stored
		}
	}
}

/**
 * Value for the hidden `herkomst` field of a form: empty without cookie consent.
 * @param {boolean | null} analytics consent.analytics
 */
export function leadSourceField(analytics) {
	if (analytics !== true) return '';
	const source = read() ?? pending;
	return source ? JSON.stringify({ ...source, form: location.pathname }) : '';
}
