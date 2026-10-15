<!-- Renders content sections ({ id, heading, variant?, paragraphs?, items?, links? }) inside ArticleLayout -->
{#each sections as section (section.id)}
	{#if section.variant === 'sources'}
		<aside class="sources" id={section.id}>
			<h2>{section.heading}</h2>
			{#each section.paragraphs ?? [] as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
			<ul>
				{#each section.links ?? [] as link (link.href + link.label)}
					<li>
						<a href={link.href} rel="noopener" target="_blank"
							>{link.label} <span aria-hidden="true">↗</span></a
						>
					</li>
				{/each}
			</ul>
		</aside>
	{:else}
		<section class="block" class:callout={section.variant === 'callout'} id={section.id}>
			<h2>{section.heading}</h2>
			{#each section.paragraphs ?? [] as paragraph (paragraph)}
				<p>{fillPlaceholders(paragraph)}</p>
			{/each}
			{#if section.items?.length}
				{#if section.variant === 'steps'}
					<ol class="steps">
						{#each section.items as item (item)}
							<li>{fillPlaceholders(item)}</li>
						{/each}
					</ol>
				{:else}
					<ul class="check-list">
						{#each section.items as item (item)}
							<li>{fillPlaceholders(item)}</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</section>
	{/if}
{/each}

<script>
	import { fillPlaceholders } from '$lib/utils/placeholders';

	/** @type {{ sections: { id: string, heading: string, variant?: string, paragraphs?: string[], items?: string[], links?: { label: string, href: string }[] }[] }} */
	let { sections } = $props();
</script>
