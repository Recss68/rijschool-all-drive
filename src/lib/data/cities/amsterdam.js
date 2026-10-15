// Amsterdam is covered by the home page ("rijschool Amsterdam"). This page goes deeper
// per district, so it targets "rijles [stadsdeel]" instead of competing with the home page.
export const city = {
	slug: 'amsterdam',
	name: 'Amsterdam',
	order: 1,
	updated: '2026-10-14', // last real content change (sitemap lastmod)
	wikipedia: 'https://nl.wikipedia.org/wiki/Amsterdam',
	// Map position (city centre) and where the label sits next to the marker
	coordinates: { lat: 52.3676, lon: 4.9041 },
	municipality: 'Amsterdam', // CBS name, highlighted on the service-area map
	mapLabel: 'top',
	nearby: ['amstelveen', 'diemen', 'zaandam'],
	cbrExamLocation: null, // TODO: verify on cbr.nl which centre takes practical exams for licence B
	nl: {
		h1: 'Rijles in alle stadsdelen van Amsterdam',
		metaTitle: 'Rijles Amsterdam per stadsdeel | Rijschool All Drive',
		metaDescription:
			'Rijles in Amsterdam Centrum, Noord, Oost, Zuid, West, Nieuw-West en Zuidoost. Ophalen in je eigen stadsdeel, schakel of automaat. Vraag je proefles aan.',
		intro:
			'Rijschool All Drive haalt je op in elk Amsterdams stadsdeel. Elk stadsdeel heeft zijn eigen verkeer: van de smalle grachtenstraten in Centrum tot de brede wegen in Zuidoost. Hieronder lees je per stadsdeel waar je op oefent.',
		areas: ['Centrum', 'Noord', 'Oost', 'Zuid', 'West', 'Nieuw-West', 'Zuidoost'],
		districts: [
			{
				name: 'Centrum',
				text: 'Smalle straten en bruggen langs de grachten, veel voetgangers en fietsers en trams die voorrang hebben. Je oefent hier vooral overzicht houden, rustig rijden en voorrang verlenen.',
			},
			{
				name: 'Noord',
				text: 'Rustigere woonwijken en bredere wegen, ideaal om mee te beginnen. Via de IJtunnel of de Coentunnel en de ring A10 oefen je daarna ook in- en uitvoegen.',
			},
			{
				name: 'Oost',
				text: 'Drukke invalswegen met trams, de woonwijken van de Watergraafsmeer en IJburg, en de ring A10 Oost.',
			},
			{
				name: 'Zuid',
				text: 'Het drukke verkeer rond de Zuidas en de ring A10 Zuid, en de woonstraten in de Pijp en de Rivierenbuurt met veel fietsers.',
			},
			{
				name: 'West',
				text: 'Stadsstraten met trams en fietsers in Oud-West en Bos en Lommer, en de ring A10 West.',
			},
			{
				name: 'Nieuw-West',
				text: 'Brede lanen en grote kruispunten met verkeerslichten in Slotervaart, Osdorp en Geuzenveld, met de A10 en de A4 dichtbij.',
			},
			{
				name: 'Zuidoost',
				text: 'Brede wegen en grote kruispunten, met de A2 en de A9 vlakbij. Rond evenementen bij de Johan Cruijff ArenA is het extra druk.',
			},
		],
		practice: [
			'Trams en trambanen: voorrang, invoegen en oversteken',
			'Veel fietsers en scooters, ook op kruispunten en rotondes',
			'Smalle straten en bruggen langs de grachten',
			'Drukke kruispunten met verkeerslichten en voorsorteervakken',
			'Invoegen en rijden op de ring A10',
			'Parkeren in de stad, zoals fileparkeren',
		],
		faq: [
			{
				q: 'In welke stadsdelen van Amsterdam halen jullie mij op?',
				a: 'In alle stadsdelen: Centrum, Noord, Oost, Zuid, West, Nieuw-West en Zuidoost. We spreken per les af waar je wordt opgehaald en teruggebracht.',
			},
			{
				q: 'Rijd ik alleen in mijn eigen stadsdeel?',
				a: 'Nee. Je begint vaak in je eigen buurt, maar je oefent ook in andere delen van de stad en op de ring A10, zodat je op alle situaties voorbereid bent.',
			},
			{
				q: 'Is rijles in Amsterdam moeilijker dan in een kleinere plaats?',
				a: 'Het verkeer is drukker, met trams, veel fietsers en smalle straten. Daarom oefen je die situaties vanaf het begin, stap voor stap en in jouw tempo.',
			},
		],
	},
	en: {
		h1: 'Driving lessons in every Amsterdam district',
		metaTitle: 'Driving lessons in every Amsterdam district | All Drive',
		metaDescription:
			'Driving lessons in Amsterdam Centrum, Noord, Oost, Zuid, West, Nieuw-West and Zuidoost. Pick-up in your district, manual or automatic. Request a trial lesson.',
		intro:
			'Rijschool All Drive picks you up in every Amsterdam district. Each district has its own traffic: from the narrow canal streets of Centrum to the wide roads of Zuidoost. Below you can read what you practise in each district.',
		areas: ['Centrum', 'Noord', 'Oost', 'Zuid', 'West', 'Nieuw-West', 'Zuidoost'],
		districts: [
			{
				name: 'Centrum',
				text: 'Narrow streets and bridges along the canals, lots of pedestrians and cyclists, and trams with right of way. Here you mainly practise keeping an overview, driving calmly and giving way.',
			},
			{
				name: 'Noord',
				text: 'Quieter residential areas and wider roads, ideal to start with. Through the IJtunnel or the Coentunnel and the A10 ring road you then also practise merging.',
			},
			{
				name: 'Oost',
				text: 'Busy access roads with trams, the residential areas of Watergraafsmeer and IJburg, and the A10 East ring road.',
			},
			{
				name: 'Zuid',
				text: 'Busy traffic around the Zuidas and the A10 South ring road, and the residential streets of De Pijp and the Rivierenbuurt with many cyclists.',
			},
			{
				name: 'West',
				text: 'City streets with trams and cyclists in Oud-West and Bos en Lommer, and the A10 West ring road.',
			},
			{
				name: 'Nieuw-West',
				text: 'Wide avenues and large junctions with traffic lights in Slotervaart, Osdorp and Geuzenveld, with the A10 and A4 close by.',
			},
			{
				name: 'Zuidoost',
				text: 'Wide roads and large junctions, with the A2 and A9 nearby. Around events at the Johan Cruijff ArenA it gets extra busy.',
			},
		],
		practice: [
			'Trams and tram tracks: right of way, merging and crossing',
			'Lots of cyclists and scooters, also at junctions and roundabouts',
			'Narrow streets and bridges along the canals',
			'Busy junctions with traffic lights and turning lanes',
			'Merging onto and driving on the A10 ring road',
			'Parking in the city, such as parallel parking',
		],
		faq: [
			{
				q: 'Which Amsterdam districts do you pick me up in?',
				a: 'All districts: Centrum, Noord, Oost, Zuid, West, Nieuw-West and Zuidoost. We agree per lesson where you are picked up and dropped off.',
			},
			{
				q: 'Do I only drive in my own district?',
				a: 'No. You often start in your own neighbourhood, but you also practise in other parts of the city and on the A10 ring road, so you are prepared for every situation.',
			},
			{
				q: 'Is learning to drive in Amsterdam harder than in a smaller town?',
				a: 'Traffic is busier, with trams, many cyclists and narrow streets. That is why you practise these situations from the start, step by step and at your own pace.',
			},
		],
	},
};
