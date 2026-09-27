// Content for the privacy statement and the terms and conditions, per locale.
// Each document is a list of articles: { heading, paragraphs?, items? }.
// Facts (KvK, prices, policies) come from business.js so they stay in sync with the site.

import { business } from './business.js';

export const legalLastUpdated = '2026-09-27';

const { name, kvk, email, phoneDisplay, address, prices, policies, trialLesson } = business;

const euro = (amount) => `€${amount}`;

export const privacy = {
	nl: [
		{
			heading: '1. Wie zijn wij?',
			paragraphs: [
				`${name} is verantwoordelijk voor de verwerking van jouw persoonsgegevens zoals beschreven in deze privacyverklaring.`,
			],
			items: [
				`KvK-nummer: ${kvk}`,
				address && `Adres: ${address}`,
				`E-mail: ${email}`,
				`Telefoon: ${phoneDisplay}`,
			],
		},
		{
			heading: '2. Welke gegevens verwerken wij?',
			paragraphs: ['Wij verwerken alleen gegevens die je zelf aan ons geeft:'],
			items: [
				'Via het contactformulier: naam, e-mailadres, telefoonnummer, onderwerp en je bericht.',
				'Via WhatsApp, telefoon of e-mail: je naam, telefoonnummer of e-mailadres en de inhoud van het gesprek.',
				'Bij inschrijving: je naam, adres, geboortedatum, telefoonnummer en e-mailadres, en de gegevens die nodig zijn om je examen bij het CBR aan te vragen.',
				'Tijdens je opleiding: je lesplanning, je voortgang en je betalingen.',
			],
		},
		{
			heading: '3. Waarom verwerken wij je gegevens?',
			items: [
				'Om je vraag of aanvraag voor een proefles te beantwoorden.',
				'Om je lessen te plannen en de overeenkomst met jou uit te voeren.',
				'Om je praktijkexamen of tussentijdse toets bij het CBR aan te vragen.',
				'Om te voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht.',
			],
			paragraphs: [
				'Wij gebruiken je gegevens niet voor andere doeleinden en verkopen ze nooit aan derden.',
			],
		},
		{
			heading: '4. Met wie delen wij je gegevens?',
			paragraphs: ['Wij delen je gegevens alleen als dat nodig is:'],
			items: [
				'Het CBR, om je examen of toets aan te vragen.',
				'Onze hosting- en e-mailprovider, die de website en berichten via het contactformulier voor ons verwerkt.',
				'WhatsApp (Meta), als je ervoor kiest om via WhatsApp contact met ons op te nemen.',
				'Elfsight, dat de Google-reviews op onze website toont. Bij het laden hiervan ontvangt Elfsight technische gegevens zoals je IP-adres.',
			],
		},
		{
			heading: '5. Hoe lang bewaren wij je gegevens?',
			items: [
				'Berichten via het contactformulier, WhatsApp of e-mail bewaren we zolang nodig is om je vraag af te handelen.',
				'Gegevens over je opleiding bewaren we tot je opleiding is afgerond.',
				'Facturen en betaalgegevens bewaren we 7 jaar, omdat de wet dat verplicht.',
			],
		},
		{
			heading: '6. Cookies',
			paragraphs: [
				'Onze website plaatst één functionele cookie die onthoudt in welke taal je de website bekijkt. Wij gebruiken geen tracking- of advertentiecookies.',
				'De reviewwidget van Elfsight wordt van een externe server geladen. Elfsight kan daarbij eigen cookies plaatsen; zie hiervoor het privacybeleid van Elfsight.',
			],
		},
		{
			heading: '7. Jouw rechten',
			paragraphs: [
				`Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking, de verwerking laten beperken of je gegevens laten overdragen. Stuur je verzoek naar ${email}. We reageren binnen een maand.`,
				'Ben je het niet eens met hoe wij met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
			],
		},
		{
			heading: '8. Beveiliging',
			paragraphs: [
				`We nemen passende maatregelen om je gegevens te beveiligen tegen verlies en onbevoegde toegang. Denk je dat je gegevens niet goed beveiligd zijn? Neem dan contact met ons op via ${email}.`,
			],
		},
		{
			heading: '9. Wijzigingen',
			paragraphs: [
				'We kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina.',
			],
		},
	],
	en: [
		{
			heading: '1. Who are we?',
			paragraphs: [
				`${name} is responsible for processing your personal data as described in this privacy statement.`,
			],
			items: [
				`Chamber of Commerce (KvK) number: ${kvk}`,
				address && `Address: ${address}`,
				`Email: ${email}`,
				`Phone: ${phoneDisplay}`,
			],
		},
		{
			heading: '2. What data do we process?',
			paragraphs: ['We only process data you give us yourself:'],
			items: [
				'Through the contact form: name, email address, phone number, subject and your message.',
				'Through WhatsApp, phone or email: your name, phone number or email address and the content of the conversation.',
				'When you enrol: your name, address, date of birth, phone number and email address, and the details needed to book your exam with the CBR.',
				'During your training: your lesson schedule, your progress and your payments.',
			],
		},
		{
			heading: '3. Why do we process your data?',
			items: [
				'To answer your question or trial lesson request.',
				'To schedule your lessons and carry out our agreement with you.',
				'To book your practical exam or interim test with the CBR.',
				'To meet legal obligations, such as the tax retention requirement.',
			],
			paragraphs: [
				'We do not use your data for any other purpose and never sell it to third parties.',
			],
		},
		{
			heading: '4. Who do we share your data with?',
			paragraphs: ['We only share your data when necessary:'],
			items: [
				'The CBR, to book your exam or test.',
				'Our hosting and email provider, which processes the website and contact form messages for us.',
				'WhatsApp (Meta), if you choose to contact us through WhatsApp.',
				'Elfsight, which shows the Google reviews on our website. When this loads, Elfsight receives technical data such as your IP address.',
			],
		},
		{
			heading: '5. How long do we keep your data?',
			items: [
				'Messages through the contact form, WhatsApp or email are kept as long as needed to handle your question.',
				'Data about your training is kept until your training has ended.',
				'Invoices and payment details are kept for 7 years, as required by law.',
			],
		},
		{
			heading: '6. Cookies',
			paragraphs: [
				'Our website places one functional cookie that remembers which language you view the website in. We do not use tracking or advertising cookies.',
				"The Elfsight review widget is loaded from an external server. Elfsight may place its own cookies; see Elfsight's privacy policy.",
			],
		},
		{
			heading: '7. Your rights',
			paragraphs: [
				`You have the right to access, correct or delete your data. You can also object to the processing, restrict it or have your data transferred. Send your request to ${email}. We respond within one month.`,
				'Do you disagree with how we handle your data? You can file a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).',
			],
		},
		{
			heading: '8. Security',
			paragraphs: [
				`We take appropriate measures to protect your data against loss and unauthorised access. Do you think your data is not properly secured? Contact us at ${email}.`,
			],
		},
		{
			heading: '9. Changes',
			paragraphs: [
				'We may update this privacy statement. The most recent version is always on this page.',
			],
		},
	],
};

