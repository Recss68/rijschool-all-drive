import { pickByLocale } from '$lib/utils/get-localized-data';
import { fillPlaceholders } from '$lib/utils/placeholders';
import faqDataNl from '$lib/data/faq-data.nl.json';
import faqDataEn from '$lib/data/faq-data.en.json';

/** The general FAQ in the current locale, with prices filled in. */
export function faqItems() {
	return pickByLocale({ nl: faqDataNl, en: faqDataEn }).map((item) => ({
		id: item.id,
		q: item.question,
		a: fillPlaceholders(item.answer),
	}));
}
