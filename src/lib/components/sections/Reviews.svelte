{#if reviews}
	<p class="reviews-summary">
		{m.reviews_summary({ rating: reviews.rating, count: reviews.count, source: reviews.source })}
		· <a href={reviews.url}>{m.reviews_link()}</a>
	</p>
{/if}
<div class="g-reviews" bind:this={container}>
	<!-- Elfsight Google Reviews | Untitled Google Reviews -->
	<div class="elfsight-app-e83ef101-9fcd-4597-a8dc-d8a16f172239" data-elfsight-app-lazy></div>
</div>

<script>
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';

	const { reviews } = business;

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

<style>
	.reviews-summary {
		margin-bottom: var(--space-6);
		a {
			color: var(--c-accent);
			font-weight: var(--fw-semibold);
		}
	}
</style>
