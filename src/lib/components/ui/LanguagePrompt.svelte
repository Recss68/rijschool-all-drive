<!--
	First-visit language choice, in both languages at once. Shown before the cookie banner;
	browser-only, so crawlers never see it. Escape keeps the current language.
-->
{#if languageChoice.open}
	<dialog
		bind:this={dialog}
		class="language-prompt"
		aria-labelledby="language-prompt-title"
		oncancel={(event) => {
			event.preventDefault();
			chooseLanguage(/** @type {'nl' | 'en'} */ (getLocale()));
		}}
	>
		<img src="/images/ad_short_black.webp" width="64" height="43" alt="" class="logo" />
		<h2 id="language-prompt-title" lang="nl">Welkom bij Rijschool All Drive</h2>
		<p class="sub" lang="en">Welcome to Rijschool All Drive</p>
		<p class="question">
			<span lang="nl">Kies je taal</span> · <span lang="en">Choose your language</span>
		</p>

		<div class="choices">
			{#each ordered as option (option.locale)}
				<button
					type="button"
					class="choice"
					class:suggested={option.locale === suggested}
					lang={option.locale}
					onclick={() => chooseLanguage(option.locale)}
				>
					<span class="flag" aria-hidden="true">{option.flag}</span>
					<span class="label">
						<strong>{option.name}</strong>
						<small>{option.action}</small>
					</span>
				</button>
			{/each}
		</div>

		<p class="hint">
			<span lang="nl">Je kunt dit altijd wijzigen met de taalknop bovenaan.</span>
			<span lang="en">You can always change this with the language button at the top.</span>
		</p>
	</dialog>
{/if}

<script>
	import { onMount, tick } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import {
		languageChoice,
		initLanguageChoice,
		chooseLanguage,
		suggestedLanguage,
	} from '$lib/language-choice.svelte.js';

	let dialog = $state();
	let suggested = $state('nl');

	// Fixed copy in both languages: the visitor may not read the current one
	/** @type {{ locale: 'nl' | 'en', flag: string, name: string, action: string }[]} */
	const options = [
		{ locale: 'nl', flag: '🇳🇱', name: 'Nederlands', action: 'Ga verder in het Nederlands' },
		{ locale: 'en', flag: '🇬🇧', name: 'English', action: 'Continue in English' },
	];
	// the browser's language first
	const ordered = $derived(
		[...options].sort((a, b) => Number(b.locale === suggested) - Number(a.locale === suggested))
	);

	onMount(async () => {
		suggested = suggestedLanguage();
		initLanguageChoice();
		if (!languageChoice.open) return;
		await tick();
		dialog?.showModal();
	});
</script>

<style>
	.language-prompt {
		width: min(440px, calc(100vw - 2rem));
		padding: var(--space-8) var(--space-6) var(--space-6);
		border: 0;
		border-radius: var(--radius-round);
		background-color: var(--c-white);
		color: var(--c-text);
		text-align: center;
		box-shadow:
			0 4px 8px rgb(0 38 70 / 0.08),
			0 24px 64px rgb(0 38 70 / 0.28);
		overscroll-behavior: contain;
		&::backdrop {
			background-color: rgb(0 38 70 / 0.55);
		}
		&[open] {
			animation: pop-in 0.25s ease-out;
		}
	}

	.logo {
		display: block;
		margin: 0 auto var(--space-4);
		height: auto;
	}

	h2 {
		margin: 0;
		font-size: var(--fs-hl-md);
		color: var(--c-navy-900);
		text-wrap: balance;
	}

	.sub {
		margin: var(--space-1) 0 0;
		color: var(--c-text-light);
	}

	.question {
		margin: var(--space-6) 0 var(--space-3);
		font-weight: var(--fw-semibold);
		color: var(--c-navy-900);
	}

	.choices {
		display: grid;
		gap: var(--space-3);
	}

	.choice {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		width: 100%;
		min-height: 64px;
		padding: var(--space-3) var(--space-5);
		border: 2px solid var(--c-border-light);
		border-radius: var(--radius-soft);
		background-color: var(--c-white);
		font: inherit;
		text-align: left;
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		transition:
			border-color 0.15s ease-out,
			background-color 0.15s ease-out;
		&:hover {
			border-color: var(--c-accent);
		}
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
		&.suggested {
			border-color: var(--c-accent);
			background-color: var(--c-sky-50);
		}
	}

	.flag {
		font-size: 28px;
		line-height: 1;
	}

	.label {
		display: grid;
		strong {
			font-family: var(--font-heading);
			font-size: var(--fs-label-md);
			color: var(--c-navy-900);
		}
		small {
			color: var(--c-text-light);
			font-size: var(--fs-label-s-mobile);
		}
	}

	.hint {
		display: grid;
		gap: var(--space-1);
		margin: var(--space-5) 0 0;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.98);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.language-prompt[open] {
			animation: none;
		}
	}
</style>
