<!-- eslint-disable svelte/no-at-html-tags -- JSON-LD built from our own data, "<" escaped -->
<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}
	<link rel="canonical" href={canonical} />
	{#each alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
	<link rel="alternate" type="text/markdown" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={business.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={m.og_image_alt()} />
	<meta property="og:locale" content={locale === 'en' ? 'en_GB' : 'nl_NL'} />
	<meta property="og:locale:alternate" content={locale === 'en' ? 'nl_NL' : 'en_GB'} />
	<meta name="twitter:card" content="summary_large_image" />

	{#each jsonLd as tag, i (i)}
		{@html tag}
	{/each}
</svelte:head>

<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, deLocalizeUrl } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';
	import { absoluteUrl } from '$lib/seo/url.js';

	/** @type {{ title: string, description: string, schema?: object[], image?: string, noindex?: boolean }} */
	let {
		title,
		description,
		noindex = false,
		schema = [],
		image = `${business.url}/images/og-rijschool-all-drive.jpg`,
	} = $props();

	const locale = getLocale();
	// Dutch base path of the current page, e.g. /en/prices -> /prijzen
	const basePath = $derived(deLocalizeUrl(page.url).pathname);
	const canonical = $derived(absoluteUrl(basePath, locale));
	// Split so the literal closing tag never ends this <script> block
	const SCRIPT_END = '<' + '/script>';
	// "<" is escaped so the JSON can never close the script tag early
	const jsonLd = $derived(
		schema.map(
			(item) =>
				`<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}${SCRIPT_END}`
		)
	);
	const alternates = $derived([
		{ hreflang: 'nl', href: absoluteUrl(basePath, 'nl') },
		{ hreflang: 'en', href: absoluteUrl(basePath, 'en') },
		{ hreflang: 'x-default', href: absoluteUrl(basePath, 'nl') },
	]);
</script>
