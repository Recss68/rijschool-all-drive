// sitemaps.org XML with hreflang alternates (nl, en, x-default) for every page pair.

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @param {{ nl: string, en: string, updated: string }[]} pages absolute URLs per locale
 */
export function buildSitemap(pages) {
	const alternates = (page) =>
		[
			['nl', page.nl],
			['en', page.en],
			['x-default', page.nl],
		]
			.map(
				([lang, href]) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(href)}"/>`
			)
			.join('\n');

	const urls = pages.flatMap((page) =>
		[page.nl, page.en].map(
			(loc) =>
				`\t<url>\n\t\t<loc>${escape(loc)}</loc>\n\t\t<lastmod>${page.updated}</lastmod>\n${alternates(page)}\n\t</url>`
		)
	);

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		'</urlset>',
		'',
	].join('\n');
}
