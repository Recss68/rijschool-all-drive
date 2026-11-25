// Catches CSS mistakes (unknown properties, invalid values, duplicate selectors) in the global
// stylesheet and in the <style> blocks of Svelte components. Formatting is left to Prettier.
export default {
	extends: ['stylelint-config-recommended', 'stylelint-config-html/svelte'],
	rules: {
		// Svelte's :global() escapes component scoping
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
		// mostly noise with nested, component-scoped styles, where order follows the markup
		'no-descending-specificity': null,
	},
};
