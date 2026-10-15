<Seo
	title={m.meta_terms_title()}
	description={m.meta_terms_description()}
	schema={[breadcrumbs([{ name: m.footer_terms(), path: '/algemene-voorwaarden' }])]}
/>

<section class="breadcrumb">
	<h1>{m.terms_hero_title()}</h1>
	<p>{m.terms_hero_text()}</p>
</section>

<ArticleSection articles={pickByLocale(terms)} updated={legalLastUpdated} />

<script>
	import { breadcrumbs } from '$lib/seo/schema.js';
	import { ArticleSection, Seo } from '$lib';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { terms, legalLastUpdated } from '$lib/data/legal.js';
	import { m } from '$lib/paraglide/messages.js';
</script>
