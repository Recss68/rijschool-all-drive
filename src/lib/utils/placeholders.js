import { business } from '$lib/data/business.js';
import { formatEuro } from '$lib/utils/format-euro';
import { pickByLocale } from '$lib/utils/get-localized-data';
import packagesNl from '$lib/data/pricing-packages.nl.json';
import packagesEn from '$lib/data/pricing-packages.en.json';

/** The cheapest all-in package, shown as "from" price everywhere. */
export function starterPackage() {
	return pickByLocale({ nl: packagesNl, en: packagesEn }).find((pkg) => pkg.id === 'rij-start');
}

/**
 * Fills {lessonPrice}, {examPrice}, {trialPrice}, {fearExamPrice}, {bnorPrice}, {fromPrice}, {fromLessons}, {min} and {max} in content texts,
 * so prices in page copy always come from the price data.
 * @param {string} text
 */
export function fillPlaceholders(text) {
	const starter = starterPackage();
	return text
		.replaceAll('{lessonPrice}', formatEuro(business.prices.lesson))
		.replaceAll('{examPrice}', formatEuro(business.prices.exam))
		.replaceAll('{trialPrice}', formatEuro(business.prices.trialLesson))
		.replaceAll('{fearExamPrice}', formatEuro(business.prices.fearOfFailureExam))
		.replaceAll('{bnorPrice}', formatEuro(business.prices.bnor))
		.replaceAll('{fromPrice}', formatEuro(starter.price))
		.replaceAll('{fromLessons}', String(starter.lessons))
		.replaceAll('{min}', String(business.averageLessons.min))
		.replaceAll('{max}', String(business.averageLessons.max));
}
