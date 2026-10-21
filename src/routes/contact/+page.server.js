import { fail, redirect } from '@sveltejs/kit';
import { localizeHref, getLocale } from '$lib/paraglide/runtime';
import { sendToSchool, sendConfirmation } from '$lib/server/mail.js';
import { contactEmail, contactConfirmationEmail } from '$lib/server/form-emails.js';
import { verifyTurnstile, turnstileSecret } from '$lib/server/turnstile.js';
import { parseLeadSource } from '$lib/server/lead-source.js';

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		const naam = data.get('naam')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const telefoon = data.get('telefoon')?.toString().trim() ?? '';
		const onderwerp = data.get('onderwerp')?.toString().trim() ?? '';
		const bericht = data.get('bericht')?.toString().trim() ?? '';
		const gevonden = data.get('gevonden')?.toString().trim().slice(0, 40) ?? '';

		const values = { naam, email, telefoon, onderwerp, bericht, gevonden };

		if (!naam || !email || !telefoon || !onderwerp || !bericht) {
			return fail(400, { error: 'required', values });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'email', values });
		}

		// Honeypot: real visitors never see or fill this field
		if (data.get('website')?.toString().trim())
			redirect(303, localizeHref('/bedankt?form=contact'));

		const human = await verifyTurnstile(data.get('cf-turnstile-response'), {
			secret: turnstileSecret(),
			ip: getClientAddress(),
		});
		if (!human) return fail(400, { error: 'captcha', values });

		const source = parseLeadSource(data.get('herkomst'));

		try {
			await sendToSchool({
				replyTo: email,
				...contactEmail(values, source),
			});
		} catch (error) {
			console.error('Failed to send contact form email:', error);
			return fail(500, { error: 'send', values });
		}

		// Automatic confirmation for the visitor; a failure here never fails the form
		await sendConfirmation({ to: email, ...contactConfirmationEmail(getLocale()) });

		// The thank-you page is the conversion URL for Google Ads
		redirect(303, localizeHref('/bedankt?form=contact'));
	},
};
