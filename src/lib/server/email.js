// HTML emails in the All Drive house style, for the school's inbox and the visitor's
// confirmation. Email clients only support tables and inline styles, so the layout is
// deliberately old-fashioned. Colours, fonts and radii mirror src/lib/styles/ad-styles.css.
// All visitor input is escaped.
import { business } from '$lib/data/business.js';
import logoDataUrl from '$lib/assets/email-logo.png?inline';

const C = {
	navy: '#002646', // --c-navy-900, headings
	accent: '#155dfc', // --c-accent, buttons and links
	span: '#1447e6', // --c-span, badge text
	chip: '#dbeafe', // --c-icon-bg, badge background
	text: '#19252e', // --c-text
	muted: '#4a5565', // --c-text-light
	border: '#e5e7eb', // --c-border-light
	section: '#f9fafb', // --c-section, page background
	footer: '#101828', // --c-footer, header and footer bands
	footerText: '#d1d5dc', // --c-text-lighter
	button: '#f3f4f6', // --c-btn-bg-main
};
const BODY = "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
const HEADING = `'Bricolage Grotesque', ${BODY}`;
const site = business.url;

/** The logo travels inside the email (no remote image to block) and is shown via cid. */
export const LOGO_CID = 'logo@rijschoolalldrive.nl';
export const logoAttachment = () => ({
	filename: 'rijschool-all-drive.png',
	path: logoDataUrl,
	cid: LOGO_CID,
});

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

const sectionHeading = (text) =>
	`<h2 style="margin:0 0 8px;font:700 18px/1.3 ${HEADING};color:${C.navy};">${escapeHtml(text)}</h2>`;

const row = ([label, value]) => `
	<tr>
		<td style="padding:10px 0;border-top:1px solid ${C.border};width:38%;vertical-align:top;font:14px/1.5 ${BODY};color:${C.muted};">${escapeHtml(label)}</td>
		<td style="padding:10px 0;border-top:1px solid ${C.border};vertical-align:top;font:600 15px/1.5 ${BODY};color:${C.text};">${value}</td>
	</tr>`;

const section = ({ heading, rows }) => `
	<tr><td style="padding:28px 32px 0;">
		${sectionHeading(heading)}
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows.map(row).join('')}</table>
	</td></tr>`;

/** Site buttons: .btn-secondary (blue) for the main action, .btn-primary (grey) for the rest. */
const button = ({ label, href, primary }, onBlue = false) => {
	const look = onBlue
		? primary
			? `background:#ffffff;color:${C.navy};`
			: `background:transparent;color:#ffffff;border:2px solid #ffffff;`
		: primary
			? `background:${C.accent};color:#ffffff;`
			: `background:${C.button};color:${C.text};`;
	return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:13px 20px;border-radius:12px;font:600 15px/1 ${BODY};text-decoration:none;${look}">${escapeHtml(label)}</a>`;
};

/** Numbered steps, like "Hoe het werkt" on the homepage. */
const steps = ({ heading, items }) => `
	<tr><td style="padding:28px 32px 0;">
		${sectionHeading(heading)}
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
			${items
				.map(
					(item, i) => `<tr>
				<td width="44" style="padding:8px 0;vertical-align:top;">
					<div style="width:32px;height:32px;border-radius:50%;background:${C.chip};text-align:center;font:800 15px/32px ${HEADING};color:${C.span};">${i + 1}</div>
				</td>
				<td style="padding:8px 0;vertical-align:middle;font:15px/1.5 ${BODY};color:${C.text};">${escapeHtml(item)}</td>
			</tr>`
				)
				.join('')}
		</table>
	</td></tr>`;

/** Blue call-to-action card, like the "Klaar om te beginnen?" section on the site. */
const ctaBand = ({ heading, text, actions }) => `
	<tr><td style="padding:28px 32px 0;">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:16px;background:${C.accent};background-image:linear-gradient(135deg,${C.accent},${C.span});">
			<tr><td style="padding:24px;">
				<h2 style="margin:0;font:800 20px/1.25 ${HEADING};color:#ffffff;">${escapeHtml(heading)}</h2>
				${text ? `<p style="margin:6px 0 16px;font:15px/1.6 ${BODY};color:#ffffff;">${escapeHtml(text)}</p>` : '<div style="height:16px;"></div>'}
				${actions.map((a) => button(a, true)).join('')}
			</td></tr>
		</table>
	</td></tr>`;

