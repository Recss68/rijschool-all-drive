// First-visit language choice. Many visitors miss the language switcher (on phones it sat
// inside the menu), so the first visit asks once: Nederlands or English. The choice is
// remembered in localStorage; switching language later also counts as a choice.
import { getLocale, setLocale } from '$lib/paraglide/runtime';

const KEY = 'alldrive-language-v1';
// Crawlers and test tools never get the question (it would hide the page content)
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|embedly/i;

export const languageChoice = $state({ open: false });

/** Opens the question on a first visit. */
export function initLanguageChoice() {
	if (navigator.webdriver || BOT.test(navigator.userAgent)) return;
	let stored = null;
	try {
		stored = localStorage.getItem(KEY);
	} catch {
		// storage blocked: ask once per page load is too much, so don't ask at all
		return;
	}
	languageChoice.open = !stored;
}

/** @param {string} locale */
export function rememberLanguage(locale) {
	try {
		localStorage.setItem(KEY, locale);
	} catch {
		// private mode: the question may come back next visit
	}
}

/**
 * Stores the choice and, when it differs from the current page, opens the same page in
 * that language.
 * @param {'nl' | 'en'} locale
 */
export function chooseLanguage(locale) {
	rememberLanguage(locale);
	languageChoice.open = false;
	if (locale !== getLocale()) setLocale(locale);
}

/** The language the browser prefers, as a suggestion: Dutch for nl-*, otherwise English. */
export const suggestedLanguage = () =>
	(navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase().startsWith('nl')
		? 'nl'
		: 'en';
