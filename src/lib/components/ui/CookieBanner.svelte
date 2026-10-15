<!--
	Cookie choice for Google Analytics. Not a wall: the page stays usable and the banner only
	renders in the browser, so crawlers never see it. Accept and decline are equally prominent.
-->
{#if consent.open}
	<section class="cookie-banner" aria-labelledby="cookie-title" aria-describedby="cookie-text">
		<div class="inner">
			<div class="text">
				<h2 id="cookie-title">{m.cookie_title()}</h2>
				<p id="cookie-text">
					{m.cookie_text()}
					<a href={localizeHref('/privacy')}>{m.cookie_more()}</a>
				</p>
			</div>
			<div class="buttons">
				<button type="button" class="choice" onclick={() => setConsent(false)}>
					{m.cookie_decline()}
				</button>
				<button type="button" class="choice" onclick={() => setConsent(true)}>
					{m.cookie_accept()}
				</button>
			</div>
		</div>
	</section>
{/if}

<script>
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { consent, initConsent, setConsent } from '$lib/consent.svelte.js';

	onMount(initConsent);
</script>

<style>
	.cookie-banner {
		position: fixed;
		inset: auto var(--space-4) calc(var(--space-4) + env(safe-area-inset-bottom)) var(--space-4);
		z-index: 50;
		display: flex;
		justify-content: center;
		pointer-events: none;
	}

	.inner {
		pointer-events: auto;
		width: min(100%, 880px);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4) var(--space-6);
		padding: var(--space-5) var(--space-6);
		background-color: var(--c-white);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		box-shadow:
			0 4px 8px rgb(0 38 70 / 0.08),
			0 16px 48px rgb(0 38 70 / 0.18);
		animation: rise 0.25s ease-out;
	}

	.text {
		flex: 1 1 320px;
	}

	h2 {
		margin: 0 0 var(--space-1);
		font-size: var(--fs-hl-sm-mobile);
	}

	p {
		margin: 0;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
		a {
			color: var(--c-accent);
			text-decoration: underline;
		}
	}

	.buttons {
		display: flex;
		gap: var(--space-3);
		flex: 1 1 auto;
		justify-content: flex-end;
	}

	/* equal weight for both choices (AP guidance: refusing is as easy as accepting) */
	.choice {
		flex: 1 1 0;
		min-width: 120px;
		min-height: 48px;
		padding: 0 var(--space-5);
		border: 1px solid var(--c-accent);
		border-radius: var(--radius-soft);
		background-color: var(--c-white);
		color: var(--c-accent);
		font: inherit;
		font-size: var(--fs-label-sm-mobile);
		font-weight: var(--fw-semibold);
		cursor: pointer;
		touch-action: manipulation;
		transition:
			background-color 0.15s ease-out,
			color 0.15s ease-out;
		&:hover {
			background-color: var(--c-accent);
			color: var(--c-white);
		}
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.inner {
			animation: none;
		}
		.choice {
			transition: none;
		}
	}
</style>
