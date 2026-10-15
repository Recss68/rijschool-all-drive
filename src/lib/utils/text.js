/**
 * Turns a heading into a URL-safe anchor id, e.g. "Wat heb je nodig?" -> "wat-heb-je-nodig".
 * @param {string} text
 */
export function slugify(text) {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Rough reading time in minutes at 200 words per minute (minimum 1).
 * @param {(string | false | undefined)[]} texts
 */
export function readingMinutes(texts) {
	const words = texts.filter(Boolean).join(' ').split(/\s+/).length;
	return Math.max(1, Math.round(words / 200));
}
