<!--
	Cloudflare Turnstile widget. Rendered inside a <form>, it adds the hidden field
	`cf-turnstile-response` that the server checks. Call reset() after a failed submit:
	every token can only be used once.
-->
<div class="turnstile" bind:this={container} data-sitekey={siteKey}></div>

<script module>
	const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
	let scriptPromise;

	/** Loads the Turnstile script once for the whole page. */
	function loadScript() {
		scriptPromise ??= new Promise((resolve, reject) => {
			if (window.turnstile) return resolve(window.turnstile);
			const script = document.createElement('script');
			script.src = SCRIPT_URL;
			script.async = true;
			script.onload = () => resolve(window.turnstile);
			script.onerror = () => {
				scriptPromise = undefined;
				reject(new Error('Turnstile could not be loaded'));
			};
			document.head.appendChild(script);
		});
		return scriptPromise;
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { dev } from '$app/environment';
	import { getLocale } from '$lib/paraglide/runtime';

	/** Cloudflare's official test site key that always passes (development only). */
	const DEV_TEST_SITE_KEY = '1x00000000000000000000AA';
	const siteKey = env.PUBLIC_TURNSTILE_SITE_KEY || (dev ? DEV_TEST_SITE_KEY : '');

	/** @type {{ onerror?: () => void }} */
	let { onerror } = $props();

	let container;
	let widgetId;

	onMount(() => {
		let cancelled = false;
		if (!siteKey) {
			console.error('PUBLIC_TURNSTILE_SITE_KEY is not set');
			onerror?.();
			return;
		}
		loadScript()
			.then((turnstile) => {
				if (cancelled) return;
				widgetId = turnstile.render(container, {
					sitekey: siteKey,
					language: getLocale(),
					theme: 'light',
					size: 'flexible',
					'error-callback': () => onerror?.(),
				});
			})
			.catch(() => onerror?.());
		return () => {
			cancelled = true;
			if (widgetId !== undefined) window.turnstile?.remove(widgetId);
		};
	});

	/** Gets a fresh token after a failed submit (tokens are single-use). */
	export function reset() {
		if (widgetId !== undefined) window.turnstile?.reset(widgetId);
	}
</script>

<style>
	.turnstile {
		/* reserve the widget's height so the form does not jump when it loads */
		min-height: 65px;
	}
</style>
