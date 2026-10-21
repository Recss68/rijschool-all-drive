<!-- Optional "How did you find us?" question. Always shown, so visitors who decline cookies can still tell us. -->
<div class="field">
	<label for={id}>{m.found_via_label()} <span class="optional">{m.form_optional()}</span></label>
	<select {id} name="gevonden" {value}>
		<option value="">{m.found_via_placeholder()}</option>
		{#each foundViaOptions as option (option.id)}
			<option value={option.id}>{pickByLocale(option)}</option>
		{/each}
	</select>
</div>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { foundViaOptions } from '$lib/data/found-via.js';

	/** @type {{ id: string, value?: string }} */
	let { id, value = '' } = $props();
</script>

<style>
	.field {
		display: grid;
		gap: var(--space-2);
		min-width: 0;
	}

	label {
		font-weight: var(--fw-semibold);
		font-size: var(--fs-label-s-mobile);
		color: var(--c-navy-900);
	}

	.optional {
		font-weight: var(--fw-regular);
		color: var(--c-text-light);
	}

	select {
		width: 100%;
		/* 16px avoids the iOS zoom on focus */
		font-size: 16px;
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--c-border-gray);
		border-radius: var(--radius-softest);
		background-color: var(--c-white);
		color: var(--c-text);
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 1px;
			border-color: var(--c-accent);
		}
	}
</style>
