// robots.txt: every search, user-triggered and training bot is explicitly welcome.
// A bot with its own group ignores the "*" group, so shared Disallow rules (none today)
// must be repeated in every group via `disallow`.

export const SEARCH_BOTS = [
	'OAI-SearchBot',
	'Claude-SearchBot',
	'PerplexityBot',
	'Bingbot',
	'Googlebot',
	'Applebot',
	'DuckAssistBot',
];
export const USER_BOTS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User', 'MistralAI-User'];
export const TRAINING_BOTS = [
	'GPTBot',
	'ClaudeBot',
	'Google-Extended',
	'Applebot-Extended',
	'Meta-ExternalAgent',
	'Amazonbot',
	'CCBot',
	'Bytespider',
	'cohere-ai',
];

/** Non-public paths, blocked for every bot. There are none at the moment. */
const disallow = [];

/** @param {string} origin e.g. https://www.rijschoolalldrive.nl */
export function buildRobots(origin) {
	const group = (agent) =>
		[`User-agent: ${agent}`, 'Allow: /', ...disallow.map((path) => `Disallow: ${path}`)].join('\n');
	return [
		'# Rijschool All Drive welcomes all AI search, user-triggered and training crawlers.',
		`# Site overview for AI agents: ${origin}/llms.txt`,
		`# Sitemap: ${origin}/sitemap.xml`,
		'',
		group('*'),
		'',
		'# AI search and citation',
		...SEARCH_BOTS.flatMap((bot) => [group(bot), '']),
		'# Fetches started by a user',
		...USER_BOTS.flatMap((bot) => [group(bot), '']),
		'# Model training (deliberately allowed)',
		...TRAINING_BOTS.flatMap((bot) => [group(bot), '']),
		`Sitemap: ${origin}/sitemap.xml`,
		'',
	].join('\n');
}
