<div class="g-reviews" bind:this={container}></div>

<script>
	import { onMount } from 'svelte';

	let container;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.trustindex.io/loader.js?ce4c266667ef04213d065dab480';
		script.defer = true;
		script.async = true;
		// eslint-disable-next-line svelte/no-dom-manipulating
		container.appendChild(script);
	});
</script>
