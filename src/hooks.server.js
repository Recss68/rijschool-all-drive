import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getTextDirection, deLocalizeUrl, localizeHref } from '$lib/paraglide/runtime';
import { renderMarkdown, notFoundMarkdown } from '$lib/server/markdown.js';
import { wantsMarkdown, redirects } from '$lib/server/negotiation.js';

/** 301s: well-known aliases (/about) and English pages opened with a Dutch slug (/en/prijzen). */
const redirectHandle = ({ event, resolve }) => {
	const { pathname, search } = event.url;
	if (redirects[pathname]) redirect(301, redirects[pathname] + search);

	if (pathname.startsWith('/en/')) {
		const base = deLocalizeUrl(event.url).pathname;
		const canonical = localizeHref(base, { locale: 'en' });
		if (canonical !== pathname && renderableLater(base)) redirect(301, canonical + search);
	}
	return resolve(event);
};

// Only redirect to pages that exist; unknown /en/... paths fall through to a 404
const renderableLater = (base) => base !== '/' && !/\.[a-z0-9]+$/i.test(base);

/** Locale from the URL, Markdown content negotiation and Vary: Accept. */
const i18nHandle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, async ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		const isPageRequest =
			(event.request.method === 'GET' || event.request.method === 'HEAD') &&
			!/\.[a-z0-9]+$/i.test(event.url.pathname);

		if (isPageRequest && wantsMarkdown(event.request.headers.get('accept'))) {
			const base = deLocalizeUrl(event.url).pathname;
			const markdown = renderMarkdown(base);
			return new Response(markdown ?? notFoundMarkdown(), {
				status: markdown ? 200 : 404,
				headers: {
					'content-type': 'text/markdown; charset=utf-8',
					vary: 'Accept',
					'cache-control': 'public, max-age=0, must-revalidate',
				},
			});
		}

		const response = await resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%lang%', locale).replace('%dir%', getTextDirection(locale)),
		});
		if (isPageRequest) response.headers.append('vary', 'Accept');
		return response;
	});

export const handle = sequence(redirectHandle, i18nHandle);
