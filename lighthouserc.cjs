// Lighthouse CI: every page template must score 90+ on all four categories on mobile
// (the default Lighthouse emulation), as the median of three runs against the production build.
// Locally the port can be moved with TEST_PORT, like the integration tests.
const port = process.env.TEST_PORT || 4173;
const base = `http://localhost:${port}`;

const minScore = (score) => ['error', { minScore: score, aggregationMethod: 'median-run' }];
const allCategories = {
	'categories:performance': minScore(0.9),
	'categories:accessibility': minScore(0.9),
	'categories:best-practices': minScore(0.9),
	'categories:seo': minScore(0.9),
};

module.exports = {
	ci: {
		collect: {
			startServerCommand: `npm run preview -- --port ${port} --strictPort`,
			startServerReadyPattern: 'Local',
			// one page per template: home, prices, city, service, info, sign-up form
			url: [
				`${base}/`,
				`${base}/en/prices`,
				`${base}/rijschool-amsterdam`,
				`${base}/opfriscursus`,
				`${base}/theorie-examen-auto`,
				`${base}/aanmelden`,
			],
			numberOfRuns: 3,
			settings: { chromeFlags: '--no-sandbox' },
		},
		assert: {
			assertMatrix: [
				{ matchingUrlPattern: '^(?!.*/aanmelden).*$', assertions: allCategories },
				{
					// the sign-up form is noindex on purpose, so its SEO score is left out
					matchingUrlPattern: '/aanmelden',
					assertions: { ...allCategories, 'categories:seo': 'off' },
				},
			],
		},
		upload: { target: 'filesystem', outputDir: '.lighthouseci' },
	},
};
