// Content of the emails the school receives from the sign-up and contact forms.
import { renderEmail, escapeHtml, whatsappNumber } from './email.js';
import { ageOn } from './signup.js';

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

/**
 * @param {Record<string, string>} values validated sign-up values
 * @param {string} place town name
 */
export function signupEmail(values, place, now = new Date()) {
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
	const esc = (rows) => rows.map(([label, value]) => [label, escapeHtml(value)]);

	return {
		subject: `Nieuwe inschrijving: ${values.naam} (${TRANSMISSION[values.transmissie].toLowerCase()}, ${place})`,
		html: renderEmail({
			badge: 'Nieuwe inschrijving',
			title: values.naam,
			intro: 'Neem binnen 24 uur contact op om de proefles in te plannen.',
			actions: contactActions(values.naam, values.telefoon, values.email),
			sections: [
				{ heading: 'Keuzes', rows: esc(choices) },
				{ heading: 'Gegevens', rows: esc(details) },
			],
		}),
		text: [
			'Nieuwe inschrijving via de website',
			'',
			...choices.map(([l, v]) => `${l}: ${v}`),
			'',
			...details.map(([l, v]) => `${l}: ${v}`),
		].join('\n'),
	};
}

/** @param {{ naam: string, email: string, telefoon: string, onderwerp: string, bericht: string }} values */
export function contactEmail(values) {
	const details = [
		['Naam', values.naam],
		['Telefoon', values.telefoon],
		['E-mail', values.email],
		['Onderwerp', values.onderwerp],
	];
	return {
		subject: `Contactformulier: ${values.onderwerp}`,
		html: renderEmail({
			badge: 'Contactformulier',
			title: values.onderwerp,
			intro: `Bericht van ${values.naam}.`,
			actions: contactActions(values.naam, values.telefoon, values.email),
			sections: [{ heading: 'Gegevens', rows: details.map(([l, v]) => [l, escapeHtml(v)]) }],
			message: values.bericht,
		}),
		text: [...details.map(([l, v]) => `${l}: ${v}`), '', values.bericht].join('\n'),
	};
}
