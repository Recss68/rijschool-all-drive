import { deLocalizeUrl } from '$lib/paraglide/runtime';

// Map localized URLs (/en/prices) onto the Dutch route files (/prijzen)
export const reroute = (request) => deLocalizeUrl(request.url).pathname;
