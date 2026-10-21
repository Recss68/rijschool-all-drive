// Helper for the Telegram form notifications (see src/lib/server/notify.js).
//   npm run telegram:chat-id  -> lists the chat ids of everyone who sent /start to the bot
//   npm run telegram:test     -> sends a test message to every id in TELEGRAM_CHAT_ID
// Reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID from .env. Never prints the token.
try {
	process.loadEnvFile('.env');
} catch {
	// no .env: use the environment as is
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
	console.error('TELEGRAM_BOT_TOKEN ontbreekt in .env');
	process.exit(1);
}
const api = (method, body) =>
	fetch(`https://api.telegram.org/bot${token}/${method}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body ?? {}),
	}).then((res) => res.json());

const command = process.argv[2];

if (command === 'chat-id') {
	const { ok, result, description } = await api('getUpdates');
	if (!ok) {
		console.error('Telegram gaf een fout:', description);
		process.exit(1);
	}
	const chats = new Map();
	for (const update of result) {
		const chat = update.message?.chat;
		if (chat)
			chats.set(
				chat.id,
				[chat.first_name, chat.last_name, chat.username && `@${chat.username}`]
					.filter(Boolean)
					.join(' ')
			);
	}
	if (!chats.size) {
		console.log(
			'Nog geen berichten gevonden. Stuur eerst /start naar de bot in Telegram en probeer het opnieuw.'
		);
	} else {
		console.log('Chat-ID’s (zet ze komma-gescheiden in TELEGRAM_CHAT_ID):');
		for (const [id, name] of chats) console.log(`  ${id}  ${name}`);
	}
} else if (command === 'test') {
	const ids = String(process.env.TELEGRAM_CHAT_ID ?? '')
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);
	if (!ids.length) {
		console.error('TELEGRAM_CHAT_ID ontbreekt in .env (gebruik eerst npm run telegram:chat-id)');
		process.exit(1);
	}
	for (const chat_id of ids) {
		const { ok, description } = await api('sendMessage', {
			chat_id,
			parse_mode: 'HTML',
			text: '✅ <b>Testmelding</b>\n\nMeldingen van rijschoolalldrive.nl komen goed aan. Bij elke inschrijving of elk contactformulier krijg je hier een bericht.',
		});
		console.log(ok ? `Verstuurd naar ${chat_id}` : `Mislukt voor ${chat_id}: ${description}`);
	}
} else {
	console.log('Gebruik: npm run telegram:chat-id  of  npm run telegram:test');
}
