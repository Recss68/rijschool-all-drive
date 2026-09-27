// Central, verifiable business facts. Everything the site claims about pass rate,
// reviews, prices and policies comes from here, so it only has to be kept up to date
// in one place. A value of `null` means "not confirmed yet": the related UI is hidden
// instead of showing an unverifiable claim.

export const business = {
	name: 'Rijschool All Drive',
	kvk: '87274825',
	email: 'info@rijschoolalldrive.nl',
	phone: '+31627824428',
	phoneDisplay: '+31 6 27824428',
	whatsappUrl: 'https://wa.me/31627824428',
	// Visiting/postal address as registered with the KvK, e.g. 'Straat 1, 1000 AA Amsterdam'
	address: 'P. Lieftinckstraat 33, 1067 VW Amsterdam',

	prices: {
		lesson: 65, // per lesson of 60 minutes
		exam: 350, // CBR practical exam
		interimExam: 250, // tussentijdse toets (TTT)
		theory: 69,
	},

	// Pass rate as published in the CBR Rijschoolzoeker.
	// Example: { value: 85, period: '2025', firstAttempt: true, url: 'https://www.cbr.nl/...' }
	passRate: null,

	// Review score. Example: { rating: 4.9, count: 32, source: 'Google', url: 'https://g.page/...' }
	reviews: {
		rating: 5,
		count: 21,
		source: 'Google',
		url: 'https://www.google.com/maps/search/?api=1&query=Rijschool+All+Drive+P.+Lieftinckstraat+33+Amsterdam',
	},

	// Full profile URLs. Icons are only shown for accounts that are filled in.
	social: {
		instagram: null,
		tiktok: null,
	},

	// Running promotion: free official CBR interim test (TTT) with every lesson package.
	// Set to false when the promotion ends; the hero badge and card line disappear.
	promoFreeInterimExam: true,

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
