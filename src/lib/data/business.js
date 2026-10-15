// Central, verifiable business facts. Everything the site claims about pass rate,
// reviews, prices and policies comes from here, so it only has to be kept up to date
// in one place. A value of `null` means "not confirmed yet": the related UI is hidden
// instead of showing an unverifiable claim.

export const business = {
	name: 'Rijschool All Drive',
	// Primary host: every canonical, sitemap, schema and og:url uses this origin
	url: 'https://www.rijschoolalldrive.nl',
	logo: '/images/ad_long_black.png',
	kvk: '87274825',
	cbrNumber: '1186F3', // rijschoolnummer for authorisations in Mijn CBR
	email: 'info@rijschoolalldrive.nl',
	phone: '+31627824428',
	phoneDisplay: '+31 6 27824428',
	whatsappUrl: 'https://wa.me/31627824428',
	// Service-area business: no street address on the site or in schema, only the region
	area: { locality: 'Amsterdam', region: 'Noord-Holland', country: 'NL' },
	googleBusinessUrl: 'https://maps.app.goo.gl/J3xUMiU4sVrXCfJZ8',
	kvkUrl: 'https://www.kvk.nl/zoeken/?source=all&q=87274825',

	// Team: only the head instructor is named; the other instructors stay anonymous (privacy)
	team: {
		size: 3,
		headInstructor: { name: 'Sebahattin Yildiz', yearsExperience: 5 },
	},
	licenceCategories: ['B'], // manual and automatic; no motorcycle, trailer or truck
	lessonLanguages: ['nl', 'en'],
	openingHours: { days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], opens: '08:00', closes: '18:00' },

	// Date the prices were last changed; shown on /prijzen and used as dateModified in schema
	pricesUpdated: '2026-10-14',

	prices: {
		lesson: 65, // per lesson of 60 minutes
		exam: 350, // CBR practical exam
		interimExam: 250, // tussentijdse toets (TTT)
		theory: 69,
	},

	// Average number of lessons students need (may be published)
	averageLessons: { min: 20, max: 25 },

	// Pass rate as published in the CBR Rijschoolzoeker.
	// Example: { value: 85, period: '2025', firstAttempt: true, url: 'https://www.cbr.nl/...' }
	passRate: null,

	// Review score. Example: { rating: 4.9, count: 32, source: 'Google', url: 'https://g.page/...' }
	reviews: {
		rating: 5,
		count: 21,
		source: 'Google',
		url: 'https://maps.app.goo.gl/J3xUMiU4sVrXCfJZ8',
	},

	// Full profile URLs. Icons are only shown for accounts that are filled in.
	social: {
		instagram: 'https://www.instagram.com/rijschoolalldrive1',
		tiktok: 'https://www.tiktok.com/@rijschool.alldrive',
	},

	// Google Analytics 4. Only loaded after the visitor accepts analytics cookies (Consent Mode v2, basic).
	analytics: { ga4Id: 'G-5Z3YST09YC' },

	// Running promotion: free official CBR interim test (TTT) with every lesson package.
	// Set to false when the promotion ends; the hero badge and card line disappear.
	promoFreeInterimExam: true,
	promoEndDate: null, // TODO: set an ISO date (e.g. '2026-12-31') as soon as the end date is known

	trialLesson: {
		freeWithPackage: true, // the trial lesson is only free when a package is bought
		minutes: null, // e.g. 60
	},

	policies: {
		examCarIncluded: null, // true once confirmed: exam drive in the lesson car is part of the exam price
		installments: null, // true / false once confirmed
		cancelHours: null, // e.g. 24: lessons cancelled later than this are charged
		packageValidityMonths: null, // e.g. 12: unused lessons expire after this period
		unusedLessonsRefund: null, // true / false: are unused package lessons refunded?
	},
};
