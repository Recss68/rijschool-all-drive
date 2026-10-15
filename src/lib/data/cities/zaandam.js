export const city = {
	slug: 'zaandam',
	name: 'Zaandam',
	order: 5,
	updated: '2026-10-14', // last real content change (sitemap lastmod)
	wikipedia: 'https://nl.wikipedia.org/wiki/Zaandam',
	// Map position (city centre) and where the label sits next to the marker
	coordinates: { lat: 52.442, lon: 4.8292 },
	municipality: 'Zaanstad', // CBS name, highlighted on the service-area map
	mapLabel: 'top',
	nearby: ['oostzaan', 'landsmeer', 'amsterdam'],
	cbrExamLocation: null, // TODO: verify the nearest CBR practical exam centre for licence B on cbr.nl
	nl: {
		metaTitle: 'Rijschool Zaandam | Rijles automaat & schakel | All Drive',
		metaDescription:
			'Rijles in Zaandam bij Rijschool All Drive: vaste instructeur, ophalen in Zaandam en pakketten inclusief CBR-examen. Vraag je proefles aan via WhatsApp.',
		intro:
			'Zaandam ligt aan de Zaan, met bruggen die open kunnen staan en snelwegen die je zo naar Amsterdam brengen. Bij Rijschool All Drive oefen je in de Zaanse woonwijken, over die bruggen en op de weg richting de Coentunnel.',
		areas: ['Zaandam-Oost', 'Zaandam-West', 'Poelenburg', 'Kogerveld', 'Westerwatering'],
		practice: [
			'Bruggen over de Zaan, ook als de brug open staat',
			'Woonerven en smalle straten in de oudere wijken langs de Zaan',
			'De op- en afritten van de A8 en de A7',
			'Via de Coentunnel richting Amsterdam (A10)',
		],
		faq: [
			{
				q: 'Waar halen jullie mij op in Zaandam?',
				a: 'In Zaandam-Oost, Zaandam-West, Poelenburg, Kogerveld, Westerwatering en de wijken daartussen. Je ophaaladres spreek je per les af met je instructeur.',
			},
			{
				q: 'Wat doe ik als de brug over de Zaan open staat?',
				a: 'Dat oefenen we: op tijd afremmen, achter de streep wachten en na het sluiten rustig weer optrekken. Zo weet je bij je examen precies wat je moet doen.',
			},
			{
				q: 'Oefen ik ook in Amsterdam?',
				a: 'Ja, als je daar klaar voor bent. Via de Coentunnel ben je snel in Amsterdam, waar je oefent met trams, veel fietsers en drukke kruispunten.',
			},
		],
	},
	en: {
		metaTitle: 'Driving School Zaandam | Automatic & manual | All Drive',
		metaDescription:
			'Driving lessons in Zaandam with Rijschool All Drive: dedicated instructor, pick-up in Zaandam and packages including the CBR exam. Request your trial lesson via WhatsApp.',
		intro:
			'Zaandam lies on the Zaan, with bridges that can open and motorways that take you straight to Amsterdam. With Rijschool All Drive you practise in the residential areas of Zaandam, over those bridges and on the road towards the Coentunnel.',
		areas: ['Zaandam-Oost', 'Zaandam-West', 'Poelenburg', 'Kogerveld', 'Westerwatering'],
		practice: [
			'Bridges over the Zaan, including when the bridge is open',
			'Home zones and narrow streets in the older neighbourhoods along the Zaan',
			'The slip roads of the A8 and A7',
			'Through the Coentunnel towards Amsterdam (A10)',
		],
		faq: [
			{
				q: 'Where in Zaandam do you pick me up?',
				a: 'In Zaandam-Oost, Zaandam-West, Poelenburg, Kogerveld, Westerwatering and the neighbourhoods in between. You agree your pick-up address with your instructor for each lesson.',
			},
			{
				q: 'What do I do when the bridge over the Zaan is open?',
				a: 'We practise it: braking in time, waiting behind the line and pulling away calmly once it closes. That way you know exactly what to do during your exam.',
			},
			{
				q: 'Will I also practise in Amsterdam?',
				a: 'Yes, once you are ready for it. Through the Coentunnel you are in Amsterdam quickly, where you practise with trams, many cyclists and busy junctions.',
			},
		],
	},
};
