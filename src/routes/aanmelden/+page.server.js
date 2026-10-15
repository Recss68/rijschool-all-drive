import { fail, redirect } from '@sveltejs/kit';
import { localizeHref } from '$lib/paraglide/runtime';
import { cities } from '$lib/data/cities';
import { sendToSchool } from '$lib/server/mail.js';
import { verifyTurnstile, turnstileSecret } from '$lib/server/turnstile.js';
import { validateSignup } from '$lib/server/signup.js';

export function load({ url }) {
	return { pakket: url.searchParams.get('pakket') };
}

const labels = {
	transmissie: { automaat: 'Automaat', schakel: 'Schakel', onbekend: 'Weet ik nog niet' },
	pakket: {
		'rij-start': 'Rij Start',
		'door-rij': 'Door Rij',
		'vol-gas': 'Vol Gas',
		onbekend: 'Weet ik nog niet',
	},
};

const thanksUrl = () => localizeHref('/bedankt?form=aanmelden');

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot: real visitors never see or fill this field; bots get the normal ending
		if (String(data.get('website') ?? '').trim()) redirect(303, thanksUrl());

		const { values, errors } = validateSignup(
			data,
			cities.map((c) => c.slug)
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

		try {
			await sendToSchool({
				replyTo: values.email,
				subject: `Nieuwe inschrijving: ${values.naam}`,
				text: [
					'Nieuwe inschrijving via de website',
					'',
					`Automaat of schakel: ${labels.transmissie[values.transmissie]}`,
					`Woonplaats: ${place}`,
					`Pakket in gedachten: ${labels.pakket[values.pakket]} (nog niet definitief)`,
					'',
					`Naam: ${values.naam}`,
					`Adres: ${values.adres}`,
					`Telefoon: ${values.telefoon}`,
					`E-mail: ${values.email}`,
				].join('\n'),
			});
		} catch (error) {
			console.error('Failed to send sign-up email:', error);
			return fail(500, { values, errors: { form: 'send' } });
		}

		// The thank-you page is the conversion URL for Google Ads
		redirect(303, thanksUrl());
	},
};
