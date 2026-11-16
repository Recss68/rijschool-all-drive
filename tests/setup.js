// Builds the site once and serves it with `vite preview` for the integration tests.
import { spawn, execSync } from 'node:child_process';

// TEST_PORT picks another port when 4173 is taken (e.g. by another project's preview)
export const PORT = Number(process.env.TEST_PORT) || 4173;

export default async function setup() {
	const base = `http://localhost:${PORT}`;
	// a server already on this port would answer instead of this build: stop loudly
	const taken = await fetch(base).then(
		() => true,
		() => false
	);
	if (taken) {
		throw new Error(
			`Port ${PORT} is already in use by another server. Stop it, or run the tests with TEST_PORT=<free port>.`
		);
	}

	execSync('npx vite build', { stdio: 'ignore' });
	const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
		stdio: 'ignore',
		// Cloudflare's official Turnstile test keys (always pass)
		env: {
			...process.env,
			PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
			TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
		},
	});
	for (let i = 0; i < 60; i++) {
		try {
			await fetch(base);
			break;
		} catch {
			await new Promise((r) => setTimeout(r, 500));
		}
	}
	return () => server.kill();
}
