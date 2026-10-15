// Faalangstexamen facts are taken from cbr.nl (checked 14-10-2026), without costs:
// https://www.cbr.nl/nl/rijbewijs-halen/auto/praktijkexamen-auto/extreem-zenuwachtig-of-faalangst-voor-je-rijexamen
const cbrUrl =
	'https://www.cbr.nl/nl/rijbewijs-halen/auto/praktijkexamen-auto/extreem-zenuwachtig-of-faalangst-voor-je-rijexamen';

export const service = {
	slug: 'rijangst-en-faalangstexamen',
	order: 4,
	serviceType: 'Rijles bij rijangst en begeleiding naar een faalangstexamen',
	showPrice: false,
	cta: 'trial',
	nl: {
		cardTitle: 'Rijangst & faalangst',
		summary: 'Rustig opbouwen in jouw tempo, en begeleiding naar een faalangstexamen.',
		title: 'Rijangst en faalangstexamen',
		metaTitle: 'Rijles bij rijangst & faalangstexamen | All Drive',
		metaDescription:
			'Rijangst of faalangst voor je examen? Rijschool All Drive begeleidt je stap voor stap en kan je voorbereiden op een CBR-faalangstexamen. Vraag een proefles aan.',
		answer:
			'Heb je rijangst of ben je erg zenuwachtig voor je examen? Rijschool All Drive begeleidt je stap voor stap, in jouw tempo en met een vaste instructeur. Ben je tijdens het examen té zenuwachtig om te laten zien wat je kunt, dan kun je een faalangstexamen bij het CBR doen. Wij bereiden je daarop voor en reserveren het voor je.',
		articles: [
			{
				heading: 'Rijles bij rijangst',
				items: [
					'Je vertelt bij de proefles waar je tegenop ziet. We bespreken je zorgen.',
					'Je rijdt steeds met dezelfde instructeur, die je voortgang kent.',
					'We bouwen de lessen stap voor stap op, in jouw tempo.',
				],
			},
			{
				heading: 'Wat is een faalangstexamen?',
				paragraphs: [
					'Volgens het CBR kun je een faalangstexamen doen als je té zenuwachtig bent om tijdens het praktijkexamen auto te laten zien wat je kunt. Je krijgt dan een examinator die is getraind om mensen met faalangst te begeleiden en die meer tijd heeft om je op je gemak te stellen.',
				],
				items: [
					'Het examen duurt in totaal 1 uur en 20 minuten, waarvan 35 minuten voor de examenrit.',
					'Tijdens de rit kun je om een time-out vragen.',
					'Je moet hetzelfde kunnen als bij het standaard praktijkexamen, en het verloopt in dezelfde volgorde.',
				],
			},
			{
				heading: 'Zo vraag je een faalangstexamen aan',
				variant: 'steps',
				items: [
					'Je moet eerst geslaagd zijn voor je theorie-examen auto.',
					'Je vraagt het faalangstexamen aan via je rijschool.',
					'Wij reserveren het faalangstexamen voor je bij het CBR.',
				],
			},
			{
				heading: 'Officiële informatie',
				variant: 'sources',
				paragraphs: [
					'Voorwaarden en kosten kunnen veranderen. Controleer de actuele informatie bij het CBR.',
				],
				links: [{ label: 'CBR: faalangst rijexamen', href: cbrUrl }],
			},
		],
		faq: [
			{
				q: 'Ik heb rijangst. Kan ik toch rijles nemen?',
				a: 'Ja. Vertel het ons bij de proefles. We bespreken je zorgen en bouwen de lessen stap voor stap op, in jouw tempo.',
			},
			{
				q: 'Begeleiden jullie naar een faalangstexamen?',
				a: 'Ja. We bereiden je voor op het faalangstexamen en reserveren het voor je bij het CBR. Je moet daarvoor eerst geslaagd zijn voor je theorie-examen.',
			},
			{
				q: 'Wat kost een faalangstexamen?',
				a: 'De kosten van het CBR kunnen veranderen. Vraag ons naar de actuele kosten en de mogelijkheden binnen je pakket.',
			},
		],
	},
	en: {
		cardTitle: 'Driving anxiety',
		summary: 'Build up calmly at your own pace, with guidance towards a fear of failure exam.',
		title: 'Driving anxiety and fear of failure exam',
		metaTitle: 'Driving anxiety & fear of failure exam | All Drive',
		metaDescription:
			'Driving anxiety or very nervous about your exam? Rijschool All Drive guides you step by step and can prepare you for a CBR fear of failure exam. Request a trial.',
		answer:
			'Do you have driving anxiety or are you very nervous about your exam? Rijschool All Drive guides you step by step, at your own pace and with a dedicated instructor. If you are too nervous during the exam to show what you can do, you can take a fear of failure exam (faalangstexamen) with the CBR. We prepare you for it and book it for you.',
		articles: [
			{
				heading: 'Driving lessons with driving anxiety',
				items: [
					'Tell us during the trial lesson what worries you. We discuss your concerns.',
					'You always drive with the same instructor, who knows your progress.',
					'We build up the lessons step by step, at your own pace.',
				],
			},
			{
				heading: 'What is a fear of failure exam?',
				paragraphs: [
					'According to the CBR, you can take a fear of failure exam if you are too nervous to show what you can do during the practical car exam. You then get an examiner who is trained to guide people with fear of failure and who has more time to put you at ease.',
				],
				items: [
					'The exam takes 1 hour and 20 minutes in total, of which 35 minutes is the exam drive.',
					'During the drive you can ask for a time-out.',
					'You must be able to do the same as in the standard practical exam, and it follows the same order.',
				],
			},
			{
				heading: 'How to apply for a fear of failure exam',
				variant: 'steps',
				items: [
					'You must first have passed your car theory exam.',
					'You apply for the fear of failure exam through your driving school.',
					'We book the fear of failure exam for you with the CBR.',
				],
			},
			{
				heading: 'Official information',
				variant: 'sources',
				paragraphs: [
					'Conditions and costs may change. Check the current information with the CBR (in Dutch).',
				],
				links: [{ label: 'CBR: fear of failure driving exam', href: cbrUrl }],
			},
		],
		faq: [
			{
				q: 'I have driving anxiety. Can I still take lessons?',
				a: 'Yes. Tell us during the trial lesson. We discuss your concerns and build up the lessons step by step, at your own pace.',
			},
			{
				q: 'Do you guide students to a fear of failure exam?',
				a: 'Yes. We prepare you for the fear of failure exam and book it for you with the CBR. You must first have passed your theory exam.',
			},
			{
				q: 'How much does a fear of failure exam cost?',
				a: 'CBR costs may change. Ask us about the current costs and the options within your package.',
			},
		],
	},
};
