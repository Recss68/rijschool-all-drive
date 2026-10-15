const sourcesNl = [
	{ label: 'Rijksoverheid: rijbewijs', href: 'https://www.rijksoverheid.nl/onderwerpen/rijbewijs' },
	{ label: 'Gemeente Amsterdam', href: 'https://www.amsterdam.nl' },
];
const sourcesEn = [
	{
		label: 'Government of the Netherlands: driving licence',
		href: 'https://www.government.nl/topics/driving-licence',
	},
	{ label: 'City of Amsterdam', href: 'https://www.amsterdam.nl/en/' },
];

export const page = {
	slug: 'rijbewijs-aanvragen',
	order: 1,
	nl: {
		title: 'Rijbewijs aanvragen',
		metaTitle: 'Rijbewijs aanvragen na het slagen | Rijschool All Drive',
		metaDescription:
			'Geslaagd voor je praktijkexamen? Lees hoe je je rijbewijs aanvraagt bij de gemeente, wat je meeneemt en waar je op let. Uitleg van Rijschool All Drive.',
		intro:
			'Geslaagd voor je praktijkexamen? Dan vraag je je rijbewijs aan bij de gemeente waar je staat ingeschreven. Je slaagt dus niet met een pasje in je hand: het rijbewijs zelf haal je later op.',
		articles: [
			{
				heading: 'Wanneer vraag je je rijbewijs aan?',
				paragraphs: [
					'Na het slagen geeft het CBR je resultaat door aan de RDW. Daarna kun je je rijbewijs aanvragen bij je gemeente. Wacht er niet te lang mee: je moet je rijbewijs binnen anderhalf jaar na het slagen aanvragen.',
				],
			},
			{
				heading: 'Wat neem je mee?',
				items: [
					'Een geldig identiteitsbewijs.',
					'Een recente pasfoto die aan de eisen voldoet. Sommige gemeenten maken de foto zelf of werken met een digitale foto; kijk vooraf op de website van je gemeente.',
					'Het bedrag voor de aanvraag. De kosten bepaalt de gemeente.',
				],
			},
			{
				heading: 'Hoe gaat de aanvraag?',
				variant: 'steps',
				items: [
					'Maak een afspraak bij je gemeente, als dat nodig is.',
					'Vraag je rijbewijs aan aan de balie.',
					'De gemeente vertelt je wanneer je je rijbewijs kunt ophalen. Ophalen doe je zelf, met je identiteitsbewijs.',
				],
			},
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				paragraphs: [
					'Regels en kosten kunnen veranderen. Controleer de actuele informatie bij de overheid en je gemeente.',
				],
				links: sourcesNl,
			},
		],
	},
	en: {
		title: 'Applying for your driving licence',
		metaTitle: 'Applying for your driving licence after passing | All Drive',
		metaDescription:
			'Passed your practical exam? Read how to apply for your driving licence at your municipality, what to bring and what to look out for. Explained by Rijschool All Drive.',
		intro:
			'Passed your practical exam? Then you apply for your driving licence at the municipality where you are registered. You do not leave the exam with a card in your hand: you collect the licence itself later.',
		articles: [
			{
				heading: 'When do you apply?',
				paragraphs: [
					'After you pass, the CBR sends your result to the RDW. You can then apply for your licence at your municipality. Do not wait too long: you must apply within one and a half years of passing.',
				],
			},
			{
				heading: 'What do you bring?',
				items: [
					'A valid ID.',
					'A recent passport photo that meets the requirements. Some municipalities take the photo themselves or use a digital photo; check your municipality’s website first.',
					'The application fee. The municipality sets the costs.',
				],
			},
			{
				heading: 'How does the application work?',
				variant: 'steps',
				items: [
					'Make an appointment at your municipality, if required.',
					'Apply for your licence at the desk.',
					'The municipality tells you when you can collect your licence. You collect it yourself, with your ID.',
				],
			},
			{
				heading: 'Official information',
				variant: 'sources',
				paragraphs: [
					'Rules and costs may change. Check the current information with the government and your municipality.',
				],
				links: sourcesEn,
			},
		],
	},
};
