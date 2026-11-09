// The single rates ("losse tarieven") with their labels, in the current locale.
// One source for the table, the Markdown version and the schema.
import { m } from '$lib/paraglide/messages.js';
import { business } from '$lib/data/business.js';
import { formatEuro } from './format-euro';

/** @returns {{ id: string, label: string, detail: string, price: number }[]} */
export function singleRateRows() {
	const hourly = formatEuro(business.prices.lesson);
	const labels = {
		trialLesson: [m.rate_trial(), m.rate_trial_detail()],
		lesson: [m.rate_hour(), m.rate_hour_detail()],
		singleLesson: [m.rate_lesson(), m.rate_lesson_detail({ price: hourly })],
		interimExam: [
			m.rate_interim_exam(),
			business.promoFreeInterimExam ? m.rate_interim_promo_detail() : '',
		],
		exam: [m.rate_exam(), ''],
		fearOfFailureExam: [m.rate_fear_exam(), ''],
		bnor: [m.rate_bnor(), m.rate_bnor_detail()],
	};
	return business.singleRates.map((id) => ({
		id,
		label: labels[id][0],
		detail: labels[id][1],
		price: business.prices[id],
	}));
}

/** "Label, detail" per rate id, for the schema and Markdown. */
export const singleRateNames = () =>
	Object.fromEntries(
		singleRateRows().map(({ id, label, detail }) => [id, detail ? `${label}, ${detail}` : label])
	);

/** The note under the table: free trial lesson and promo only with a package. */
export const packageOnlyNote = () =>
	business.promoFreeInterimExam
		? m.rates_package_only_text()
		: m.rates_package_only_text_no_promo();
