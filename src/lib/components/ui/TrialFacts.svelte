<ul class="trial-facts">
	{#if trialLesson.freeWithPackage}
		<li>{m.trial_fact_free()}</li>
	{/if}
	{#if trialLesson.minutes}
		<li>{m.trial_fact_minutes({ minutes: trialLesson.minutes })}</li>
	{/if}
	<li>{m.trial_fact_experience()}</li>
	<li>{m.trial_fact_advice()}</li>
</ul>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';

	const { trialLesson } = business;
</script>

<style>
	.trial-facts {
		list-style: none;
		padding: 0;
		margin: var(--space-4) 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-4);
		font-size: var(--fs-label-s-mobile);
		color: inherit;
		li::before {
			content: '✓';
			margin-right: var(--space-1);
			font-weight: var(--fw-bold);
		}
	}
</style>
