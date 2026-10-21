<!--
	Hero actions on every page: sign up (primary), WhatsApp (secondary) and a call link.
	Services without a sign-up (intensive course, refresher course, driving assessment)
	keep WhatsApp as their primary action.
-->
<div class="cta" class:center>
	<div class="cta-buttons">
		{#if variant !== 'trial'}
			<a class="btn-white" href={business.whatsappUrl}
				>{ctaCopy(variant).button} <span class="arrow" aria-hidden="true">→</span></a
			>
		{:else}
			<a class="btn-white" href={localizeHref('/aanmelden')} data-signup
				>{m.cta_signup()} <span class="arrow" aria-hidden="true">→</span></a
			>
			<a class="btn-outline" href={business.whatsappUrl}>{m.cta_whatsapp_short()}</a>
		{/if}
	</div>
	<a class="call" href="tel:{business.phone}">{m.cta_or_call({ phone: business.phoneDisplay })}</a>
</div>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { ctaCopy } from '$lib/utils/cta-copy';

	/** @type {{ variant?: 'trial' | 'intensive' | 'refresher' | 'drivingTest', center?: boolean }} */
	let { variant = 'trial', center = false } = $props();
</script>

<style>
	.cta {
		margin-top: var(--space-6);
		&.center {
			text-align: center;
			.cta-buttons {
				justify-content: center;
			}
		}
	}

	.cta-buttons {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		/* long labels wrap into even lines, so the arrow never ends up alone */
		a {
			text-wrap: balance;
		}
		@media (min-width: 768px) {
			flex-direction: row;
		}
	}

	.call {
		display: inline-block;
		margin-top: var(--space-3);
		padding-block: var(--space-2);
		color: var(--c-text-lighter);
		font-size: var(--fs-label-s-mobile);
		text-decoration: underline;
		text-underline-offset: 3px;
		&:hover {
			color: var(--c-white);
		}
		&:focus-visible {
			outline: 2px solid var(--c-white);
			outline-offset: 2px;
			border-radius: 4px;
		}
	}
</style>
