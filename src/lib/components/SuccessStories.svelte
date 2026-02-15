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

