<svelte:head>
	<title>{m.meta_terms_title()}</title>
	<meta name="description" content={m.meta_terms_description()} />
</svelte:head>

<section class="breadcrumb">
	<h1>{m.terms_hero_title()}</h1>
	<p>{m.terms_hero_text()}</p>
</section>

<LegalContent content={terms} />

<script>
	import { LegalContent } from '$lib';
	import { terms } from '$lib/data/legal.js';
	import { m } from '$lib/paraglide/messages.js';
</script>
