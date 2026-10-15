import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

// Unit tests (src/**/*.test.js) test the generators directly; integration tests
// (tests/**/*.test.js) run against a production build served by `vite preview`.
export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			include: ['src/**/*.test.js', 'tests/**/*.test.js'],
			environment: 'node',
			globalSetup: ['tests/setup.js'],
			testTimeout: 20000,
			hookTimeout: 180000,
		},
	})
);
