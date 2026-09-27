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

<script>
	import { Header, Footer } from '$lib';
	import '$lib/styles/ad-styles.css';

	let { children } = $props();
</script>
