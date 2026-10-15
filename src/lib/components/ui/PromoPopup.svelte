<!--
	Temporary offer (free CBR interim test). A popup that appears once per visitor a few
	seconds after the cookie choice, and afterwards a slim tab on the right that reopens it.
	The tab tucks away while scrolling so it never covers what you are reading.
-->
{#if active}
	<dialog
		bind:this={dialog}
		class="promo"
		aria-labelledby="promo-title"
		onclose={markSeen}
		onclick={(e) => e.target === dialog && dialog.close()}
	>
		<div class="layout">
			<div class="visual">
				<picture>
					<source srcset="/images/alldrive-auto.avif" type="image/avif" />
					<source srcset="/images/alldrive-auto.webp" type="image/webp" />
					<img
						src="/images/alldrive-auto.jpg"
						alt={m.alt_car()}
						width="1536"
						height="1024"
						loading="lazy"
					/>
				</picture>
				<span class="value">{m.promo_value({ price })}</span>
			</div>

			<div class="content">
				<button
					type="button"
					class="close"
					aria-label={m.signup_close()}
					onclick={() => dialog.close()}
				>
					<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
						<path
							d="M6 6l12 12M18 6L6 18"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						></path>
					</svg>
				</button>
				<span class="badge">{m.promo_badge()}</span>
				<h2 id="promo-title">{m.promo_title()}</h2>
				<p>{m.promo_text_1({ price })}</p>
				<p>{m.promo_text_2()}</p>
				<div class="actions">
					<a
						class="btn-secondary"
						href={localizeHref('/aanmelden')}
						data-signup
						onclick={() => dialog.close()}>{m.cta_signup()} <span aria-hidden="true">→</span></a
					>
					<a class="packages" href={localizeHref('/prijzen')} onclick={() => dialog.close()}
						>{m.promo_packages()}</a
					>
				</div>
				<button type="button" class="dismiss" onclick={() => dialog.close()}
					>{m.promo_dismiss()}</button
				>
			</div>
		</div>
	</dialog>

	{#if seen}
		<button type="button" class="tab" class:tucked aria-label={m.promo_tab_aria()} onclick={open}>
			<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
				<path
					d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7.5 7.5h.01"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
			<span>{m.promo_badge()}</span>
		</button>
	{/if}
{/if}

<svelte:window onscroll={onScroll} />

<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref, deLocalizeUrl } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';
	import { formatEuro } from '$lib/utils/format-euro';
	import { consent } from '$lib/consent.svelte.js';

	const STORAGE_KEY = 'alldrive-promo-free-interim-exam';
	const DELAY_MS = 5000;
	/** Pages where the popup would get in the way of finishing a task */
	const QUIET_PATHS = ['/aanmelden', '/bedankt', '/privacy', '/algemene-voorwaarden'];

	const price = formatEuro(business.prices.interimExam);
	const ended = business.promoEndDate && new Date(business.promoEndDate) < new Date();
	const active = business.promoFreeInterimExam && !ended;

	let dialog = $state();
	let seen = $state(false);
	let tucked = $state(false);
	let tuckTimer;

	const quietPage = () =>
		page.status >= 400 || QUIET_PATHS.includes(deLocalizeUrl(page.url).pathname);

	function readSeen() {
		try {
			return localStorage.getItem(STORAGE_KEY) === 'seen';
		} catch {
			return false;
		}
	}

	function markSeen() {
		seen = true;
		try {
			localStorage.setItem(STORAGE_KEY, 'seen');
		} catch {
			// private mode: remembered for this visit only
		}
	}

	function open() {
		if (dialog && !dialog.open) dialog.showModal();
	}

	// Tuck the tab away while scrolling, bring it back once scrolling stops
	function onScroll() {
		if (!seen) return;
		tucked = true;
		clearTimeout(tuckTimer);
		tuckTimer = setTimeout(() => (tucked = false), 700);
	}

	onMount(() => {
		if (!active) return;
		seen = readSeen();
		if (seen) return;

		// Wait a moment, and until the cookie choice is made, so two popups never stack
		const timer = setInterval(() => {
			if (consent.open || quietPage() || document.querySelector('dialog[open]')) return;
			clearInterval(timer);
			open();
		}, DELAY_MS);
		return () => {
			clearInterval(timer);
			clearTimeout(tuckTimer);
		};
	});
</script>

<style>
	/* ---------- popup ---------- */
	.promo {
		width: min(820px, calc(100vw - 2rem));
		max-height: min(92dvh, 640px);
		padding: 0;
		border: 0;
		border-radius: var(--radius-round);
		overflow: hidden;
		box-shadow:
			0 4px 8px rgb(0 38 70 / 0.08),
			0 24px 64px rgb(0 38 70 / 0.28);
		overscroll-behavior: contain;
		&::backdrop {
			background-color: rgb(0 38 70 / 0.5);
		}
		&[open] {
			animation: pop-in 0.25s ease-out;
		}
	}

	.layout {
		display: grid;
		max-height: inherit;
		@media (min-width: 720px) {
			grid-template-columns: 1fr 1.1fr;
		}
	}

	.visual {
		position: relative;
		height: 140px;
		@media (min-width: 720px) {
			height: auto;
			min-height: 100%;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	.value {
		position: absolute;
		left: var(--space-4);
		bottom: var(--space-4);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-soft);
		background-color: var(--c-yellow);
		color: var(--c-navy-900);
		font-family: var(--font-heading);
		font-weight: var(--fw-bold);
		font-size: var(--fs-hl-sm-mobile);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
	}

	.content {
		position: relative;
		display: grid;
		align-content: start;
		gap: var(--space-3);
		padding: var(--space-6) var(--space-5) var(--space-5);
		overflow-y: auto;
		@media (min-width: 720px) {
			padding: var(--space-10) var(--space-8) var(--space-8);
		}
		h2 {
			margin: 0;
			font-size: var(--fs-hl-md);
			text-wrap: balance;
		}
		p {
			margin: 0;
			font-size: var(--fs-label-sm-mobile);
			color: var(--c-text-light);
		}
	}

	.badge {
		justify-self: start;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-round);
		background-color: var(--c-icon-bg);
		color: var(--c-span);
		font-size: var(--fs-label-s-mobile);
		font-weight: var(--fw-bold);
	}

	.close {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: 50%;
		background-color: var(--c-section);
		color: var(--c-text-light);
		cursor: pointer;
		&:hover {
			color: var(--c-navy-900);
			background-color: var(--c-border-light);
		}
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3) var(--space-5);
		margin-top: var(--space-3);
		.btn-secondary {
			min-height: 48px;
			padding-inline: var(--space-6);
		}
	}

	.packages {
		color: var(--c-accent);
		font-weight: var(--fw-semibold);
		font-size: var(--fs-label-sm-mobile);
	}

	.dismiss {
		justify-self: start;
		margin-top: var(--space-1);
		padding: var(--space-2) 0;
		border: 0;
		background: none;
		font: inherit;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.close,
	.dismiss,
	.packages,
	.actions a {
		touch-action: manipulation;
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
	}

	/* ---------- side tab ---------- */
	.tab {
		position: fixed;
		right: 0;
		top: 45%;
		z-index: 40;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-2);
		border: 0;
		/* the tab is rotated 180°, so the right-hand corners end up facing the page:
		   rounded on the inside, square against the screen edge it slides out of */
		border-radius: 0 var(--radius-soft) var(--radius-soft) 0;
		background-color: var(--c-yellow);
		color: var(--c-navy-900);
		font: inherit;
		font-size: var(--fs-label-s-mobile);
		font-weight: var(--fw-bold);
		/* reads bottom to top, like a book spine */
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		box-shadow: 0 4px 16px rgb(0 0 0 / 0.18);
		cursor: pointer;
		touch-action: manipulation;
		transition: translate 0.3s ease;
		animation: nudge 6s ease-in-out 2s infinite;
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
		svg {
			transform: rotate(90deg);
		}
	}

	/* while scrolling only a sliver stays visible */
	.tab.tucked {
		translate: 75% 0;
		/* an animation would override `translate`, so it stops while tucked */
		animation: none;
	}

	/* a short back-and-forth now and then; uses `translate`, so it never fights the rotation */
	@keyframes nudge {
		0%,
		82%,
		100% {
			translate: 0 0;
		}
		86% {
			translate: -8px 0;
		}
		90% {
			translate: 0 0;
		}
		94% {
			translate: -5px 0;
		}
	}

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.98);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.promo[open],
		.tab {
			animation: none;
		}
		.tab {
			transition: none;
		}
	}
</style>
