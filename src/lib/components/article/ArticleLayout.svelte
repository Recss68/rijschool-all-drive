<!--
	Reading column with a sticky sidebar (table of contents + trial lesson card).
	Content blocks inside can use these classes:
	.block, .callout, .sources, .check-list, .steps (ordered list), .areas (pill list)
-->
<section class="section article-body">
	<div class="section-inner">
		<article>
			{@render children()}
		</article>

		<aside class="sidebar">
			<nav class="toc" aria-label={m.info_toc()}>
				<h2>{m.info_toc()}</h2>
				<ol>
					{#each toc as entry (entry.id)}
						<li><a href="#{entry.id}">{entry.label}</a></li>
					{/each}
				</ol>
			</nav>
			<div class="cta-card">
				<h2>{cta === 'intensive' ? m.service_intensive_cta_heading() : m.info_cta_heading()}</h2>
				<p>{cta === 'intensive' ? m.service_intensive_cta_text() : m.info_cta_text()}</p>
				<a class="btn-secondary" href={business.whatsappUrl}
					>{cta === 'intensive' ? m.cta_intensive() : m.cta_book_trial()}</a
				>
				<a class="btn-primary" href="tel:{business.phone}">{m.cta_call_now()}</a>
			</div>
		</aside>
	</div>
</section>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';

	/** @type {{ toc: { id: string, label: string }[], cta?: 'trial' | 'intensive', children: import('svelte').Snippet }} */
	let { toc, cta = 'trial', children } = $props();
</script>

<style>
	.article-body {
		.section-inner {
			display: grid;
			gap: var(--space-12);
			@media (min-width: 1024px) {
				grid-template-columns: minmax(0, 720px) 300px;
				justify-content: center;
				align-items: start;
			}
		}
		:global(h2) {
			font-size: var(--fs-hl-md);
		}
	}

	article {
		:global(.block) {
			margin-bottom: var(--space-12);
			scroll-margin-top: 7.5rem;
		}

		:global(.callout) {
			background-color: var(--c-sky-50);
			border-left: 4px solid var(--c-accent);
			border-radius: var(--radius-soft);
			padding: var(--space-6);
		}
		:global(.callout h2),
		:global(.sources h2) {
			font-size: var(--fs-hl-sm);
		}
		:global(.callout p:last-child) {
			margin-bottom: 0;
		}

		:global(.check-list) {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		:global(.check-list li) {
			position: relative;
			padding-left: var(--space-8);
			margin-bottom: var(--space-3);
			color: var(--c-text-light);
		}
		:global(.check-list li::before) {
			content: '✓';
			position: absolute;
			left: 0;
			color: var(--c-green);
			font-weight: var(--fw-bold);
		}

		:global(.steps) {
			list-style: none;
			counter-reset: step;
			padding: 0;
			margin: var(--space-6) 0 0;
		}
		:global(.steps li) {
			counter-increment: step;
			position: relative;
			padding: 0 0 var(--space-6) var(--space-14);
			color: var(--c-text-light);
			min-height: var(--space-10);
		}
		:global(.steps li::before) {
			content: counter(step);
			position: absolute;
			left: 0;
			top: -0.15rem;
			width: var(--space-10);
			height: var(--space-10);
			display: grid;
			place-items: center;
			border-radius: 50%;
			background-color: var(--c-accent);
			color: var(--c-white);
			font-family: var(--font-heading);
			font-weight: var(--fw-bold);
		}
		/* connecting line between the steps */
		:global(.steps li:not(:last-child)::after) {
			content: '';
			position: absolute;
			left: calc(var(--space-10) / 2 - 1px);
			top: var(--space-10);
			bottom: 0;
			width: 2px;
			background-color: var(--c-icon-bg);
		}

		:global(.areas) {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-2);
		}
		:global(.areas li) {
			background-color: var(--c-icon-bg);
			color: var(--c-span);
			font-weight: var(--fw-semibold);
			padding: var(--space-1) var(--space-3);
			border-radius: var(--radius-round);
		}

		:global(.sources) {
			border: 1px solid var(--c-border);
			border-radius: var(--radius-m);
			padding: var(--space-6);
			margin-bottom: var(--space-12);
			scroll-margin-top: 7.5rem;
		}
		:global(.sources ul) {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		:global(.sources li) {
			margin-top: var(--space-2);
		}
		:global(.sources a),
		:global(.inline-links a) {
			color: var(--c-accent);
			font-weight: var(--fw-semibold);
		}
	}

	.sidebar {
		display: grid;
		gap: var(--space-6);
		@media (min-width: 1024px) {
			position: sticky;
			top: 7.5rem;
		}
		h2 {
			font-size: var(--fs-hl-sm-mobile);
		}
	}

	.toc {
		/* the table of contents is only useful next to the text on wide screens */
		display: none;
		padding: var(--space-6);
		background-color: var(--c-section);
		border-radius: var(--radius-m);
		@media (min-width: 1024px) {
			display: block;
		}
		ol {
			margin: 0;
			padding-left: var(--space-5);
			color: var(--c-text-light);
		}
		li {
			margin-bottom: var(--space-2);
		}
		a:hover {
			color: var(--c-accent);
		}
	}

	.cta-card {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-6);
		background-color: var(--c-navy-900);
		border-radius: var(--radius-m);
		text-align: center;
		h2,
		p {
			color: var(--c-white);
			margin: 0;
		}
		p {
			font-size: var(--fs-label-s-mobile);
			color: var(--c-text-lighter);
		}
	}
</style>
