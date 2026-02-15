<script>
    import stories from '$lib/data/succes-stories.json';
</script>

<div class="success-stories">
    {#each stories as story}
        <img 
        src={story.image} 
        alt="leerling-{story.id}"
        width="150px"
        loading="lazy"
        >
    {/each}
</div>

<style>
    .success-stories {
        display: grid;
        gap: var(--space-3);
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        column-gap: 0;
        margin-top: var(--space-12);
        img {
            aspect-ratio: 1 / 1;
            object-fit: cover;
            border-radius: var(--radius-soft);
            width: 200px;
        }
       @media (min-width: 768px) {
        display: flex; 
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-6);
       } 
    }
</style>