// Instant phone notification for new form submissions, via a Telegram bot (free, push
// notification with sound). Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (one or more chat
// ids, comma-separated); without them nothing is sent. Never fails the form: the school's
// email is the record, this is only a heads-up.
import { env } from '$env/dynamic/private';
import { whatsappNumber } from './email.js';
import { leadSummary } from './lead-source.js';

const TRANSMISSION = { automaat: 'Automaat', schakel: 'Schakel', onbekend: 'Nog niet gekozen' };
const PACKAGE = {
	'rij-start': 'Rij Start',
	'door-rij': 'Door Rij',
	'vol-gas': 'Vol Gas',
	onbekend: 'geen pakket gekozen',
};

/** Telegram's HTML mode only needs these three escaped. */
const esc = (value) =>
	String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const firstName = (naam) => naam.trim().split(/\s+/)[0];

// Telegram buttons only allow http(s) links, so calling works by tapping the phone number
const whatsappButton = (naam, telefoon) => ({
	text: `WhatsApp ${firstName(naam)}`,
	url: `https://wa.me/${whatsappNumber(telefoon)}`,
});

/**
 * @param {Record<string, string>} values validated sign-up values
 * @param {string} place town name
 * @param {Record<string, string>} [source] parsed lead source
 */
export function signupNotification(values, place, source = {}) {
	return {
		text: [
			'🚗 <b>Nieuwe inschrijving</b>',
			'',
			`<b>${esc(values.naam)}</b>`,
			`${TRANSMISSION[values.transmissie]} · ${esc(place)} · ${PACKAGE[values.pakket]}`,
			`📞 ${esc(values.telefoon)}`,
			`✉️ ${esc(values.email)}`,
			`📍 Via: ${esc(leadSummary(source, values.gevonden))}`,
			'',
			'Alle gegevens staan in je e-mail.',
		].join('\n'),
		buttons: [whatsappButton(values.naam, values.telefoon)],
	};
}

/**
 * @param {{ naam: string, email: string, telefoon: string, onderwerp: string, bericht: string, gevonden?: string }} values
 * @param {Record<string, string>} [source] parsed lead source
 */
export function contactNotification(values, source = {}) {
	const excerpt = values.bericht.length > 300 ? `${values.bericht.slice(0, 300)}…` : values.bericht;
	return {
		text: [
			'💬 <b>Nieuw bericht via het contactformulier</b>',
			'',
			`<b>${esc(values.naam)}</b>: ${esc(values.onderwerp)}`,
			`<i>${esc(excerpt)}</i>`,
			'',
			`📞 ${esc(values.telefoon)}`,
			`✉️ ${esc(values.email)}`,
			`📍 Via: ${esc(leadSummary(source, values.gevonden))}`,
		].join('\n'),
		buttons: [whatsappButton(values.naam, values.telefoon)],
	};
}

const chatIds = () =>
	String(env.TELEGRAM_CHAT_ID ?? '')
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);

/** True when the bot token and at least one chat id are set. */
export const notificationsEnabled = () => Boolean(env.TELEGRAM_BOT_TOKEN && chatIds().length);

/**
 * Sends the notification to every configured chat. Logs failures, never throws.
 * @param {{ text: string, buttons?: { text: string, url: string }[] }} message
 * @param {typeof fetch} [fetchImpl] for tests
 */
export async function notifyTeam({ text, buttons = [] }, fetchImpl = fetch) {
	if (!notificationsEnabled()) return;
	const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
	await Promise.all(
		chatIds().map(async (chat_id) => {
			try {
				const res = await fetchImpl(url, {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({
						chat_id,
						text,
						parse_mode: 'HTML',
						link_preview_options: { is_disabled: true },
						...(buttons.length && { reply_markup: { inline_keyboard: [buttons] } }),
					}),
					signal: AbortSignal.timeout(5000),
				});
				if (!res.ok) console.error('Telegram notification failed:', res.status, await res.text());
			} catch (error) {
				console.error('Telegram notification failed:', error);
			}
		})
	);
}
