<div class="process-steps">
	<ol class="steps">
		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>{m.process_method1_title()}</h2>
					<p>
						{m.process_method1_desc()}
					</p>
				{:else}
					<h3>{m.process_step1_title()}</h3>
					<p>
						{m.process_step1_desc()}
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>{m.process_method2_title()}</h2>
					<p>
						{m.process_method2_desc()}
					</p>
				{:else}
					<h3>{m.process_step2_title()}</h3>
					<p>
						{m.process_step2_desc()}
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>{m.process_method3_title()}</h2>
					<p>
						{m.process_method3_desc()}
					</p>
				{:else}
					<h3>{m.process_step3_title()}</h3>
					<p>
						{m.process_step3_desc()}
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>{m.process_method4_title()}</h2>
					<p>
						{m.process_method4_desc()}
					</p>
				{:else}
					<h3>{m.process_step4_title()}</h3>
					<p>
						{m.process_step4_desc()}
					</p>
				{/if}
			</div>
		</li>
	</ol>
</div>

<script>
	import { m } from '$lib/paraglide/messages.js';

	export let showMethodContent = false;
	export let isWhite = false;
</script>

<style>
	.process-steps {
		@media (min-width: 768px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.steps {
		list-style: none;
		text-align: left;
		padding: 0;
		margin: 0;
		counter-reset: step;
		.step-number {
			display: inline-block;
			background-color: var(--c-accent);
			color: var(--c-white);
			padding: var(--space-7) var(--space-8);
			border-radius: var(--radius-round);
			box-shadow: var(--shadow-m);
			margin: var(--space-8) 0 var(--space-6) 0;
		}
		.step-number,
		h3 {
			font-size: var(--fs-hl-sm-desktop);
			font-weight: var(--fw-bold);
		}
		li {
			counter-increment: step;
		}
		.step-number::before {
			content: counter(step, decimal-leading-zero);
		}
		@media (min-width: 786px) {
			li {
				display: grid;
				grid-template-columns: 96px 1fr;
				column-gap: var(--space-6);
				align-items: center;
			}

			.step-number {
				grid-column: 1;
			}

			.step-content {
				grid-column: 2;
			}

			li h3 {
				padding-top: var(--space-3);
				margin-bottom: var(--space-1);
			}

			li p {
				margin: 0;
				max-width: 65ch;
			}
		}
	}

	.is-white {
		background-color: var(--c-white);
		border-radius: var(--radius-soft);
		box-shadow: var(--shadow-m);
		padding: var(--space-5);
		margin-bottom: var(--space-8);
	}
</style>
