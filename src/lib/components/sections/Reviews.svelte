<div class="g-reviews" bind:this={container}>
	<!-- Elfsight Google Reviews | Untitled Google Reviews -->
	<div class="elfsight-app-e83ef101-9fcd-4597-a8dc-d8a16f172239" data-elfsight-app-lazy></div>
</div>

<script>
	import { onMount } from 'svelte';

	let container;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://elfsightcdn.com/platform.js';
		script.defer = true;
		script.async = true;
		// eslint-disable-next-line svelte/no-dom-manipulating
		container.appendChild(script);
	});
</script>