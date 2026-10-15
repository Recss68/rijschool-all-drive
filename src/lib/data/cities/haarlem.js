export const city = {
	slug: 'haarlem',
	// Temporarily not offered; set to true (or remove the line) to switch Haarlem back on
	active: false,
	name: 'Haarlem',
	order: 4,
	updated: '2026-10-14', // last real content change (sitemap lastmod)
	wikipedia: 'https://nl.wikipedia.org/wiki/Haarlem',
	// Map position (city centre) and where the label sits next to the marker
	coordinates: { lat: 52.3874, lon: 4.6462 },
	municipality: 'Haarlem', // CBS name, highlighted on the service-area map
	mapLabel: 'top',
	nearby: ['amsterdam', 'amstelveen', 'zaandam'],
	cbrExamLocation: null, // TODO: verify the nearest CBR practical exam centre for licence B on cbr.nl
	nl: {
		metaTitle: 'Rijschool Haarlem | Rijles automaat & schakel | All Drive',
		metaDescription:
			'Rijles in Haarlem bij Rijschool All Drive: vaste instructeur, ophalen in alle Haarlemse stadsdelen en pakketten inclusief CBR-examen. Vraag je proefles aan.',
		intro:
			'Haarlem heeft een historische binnenstad met smalle straten en bruggen over het Spaarne. Bij Rijschool All Drive oefen je in dat Haarlemse verkeer, van de binnenstad tot de uitvalswegen, en we halen je op in elk stadsdeel.',
		areas: ['Centrum', 'Noord', 'Oost', 'Schalkwijk', 'Zuid-West'],
		practice: [
			'Smalle straten en eenrichtingsverkeer in de historische binnenstad',
			'Bruggen over het Spaarne',
			'Veel fietsers, vooral rond het centrum en het station',
			'Rotondes en voorrangskruisingen in de woonwijken',
			'Uitvalswegen richting de A9 en de A200',
		],
		faq: [
			{
				q: 'In welke delen van Haarlem rijden jullie?',
				a: 'In alle stadsdelen: Centrum, Noord, Oost, Schalkwijk en Zuid-West. Waar je wordt opgehaald, bepaal je per les.',
			},
			{
				q: 'Waarom oefenen in de Haarlemse binnenstad?',
				a: 'De binnenstad heeft smalle straten, eenrichtingsverkeer en veel fietsers. Wie daar rustig leert rijden, voelt zich ook elders snel zeker.',
			},
			{
				q: 'Kan ik in Haarlem ook in de avond of op zaterdag rijden?',
				a: 'Ja, in overleg plannen we lessen ook in de avond en op zaterdag.',
			},
		],
	},
	en: {
		metaTitle: 'Driving School Haarlem | Automatic & manual | All Drive',
		metaDescription:
			'Driving lessons in Haarlem with Rijschool All Drive: dedicated instructor, pick-up in every Haarlem district and packages including the CBR exam. Request a trial lesson.',
		intro:
			'Haarlem has a historic centre with narrow streets and bridges over the Spaarne. With Rijschool All Drive you practise in that Haarlem traffic, from the old town to the main roads out of the city, and we pick you up in every district.',
		areas: ['Centrum', 'Noord', 'Oost', 'Schalkwijk', 'Zuid-West'],
		practice: [
			'Narrow streets and one-way traffic in the historic centre',
			'Bridges over the Spaarne',
			'Lots of cyclists, especially around the centre and the station',
			'Roundabouts and priority junctions in residential areas',
			'Main roads towards the A9 and the A200',
		],
		faq: [
			{
				q: 'Which parts of Haarlem do you cover?',
				a: 'Every district: Centrum, Noord, Oost, Schalkwijk and Zuid-West. You decide per lesson where you are picked up.',
			},
			{
				q: 'Why practise in the centre of Haarlem?',
				a: 'The old town has narrow streets, one-way traffic and many cyclists. If you learn to drive calmly there, you quickly feel confident elsewhere too.',
			},
			{
				q: 'Can I take lessons in the evening or on Saturdays in Haarlem?',
				a: 'Yes, by arrangement we also schedule lessons in the evening and on Saturdays.',
			},
		],
	},
};