const footerLink = (label, href) =>
	`<a href="${escapeHtml(href)}" style="color:#ffffff;text-decoration:underline;">${escapeHtml(label)}</a>`;

/**
 * @param {{
 *   badge: string, title: string, intro?: string,
 *   sections?: { heading: string, rows: [string, string][] }[],
 *   actions?: { label: string, href: string, primary?: boolean }[],
 *   steps?: { heading: string, items: string[] },
 *   cta?: { heading: string, text?: string, actions: { label: string, href: string, primary?: boolean }[] },
 *   message?: string, messageHeading?: string, note?: string, lang?: string,
 * }} email row values must already be escaped (use escapeHtml); everything else is escaped here
 */
export function renderEmail({
	badge,
	title,
	intro,
	sections = [],
	actions = [],
	steps: stepList,
	cta,
	message,
	messageHeading = 'Bericht',
	note = `Verstuurd via het formulier op ${site.replace('https://', '')}. Als je op deze mail antwoordt, gaat je antwoord direct naar de afzender.`,
	lang = 'nl',
}) {
	return `<!doctype html>
<html lang="${escapeHtml(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title>
<style>
	@font-face { font-family: 'Bricolage Grotesque'; src: url('${site}/fonts/bricolage-grotesque.woff2') format('woff2'); font-weight: 200 800; }
	@font-face { font-family: 'DM Sans'; src: url('${site}/fonts/dmsans.woff2') format('woff2'); font-weight: 100 1000; }
</style></head>
<body style="margin:0;padding:0;background:${C.section};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.section};padding:24px 12px;">
<tr><td align="center">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${C.border};border-radius:16px;overflow:hidden;">
		<tr><td style="background:${C.footer};padding:22px 32px;">
			<a href="${site}" style="text-decoration:none;"><img src="cid:${LOGO_CID}" width="200" height="52" alt="Rijschool All Drive" style="display:block;border:0;width:200px;height:auto;font:800 20px/1.2 ${HEADING};color:#ffffff;"></a>
		</td></tr>
		<tr><td style="height:4px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
		<tr><td style="padding:32px 32px 0;">
			<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${C.chip};font:700 12px/1.6 ${BODY};color:${C.span};">${escapeHtml(badge)}</span>
			<h1 style="margin:14px 0 0;font:800 28px/1.2 ${HEADING};color:${C.navy};">${escapeHtml(title)}</h1>
			${intro ? `<p style="margin:10px 0 0;font:16px/1.6 ${BODY};color:${C.muted};">${escapeHtml(intro)}</p>` : ''}
		</td></tr>
		${actions.length ? `<tr><td style="padding:20px 32px 0;">${actions.map((a) => button(a)).join('')}</td></tr>` : ''}
		${stepList ? steps(stepList) : ''}
		${sections.map(section).join('')}
		${
			message
				? `<tr><td style="padding:28px 32px 0;">
			${sectionHeading(messageHeading)}
			<div style="padding:16px;border-left:4px solid ${C.accent};border-radius:12px;background:${C.section};font:15px/1.6 ${BODY};color:${C.text};white-space:pre-wrap;">${escapeHtml(message)}</div>
		</td></tr>`
				: ''
		}
		${cta ? ctaBand(cta) : ''}
		<tr><td style="padding:28px 32px 32px;">
			<p style="margin:0;font:13px/1.6 ${BODY};color:${C.muted};">${escapeHtml(note)}</p>
		</td></tr>
		<tr><td style="background:${C.footer};padding:24px 32px;font:13px/1.8 ${BODY};color:${C.footerText};">
			<strong style="font:700 15px/1.6 ${HEADING};color:#ffffff;">${escapeHtml(business.name)}</strong><br>
			${footerLink(business.phoneDisplay, `tel:${business.phone}`)} &nbsp;·&nbsp; ${footerLink(business.email, `mailto:${business.email}`)}<br>
			${footerLink(site.replace('https://', ''), site)} &nbsp;·&nbsp; ${footerLink('Instagram', business.social.instagram)} &nbsp;·&nbsp; ${footerLink('TikTok', business.social.tiktok)}<br>
			<span style="color:${C.footerText};">KvK ${escapeHtml(business.kvk)}</span>
		</td></tr>
	</table>
</td></tr>
</table>
</body></html>`;
}
