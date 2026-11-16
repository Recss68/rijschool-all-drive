// IndexNow: tells Bing (and through it ChatGPT search), Yandex, Seznam and Naver which pages
// changed, instead of waiting for their next crawl. Runs after every production deploy
// (.github/workflows/deploy-check.yml) and can be run by hand:
//   npm run indexnow                 -> pages with a sitemap lastmod in the last 7 days
//   npm run indexnow -- --days 3650  -> every page in the sitemap (e.g. the first time)
//   npm run indexnow -- --dry-run    -> only list what would be sent
// The key is public by design: IndexNow checks it against static/<key>.txt on the site.
// Problems are reported as a GitHub warning, never as a failed deploy check.

export const INDEXNOW_KEY = '6f74407788abc68f6609f9b5f395a322';
const SITE = process.env.SITE ?? 'https://www.rijschoolalldrive.nl';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const arg = (name) => process.argv.includes(name);
const daysArg = process.argv[process.argv.indexOf('--days') + 1];
const days = arg('--days') ? Number(daysArg) : 7;

const warn = (message) => console.log(`::warning title=IndexNow::${message}`);

/** Sitemap URLs whose lastmod falls within the last `days` days. */
export function recentUrls(xml, days, now = new Date()) {
	const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
	return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
		.filter(([, , lastmod]) => new Date(lastmod) >= since)
		.map(([, loc]) => loc);
}

async function main() {
	const sitemap = await fetch(`${SITE}/sitemap.xml`);
	if (!sitemap.ok) return warn(`could not read the sitemap (${sitemap.status})`);
	const urls = recentUrls(await sitemap.text(), days);
	console.log(`${urls.length} page(s) changed in the last ${days} day(s)`);
	for (const url of urls) console.log(`  ${url}`);
	if (!urls.length || arg('--dry-run')) return;

	const res = await fetch(ENDPOINT, {
		method: 'POST',
		headers: { 'content-type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			host: new URL(SITE).host,
			key: INDEXNOW_KEY,
			keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
			urlList: urls,
		}),
	});
	// 200 = received, 202 = received, key check still pending
	if (res.status === 200 || res.status === 202) console.log(`IndexNow accepted (${res.status})`);
	else warn(`IndexNow answered ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

// run only when started as a script (the test imports recentUrls)
if (import.meta.url === `file://${process.argv[1]}`) await main();
