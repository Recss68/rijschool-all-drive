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

<script>
	import { Header, Footer } from '$lib';
	import SignupDialog from '$lib/components/ui/SignupDialog.svelte';
	import CookieBanner from '$lib/components/ui/CookieBanner.svelte';
	import { afterNavigate } from '$app/navigation';
	import { gtagPageView } from '$lib/gtag.js';
	import '$lib/styles/ad-styles.css';

	import { onMount } from 'svelte';
	import { trackConversions } from '$lib/analytics.js';

	let { children } = $props();

	// Analytics itself is injected in +layout.js; this adds the conversion events
	onMount(trackConversions);

	// GA4 page views for client-side navigation (only sent once analytics is accepted)
	afterNavigate(({ type }) => {
		if (type !== 'enter') gtagPageView();
	});
</script>
