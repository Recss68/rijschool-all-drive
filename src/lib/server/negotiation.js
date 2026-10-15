/**
 * True when the client prefers Markdown over HTML, e.g. `Accept: text/markdown`
 * or `text/markdown, text/html;q=0.8`. Browsers (text/html first) get HTML.
 * @param {string | null} accept
 */
export function wantsMarkdown(accept) {
	if (!accept) return false;
	const types = accept.split(',').map((part) => {
		const [type, ...params] = part.trim().split(';');
		const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
		return { type: type.trim().toLowerCase(), q: q ? Number(q.slice(2)) : 1 };
	});
	const md = types.find((t) => t.type === 'text/markdown');
	if (!md || md.q === 0) return false;
	const html = types.find((t) => t.type === 'text/html');
	return !html || md.q >= html.q;
}

/** Permanent redirects for well-known paths that agents and scanners try. */
export const redirects = {
	'/about': '/over-ons',
	'/en/about': '/en/about-us',
};
