import { buildSitemap } from '$lib/seo/sitemap.js';
import { sitemapEntries } from '$lib/seo/pages.js';

export const GET = () =>
	new Response(buildSitemap(sitemapEntries()), {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
