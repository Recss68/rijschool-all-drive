<div class="language-switcher language-switcher--dropdown">
	<button
		type="button"
		class="language-switcher__toggle"
		aria-haspopup="true"
		aria-expanded={open}
		aria-label={m.language_switcher_aria()}
		onclick={() => (open = !open)}
	>
		<span class="flag" aria-hidden="true">{languageFlags[getLocale()]}</span>
		{getLocale().toUpperCase()}
	</button>

	{#if open}
		<ul class="language-switcher__menu" role="menu">
			{#each locales as locale (locale)}
				<li role="none">
					<button
						type="button"
						role="menuitemradio"
						data-locale={locale}
						aria-checked={locale === getLocale()}
						class:is-active={locale === getLocale()}
						onclick={() => selectLocale(locale)}
					>
						<span class="flag" aria-hidden="true">{languageFlags[locale]}</span>
						{languageLabels[locale]()}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<div
	class="language-switcher language-switcher--inline"
	role="group"
	aria-label={m.language_switcher_aria()}
>
	{#each locales as locale (locale)}
		<button
			type="button"
			data-locale={locale}
			aria-pressed={locale === getLocale()}
			class:is-active={locale === getLocale()}
			onclick={() => selectLocale(locale)}
		>
			<span class="flag" aria-hidden="true">{languageFlags[locale]}</span>
			{locale.toUpperCase()}
		</button>
	{/each}
</div>

<svelte:window onclick={handleOutsideClick} />

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';

	let open = $state(false);

	const languageLabels = {
		nl: m.language_nl,
		en: m.language_en,
	};

	const languageFlags = {
		nl: '🇳🇱',
		en: '🇬🇧',
	};

	function selectLocale(locale) {
		open = false;
		setLocale(locale);
	}

	function handleOutsideClick(event) {
		if (!open) return;
		if (!event.target.closest('.language-switcher')) open = false;
	}
</script>

<style>
	.language-switcher {
		position: relative;
	}

	.language-switcher__toggle {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--fs-label-sm);
		color: var(--c-text);
		padding: var(--space-2);
		text-transform: uppercase;
	}

	.language-switcher__menu {
		list-style: none;
		margin: 0;
		padding: var(--space-2);
		position: absolute;
		top: calc(100% + var(--space-2));
		right: 0;
		background-color: var(--c-white);
		border-radius: var(--radius-soft);
		box-shadow: var(--shadow-m);
		min-width: 140px;
		z-index: 100;
	}

	.language-switcher__menu button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--space-2);
		border-radius: var(--radius-softest);
		font-size: var(--fs-label-sm);
		color: var(--c-text);
		transition: all 0.2s ease-in-out;

		&:hover {
			color: var(--hover-state);
			background-color: var(--hover-state-x);
		}

		&.is-active {
			font-weight: var(--fw-semibold);
			color: var(--c-accent);
		}
	}

	.flag {
		font-size: 1.1em;
		line-height: 1;
	}

	.language-switcher--dropdown {
		display: none;
	}

	.language-switcher--inline {
		display: inline-flex;
		gap: var(--space-2);
		padding: var(--space-2) 0;
	}

	.language-switcher--inline button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		background: none;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-round);
		cursor: pointer;
		padding: var(--space-2) var(--space-4);
		font-size: var(--fs-label-sm);
		color: var(--c-text-light);
		transition: all 0.2s ease-in-out;

		&:hover {
			color: var(--hover-state);
			background-color: var(--hover-state-x);
		}

		&.is-active {
			font-weight: var(--fw-semibold);
			color: var(--c-accent);
			border-color: var(--c-accent);
			background-color: var(--hover-state-x);
		}
	}

	@media (min-width: 1070px) {
		.language-switcher--dropdown {
			display: block;
		}

		.language-switcher--inline {
			display: none;
		}

		.language-switcher__menu {
			left: 0;
			right: auto;
		}
	}
</style>
