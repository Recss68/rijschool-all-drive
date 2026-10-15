<!--
	Global sign-up dialog. Any link with `data-signup` (pointing to /aanmelden) opens it;
	`data-package-id` preselects a package. Without JS those links simply open the page.
-->
<dialog
	bind:this={dialog}
	aria-labelledby="signup-dialog-title"
	onclose={() => (open = false)}
	onclick={(e) => e.target === dialog && dialog.close()}
>
	<div class="panel">
		<header>
			<h2 id="signup-dialog-title">{m.signup_title()}</h2>
			<button
				type="button"
				class="close"
				aria-label={m.signup_close()}
				onclick={() => dialog.close()}
			>
				<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
					<path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					></path>
				</svg>
			</button>
		</header>
		<p class="intro">{m.signup_intro()}</p>

		{#if open}
			<!-- keyed per opening, so every visit starts with a clean form and a fresh Turnstile check -->
			{#key opened}
				<SignupForm initialPackage={packageId} stepped onclose={() => dialog.close()} />
			{/key}
		{/if}
	</div>
</dialog>

<!-- capture phase: runs before the SvelteKit router, which skips clicks that are already handled -->
<svelte:document onclickcapture={onDocumentClick} />

<script>
	import { m } from '$lib/paraglide/messages.js';
	import SignupForm from './SignupForm.svelte';

	let dialog = $state();
	let open = $state(false);
	let packageId = $state(null);
	let opened = $state(0);

	function show(pkg) {
		packageId = pkg ?? null;
		opened += 1;
		open = true;
		dialog.showModal();
	}

	/** Intercepts sign-up links; Cmd/Ctrl/Shift/middle clicks keep opening the page itself. */
	function onDocumentClick(event) {
		const link = event.target instanceof Element ? event.target.closest('a[data-signup]') : null;
		if (!link || event.defaultPrevented) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
			return;
		event.preventDefault();
		show(link.dataset.packageId);
	}
</script>

<style>
	dialog {
		width: min(560px, calc(100vw - 2rem));
		max-height: min(92dvh, 900px);
		padding: 0;
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		box-shadow:
			0 4px 8px rgb(0 38 70 / 0.08),
			0 24px 64px rgb(0 38 70 / 0.24);
		overscroll-behavior: contain;
		&::backdrop {
			background-color: rgb(0 38 70 / 0.45);
		}
		&[open] {
			animation: dialog-in 0.2s ease-out;
		}
	}

	.panel {
		padding: var(--space-6);
		padding-bottom: calc(var(--space-6) + env(safe-area-inset-bottom));
	}

	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		h2 {
			margin: 0;
			font-size: var(--fs-hl-md);
		}
	}

	.close {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		margin: calc(var(--space-2) * -1) calc(var(--space-2) * -1) 0 0;
		border: 0;
		border-radius: 50%;
		background-color: transparent;
		color: var(--c-text-light);
		cursor: pointer;
		touch-action: manipulation;
		&:hover {
			background-color: var(--c-section);
			color: var(--c-navy-900);
		}
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
	}

	.intro {
		margin: var(--space-2) 0 var(--space-5);
		color: var(--c-text-light);
		font-size: var(--fs-label-s-mobile);
	}

	/* phones: a bottom sheet */
	@media (max-width: 600px) {
		dialog {
			width: 100vw;
			max-width: 100vw;
			margin: auto 0 0;
			border-radius: var(--radius-m) var(--radius-m) 0 0;
			&[open] {
				animation-name: sheet-in;
			}
		}
	}

	@keyframes dialog-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
	@keyframes sheet-in {
		from {
			transform: translateY(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
</style>
