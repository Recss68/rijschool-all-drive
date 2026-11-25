<!-- Renders content sections ({ id, heading, variant?, paragraphs?, items?, links? }) inside ArticleLayout.
     In a 'sources' block, links are external (new tab); in any other block they are internal pages
     (Dutch path, localized here), so an article can point readers to their next step. -->
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
					<ol class="steps" style:--step-rows={section.items.length - 1}>
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
			{#if section.links?.length}
				<ul class="check-list inline-links">
					{#each section.links as link (link.href)}
						<li><a href={localizeHref(link.href)}>{link.label}</a></li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
{/each}

<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import { fillPlaceholders } from '$lib/utils/placeholders';

	/** @type {{ sections: { id: string, heading: string, variant?: string, paragraphs?: string[], items?: string[], links?: { label: string, href: string }[] }[] }} */
	let { sections } = $props();
</script>
