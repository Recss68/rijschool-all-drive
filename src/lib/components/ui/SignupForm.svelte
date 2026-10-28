<!--
	Sign-up form. On the /aanmelden page it shows everything at once (also works without JS);
	in the dialog it is split in two steps: choices first, then personal details.
-->
<form
	method="POST"
	action={localizeHref('/aanmelden')}
	novalidate={enhanced}
	use:enhance={handleSubmit}
	bind:this={formEl}
	aria-label={m.signup_title()}
>
	{#if errors.form}
		<p class="form-error" role="alert">{m.form_error_send()}</p>
	{/if}

	{#if stepped}
		<p class="progress" aria-live="polite">{m.signup_step({ step, total: 2 })}</p>
	{/if}

	<!-- step 1: choices -->
	<div class="step" hidden={stepped && step !== 1}>
		<fieldset class="choice" aria-describedby={errors.transmissie ? 'err-transmissie' : undefined}>
			<legend>{m.signup_transmission_label()}</legend>
			<div class="options three">
				{#each transmissions as option (option.value)}
					{@const unavailable = option.value === 'automaat' && manualOnly}
					<label class="option" class:unavailable>
						<input
							type="radio"
							name="transmissie"
							value={option.value}
							required
							disabled={unavailable}
							bind:group={transmission}
						/>
						<span>
							{option.label}
							{#if unavailable}<small>{m.signup_not_in_city({ city: placeCity.name })}</small>{/if}
						</span>
					</label>
				{/each}
			</div>
			{#if errors.transmissie}
				<p class="field-error" id="err-transmissie">
					{errors.transmissie === 'unavailable' && placeCity
						? m.signup_error_automatic_unavailable({ city: placeCity.name })
						: m.signup_error_choice()}
				</p>
			{/if}
		</fieldset>

		<div class="field">
			<label for="{uid}-plaats">{m.signup_place_label()}</label>
			<select
				id="{uid}-plaats"
				name="plaats"
				required
				bind:value={place}
				aria-invalid={errors.plaats ? 'true' : undefined}
				aria-describedby={errors.plaats ? 'err-plaats' : undefined}
			>
				<option value="" disabled>{m.signup_place_placeholder()}</option>
				{#each cities as city (city.slug)}
					<option value={city.slug} translate="no">{city.name}</option>
				{/each}
				<option value="anders">{m.signup_place_other()}</option>
			</select>
			{#if errors.plaats}
				<p class="field-error" id="err-plaats">{m.signup_error_choice()}</p>
			{/if}
			<p class="notice" role="status">
				{#if manualOnly}{m.signup_manual_only_note({ city: placeCity.name })}{/if}
			</p>
		</div>

		{#if place === 'anders'}
			<div class="field">
				<label for="{uid}-plaats-anders">{m.signup_place_other_label()}</label>
				<input
					id="{uid}-plaats-anders"
					name="plaats_anders"
					type="text"
					autocomplete="address-level2"
					required
					value={values.plaats_anders ?? ''}
					placeholder={m.signup_place_other_placeholder()}
					aria-invalid={errors.plaats_anders ? 'true' : undefined}
				/>
				{#if errors.plaats_anders}
					<p class="field-error">{m.signup_error_required()}</p>
				{/if}
			</div>
		{/if}

		<fieldset class="choice">
			<legend>{m.signup_package_label()}</legend>
			<div class="options two">
				{#each packageOptions as option (option.value)}
					<label class="option">
						<input
							type="radio"
							name="pakket"
							value={option.value}
							checked={selectedPackage === option.value}
						/>
						<span>
							{option.label}
							{#if option.detail}<small>{option.detail}</small>{/if}
						</span>
					</label>
				{/each}
			</div>
			<p class="hint">{m.signup_package_hint()}</p>
		</fieldset>

		{#if stepped}
			<button type="button" class="btn-secondary" onclick={next}>
				{m.signup_next()} <span aria-hidden="true">→</span>
			</button>
		{/if}
	</div>

	<!-- step 2: personal details -->
	<div class="step" hidden={stepped && step !== 2}>
		{#if stepped}
			<h3 class="step-title" tabindex="-1" bind:this={step2Title}>{m.signup_details_title()}</h3>
		{/if}

		{#each detailFields as field (field.name)}
			<div class="field">
				<label for="{uid}-{field.name}">{field.label}</label>
				<input
					id="{uid}-{field.name}"
					name={field.name}
					type={field.type}
					autocomplete={field.autocomplete}
					inputmode={field.inputmode}
					spellcheck={field.spellcheck}
					required
					value={values[field.name] ?? ''}
					placeholder={field.placeholder}
					max={field.max}
					aria-invalid={errors[field.name] ? 'true' : undefined}
					aria-describedby={errors[field.name] ? `err-${field.name}` : undefined}
				/>
				{#if errors[field.name]}
					<p class="field-error" id="err-{field.name}">{fieldError(errors[field.name])}</p>
				{/if}
			</div>
		{/each}

		<FoundViaField id="{uid}-gevonden" value={values.gevonden ?? ''} />

		<div class="field">
			<Turnstile bind:this={turnstile} />
			{#if errors.captcha}
				<p class="field-error" id="err-captcha" role="alert">{m.form_error_captcha()}</p>
			{/if}
		</div>

		<!-- honeypot for bots: hidden from people and assistive tech -->
		<div class="hp" aria-hidden="true">
			<label for="{uid}-website">Website</label>
			<input id="{uid}-website" name="website" type="text" tabindex="-1" autocomplete="off" />
		</div>
		<LeadSourceField />

		<p class="privacy">
			{m.signup_privacy_prefix()}
			<a href={localizeHref('/privacy')}>{m.footer_privacy().toLowerCase()}</a>.
		</p>

		<div class="actions" class:sticky={stepped}>
			{#if stepped}
				<button type="button" class="btn-primary" onclick={() => (step = 1)}>
					<span aria-hidden="true">←</span>
					{m.signup_back()}
				</button>
			{/if}
			<button type="submit" class="btn-secondary" aria-busy={submitting}>
				{submitting ? m.form_sending() : m.signup_submit()}
			</button>
		</div>
	</div>
</form>

<script>
	import { onMount, tick, untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { cities, offersAutomatic } from '$lib/data/cities';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { formatEuro } from '$lib/utils/format-euro';
	import { MAIN_PACKAGE_IDS } from '$lib/seo/schema.js';
	import { trackSignup } from '$lib/analytics.js';
	import Turnstile from './Turnstile.svelte';
	import LeadSourceField from './LeadSourceField.svelte';
	import FoundViaField from './FoundViaField.svelte';
	import packagesNl from '$lib/data/pricing-packages.nl.json';
	import packagesEn from '$lib/data/pricing-packages.en.json';

	/**
	 * @type {{
	 *   form?: any,
	 *   initialPackage?: string | null,
	 *   stepped?: boolean,
	 *   onclose?: () => void,
	 * }}
	 */
	let { form = null, initialPackage = null, stepped = false, onclose } = $props();

	const uid = `signup-${Math.random().toString(36).slice(2, 8)}`;

	let formEl = $state();
	let step2Title = $state();
	let enhanced = $state(false);
	let submitting = $state(false);
	let step = $state(1);
	// The server result is only the starting point (a no-JS POST reloads the whole page);
	// after that, enhanced submits update this local state.
	const start = untrack(() => ({ form }));
	let errors = $state(start.form?.errors ?? {});
	let values = $state(start.form?.values ?? {});
	let turnstile;
	let place = $state(start.form?.values?.plaats ?? '');
	let transmission = $state(start.form?.values?.transmissie ?? '');

	// Some cities only have manual lessons (city data `transmissions`): automatic is then
	// disabled, and a choice for automatic made before picking the city is cleared
	const placeCity = $derived(cities.find((city) => city.slug === place));
	const manualOnly = $derived(Boolean(placeCity) && !offersAutomatic(placeCity));
	$effect(() => {
		if (manualOnly && untrack(() => transmission) === 'automaat') transmission = '';
	});

	onMount(() => (enhanced = true));

	const packages = pickByLocale({ nl: packagesNl, en: packagesEn });
	const selectedPackage = $derived(values.pakket ?? initialPackage ?? 'onbekend');

	const transmissions = [
		{ value: 'automaat', label: m.signup_automatic() },
		{ value: 'schakel', label: m.signup_manual() },
		{ value: 'onbekend', label: m.signup_dont_know() },
	];

	const packageOptions = [
		...MAIN_PACKAGE_IDS.map((id) => packages.find((p) => p.id === id)).map((p) => ({
			value: p.id,
			label: p.title,
			detail: `${m.recommended_lessons_suffix({ count: p.lessons }).replace('/ ', '')} · ${formatEuro(p.price)}`,
		})),
		{ value: 'onbekend', label: m.signup_dont_know(), detail: '' },
	];

	// latest possible birth date for the date picker (today)
	const today = new Date().toISOString().slice(0, 10);

	const detailFields = [
		{
			name: 'naam',
			label: m.signup_name_label(),
			type: 'text',
			autocomplete: 'name',
			placeholder: m.signup_name_placeholder(),
		},
		{
			name: 'geboortedatum',
			label: m.signup_birthdate_label(),
			type: 'date',
			autocomplete: 'bday',
			max: today,
		},
		{
			name: 'adres',
			label: m.signup_address_label(),
			type: 'text',
			autocomplete: 'street-address',
			placeholder: m.signup_address_placeholder(),
		},
		{
			name: 'telefoon',
			label: m.signup_phone_label(),
			type: 'tel',
			autocomplete: 'tel',
			inputmode: 'tel',
			placeholder: m.signup_phone_placeholder(),
		},
		{
			name: 'email',
			label: m.signup_email_label(),
			type: 'email',
			autocomplete: 'email',
			inputmode: 'email',
			spellcheck: false,
			placeholder: m.signup_email_placeholder(),
		},
	];

	const fieldError = (code) =>
		({
			phone: m.signup_error_phone(),
			email: m.form_error_email(),
			birthdate: m.signup_error_birthdate(),
		})[code] ?? m.signup_error_required();

	const STEP_ONE = ['transmissie', 'plaats', 'plaats_anders'];

	/** Shows the first invalid control's message and moves focus to it. */
	function firstInvalid(names) {
		const controls = [...formEl.elements].filter(
			(el) => names.includes(el.name) && !el.checkValidity()
		);
		if (!controls.length) return true;
		controls[0].reportValidity();
		controls[0].focus();
		return false;
	}

	async function next() {
		if (!firstInvalid(STEP_ONE)) return;
		step = 2;
		await tick();
		step2Title?.focus();
	}

	function handleSubmit({ cancel }) {
		const all = [...STEP_ONE, 'naam', 'geboortedatum', 'adres', 'telefoon', 'email'];
		const stepOneOk = [...formEl.elements].every(
			(el) => !STEP_ONE.includes(el.name) || el.checkValidity()
		);
		if (stepped && !stepOneOk) step = 1;
		if (!firstInvalid(all)) return cancel();

		// Turnstile adds its token to the form once the check has passed
		if (!new FormData(formEl).get('cf-turnstile-response')) {
			errors = { ...errors, captcha: 'captcha' };
			return cancel();
		}

		const data = new FormData(formEl);
		const chosen = { pakket: data.get('pakket'), transmissie: data.get('transmissie') };
		submitting = true;
		return async ({ result }) => {
			submitting = false;
			if (result.type === 'redirect') {
				// success: count the conversion, close the dialog and go to the thank-you page
				trackSignup(chosen);
				onclose?.();
				await goto(result.location);
			} else if (result.type === 'failure') {
				// a Turnstile token is single-use: get a fresh one for the next attempt
				turnstile?.reset();
				errors = result.data.errors ?? {};
				values = result.data.values ?? values;
				transmission = values.transmissie ?? '';
				if (Object.keys(errors).some((k) => STEP_ONE.includes(k))) step = 1;
				await tick();
				formEl?.querySelector('[aria-invalid="true"], .form-error')?.focus?.();
			} else {
				errors = { form: 'send' };
			}
		};
	}
</script>

<style>
	form {
		display: grid;
		gap: var(--space-5);
		text-align: left;
	}

	.step {
		display: grid;
		gap: var(--space-5);
	}
	.step[hidden] {
		display: none;
	}

	.progress {
		margin: 0;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}

	.step-title {
		margin: 0;
		font-size: var(--fs-hl-sm-mobile);
		&:focus {
			outline: none;
		}
	}

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;
	}

	legend,
	label {
		font-weight: var(--fw-semibold);
		font-size: var(--fs-label-s-mobile);
		color: var(--c-navy-900);
	}
	legend {
		margin-bottom: var(--space-2);
	}

	.options {
		display: grid;
		gap: var(--space-2);
		&.three {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}
		&.two {
			grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
		}
	}

	/* the whole card is the hit target for its radio */
	.notice:empty {
		display: none;
	}
	.notice {
		margin: 0;
		padding: var(--space-3) var(--space-4);
		border-left: 4px solid var(--c-yellow);
		border-radius: var(--radius-softest);
		background-color: #fffbeb;
		color: var(--c-navy-900);
		font-size: var(--fs-label-s-mobile);
		font-weight: var(--fw-semibold);
	}

	.option.unavailable {
		cursor: not-allowed;
		opacity: 0.55;
		&:hover {
			border-color: var(--c-border-gray);
		}
	}

	.option {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		min-height: 48px;
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--c-border-gray);
		border-radius: var(--radius-softest);
		background-color: var(--c-white);
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		transition:
			border-color 0.15s ease-out,
			background-color 0.15s ease-out;
		&:hover {
			border-color: var(--c-accent);
		}
		&:has(input:checked) {
			border-color: var(--c-accent);
			background-color: var(--c-sky-50);
		}
		&:has(input:focus-visible) {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
		input {
			accent-color: var(--c-accent);
			width: 18px;
			height: 18px;
			margin: 0;
			flex-shrink: 0;
		}
		span {
			display: grid;
			font-weight: var(--fw-semibold);
			color: var(--c-navy-900);
		}
		small {
			font-weight: var(--fw-regular);
			color: var(--c-text-light);
			font-variant-numeric: tabular-nums;
		}
	}

	.hint {
		margin: var(--space-2) 0 0;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}

	.field {
		display: grid;
		gap: var(--space-2);
		/* grid items may not grow past their column (keeps wide native inputs inside) */
		min-width: 0;
	}

	input:not([type='radio']),
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
		&[aria-invalid='true'] {
			border-color: #b91c1c;
		}
	}

	/* iOS Safari gives date inputs an intrinsic min-width that ignores width: 100%,
	   which pushed the field past the right edge; reset it and keep the text left-aligned */
	input[type='date'] {
		display: block;
		box-sizing: border-box;
		min-width: 0;
		max-width: 100%;
		min-height: 48px;
		-webkit-appearance: none;
		appearance: none;
		text-align: left;
		&::-webkit-date-and-time-value {
			text-align: left;
		}
	}

	.field-error {
		margin: 0;
		font-size: var(--fs-label-s-mobile);
		color: #b91c1c;
	}

	.form-error {
		margin: 0;
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		color: #b91c1c;
		border-radius: var(--radius-soft);
		padding: var(--space-3) var(--space-4);
		font-size: var(--fs-label-s-mobile);
	}

	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.privacy {
		margin: 0;
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
		a {
			color: var(--c-accent);
			text-decoration: underline;
		}
	}

	/* in the dialog the buttons stay visible at the bottom while the form scrolls */
	.actions.sticky {
		position: sticky;
		bottom: calc(var(--space-6) * -1);
		margin-inline: calc(var(--space-6) * -1);
		padding: var(--space-4) var(--space-6) var(--space-6);
		background-color: var(--c-white);
		border-top: 1px solid var(--c-border-light);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		justify-content: flex-end;
		button {
			min-height: 48px;
			padding-inline: var(--space-6);
		}
	}

	button {
		touch-action: manipulation;
		cursor: pointer;
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.option {
			transition: none;
		}
	}
</style>
