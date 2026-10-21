import { m } from '$lib/paraglide/messages.js';

/**
 * Copy for the call-to-action variants of service and info pages.
 * 'trial' leads to the sign-up form; every other variant starts a WhatsApp chat.
 * @param {'trial' | 'intensive' | 'refresher' | 'drivingTest'} variant
 */
export function ctaCopy(variant) {
	switch (variant) {
		case 'intensive':
			return {
				button: m.cta_intensive(),
				heading: m.service_intensive_cta_heading(),
				text: m.service_intensive_cta_text(),
			};
		case 'refresher':
			return {
				button: m.cta_refresher(),
				heading: m.service_refresher_cta_heading(),
				text: m.service_refresher_cta_text(),
			};
		case 'drivingTest':
			return {
				button: m.cta_driving_test(),
				heading: m.service_driving_test_cta_heading(),
				text: m.service_driving_test_cta_text(),
			};
		default:
			return { button: m.cta_book_trial(), heading: m.info_cta_heading(), text: m.info_cta_text() };
	}
}
