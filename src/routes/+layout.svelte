<script>
	import '$lib/styles/ad-styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Rijschool in Amsterdam | Rijschool All Drive</title>
	<meta
		name="description"
		content="Op zoek naar een rijschool in Amsterdam? Rijschool All Drive biedt betaalbare rijlessen, persoonlijke begeleiding en hoge slagingskansen."
	/>
	<link rel="icon" href="/images/favicon_white.avif" />
</svelte:head>

<main>
	{@render children()}
</main>
