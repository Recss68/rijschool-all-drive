// Content of the emails sent for the sign-up and contact forms: the submission for the
// school's inbox, and an automatic confirmation for the visitor.
import { business } from '$lib/data/business.js';
import { renderEmail, escapeHtml, whatsappNumber } from './email.js';
import { ageOn } from './signup.js';
import { leadSummary, leadSourceRows } from './lead-source.js';

const TRANSMISSION = { automaat: 'Automaat', schakel: 'Schakel', onbekend: 'Weet ik nog niet' };
const PACKAGE = {
	'rij-start': 'Rij Start',
	'door-rij': 'Door Rij',
	'vol-gas': 'Vol Gas',
	onbekend: 'Weet ik nog niet',
};

const dutchDate = (iso) => iso.split('-').reverse().join('-');

/** Quick actions for replying to the sender. */
const contactActions = (naam, telefoon, email) => [
	{ label: `Bel ${naam.split(' ')[0]}`, href: `tel:${telefoon.replace(/\s/g, '')}`, primary: true },
	{ label: 'WhatsApp', href: `https://wa.me/${whatsappNumber(telefoon)}` },
	{ label: 'E-mail', href: `mailto:${email}` },
];

const esc = (rows) => rows.map(([label, value]) => [label, escapeHtml(value)]);

/** "Herkomst" section and plain-text lines for a parsed lead source. */
function leadSourcePart(source, foundVia) {
	const rows = leadSourceRows(source, foundVia);
	return {
		section: { heading: 'Herkomst', rows: esc(rows) },
		text: ['', 'Herkomst', ...rows.map(([l, v]) => `${l}: ${v}`)],
	};
}

/**
 * @param {Record<string, string>} values validated sign-up values
 * @param {string} place town name
 * @param {Date} [now]
 * @param {Record<string, string>} [source] parsed lead source (see lead-source.js)
 */
export function signupEmail(values, place, now = new Date(), source = {}) {
	const age = ageOn(values.geboortedatum, now);
	const birth = `${dutchDate(values.geboortedatum)} (${age} jaar)`;
	const choices = [
		['Automaat of schakel', TRANSMISSION[values.transmissie]],
		['Woonplaats', place],
		['Pakket in gedachten', `${PACKAGE[values.pakket]} (nog niet definitief)`],
	];
	const details = [
		['Naam', values.naam],
		['Geboortedatum', birth],
		['Adres', values.adres],
		['Telefoon', values.telefoon],
		['E-mail', values.email],
	];
	const lead = leadSourcePart(source, values.gevonden);

	return {
		subject: `Nieuwe inschrijving: ${values.naam} (${TRANSMISSION[values.transmissie].toLowerCase()}, ${place}) via ${leadSummary(source, values.gevonden)}`,
		html: renderEmail({
			badge: 'Nieuwe inschrijving',
			title: values.naam,
			intro: 'Neem binnen 24 uur contact op om de proefles in te plannen.',
			actions: contactActions(values.naam, values.telefoon, values.email),
			sections: [
				{ heading: 'Keuzes', rows: esc(choices) },
				{ heading: 'Gegevens', rows: esc(details) },
				lead.section,
			],
		}),
		text: [
			'Nieuwe inschrijving via de website',
			'',
			...choices.map(([l, v]) => `${l}: ${v}`),
			'',
			...details.map(([l, v]) => `${l}: ${v}`),
			...lead.text,
		].join('\n'),
	};
}

/**
 * @param {{ naam: string, email: string, telefoon: string, onderwerp: string, bericht: string, gevonden?: string }} values
 * @param {Record<string, string>} [source] parsed lead source (see lead-source.js)
 */
export function contactEmail(values, source = {}) {
	const lead = leadSourcePart(source, values.gevonden);
	const details = [
		['Naam', values.naam],
		['Telefoon', values.telefoon],
		['E-mail', values.email],
		['Onderwerp', values.onderwerp],
	];
	return {
		subject: `Contactformulier: ${values.onderwerp} (via ${leadSummary(source, values.gevonden)})`,
		html: renderEmail({
			badge: 'Contactformulier',
			title: values.onderwerp,
			intro: `Bericht van ${values.naam}.`,
			actions: contactActions(values.naam, values.telefoon, values.email),
			sections: [{ heading: 'Gegevens', rows: esc(details) }, lead.section],
			message: values.bericht,
		}),
		text: [...details.map(([l, v]) => `${l}: ${v}`), '', values.bericht, ...lead.text].join('\n'),
	};
}

// ---------- automatic confirmation for the visitor ----------
// The address comes from a public form, so these mails never repeat free text the visitor
// typed (name, message): the form can't be used to send someone else's text to a stranger.

