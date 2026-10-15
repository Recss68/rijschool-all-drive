import { business } from '$lib/data/business.js';
import { buildRobots } from '$lib/seo/robots.js';

export const GET = () =>
	new Response(buildRobots(business.url), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	});
