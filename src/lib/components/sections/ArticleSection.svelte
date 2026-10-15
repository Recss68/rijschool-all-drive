<section class="section articles">
	<div class="section-inner">
		{#if updated}
			<p class="updated">{m.legal_last_updated({ date: formatDate(updated) })}</p>
		{/if}
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
				{#if article.links?.length}
					<ul class="links">
						{#each article.links as link (link.href + link.label)}
							<li><a href={link.href} rel="noopener" target="_blank">{link.label}</a></li>
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

	/** @type {{ articles: { heading: string, paragraphs?: string[], items?: (string|false)[], links?: { label: string, href: string }[] }[], updated?: string }} */
	let { articles, updated } = $props();

	const formatDate = (date) =>
		new Date(date).toLocaleDateString(getLocale() === 'en' ? 'en-GB' : 'nl-NL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
</script>

<style>
	.articles {
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
		.links a {
			color: var(--c-accent);
			font-weight: var(--fw-semibold);
		}
	}
</style>
