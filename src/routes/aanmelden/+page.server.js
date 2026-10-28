import { fail, redirect } from '@sveltejs/kit';
import { localizeHref, getLocale } from '$lib/paraglide/runtime';
import { cities, manualOnlySlugs } from '$lib/data/cities';
import { sendToSchool, sendConfirmation } from '$lib/server/mail.js';
import { verifyTurnstile, turnstileSecret } from '$lib/server/turnstile.js';
import { parseLeadSource } from '$lib/server/lead-source.js';
import { notifyTeam, signupNotification } from '$lib/server/notify.js';
import { validateSignup } from '$lib/server/signup.js';
import { signupEmail, signupConfirmationEmail } from '$lib/server/form-emails.js';

export function load({ url }) {
	return { pakket: url.searchParams.get('pakket') };
}

const thanksUrl = () => localizeHref('/bedankt?form=aanmelden');

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot: real visitors never see or fill this field; bots get the normal ending
		if (String(data.get('website') ?? '').trim()) redirect(303, thanksUrl());

		const { values, errors } = validateSignup(
			data,
			cities.map((c) => c.slug),
			new Date(),
			manualOnlySlugs
		);
		if (Object.keys(errors).length) return fail(400, { values, errors });

		const human = await verifyTurnstile(data.get('cf-turnstile-response'), {
			secret: turnstileSecret(),
			ip: getClientAddress(),
		});
		if (!human) return fail(400, { values, errors: { captcha: 'captcha' } });

		const place =
			values.plaats === 'anders'
				? values.plaats_anders
				: cities.find((c) => c.slug === values.plaats)?.name;

		const source = parseLeadSource(data.get('herkomst'));

		try {
			await sendToSchool({
				replyTo: values.email,
				...signupEmail(values, place, new Date(), source),
			});
		} catch (error) {
			console.error('Failed to send sign-up email:', error);
			return fail(500, { values, errors: { form: 'send' } });
		}

		// Confirmation for the visitor and a phone notification for the school, side by side;
		// neither can fail the form (the school's email above is the record)
		await Promise.all([
			sendConfirmation({ to: values.email, ...signupConfirmationEmail(values, getLocale()) }),
			notifyTeam(signupNotification(values, place, source)),
		]);

		// The thank-you page is the conversion URL for Google Ads
		redirect(303, thanksUrl());
	},
};
