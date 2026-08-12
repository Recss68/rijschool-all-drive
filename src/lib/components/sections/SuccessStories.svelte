<div class="success-stories">
	{#each stories as story (story.id)}
		<picture>
			<source srcset={story.image_2} type="image/avif" />
			<source srcset={story.image_3} type="image/webp" />
			<img
				src={story.image}
				alt={m.success_story_alt({ id: story.id })}
				width="400"
				height="400"
				loading="lazy"
			/>
		</picture>
	{/each}
</div>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import stories from '$lib/data/succes-stories.json';
</script>

<style>
	.success-stories {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		max-width: 420px;
		margin: var(--space-12) auto 0;

		img {
			display: block;
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			border-radius: var(--radius-m);
			box-shadow: var(--shadow-m);
		}

		@media (min-width: 640px) {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--space-8);
			max-width: 900px;
		}
	}
</style>
