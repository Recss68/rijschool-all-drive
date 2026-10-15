import { describe, expect, it } from 'vitest';
import { signupEmail, contactEmail } from './form-emails.js';
import { whatsappNumber, escapeHtml } from './email.js';

const signup = {
	transmissie: 'schakel',
	plaats: 'oostzaan',
	pakket: 'vol-gas',
	naam: 'Sanne <img src=x onerror=alert(1)>',
	geboortedatum: '2008-03-14',
	adres: 'Straatnaam 1, 1511 AA Oostzaan',
	telefoon: '06 12345678',
	email: 'sanne@example.com',
};

describe('form emails', () => {
	it('sign-up mail has every field, the age and escaped visitor input', () => {
		const mail = signupEmail(signup, 'Oostzaan', new Date('2026-10-15'));
		expect(mail.subject).toContain('Nieuwe inschrijving');
		expect(mail.text).toContain('Geboortedatum: 14-03-2008 (18 jaar)');
		expect(mail.text).toContain('Pakket in gedachten: Vol Gas (nog niet definitief)');
		expect(mail.html).toContain('14-03-2008 (18 jaar)');
		expect(mail.html).not.toContain('<img src=x');
		expect(mail.html).toContain('&lt;img src=x');
		expect(mail.html).toContain('https://wa.me/31612345678');
		expect(mail.html).toContain('tel:0612345678');
	});

	it('contact mail escapes the message', () => {
		const mail = contactEmail({
			naam: 'Jan',
			email: 'jan@example.com',
			telefoon: '+31 6 87654321',
			onderwerp: 'Vraag',
			bericht: '<script>alert(1)</script>',
		});
		expect(mail.html).not.toContain('<script>alert');
		expect(mail.html).toContain('https://wa.me/31687654321');
	});

	it('normalises Dutch phone numbers for WhatsApp', () => {
		expect(whatsappNumber('06 12345678')).toBe('31612345678');
		expect(whatsappNumber('+31 6 12345678')).toBe('31612345678');
		expect(whatsappNumber('0031612345678')).toBe('31612345678');
		expect(escapeHtml(`"'&<>`)).toBe('&quot;&#39;&amp;&lt;&gt;');
	});
});
