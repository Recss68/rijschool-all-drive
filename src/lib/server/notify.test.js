import { beforeEach, describe, expect, it, vi } from 'vitest';

const env = vi.hoisted(() => ({}));
vi.mock('$env/dynamic/private', () => ({ env }));

const { signupNotification, contactNotification, notifyTeam, notificationsEnabled } =
	await import('./notify.js');

const signup = {
	transmissie: 'automaat',
	pakket: 'door-rij',
	naam: 'Sanne <b>de</b> Vries',
	telefoon: '06 12345678',
	email: 'sanne@example.com',
	gevonden: 'instagram',
};

describe('phone notification (Telegram)', () => {
	beforeEach(() => {
		for (const key of Object.keys(env)) delete env[key];
	});

	it('sign-up notification has the essentials, escaped, with a WhatsApp button', () => {
		const { text, buttons } = signupNotification(signup, 'Diemen', {});
		expect(text).toContain('Nieuwe inschrijving');
		expect(text).toContain('Automaat · Diemen · Door Rij');
		expect(text).toContain('Sanne &lt;b&gt;de&lt;/b&gt; Vries');
		expect(text).toContain('Via: Instagram (zelf opgegeven)');
		expect(buttons).toEqual([{ text: 'WhatsApp Sanne', url: 'https://wa.me/31612345678' }]);
	});

	it('contact notification shortens long messages', () => {
		const { text } = contactNotification({
			naam: 'Jan',
			email: 'jan@example.com',
			telefoon: '0612345678',
			onderwerp: 'Vraag',
			bericht: 'a'.repeat(500),
		});
		expect(text).toContain(`${'a'.repeat(300)}…`);
		expect(text).not.toContain('a'.repeat(301));
	});

	it('sends nothing until the bot token and chat id are set', async () => {
		const fetchImpl = vi.fn();
		await notifyTeam({ text: 'x' }, fetchImpl);
		expect(notificationsEnabled()).toBe(false);
		expect(fetchImpl).not.toHaveBeenCalled();
	});

	it('sends to every chat id and never throws', async () => {
		env.TELEGRAM_BOT_TOKEN = 'TOKEN';
		env.TELEGRAM_CHAT_ID = '111, 222';
		const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
		const fetchImpl = vi
			.fn()
			.mockResolvedValueOnce({ ok: true })
			.mockRejectedValueOnce(new Error('network down'));
		await expect(notifyTeam({ text: 'Hallo', buttons: [] }, fetchImpl)).resolves.toBeUndefined();
		expect(fetchImpl).toHaveBeenCalledTimes(2);
		const [url, init] = fetchImpl.mock.calls[0];
		expect(url).toBe('https://api.telegram.org/botTOKEN/sendMessage');
		expect(JSON.parse(init.body)).toMatchObject({
			chat_id: '111',
			text: 'Hallo',
			parse_mode: 'HTML',
		});
		expect(errors).toHaveBeenCalledOnce();
		errors.mockRestore();
	});
});
