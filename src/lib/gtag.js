// Google Analytics 4 with Consent Mode v2 (basic): gtag.js is only loaded after the visitor
// accepts analytics cookies. Until then nothing is sent to Google.
import { business } from '$lib/data/business.js';

let loaded = false;

function gtag() {
	window.dataLayer.push(arguments);
}

/** Loads gtag.js once, with analytics granted and ads denied (no ad tags on the site). */
export function loadGtag() {
	if (loaded || typeof window === 'undefined') return;
	loaded = true;
	window.dataLayer = window.dataLayer || [];
	window.gtag = gtag;
	gtag('consent', 'default', {
		analytics_storage: 'granted',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
	});
	gtag('js', new Date());
	// Page views are sent manually, so SvelteKit's client-side navigation is counted too
	gtag('config', business.analytics.ga4Id, { send_page_view: false, anonymize_ip: true });

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${business.analytics.ga4Id}`;
	document.head.appendChild(script);
}

/** Revoke: tell gtag to stop using cookies for the rest of this page view. */
export function revokeGtag() {
	if (!loaded) return;
	gtag('consent', 'update', { analytics_storage: 'denied' });
}

export function gtagPageView() {
	if (!loaded) return;
	gtag('event', 'page_view', {
		page_location: location.href,
		page_path: location.pathname + location.search,
		page_title: document.title,
	});
}

/** Sends an event if analytics is loaded (i.e. the visitor consented). */
export function gtagEvent(name, params = {}) {
	if (loaded) gtag('event', name, params);
}
