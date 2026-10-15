import { business } from '../business.js';

export const page = {
	slug: 'rijschool-machtigen',
	order: 4,
	nl: {
		title: 'Rijschool machtigen',
		metaTitle: 'Rijschool machtigen in Mijn CBR: zo werkt het | All Drive',
		metaDescription: `Machtig Rijschool All Drive in Mijn CBR met rijschoolnummer ${business.cbrNumber}, zodat we je praktijkexamen kunnen reserveren. Zo werkt het, stap voor stap.`,
		intro:
			'Wij kunnen je praktijkexamen of tussentijdse toets pas bij het CBR reserveren als je ons daarvoor machtigt. Dat regel je zelf in Mijn CBR, in een paar minuten.',
		articles: [
			{
				heading: 'Waarom machtigen?',
				paragraphs: [
					'Met een machtiging geef je Rijschool All Drive toestemming om namens jou examens bij het CBR aan te vragen. Zonder machtiging kunnen we geen examen voor je reserveren.',
				],
			},
			{
				heading: 'Zo machtig je Rijschool All Drive',
				variant: 'steps',
				items: [
					'Log in bij Mijn CBR met DigiD.',
					'Kies voor machtigen.',
					`Vul het rijschoolnummer van Rijschool All Drive in: ${business.cbrNumber}.`,
					'Bevestig de machtiging.',
				],
			},
			{
				heading: 'Vergeet je Gezondheidsverklaring niet',
				variant: 'callout',
				paragraphs: [
					'Voor je eerste rijbewijs vul je ook een Gezondheidsverklaring (Eigen verklaring) in via Mijn CBR. Het CBR moet die hebben goedgekeurd voordat je praktijkexamen kunt doen. Doe dit daarom ruim op tijd.',
				],
			},
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				links: [{ label: 'CBR: Mijn CBR', href: 'https://www.cbr.nl' }],
			},
		],
	},
	en: {
		title: 'Authorising your driving school',
		metaTitle: 'Authorising your driving school in Mijn CBR | All Drive',
		metaDescription: `Authorise Rijschool All Drive in Mijn CBR with driving school number ${business.cbrNumber}, so we can book your practical exam. Here is how, step by step.`,
		intro:
			'We can only book your practical exam or interim test with the CBR once you authorise us. You arrange this yourself in Mijn CBR, in a few minutes.',
		articles: [
			{
				heading: 'Why authorise?',
				paragraphs: [
					'With an authorisation you allow Rijschool All Drive to book exams with the CBR on your behalf. Without it, we cannot book an exam for you.',
				],
			},
			{
				heading: 'How to authorise Rijschool All Drive',
				variant: 'steps',
				items: [
					'Log in to Mijn CBR with DigiD.',
					'Choose the option to authorise a driving school.',
					`Enter the driving school number of Rijschool All Drive: ${business.cbrNumber}.`,
					'Confirm the authorisation.',
				],
			},
			{
				heading: 'Do not forget your health declaration',
				variant: 'callout',
				paragraphs: [
					'For your first licence you also fill in a health declaration (Gezondheidsverklaring / Eigen verklaring) in Mijn CBR. The CBR must have approved it before you can take your practical exam, so do this in good time.',
				],
			},
			{
				heading: 'Official information',
				variant: 'sources',
				links: [{ label: 'CBR: Mijn CBR', href: 'https://www.cbr.nl/en' }],
			},
		],
	},
};