export const terms = {
	nl: [
		{
			heading: '1. Toepasselijkheid',
			paragraphs: [
				`Deze voorwaarden gelden voor alle lessen, pakketten en examens van ${name} (KvK ${kvk}). Met "leerling" bedoelen we iedereen die bij ons lessen volgt of een proefles aanvraagt.`,
			],
		},
		{
			heading: '2. Proefles en inschrijving',
			items: [
				trialLesson.freeWithPackage &&
					`De proefles is alleen gratis als je na de proefles een pakket afneemt. Neem je geen pakket af, dan betaal je voor de proefles de prijs van een losse les (${euro(prices.lesson)}).`,
				trialLesson.minutes && `Een proefles duurt ${trialLesson.minutes} minuten.`,
				'Na de proefles geeft de instructeur een lesadvies. Je beslist zelf of je daarna lessen of een pakket afneemt.',
				'Je bent ingeschreven zodra we je aanmelding voor lessen of een pakket hebben bevestigd.',
			],
		},
		{
			heading: '3. Lessen',
			items: [
				'Een les duurt 60 minuten, tenzij anders afgesproken.',
				'De instructeur haalt je op en brengt je terug binnen ons werkgebied.',
				'De instructeur mag een les weigeren of stoppen als je onder invloed bent van alcohol, drugs of medicijnen die de rijvaardigheid beïnvloeden.',
			],
		},
		{
			heading: '4. Prijzen en betaling',
			items: [
				'Alle prijzen op de website zijn in euro’s en inclusief btw.',
				`Een losse les van 60 minuten kost ${euro(prices.lesson)}.`,
				`Een praktijkexamen (CBR) kost ${euro(prices.exam)}. Een tussentijdse toets kost ${euro(prices.interimExam)}.`,
				policies.installments === true &&
					'Betalen in termijnen is mogelijk. De termijnen spreken we bij inschrijving af.',
				policies.installments === false && 'Betalen in termijnen is niet mogelijk.',
			],
		},
		{
			heading: '5. Afzeggen en verplaatsen',
			items: [
				policies.cancelHours
					? `Zeg je een les minder dan ${policies.cancelHours} uur van tevoren af, of kom je niet opdagen, dan brengen we de les in rekening.`
					: 'Zeg een les zo vroeg mogelijk af. De afzegtermijn spreken we bij inschrijving met je af.',
				'Moeten wij een les afzeggen, bijvoorbeeld door ziekte van de instructeur, pech met de lesauto of gevaarlijk weer, dan plannen we de les kosteloos opnieuw in.',
			],
		},
		{
			heading: '6. Pakketten',
			items: [
				'Lessen uit een pakket zijn persoonlijk en niet overdraagbaar.',
				policies.packageValidityMonths &&
					`Lessen uit een pakket zijn ${policies.packageValidityMonths} maanden geldig vanaf de aankoop.`,
				policies.unusedLessonsRefund === true &&
					'Ongebruikte lessen uit een pakket krijg je terugbetaald.',
				policies.unusedLessonsRefund === false &&
					'Ongebruikte lessen uit een pakket worden niet terugbetaald.',
			],
		},
		{
			heading: '7. Examens',
			items: [
				'We vragen je examen of toets bij het CBR aan zodra de instructeur vindt dat je er klaar voor bent. Het CBR bepaalt de datum.',
				'Voor het praktijkexamen moet je theorie-examen geldig zijn en moet je de rijschool in Mijn CBR hebben gemachtigd.',
				'Neem op de examendag een geldig identiteitsbewijs mee. Kan het examen niet doorgaan omdat je geen geldig identiteitsbewijs hebt of niet komt opdagen, dan blijven de kosten voor jouw rekening.',
				`Slaag je niet, dan kun je een herexamen aanvragen. Daarvoor geldt opnieuw de examenprijs van ${euro(prices.exam)}.`,
			],
		},
		{
			heading: '8. Aansprakelijkheid',
			paragraphs: [
				'Onze lesauto’s zijn verzekerd. Wij zijn niet aansprakelijk voor schade die ontstaat doordat je bewust de aanwijzingen van de instructeur niet opvolgt.',
			],
		},
		{
			heading: '9. Klachten',
			paragraphs: [
				`Heb je een klacht? Stuur die naar ${email}. We reageren zo snel mogelijk en zoeken samen met jou naar een oplossing.`,
			],
		},
		{
			heading: '10. Toepasselijk recht',
			paragraphs: ['Op deze voorwaarden is Nederlands recht van toepassing.'],
		},
	],
	en: [
		{
			heading: '1. Applicability',
			paragraphs: [
				`These terms apply to all lessons, packages and exams of ${name} (KvK ${kvk}). "Student" means anyone who takes lessons with us or requests a trial lesson.`,
			],
		},
		{
			heading: '2. Trial lesson and enrolment',
			items: [
				trialLesson.freeWithPackage &&
					`The trial lesson is only free if you buy a package afterwards. If you do not, you pay the price of a single lesson (${euro(prices.lesson)}) for the trial lesson.`,
				trialLesson.minutes && `A trial lesson lasts ${trialLesson.minutes} minutes.`,
				'After the trial lesson, the instructor gives you lesson advice. You decide yourself whether to book lessons or a package.',
				'You are enrolled once we have confirmed your registration for lessons or a package.',
			],
		},
		{
			heading: '3. Lessons',
			items: [
				'A lesson lasts 60 minutes, unless agreed otherwise.',
				'The instructor picks you up and drops you off within our service area.',
				'The instructor may refuse or stop a lesson if you are under the influence of alcohol, drugs or medication that affects your driving ability.',
			],
		},
		{
			heading: '4. Prices and payment',
			items: [
				'All prices on the website are in euros and include VAT.',
				`A single 60-minute lesson costs ${euro(prices.lesson)}.`,
				`A practical exam (CBR) costs ${euro(prices.exam)}. An interim test costs ${euro(prices.interimExam)}.`,
				policies.installments === true &&
					'Payment in instalments is possible. We agree on the instalments when you enrol.',
				policies.installments === false && 'Payment in instalments is not possible.',
			],
		},
		{
			heading: '5. Cancelling and rescheduling',
			items: [
				policies.cancelHours
					? `If you cancel a lesson less than ${policies.cancelHours} hours in advance, or do not show up, the lesson is charged.`
					: 'Cancel a lesson as early as possible. We agree on the cancellation period when you enrol.',
				'If we have to cancel a lesson, for example due to instructor illness, a problem with the lesson car or dangerous weather, we reschedule it free of charge.',
			],
		},
		{
			heading: '6. Packages',
			items: [
				'Lessons from a package are personal and not transferable.',
				policies.packageValidityMonths &&
					`Lessons from a package are valid for ${policies.packageValidityMonths} months from purchase.`,
				policies.unusedLessonsRefund === true && 'Unused lessons from a package are refunded.',
				policies.unusedLessonsRefund === false && 'Unused lessons from a package are not refunded.',
			],
		},
		{
			heading: '7. Exams',
			items: [
				'We book your exam or test with the CBR as soon as the instructor thinks you are ready. The CBR sets the date.',
				'For the practical exam, your theory exam must be valid and you must have authorised the driving school in Mijn CBR.',
				'Bring a valid ID on the exam day. If the exam cannot go ahead because you have no valid ID or do not show up, the costs remain yours.',
				`If you do not pass, you can request a re-exam. The exam price of ${euro(prices.exam)} applies again.`,
			],
		},
		{
			heading: '8. Liability',
			paragraphs: [
				'Our lesson cars are insured. We are not liable for damage caused by you deliberately ignoring the instructions of the instructor.',
			],
		},
		{
			heading: '9. Complaints',
			paragraphs: [
				`Do you have a complaint? Send it to ${email}. We respond as soon as possible and look for a solution together with you.`,
			],
		},
		{
			heading: '10. Applicable law',
			paragraphs: ['These terms are governed by Dutch law.'],
		},
	],
};
