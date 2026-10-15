import { buildLlms } from '$lib/server/llms.js';

export const GET = () =>
	new Response(buildLlms(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
