<script>
    import { InstructorData } from '$lib';
</script>

<div class="instructor-team">
    {#each InstructorData as instructor}
        <div class="instructor">
            <span>{instructor.name_short}</span>
            <h3>{instructor.name}</h3>
            <p class="rec-btn">{instructor.role}</p>
            <p>{instructor.experience}</p>
        </div>
    {/each}
</div>