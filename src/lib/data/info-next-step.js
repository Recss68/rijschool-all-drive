// Closing block for the information pages. Those pages are mostly found by people (and AI answers)
// with a question about the licence process; this block shows them the lessons that come next.
// Links use the Dutch path; ArticleBlocks localizes them.
export const infoNextStep = {
	nl: {
		heading: 'Rijles bij Rijschool All Drive',
		variant: 'callout',
		paragraphs: [
			'Bij Rijschool All Drive leer je rijden in een automaat of schakelauto, met les in het Nederlands of Engels. Een les van 60 minuten kost {lessonPrice}; pakketten inclusief CBR-praktijkexamen beginnen bij {fromPrice}.',
		],
		links: [
			{ label: 'Bekijk de prijzen en pakketten', href: '/prijzen' },
			{ label: 'Rijles in het Engels voor expats', href: '/rijles-voor-expats' },
			{ label: 'Vraag een proefles aan', href: '/proefles' },
		],
	},
	en: {
		heading: 'Driving lessons at Rijschool All Drive',
		variant: 'callout',
		paragraphs: [
			'At Rijschool All Drive you learn to drive in an automatic or manual car, with lessons in English or Dutch. A 60-minute lesson costs {lessonPrice}; packages including the CBR practical exam start at {fromPrice}.',
		],
		links: [
			{ label: 'Driving lessons in English for expats', href: '/rijles-voor-expats' },
			{ label: 'See prices and packages', href: '/prijzen' },
			{ label: 'Book a trial lesson', href: '/proefles' },
		],
	},
};
