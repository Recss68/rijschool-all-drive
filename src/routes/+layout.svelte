<script>
	import '$lib/styles/ad-styles.css';
	import favicon from '$lib/assets/images/favicon_white.avif';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>
