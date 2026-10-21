<svelte:head>
	<link rel="icon" href="/images/favicon_white.jpg" />
	<link
		rel="preload"
		href="/fonts/bricolage-grotesque.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/dmsans.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />

<SignupDialog />
<CookieBanner />
<PromoPopup />

<script>
	import { Header, Footer } from '$lib';
	import SignupDialog from '$lib/components/ui/SignupDialog.svelte';
	import CookieBanner from '$lib/components/ui/CookieBanner.svelte';
	import PromoPopup from '$lib/components/ui/PromoPopup.svelte';
	import { afterNavigate } from '$app/navigation';
	import { gtagPageView } from '$lib/gtag.js';
	import '$lib/styles/ad-styles.css';

	import { onMount } from 'svelte';
	import { trackConversions } from '$lib/analytics.js';
	import { captureLeadSource, applyLeadSourceConsent } from '$lib/attribution.js';
	import { consent } from '$lib/consent.svelte.js';

	let { children } = $props();

	// Analytics itself is injected in +layout.js; this adds the conversion events
	onMount(trackConversions);

	// Where this visit came from, for the lead source in form emails. Kept only after the
	// visitor accepts cookies; declining deletes it.
	onMount(captureLeadSource);
	$effect(() => applyLeadSourceConsent(consent.analytics));

	// GA4 page views for client-side navigation (only sent once analytics is accepted)
	afterNavigate(({ type }) => {
		if (type !== 'enter') gtagPageView();
	});
</script>
