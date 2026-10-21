<header class="section article-hero">
	<div class="section-inner">
		<nav class="trail" aria-label={m.info_trail_aria()}>
			{#each trail as crumb, i (crumb.label)}
				{#if i > 0}<span aria-hidden="true">/</span>{/if}
				{#if crumb.href}
					<a href={localizeHref(crumb.href)}>{crumb.label}</a>
				{:else}
					<span>{crumb.label}</span>
				{/if}
			{/each}
		</nav>
		<h1>{title}</h1>
		<p class="lead">{lead}</p>
		<CtaButtons variant={cta} />
		<p class="meta">{meta}</p>
	</div>
</header>

<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import CtaButtons from '$lib/components/ui/CtaButtons.svelte';

	/** @type {{ trail: { label: string, href?: string }[], title: string, lead: string, meta: string, cta?: 'trial' | 'intensive' | 'refresher' | 'drivingTest' }} */
	let { trail, title, lead, meta, cta = 'trial' } = $props();
</script>

<style>
	.article-hero {
		background: linear-gradient(to bottom right, var(--gd-0), var(--gd-100));
		padding-block: var(--space-27) var(--space-12);
		.section-inner {
			max-width: calc(720px + 300px + var(--space-12));
			> * {
				max-width: 720px;
			}
		}
		.trail {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-2);
			font-size: var(--fs-label-s-mobile);
			color: var(--c-text-lighter);
			margin-bottom: var(--space-6);
			a:hover {
				color: var(--c-white);
			}
		}
		h1 {
			color: var(--c-white);
			font-size: var(--fs-hl-lg);
		}
		.lead {
			color: var(--c-slate-200);
			font-size: var(--fs-hl-sm);
			line-height: var(--lh-body);
		}
		.meta {
			color: var(--c-text-lighter);
			font-size: var(--fs-label-s-mobile);
			margin: var(--space-6) 0 0;
		}
	}
</style>
