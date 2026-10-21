import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import { business } from '$lib/data/business.js';
import { logoAttachment } from './email.js';

const schoolInbox = () => env.CONTACT_TO_EMAIL || business.email;

const transport = () =>
	nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT) || 587,
		secure: env.SMTP_SECURE === 'true',
		auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
	});

/**
 * Sends a form submission to the school's inbox (SMTP settings come from the environment).
 * @param {{ subject: string, text: string, html?: string, replyTo?: string }} message
 */
export async function sendToSchool({ subject, text, html, replyTo }) {
	await transport().sendMail({
		from: env.SMTP_USER,
		to: schoolInbox(),
		replyTo,
		subject,
		text,
		html,
		attachments: [logoAttachment()],
	});
}

/**
 * Sends the automatic confirmation to the visitor who filled in a form.
 * Replies go to the school's inbox.
 * @param {{ to: string, subject: string, text: string, html: string }} message
 */
export async function sendToVisitor({ to, subject, text, html }) {
	await transport().sendMail({
		from: { name: business.name, address: env.SMTP_USER },
		to,
		replyTo: schoolInbox(),
		subject,
		text,
		html,
		attachments: [logoAttachment()],
	});
}

/**
 * Sends the visitor's confirmation without ever failing the form: the school already has
 * the submission, so a bounce or SMTP hiccup here is only logged.
 * @param {Parameters<typeof sendToVisitor>[0]} message
 */
export async function sendConfirmation(message) {
	try {
		await sendToVisitor(message);
	} catch (error) {
		console.error('Failed to send confirmation email:', error);
	}
}
