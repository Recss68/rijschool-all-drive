import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { urlPatterns } from './src/lib/i18n/routes.js';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			// The language is part of the URL (/en/...), so crawlers can index both versions
			strategy: ['url', 'baseLocale'],
			urlPatterns,
		}),
	],
});
