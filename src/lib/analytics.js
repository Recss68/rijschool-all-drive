// Conversion tracking with Vercel Web Analytics (cookieless, no consent banner needed).
// Custom events show up in the Vercel dashboard under Analytics → Events.
import { track } from '@vercel/analytics';
import { gtagEvent } from '$lib/gtag.js';

// GA4 event names (recommended names where they exist)
const GA_EVENTS = {
	'WhatsApp click': 'contact_whatsapp',
	'Phone click': 'contact_phone',
	'Email click': 'contact_email',
	'Signup opened': 'begin_signup',
};

/** Classifies a clicked link into a conversion event, or null. */
export function conversionFor(anchor) {
	const href = anchor.getAttribute('href') ?? '';
	if (anchor.dataset.signup !== undefined)
		return ['Signup opened', { package: anchor.dataset.packageId ?? 'none' }];
	if (href.startsWith('https://wa.me/')) return ['WhatsApp click', {}];
	if (href.startsWith('tel:')) return ['Phone click', {}];
	if (href.startsWith('mailto:')) return ['Email click', {}];
	return null;
}

/** One delegated listener for every WhatsApp, tel:, mailto: and package link on the site. */
export function trackConversions() {
	const onClick = (event) => {
		const anchor = event.target instanceof Element ? event.target.closest('a') : null;
		const conversion = anchor && conversionFor(anchor);
		if (!conversion) return;
		track(conversion[0], { ...conversion[1], page: location.pathname });
		gtagEvent(GA_EVENTS[conversion[0]], { ...conversion[1], page_path: location.pathname });
	};
	document.addEventListener('click', onClick);
	return () => document.removeEventListener('click', onClick);
}

export const trackFormSubmit = () => {
	track('Contact form submitted', { page: location.pathname });
	gtagEvent('generate_lead', { form: 'contact' });
};

/** Sign-up sent; only the choices are tracked, never personal details. */
export const trackSignup = (data) => {
	const choice = {
		package: data?.pakket ?? 'onbekend',
		transmission: data?.transmissie ?? 'onbekend',
	};
	track('Signup submitted', choice);
	gtagEvent('generate_lead', { form: 'aanmelden', ...choice });
};
