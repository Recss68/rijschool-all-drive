module.exports = {
	root: true,
	parser: 'svelte-eslint-parser',
	plugins: ['svelte'],
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'plugin:prettier/recommended'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte/svelte',
			rules: {
				'svelte/no-navigation-without-resolve': 'off',
			},
		},
	],
};
