// HTML emails for the school's inbox, in the All Drive style. Email clients only support
// tables and inline styles, so the layout is deliberately old-fashioned. All visitor input
// is escaped.
import { business } from '$lib/data/business.js';

const C = {
	navy: '#002646',
	accent: '#155dfc',
	text: '#19252e',
	muted: '#4a5565',
	border: '#e5e7eb',
	bg: '#f5f8fa',
	chip: '#dbeafe',
};
const FONT = "'DM Sans', Arial, Helvetica, sans-serif";

/** @param {unknown} value */
export const escapeHtml = (value) =>
	String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

/** Dutch phone number to the international digits WhatsApp expects (0612… -> 31612…). */
export function whatsappNumber(phone) {
	const digits = String(phone).replace(/[^\d+]/g, '');
	if (digits.startsWith('+')) return digits.slice(1);
	if (digits.startsWith('00')) return digits.slice(2);
	if (digits.startsWith('0')) return `31${digits.slice(1)}`;
	return digits;
}

const row = ([label, value]) => `
	<tr>
		<td style="padding:10px 0;border-top:1px solid ${C.border};width:38%;vertical-align:top;font:14px/1.5 ${FONT};color:${C.muted};">${escapeHtml(label)}</td>
		<td style="padding:10px 0;border-top:1px solid ${C.border};vertical-align:top;font:600 15px/1.5 ${FONT};color:${C.text};">${value}</td>
	</tr>`;

const section = ({ heading, rows }) => `
	<tr><td style="padding:24px 32px 0;">
		<h2 style="margin:0 0 4px;font:700 13px/1.4 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${C.accent};">${escapeHtml(heading)}</h2>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows.map(row).join('')}</table>
	</td></tr>`;

const button = ({ label, href, primary }) =>
	`<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:12px;font:600 14px/1 ${FONT};text-decoration:none;${
		primary
			? `background:${C.accent};color:#ffffff;`
			: `background:#ffffff;color:${C.accent};border:1px solid ${C.accent};`
	}">${escapeHtml(label)}</a>`;

/**
 * @param {{
 *   badge: string, title: string, intro?: string,
 *   sections: { heading: string, rows: [string, string][] }[],
 *   actions?: { label: string, href: string, primary?: boolean }[],
 *   message?: string,
 * }} email row values must already be escaped (use escapeHtml); labels are escaped here
 */
export function renderEmail({ badge, title, intro, sections, actions = [], message }) {
	return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:24px 12px;">
<tr><td align="center">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${C.border};border-radius:16px;overflow:hidden;">
		<tr><td style="background:${C.navy};padding:24px 32px;">
			<p style="margin:0;font:800 20px/1.2 ${FONT};color:#ffffff;">Rijschool <span style="color:#7fb0ff;">All Drive</span></p>
		</td></tr>
		<tr><td style="padding:28px 32px 0;">
			<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${C.chip};font:700 12px/1.6 ${FONT};color:${C.accent};">${escapeHtml(badge)}</span>
			<h1 style="margin:12px 0 0;font:800 24px/1.25 ${FONT};color:${C.navy};">${escapeHtml(title)}</h1>
			${intro ? `<p style="margin:8px 0 0;font:15px/1.6 ${FONT};color:${C.muted};">${escapeHtml(intro)}</p>` : ''}
		</td></tr>
		${actions.length ? `<tr><td style="padding:20px 32px 0;">${actions.map(button).join('')}</td></tr>` : ''}
		${sections.map(section).join('')}
		${
			message
				? `<tr><td style="padding:24px 32px 0;">
			<h2 style="margin:0 0 8px;font:700 13px/1.4 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${C.accent};">Bericht</h2>
			<div style="padding:16px;border-left:4px solid ${C.accent};border-radius:8px;background:${C.bg};font:15px/1.6 ${FONT};color:${C.text};white-space:pre-wrap;">${escapeHtml(message)}</div>
		</td></tr>`
				: ''
		}
		<tr><td style="padding:28px 32px;">
			<p style="margin:0;padding-top:16px;border-top:1px solid ${C.border};font:12px/1.6 ${FONT};color:${C.muted};">
				Verstuurd via het formulier op ${escapeHtml(business.url.replace('https://', ''))}. Als je op deze mail antwoordt, gaat je antwoord direct naar de afzender.
			</p>
		</td></tr>
	</table>
</td></tr>
</table>
</body></html>`;
}
