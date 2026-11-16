import { business } from '$lib/data/business.js';

const PRIMARY_HOST = new URL(business.url).host;

/**
 * One address for search engines: on the production deployment every other host (such as the
 * rijschool-all-drive.vercel.app alias) redirects in one step to www.rijschoolalldrive.nl.
 * Preview deployments and local runs keep their own URL.
 * @param {URL} url the requested URL
 * @param {string | undefined} vercelEnv process VERCEL_ENV
 * @returns {string | null} the URL to redirect to, or null to serve the request
 */
export function canonicalHostRedirect(url, vercelEnv) {
	if (vercelEnv !== 'production' || url.host === PRIMARY_HOST) return null;
	return `https://${PRIMARY_HOST}${url.pathname}${url.search}`;
}
