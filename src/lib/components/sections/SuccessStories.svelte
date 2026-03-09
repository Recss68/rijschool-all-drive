<div class="success-stories">
	{#each stories as story (story.id)}
		<picture>
			<source srcset={story.image_2} type="image/avif" />
			<source srcset={story.image_3} type="image/webp" />
			<img src={story.image} alt="leerling-{story.id}" width="160px" loading="lazy" />
		</picture>
	{/each}
</div>

<script>
	import stories from '$lib/data/succes-stories.json';
</script>

<style>
	.success-stories {
		display: grid;
		gap: var(--space-1);
		grid-template-columns: repeat(2, 1fr);
		justify-items: center;
		margin-top: var(--space-12);
		img {
			aspect-ratio: 1 / 1;
			object-fit: cover;
			border-radius: var(--radius-soft);
		}
		@media (min-width: 768px) {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--space-6);
		}
	}
</style>
