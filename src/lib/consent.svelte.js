// The visitor's cookie choice, stored in localStorage. `null` = not chosen yet (show the banner).
import { loadGtag, revokeGtag, gtagPageView } from '$lib/gtag.js';

const KEY = 'alldrive-consent-v1';

export const consent = $state({ analytics: null, open: false });

/** Reads the stored choice and loads analytics when it was accepted. */
export function initConsent() {
	let stored = null;
	try {
		stored = JSON.parse(localStorage.getItem(KEY) ?? 'null');
	} catch {
		stored = null;
	}
	consent.analytics = stored?.analytics ?? null;
	consent.open = consent.analytics === null;
	if (consent.analytics) {
		loadGtag();
		gtagPageView();
	}
}

/** @param {boolean} analytics */
export function setConsent(analytics) {
	consent.analytics = analytics;
	consent.open = false;
	try {
		localStorage.setItem(KEY, JSON.stringify({ analytics, date: Date.now() }));
	} catch {
		// private mode: the choice holds for this visit only
	}
	if (analytics) {
		loadGtag();
		gtagPageView();
	} else {
		revokeGtag();
		// remove GA cookies set earlier on this domain
		for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
			if (name.startsWith('_ga')) {
				document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`;
				document.cookie = `${name}=; Max-Age=0; path=/`;
			}
		}
	}
}

export const openConsentSettings = () => (consent.open = true);
