import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

function randomDigit() {
	return Math.floor(Math.random() * 9) + 1;
}

export function load() {
	return {
		captchaA: randomDigit(),
		captchaB: randomDigit(),
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const naam = data.get('naam')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const telefoon = data.get('telefoon')?.toString().trim() ?? '';
		const onderwerp = data.get('onderwerp')?.toString().trim() ?? '';
		const bericht = data.get('bericht')?.toString().trim() ?? '';
		const captchaAnswer = data.get('captcha')?.toString().trim() ?? '';
		const captchaA = Number(data.get('captcha_a'));
		const captchaB = Number(data.get('captcha_b'));

		const values = { naam, email, telefoon, onderwerp, bericht };

		if (!naam || !email || !telefoon || !onderwerp || !bericht) {
			return fail(400, { error: 'required', values, captchaA, captchaB });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'email', values, captchaA, captchaB });
		}

		if (Number(captchaAnswer) !== captchaA + captchaB) {
			return fail(400, { error: 'captcha', values, captchaA, captchaB });
		}

		const toEmail = env.CONTACT_TO_EMAIL || 'info@rijschoolalldrive.nl';

		try {
			const transporter = nodemailer.createTransport({
				host: env.SMTP_HOST,
				port: Number(env.SMTP_PORT) || 587,
				secure: env.SMTP_SECURE === 'true',
				auth: {
					user: env.SMTP_USER,
					pass: env.SMTP_PASS,
				},
			});

			await transporter.sendMail({
				from: env.SMTP_USER,
				to: toEmail,
				replyTo: email,
				subject: `Contactformulier: ${onderwerp}`,
				text: [
					`Naam: ${naam}`,
					`E-mail: ${email}`,
					`Telefoon: ${telefoon}`,
					`Onderwerp: ${onderwerp}`,
					'',
					bericht,
				].join('\n'),
			});
		} catch (error) {
			console.error('Failed to send contact form email:', error);
			return fail(500, { error: 'send', values, captchaA, captchaB });
		}

		return { success: true };
	},
};
