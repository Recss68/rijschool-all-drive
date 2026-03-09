<section class="section faq-container">
	<div class="section-inner">
		<h2>Veelgestelde Vragen</h2>
		{#each FaqData as faq (faq.question)}
			<details class="faq-item" use:detailsToggle>
				<summary>{faq.question}</summary>
				<p>{faq.answer}</p>
			</details>
		{/each}
	</div>
</section>

<script>
	import { FaqData } from '$lib';
	import { SvelteSet } from 'svelte/reactivity';

	const registry = new SvelteSet();
	const DURATION = 300;

	function detailsToggle(node) {
		registry.add(node);

		function closeItem(target) {
			target.classList.add('is-closing');
			setTimeout(() => {
				target.removeAttribute('open');
				target.classList.remove('is-closing');
			}, DURATION);
		}

		function onSummaryClick(e) {
			e.preventDefault();
			if (node.open) {
				closeItem(node);
			} else {
				registry.forEach((other) => {
					if (other !== node && other.open) closeItem(other);
				});
				node.open = true;
			}
		}

		const summary = node.querySelector('summary');
		if (summary) summary.addEventListener('click', onSummaryClick);

		return {
			destroy() {
				registry.delete(node);
				if (summary) summary.removeEventListener('click', onSummaryClick);
			},
		};
	}
</script>

<style>
	.faq-container {
		text-align: center;
		h2 {
			font-size: var(--fs-hl-lg);
			margin-bottom: var(--space-12);
		}

		.faq-item {
			text-align: left;
			padding: var(--space-3);
			margin-bottom: var(--space-6);
			border-radius: var(--radius-soft);
			background-color: var(--c-section);
			@media (min-width: 1024px) {
				padding: var(--space-6);
			}

			summary {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: var(--space-4);
				list-style: none;
				cursor: pointer;
				font-weight: var(--fw-semibold);
				padding: 0.25rem 0;
			}

			summary::-webkit-details-marker {
				display: none;
			}

			summary::after {
				content: '\203A';
				font-size: 1.25rem;
				line-height: 1;
				transition: transform 220ms ease;
				transform-origin: center;
				color: var(--c-slate-600);
			}

			&:where([open]) summary::after,
			&[open] summary::after {
				transform: rotate(90deg);
			}

			p {
				overflow: hidden;
				height: 0;
				opacity: 0;
				margin: 0;
				padding-top: 0;
				transition:
					height 300ms ease,
					opacity 300ms ease,
					padding-top 300ms ease;
			}

			&[open] p {
				height: auto;
				opacity: 1;
				padding-top: 0.5rem;
			}

			&:global(.is-closing) p {
				height: 0;
				opacity: 0;
				padding-top: 0;
			}

			@media (prefers-reduced-motion: reduce) {
				p {
					transition: none;
				}
			}
		}
	}
</style>
