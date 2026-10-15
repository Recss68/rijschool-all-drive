// Builds the site once and serves it with `vite preview` for the integration tests.
import { spawn, execSync } from 'node:child_process';

export const PORT = 4173;

export default async function setup() {
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
	const base = `http://localhost:${PORT}`;
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
