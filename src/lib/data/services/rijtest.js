// Driving assessment (rijtest) for licence renewal. CBR facts checked 21-10-2026, without costs:
// https://www.cbr.nl/nl/over-het-cbr/over/dossiers/medische-keuringen-van-75-jarigen
// https://www.cbr.nl/nl/onveilig-rijgedrag/nl/mijn-rijbewijs-is-ingevorderd-wat-nu/onveilig-gedrag-in-het-verkeer/onderzoek-naar-uw-rijvaardigheid
// Our rijtest is not an official exam: the copy must never suggest it replaces the CBR assessment.
const cbr75Url =
	'https://www.cbr.nl/nl/over-het-cbr/over/dossiers/medische-keuringen-van-75-jarigen';
const cbrSkillsUrl =
	'https://www.cbr.nl/nl/onveilig-rijgedrag/nl/mijn-rijbewijs-is-ingevorderd-wat-nu/onveilig-gedrag-in-het-verkeer/onderzoek-naar-uw-rijvaardigheid';

export const service = {
	slug: 'rijtest',
	order: 7,
	serviceType: 'Rijtest en voorbereiding op de CBR-rijtest',
	// Price on request only: never show or mark up a price for this service
	showPrice: false,
	cta: 'drivingTest',
	nl: {
		cardTitle: 'Rijtest',
		summary:
			'Rijtest bij het verlengen van je rijbewijs, bijvoorbeeld vanaf 75 jaar of na een ongeval.',
		title: 'Rijtest bij het verlengen van je rijbewijs',
		// short link text for the footer
		linkTitle: 'Rijtest rijbewijs verlengen',
		metaTitle: 'Rijtest rijbewijs verlengen (75+) Amsterdam | All Drive',
		metaDescription:
			'Rijtest nodig om je rijbewijs te verlengen, vanaf 75 jaar of na een ongeval? Rijschool All Drive neemt een rijtest bij je af en bereidt je voor op de rijtest van het CBR.',
		answer:
			'Moet je je rijbewijs verlengen, bijvoorbeeld vanaf je 75e, of twijfel je na een ongeval of je nog veilig rijdt? Bij Rijschool All Drive doe je een rijtest met een van onze instructeurs. Je krijgt eerlijk advies over wat goed gaat en wat beter kan. Heeft het CBR een rijtest of een onderzoek naar de rijvaardigheid voor je ingepland, dan bereiden we je daar met lessen op voor.',
		articles: [
			{
				heading: 'Wanneer heb je een rijtest nodig?',
				items: [
					'Je bent 75 of ouder en moet je rijbewijs verlengen.',
					'Het CBR vraagt om een rijtest om te beoordelen of je nog veilig kunt rijden, bijvoorbeeld na een medische keuring.',
					'Je bent opgeroepen voor een onderzoek naar de rijvaardigheid door het CBR, bijvoorbeeld na een melding van de politie.',
					'Je wilt zelf weten of je nog veilig rijdt, of je familie maakt zich zorgen.',
				],
			},
			{
				heading: 'Zo werkt een rijtest bij All Drive',
				variant: 'steps',
				items: [
					'Je stuurt ons een WhatsApp-bericht met je situatie, bijvoorbeeld de brief van het CBR.',
					'We halen je op en je rijdt een rit met je instructeur, in een lesauto met dubbele pedalen.',
					'Na de rit hoor je wat goed gaat en waar je op moet letten.',
					'Is er meer oefening nodig, dan plannen we lessen tot je klaar bent voor de rijtest van het CBR.',
				],
			},
			{
				heading: 'Rijbewijs verlengen vanaf 75 jaar (rijtest voor ouderen)',
				paragraphs: [
					'Volgens het CBR vul je vanaf 75 jaar een Gezondheidsverklaring in als je je rijbewijs wilt verlengen. Daarna volgt een keuring door een arts. Vanaf 75 jaar word je in elk geval elke vijf jaar zo beoordeeld, en bij sommige aandoeningen vaker.',
					'Bij bepaalde aandoeningen vraagt het CBR om een aanvullende rijtest. Die rijtest wordt door het CBR afgenomen. Moet de rijtest in een auto met dubbele bediening, dan huur je zelf een lesauto.',
				],
			},
			{
				heading: 'Onderzoek naar de rijvaardigheid na een ongeval',
				paragraphs: [
					'Twijfelt de politie of je nog veilig kunt rijden, dan kan het CBR je oproepen voor een onderzoek naar de rijvaardigheid. Dat duurt ongeveer 2,5 uur en bestaat uit een theoriedeel met 50 vragen over verkeerssituaties en een praktijkdeel. Voor het praktijkdeel moet je een lesauto meenemen.',
				],
			},
			{
				heading: 'Goed om te weten',
				variant: 'callout',
				paragraphs: [
					'Een rijtest bij Rijschool All Drive is geen officieel examen en vervangt de rijtest of het onderzoek van het CBR niet. Je krijgt wel een eerlijk beeld van hoe je rijdt, en we bereiden je goed voor.',
				],
			},
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				paragraphs: [
					'Regels en kosten kunnen veranderen. Controleer de actuele informatie bij het CBR.',
				],
				links: [
					{ label: 'CBR: medische keuringen van 75-jarigen', href: cbr75Url },
					{ label: 'CBR: onderzoek naar je rijvaardigheid', href: cbrSkillsUrl },
				],
			},
		],
		faq: [
			{
				q: 'Kan ik bij jullie een rijtest doen voor het verlengen van mijn rijbewijs?',
				a: 'Ja. Je rijdt een rit met een van onze instructeurs en krijgt eerlijk advies. Moet je een rijtest bij het CBR doen, dan bereiden we je daarop voor. De officiële beoordeling doet altijd het CBR.',
			},
			{
				q: 'Moet ik vanaf 75 jaar een rijtest doen?',
				a: 'Niet altijd. Vanaf 75 jaar vul je een Gezondheidsverklaring in en word je gekeurd door een arts. Alleen bij bepaalde aandoeningen vraagt het CBR om een aanvullende rijtest.',
			},
			{
				q: 'Wat is een onderzoek naar de rijvaardigheid?',
				a: 'Een onderzoek van het CBR als er twijfel is of je nog veilig kunt rijden, bijvoorbeeld na een melding van de politie. Het duurt ongeveer 2,5 uur, met een theoriedeel en een praktijkdeel in een lesauto.',
			},
			{
				q: 'Wat kost een rijtest bij All Drive?',
				a: 'Dat hangt af van je situatie. Stuur ons een WhatsApp-bericht, dan hoor je vooraf wat het kost.',
			},
		],
	},
	en: {
		cardTitle: 'Driving assessment',
		summary:
			'A driving assessment when you renew your licence, for example from age 75 or after an accident.',
		title: 'Driving assessment for licence renewal',
		linkTitle: 'Driving assessment',
		metaTitle: 'Driving assessment for licence renewal (75+) | All Drive',
		metaDescription:
			'Need a driving test to renew your licence, from age 75 or after an accident? Rijschool All Drive assesses your driving and prepares you for the CBR driving test.',
		answer:
			'Do you need to renew your driving licence, for example from age 75, or are you unsure after an accident whether you still drive safely? At Rijschool All Drive you take a driving assessment (rijtest) with one of our instructors. You get honest advice on what goes well and what can improve. If the CBR has scheduled a driving test or a driving skills investigation for you, we prepare you for it with lessons.',
		articles: [
			{
				heading: 'When do you need a driving assessment?',
				items: [
					'You are 75 or older and need to renew your licence.',
					'The CBR asks for a driving test to judge whether you can still drive safely, for example after a medical examination.',
					'The CBR has called you for a driving skills investigation (onderzoek naar de rijvaardigheid), for example after a report from the police.',
					'You want to know for yourself whether you still drive safely, or your family is worried.',
				],
			},
			{
				heading: 'How a driving assessment at All Drive works',
				variant: 'steps',
				items: [
					'Send us a WhatsApp message about your situation, for example the letter from the CBR.',
					'We pick you up and you drive with your instructor, in a lesson car with dual controls.',
					'After the drive you hear what goes well and what to watch out for.',
					'If you need more practice, we plan lessons until you are ready for the CBR driving test.',
				],
			},
			{
				heading: 'Renewing your licence from age 75 (driving test for seniors)',
				paragraphs: [
					'According to the CBR, from age 75 you fill in a health declaration (Gezondheidsverklaring) to renew your licence. A medical examination by a doctor follows. From age 75 you are assessed this way at least every five years, and more often with some conditions.',
					'With certain conditions the CBR asks for an additional driving test. The CBR conducts that test. If it must be taken in a car with dual controls, you rent a lesson car yourself.',
				],
			},
			{
				heading: 'Driving skills investigation after an accident',
				paragraphs: [
					'If the police doubt whether you can still drive safely, the CBR can call you for a driving skills investigation. It takes about 2.5 hours and has a theory part with 50 questions about traffic situations and a practical part. For the practical part you must bring a lesson car.',
				],
			},
			{
				heading: 'Good to know',
				variant: 'callout',
				paragraphs: [
					'A driving assessment at Rijschool All Drive is not an official exam and does not replace the CBR driving test or investigation. It does give you an honest picture of how you drive, and we prepare you well.',
				],
			},
			{
				heading: 'Official information',
				variant: 'sources',
				paragraphs: [
					'Rules and costs may change. Check the current information with the CBR (in Dutch).',
				],
				links: [
					{ label: 'CBR: medical examinations from age 75', href: cbr75Url },
					{ label: 'CBR: driving skills investigation', href: cbrSkillsUrl },
				],
			},
		],
		faq: [
			{
				q: 'Can I take a driving assessment with you to renew my licence?',
				a: 'Yes. You drive with one of our instructors and get honest advice. If you have to take a driving test with the CBR, we prepare you for it. The official assessment is always done by the CBR.',
			},
			{
				q: 'Do I have to take a driving test from age 75?',
				a: 'Not always. From age 75 you fill in a health declaration and are examined by a doctor. Only with certain conditions does the CBR ask for an additional driving test.',
			},
			{
				q: 'What is a driving skills investigation?',
				a: 'An investigation by the CBR when there is doubt whether you can still drive safely, for example after a report from the police. It takes about 2.5 hours, with a theory part and a practical part in a lesson car.',
			},
			{
				q: 'How much does a driving assessment at All Drive cost?',
				a: 'That depends on your situation. Send us a WhatsApp message and you will hear the price beforehand.',
			},
		],
	},
};