const CONFIRMATION = {
	nl: {
		signupSubject: 'Bedankt voor je inschrijving bij Rijschool All Drive',
		signupBadge: 'Inschrijving ontvangen',
		signupTitle: 'Je inschrijving is binnen!',
		signupIntro:
			'Bedankt voor je inschrijving en dat je kiest voor Rijschool All Drive. We nemen zo snel mogelijk contact met je op om je proefles in te plannen.',
		signupHeading: 'Je inschrijving',
		transmission: 'Automaat of schakel',
		package: 'Pakket in gedachten',
		packageNote: 'nog niet definitief',
		contactSubject: 'Bedankt voor je bericht aan Rijschool All Drive',
		contactBadge: 'Bericht ontvangen',
		contactTitle: 'Je bericht is binnen!',
		contactIntro:
			'Bedankt voor je vraag en dat je kiest voor Rijschool All Drive. We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.',
		nextHeading: 'Wat gebeurt er nu?',
		nextSteps: [
			'We nemen zo snel mogelijk contact met je op.',
			'Samen plannen we je proefles.',
			'Na de proefles krijg je een lesadvies.',
		],
		ctaHeading: 'Vragen in de tussentijd?',
		ctaText: 'Stuur ons een WhatsApp-bericht of bel ons, we helpen je graag.',
		whatsapp: 'WhatsApp ons',
		call: 'Bel ons',
		footer:
			'Dit is een automatisch bericht. Heb je nog een vraag? Beantwoord deze mail of stuur ons een WhatsApp-bericht.',
		values: TRANSMISSION,
		packages: PACKAGE,
	},
	en: {
		signupSubject: 'Thank you for signing up with Rijschool All Drive',
		signupBadge: 'Sign-up received',
		signupTitle: 'We’ve received your sign-up!',
		signupIntro:
			'Thank you for signing up and for choosing Rijschool All Drive. We will contact you as soon as possible to schedule your trial lesson.',
		signupHeading: 'Your sign-up',
		transmission: 'Automatic or manual',
		package: 'Package in mind',
		packageNote: 'not final yet',
		contactSubject: 'Thank you for your message to Rijschool All Drive',
		contactBadge: 'Message received',
		contactTitle: 'We’ve received your message!',
		contactIntro:
			'Thank you for your question and for choosing Rijschool All Drive. We have received your message and will get back to you as soon as possible.',
		nextHeading: 'What happens next?',
		nextSteps: [
			'We contact you as soon as possible.',
			'Together we schedule your trial lesson.',
			'After the trial lesson you get a lesson advice.',
		],
		ctaHeading: 'Questions in the meantime?',
		ctaText: 'Send us a WhatsApp message or give us a call, we are happy to help.',
		whatsapp: 'WhatsApp us',
		call: 'Call us',
		footer:
			'This is an automatic message. Any questions? Reply to this email or send us a WhatsApp message.',
		values: { automaat: 'Automatic', schakel: 'Manual', onbekend: 'Not sure yet' },
		packages: { ...PACKAGE, onbekend: 'Not sure yet' },
	},
};

const copyFor = (locale) => CONFIRMATION[locale] ?? CONFIRMATION.nl;

/** How to reach the school, as the blue call-to-action card and as plain text. */
const schoolContact = (t) => ({
	cta: {
		heading: t.ctaHeading,
		text: t.ctaText,
		actions: [
			{ label: t.whatsapp, href: business.whatsappUrl, primary: true },
			{ label: t.call, href: `tel:${business.phone}` },
		],
	},
	text: [`WhatsApp: ${business.whatsappUrl}`, `${t.call}: ${business.phoneDisplay}`],
});

/**
 * @param {Record<string, string>} values validated sign-up values
 * @param {string} locale 'nl' or 'en'
 */
export function signupConfirmationEmail(values, locale = 'nl') {
	const t = copyFor(locale);
	const contact = schoolContact(t);
	const choices = [
		[t.transmission, t.values[values.transmissie]],
		[t.package, `${t.packages[values.pakket]} (${t.packageNote})`],
	];
	return {
		subject: t.signupSubject,
		html: renderEmail({
			lang: locale,
			badge: t.signupBadge,
			title: t.signupTitle,
			intro: t.signupIntro,
			steps: { heading: t.nextHeading, items: t.nextSteps },
			sections: [{ heading: t.signupHeading, rows: choices.map(([l, v]) => [l, escapeHtml(v)]) }],
			cta: contact.cta,
			note: t.footer,
		}),
		text: [
			t.signupIntro,
			'',
			`${t.nextHeading}`,
			...t.nextSteps.map((step, i) => `${i + 1}. ${step}`),
			'',
			...choices.map(([l, v]) => `${l}: ${v}`),
			'',
			...contact.text,
			'',
			t.footer,
		].join('\n'),
	};
}

/** @param {string} locale 'nl' or 'en' */
export function contactConfirmationEmail(locale = 'nl') {
	const t = copyFor(locale);
	const contact = schoolContact(t);
	return {
		subject: t.contactSubject,
		html: renderEmail({
			lang: locale,
			badge: t.contactBadge,
			title: t.contactTitle,
			intro: t.contactIntro,
			cta: contact.cta,
			note: t.footer,
		}),
		text: [t.contactIntro, '', ...contact.text, '', t.footer].join('\n'),
	};
}
