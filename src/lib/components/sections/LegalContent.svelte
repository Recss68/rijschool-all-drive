<section class="section legal">
	<div class="section-inner">
		<p class="updated">{m.legal_last_updated({ date: lastUpdated })}</p>
		{#each articles as article (article.heading)}
			<article>
				<h2>{article.heading}</h2>
				{#each article.paragraphs ?? [] as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
				{#if article.items?.some(Boolean)}
					<ul>
						{#each article.items.filter(Boolean) as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</article>
		{/each}
	</div>
</section>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { legalLastUpdated } from '$lib/data/legal.js';

	/** @type {{ content: { nl: any[], en: any[] } }} */
	let { content } = $props();

	const articles = pickByLocale(content);
	const lastUpdated = new Date(legalLastUpdated).toLocaleDateString(
		getLocale() === 'en' ? 'en-GB' : 'nl-NL',
		{ day: 'numeric', month: 'long', year: 'numeric' }
	);
</script>

<style>
	.legal {
		background-color: var(--c-section);
		.section-inner {
			max-width: 860px;
		}
		.updated {
			color: var(--c-text-light);
			font-size: var(--fs-label-s-mobile);
			margin-bottom: var(--space-6);
		}
		article {
			background-color: var(--c-white);
			padding: var(--space-6);
			border-radius: var(--radius-m);
			margin-bottom: var(--space-6);
			color: var(--c-text-light);
		}
		h2 {
			font-size: var(--fs-hl-sm);
			margin-bottom: var(--space-3);
		}
		ul {
			padding-left: var(--space-5);
		}
		li {
			margin-bottom: var(--space-2);
		}
	}
</style>
