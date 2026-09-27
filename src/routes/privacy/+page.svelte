<svelte:head>
	<title>{m.meta_privacy_title()}</title>
	<meta name="description" content={m.meta_privacy_description()} />
</svelte:head>

<section class="breadcrumb">
	<h1>{m.privacy_hero_title()}</h1>
	<p>{m.privacy_hero_text()}</p>
</section>

<LegalContent content={privacy} />

<script>
	import { LegalContent } from '$lib';
	import { privacy } from '$lib/data/legal.js';
	import { m } from '$lib/paraglide/messages.js';
</script>
