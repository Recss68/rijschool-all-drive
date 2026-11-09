// Driving lessons for expats. Licence and exam facts checked 09-11-2026 on rdw.nl, cbr.nl,
// rijksoverheid.nl and government.nl, without fees. Keep to what these sources say:
// - the CBR practical exam is in Dutch (with an interpreter if needed), NOT in English;
// - the 185 days count from settling in the Netherlands, not from BRP registration.
const rdwDriving =
	'https://www.rdw.nl/en/driving-licence/foreign-driving-licence/driving-with-a-foreign-driving-licence';
const rdwExchange =
	'https://www.rdw.nl/en/driving-licence/foreign-driving-licence/exchanging-a-foreign-driving-licence';
const cbrTheoryEnglish =
	'https://www.cbr.nl/nl/veelgestelde-vragen/kan-ik-het-theorie-examen-in-een-andere-taal-doen';
const cbrInterpreter =
	'https://www.cbr.nl/nl/veelgestelde-vragen/mag-ik-een-tolk-meenemen-naar-mijn-praktijkexamen';
const cbrHealth = 'https://www.cbr.nl/nl/rijden-en-uw-gezondheid/buitenlands-rijbewijs-omwisselen';
const expatLetter =
	'https://www.rijksoverheid.nl/documenten/kamerstukken/2025/12/15/motie-over-omwisseling-van-rijbewijzen-van-expats';

