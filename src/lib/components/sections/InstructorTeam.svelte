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

<style>
	.instructor-team {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		.instructor {
			background-color: var(--c-white);
			width: 500px;
			padding: var(--space-6);
			border-radius: var(--radius-m);
			span {
				background-color: var(--c-accent);
				padding: var(--space-6);
				display: inline-block;
				color: var(--c-white);
				font-weight: var(--fw-bold);
				border-radius: var(--radius-m);
				margin-bottom: var(--space-6);
			}
		}
	}
</style>
