import { infoNextStep } from '../info-next-step.js';

const cbrLanguage =
	'https://www.cbr.nl/nl/veelgestelde-vragen/kan-ik-het-theorie-examen-in-een-andere-taal-doen';

export const page = {
	slug: 'theorie-examen-auto',
	order: 2,
	nl: {
		title: 'Theorie-examen auto',
		metaTitle: 'Theorie-examen auto (rijbewijs B) uitgelegd | All Drive',
		metaDescription:
			'Alles over het theorie-examen auto: uit welke onderdelen het bestaat, in welke taal je het doet, hoe lang je certificaat geldig is en hoe je je voorbereidt.',
		intro:
			'Voordat je praktijkexamen mag doen, moet je slagen voor het theorie-examen auto (rijbewijs B). Dit examen neemt het CBR af. Je kunt al rijlessen volgen terwijl je nog met je theorie bezig bent.',
		articles: [
			{
				heading: 'Wat toetst het theorie-examen?',
				paragraphs: [
					'Het examen bestaat uit drie onderdelen: gevaarherkenning, kennis en inzicht. Je moet voor alle onderdelen slagen om je theoriecertificaat te halen.',
				],
				items: [
					'Gevaarherkenning: hoe reageer je op een verkeerssituatie (remmen, gas loslaten of niets doen)?',
					'Kennis: verkeersregels, borden en voorrang.',
					'Inzicht: hoe pas je de regels toe in een concrete situatie?',
				],
			},
			{
				heading: 'Vanaf welke leeftijd en hoe lang geldig?',
				items: [
					'Je mag theorie-examen doen vanaf 16 jaar.',
					'Je theoriecertificaat is anderhalf jaar geldig. Binnen die tijd moet je slagen voor je praktijkexamen.',
				],
			},
			{
				heading: 'In welke taal doe je het examen?',
				paragraphs: [
					'Het theorie-examen auto kun je in het Nederlands of in het Engels doen, op alle theorie-examenlocaties van het CBR. Kies bij het reserveren in Mijn CBR de Engelse variant van het theorie-examen auto.',
				],
				items: [
					'Beide talen zijn er ook met 15 minuten extra tijd, bijvoorbeeld bij dyslexie.',
					'Ook in het Engelse examen kun je Nederlandse begrippen tegenkomen die niet worden vertaald.',
					'Wil je het examen in een andere taal doen? Dan doe je het met een officiële tolk van een goedgekeurde tolkendienst. Die regel en betaal je zelf, uiterlijk 2 weken voor je examen.',
					'Het praktijkexamen is in het Nederlands. Je kunt daarbij een tolk inzetten.',
				],
			},
			{
				heading: 'Zo bereid je je voor',
				variant: 'callout',
				paragraphs: [
					'Oefen met een theorieboek en oefenexamens, zodat je went aan de vraagstelling. Rijschool All Drive biedt een Theorie pakket (boek en online examentraining) en een E-theorie pakket (online leren en oefenen) aan. Je vindt ze op de prijzenpagina.',
					'Combineer je theorie met rijlessen: wat je leert, zie je dan meteen terug op de weg.',
				],
			},
			infoNextStep.nl,
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				links: [
					{ label: 'CBR: theorie-examen auto', href: 'https://www.cbr.nl' },
					{ label: 'CBR: theorie-examen in een andere taal', href: cbrLanguage },
				],
			},
		],
	},
	en: {
		title: 'Car theory exam',
		metaTitle: 'Car theory exam in English (licence B) explained | All Drive',
		metaDescription:
			'Everything about the Dutch car theory exam: its parts, taking it in English, how long your certificate is valid and how to prepare. By Rijschool All Drive.',
		intro:
			'Before you can take your practical exam, you must pass the car theory exam (licence B). The CBR runs this exam. You can already take driving lessons while you are still working on your theory.',
		articles: [
			{
				heading: 'What does the theory exam test?',
				paragraphs: [
					'The exam has three parts: hazard perception, knowledge and insight. You must pass all parts to get your theory certificate.',
				],
				items: [
					'Hazard perception: how do you react to a traffic situation (brake, release the accelerator or do nothing)?',
					'Knowledge: traffic rules, signs and right of way.',
					'Insight: how do you apply the rules in a specific situation?',
				],
			},
			{
				heading: 'Minimum age and validity',
				items: [
					'You can take the theory exam from the age of 16.',
					'Your theory certificate is valid for one and a half years. You must pass your practical exam within that time.',
				],
			},
			{
				heading: 'Can you take the theory exam in English?',
				paragraphs: [
					'Yes. You can take the car theory exam in Dutch or in English at every CBR theory exam centre. When you book in Mijn CBR, choose the English version of the car theory exam.',
				],
				items: [
					'Both languages are also available with 15 minutes of extra time, for example if you have dyslexia.',
					'Even in the English exam, you may come across Dutch terms that are not translated.',
					'Want to take the exam in another language? Then you take it with an official interpreter from an approved interpreting agency. You arrange and pay for the interpreter yourself, at least 2 weeks before your exam.',
					'The practical exam is in Dutch. You can use an interpreter for it.',
				],
			},
			{
				heading: 'How to prepare',
				variant: 'callout',
				paragraphs: [
					'Practise with a theory book and practice exams so you get used to the questions. Rijschool All Drive offers a Theory Package (book and online exam training) and an E-theory Package (online learning and practice). You can find them on the prices page.',
					'Combine your theory with driving lessons: what you learn, you then see on the road straight away.',
				],
			},
			infoNextStep.en,
			{
				heading: 'Official information',
				variant: 'sources',
				links: [
					{ label: 'CBR: car theory exam', href: 'https://www.cbr.nl/en' },
					{ label: 'CBR: theory exam in another language (in Dutch)', href: cbrLanguage },
				],
			},
		],
	},
};