export const service = {
	slug: 'rijles-voor-expats',
	order: 8,
	serviceType: 'Rijlessen in het Engels voor expats',
	showPrice: true,
	cta: 'trial',
	nl: {
		cardTitle: 'Rijles voor expats',
		summary:
			'Rijles in het Engels en hulp bij je buitenlandse rijbewijs: omwisselen of opnieuw halen.',
		title: 'Rijles voor expats in Amsterdam',
		linkTitle: 'Rijles voor expats',
		metaTitle: 'Rijles voor expats in het Engels | Amsterdam | All Drive',
		metaDescription:
			'Expat in Amsterdam? Rijles in het Engels bij Rijschool All Drive, en uitleg over je buitenlandse rijbewijs: 185 dagen, omwisselen, expatregeling en het CBR-examen.',
		answer:
			'Ben je expat in Amsterdam of omgeving? Bij Rijschool All Drive krijg je rijles in het Engels, met een vaste instructeur, in een schakel- of automaatauto. Een les van 60 minuten kost {lessonPrice}; pakketten inclusief CBR-praktijkexamen beginnen bij {fromPrice} voor {fromLessons} lessen. Kun je je buitenlandse rijbewijs niet omwisselen, dan bereiden we je voor op het theorie- en praktijkexamen van het CBR.',
		articles: [
			{
				heading: 'Rijden met een buitenlands rijbewijs',
				paragraphs: [
					'Heb je een rijbewijs van buiten de EU/EER, dan mag je daar volgens de RDW nog 185 dagen mee rijden nadat je in Nederland bent gaan wonen. Daarna heb je een Nederlands rijbewijs nodig, ook als je aanvraag nog loopt.',
					'Een rijbewijs uit de EU/EER (categorie B) mag je in Nederland gebruiken tot 15 jaar na de afgiftedatum, zolang het geldig is. Is het al langer dan 15 jaar geleden afgegeven, dan mag je er nog 2 jaar mee rijden nadat je hier bent komen wonen.',
				],
			},
			{
				heading: 'Kan ik mijn rijbewijs omwisselen?',
				items: [
					'Rijbewijzen uit de EU/EER kun je altijd omwisselen voor een Nederlands rijbewijs.',
					'Een aantal landen buiten de EU/EER heeft een afspraak met Nederland, zoals Japan, Zuid-Korea, Groot-Brittannië, Israël, Singapore en Taiwan. De volledige lijst staat bij de RDW. Een rijbewijs uit bijvoorbeeld de Verenigde Staten kun je niet omwisselen.',
					'Val je onder de expatregeling (30%-regeling) van de Belastingdienst, dan kun je je rijbewijs uit elk land omwisselen met een geldige beschikking. Volgens de Rijksoverheid geldt dit ook voor inwonende gezinsleden.',
					'Je vraagt de omwisseling aan bij je gemeente. Voor een rijbewijs van buiten de EU/EER heb je ook een Gezondheidsverklaring van het CBR nodig.',
				],
			},
			{
				heading: 'Geen omwisseling mogelijk? Zo haal je je Nederlandse rijbewijs',
				variant: 'steps',
				items: [
					'Je haalt het theorie-examen auto bij het CBR. Dat kan in het Engels, op alle examenlocaties.',
					'Je vult de Gezondheidsverklaring van het CBR in.',
					'Je neemt rijles in het Engels bij een vaste instructeur, tot je klaar bent voor het examen.',
					'Je doet het praktijkexamen bij het CBR. Wij reserveren het examen voor je.',
				],
			},
			{
				heading: 'Praktijkexamen: in het Nederlands, met een tolk als dat nodig is',
				paragraphs: [
					'Het CBR neemt het praktijkexamen af in het Nederlands. Spreek je onvoldoende Nederlands, dan mag je een tolk meenemen. Volgens het CBR kan dat een officiële tolk zijn, of je eigen rijinstructeur met een WRM-pas. Dit moet bij het reserveren van het examen worden aangegeven. Vraag ons naar de mogelijkheden.',
				],
			},
			{
				heading: 'Goed om te weten',
				variant: 'callout',
				paragraphs: [
					'Begin op tijd: het CBR raadt aan de Gezondheidsverklaring 6 maanden voordat je niet meer met je buitenlandse rijbewijs mag rijden in te vullen, en de behandeling kan tot 4 maanden duren.',
					'Een Nederlands rijbewijs wordt alleen afgegeven als je in het jaar voor de aanvraag minstens 185 dagen in Nederland hebt gewoond. Een theorie-examen blijft 1,5 jaar geldig voor het praktijkexamen.',
				],
			},
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				paragraphs: [
					'Regels, voorwaarden en kosten kunnen veranderen. Controleer de actuele informatie bij de RDW, het CBR en je gemeente.',
				],
				links: [
					{ label: 'RDW: rijden met een buitenlands rijbewijs', href: rdwDriving },
					{ label: 'RDW: buitenlands rijbewijs omwisselen (met landenlijst)', href: rdwExchange },
					{ label: 'CBR: theorie-examen in het Engels', href: cbrTheoryEnglish },
					{ label: 'CBR: tolk bij het praktijkexamen', href: cbrInterpreter },
					{ label: 'CBR: Gezondheidsverklaring bij omwisselen', href: cbrHealth },
					{ label: 'Rijksoverheid: omwisseling rijbewijzen van expats (2025)', href: expatLetter },
				],
			},
		],
		faq: [
			{
				q: 'Geven jullie rijles in het Engels?',
				a: 'Ja. We geven les in het Nederlands en in het Engels, met een vaste instructeur, in een schakel- of automaatauto.',
			},
			{
				q: 'Hoe lang mag ik met mijn buitenlandse rijbewijs rijden?',
				a: 'Met een rijbewijs van buiten de EU/EER volgens de RDW 185 dagen nadat je in Nederland bent gaan wonen. Een EU/EER-rijbewijs (B) mag je gebruiken tot 15 jaar na afgifte, zolang het geldig is.',
			},
			{
				q: 'Kan ik het theorie-examen in het Engels doen?',
				a: 'Ja. Volgens het CBR kun je het theorie-examen auto op alle examenlocaties in het Engels doen, ook met extra tijd.',
			},
			{
				q: 'Is het praktijkexamen in het Engels?',
				a: 'Nee, het CBR neemt het praktijkexamen af in het Nederlands. Je mag wel een tolk meenemen. Dat moet bij het reserveren worden aangegeven.',
			},
			{
				q: 'Ik val onder de 30%-regeling. Moet ik examen doen?',
				a: 'Meestal niet. Met een geldige beschikking voor de expatregeling van de Belastingdienst kun je je rijbewijs uit elk land omwisselen bij je gemeente, met een Gezondheidsverklaring van het CBR.',
			},
		],
	},
	en: {
		cardTitle: 'Lessons for expats',
		summary:
			'Driving lessons in English and help with your foreign licence: exchange it or get a Dutch one.',
		title: 'Driving lessons for expats in Amsterdam',
		linkTitle: 'Driving lessons for expats',
		metaTitle: 'Driving Lessons for Expats in English | Amsterdam | All Drive',
		metaDescription:
			'Expat in Amsterdam? Driving lessons in English with Rijschool All Drive, plus how your foreign licence works: 185 days, exchange, the 30% ruling and the CBR exam.',
		answer:
			'Are you an expat in or around Amsterdam? At Rijschool All Drive you get driving lessons in English, with a dedicated instructor, in a manual or automatic car. A 60-minute lesson costs {lessonPrice}; packages including the CBR practical exam start at {fromPrice} for {fromLessons} lessons. If you cannot exchange your foreign licence, we prepare you for the CBR theory and practical exams.',
		articles: [
			{
				heading: 'Driving with a foreign licence',
				paragraphs: [
					'With a licence from outside the EU/EFTA you may, according to the RDW, keep driving for 185 days after you start living in the Netherlands. After that you need a Dutch licence, even if your application is still being processed.',
					'An EU/EFTA licence (category B) can be used in the Netherlands for up to 15 years after the date of issue, as long as it is valid. If it was issued more than 15 years ago, you may use it for another 2 years after you move here.',
				],
			},
			{
				heading: 'Can I exchange my licence?',
				items: [
					'EU/EFTA licences can always be exchanged for a Dutch licence.',
					'Some countries outside the EU/EFTA have an agreement with the Netherlands, such as Japan, South Korea, Great Britain, Israel, Singapore and Taiwan. The full list is on the RDW website. A licence from, for example, the United States cannot be exchanged.',
					'If the expat scheme (30% ruling) of the Dutch tax authority applies to you, you can exchange a licence from any country with a valid decision. According to the Dutch government this also applies to family members living with you.',
					'You apply for the exchange at your municipality. For a licence from outside the EU/EFTA you also need a health declaration (Gezondheidsverklaring) from the CBR.',
				],
			},
			{
				heading: 'No exchange possible? How to get your Dutch licence',
				variant: 'steps',
				items: [
					'Pass the CBR car theory exam. You can take it in English at every exam centre.',
					'Fill in the CBR health declaration (Gezondheidsverklaring).',
					'Take driving lessons in English with a dedicated instructor until you are ready for the exam.',
					'Take the CBR practical exam. We book the exam for you.',
				],
			},
			{
				heading: 'Practical exam: in Dutch, with an interpreter if needed',
				paragraphs: [
					'The CBR conducts the practical exam in Dutch. If your Dutch is not good enough, you may bring an interpreter. According to the CBR this can be an official interpreter, or your own driving instructor with a WRM pass. This must be stated when the exam is booked. Ask us about the options.',
				],
			},
			{
				heading: 'Good to know',
				variant: 'callout',
				paragraphs: [
					'Start in time: the CBR advises filling in the health declaration 6 months before you may no longer drive on your foreign licence, and processing can take up to 4 months.',
					'A Dutch licence is only issued if you have lived in the Netherlands for at least 185 days in the year before the application. A theory pass stays valid for the practical exam for 1.5 years.',
				],
			},
			{
				heading: 'Official information',
				variant: 'sources',
				paragraphs: [
					'Rules, conditions and fees may change. Check the current information with the RDW, the CBR and your municipality.',
				],
				links: [
					{ label: 'RDW: driving with a foreign licence', href: rdwDriving },
					{ label: 'RDW: exchanging a foreign licence (country list)', href: rdwExchange },
					{ label: 'CBR: theory exam in English (in Dutch)', href: cbrTheoryEnglish },
					{ label: 'CBR: interpreter at the practical exam (in Dutch)', href: cbrInterpreter },
					{ label: 'CBR: health declaration for an exchange (in Dutch)', href: cbrHealth },
					{
						label: 'Dutch government: licence exchange for expats (2025, in Dutch)',
						href: expatLetter,
					},
				],
			},
		],
		faq: [
			{
				q: 'Do you give driving lessons in English?',
				a: 'Yes. We teach in English and in Dutch, with a dedicated instructor, in a manual or automatic car.',
			},
			{
				q: 'How long can I drive on my foreign licence?',
				a: 'With a licence from outside the EU/EFTA, according to the RDW, for 185 days after you start living in the Netherlands. An EU/EFTA licence (B) can be used for up to 15 years after it was issued, as long as it is valid.',
			},
			{
				q: 'Can I take the theory exam in English?',
				a: 'Yes. According to the CBR you can take the car theory exam in English at every exam centre, also with extra time.',
			},
			{
				q: 'Is the practical exam in English?',
				a: 'No, the CBR conducts the practical exam in Dutch. You may bring an interpreter, which must be stated when the exam is booked.',
			},
			{
				q: 'The 30% ruling applies to me. Do I need to take an exam?',
				a: 'Usually not. With a valid decision for the expat scheme from the Dutch tax authority, you can exchange a licence from any country at your municipality, with a CBR health declaration.',
			},
		],
	},
};
