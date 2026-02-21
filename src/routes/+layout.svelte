<script>
	import { Header, Footer } from '$lib';
	import '$lib/styles/ad-styles.css';
	// import { onMount } from 'svelte';

	// onMount(() => {
	// 	document.documentElement.classList.add('has-anim');
	// });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/images/favicon_white.jpg" />
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />


