import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import { business } from '$lib/data/business.js';

/**
 * Sends a form submission to the school's inbox (SMTP settings come from the environment).
 * @param {{ subject: string, text: string, replyTo?: string }} message
 */
export async function sendToSchool({ subject, text, replyTo }) {
	const transporter = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT) || 587,
		secure: env.SMTP_SECURE === 'true',
		auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
	});
	await transporter.sendMail({
		from: env.SMTP_USER,
		to: env.CONTACT_TO_EMAIL || business.email,
		replyTo,
		subject,
		text,
	});
}
