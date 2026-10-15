<Seo
	title={m.meta_privacy_title()}
	description={m.meta_privacy_description()}
	schema={[breadcrumbs([{ name: m.footer_privacy(), path: '/privacy' }])]}
/>

<section class="breadcrumb">
	<h1>{m.privacy_hero_title()}</h1>
	<p>{m.privacy_hero_text()}</p>
</section>

<ArticleSection articles={pickByLocale(privacy)} updated={legalLastUpdated} />

<script>
	import { breadcrumbs } from '$lib/seo/schema.js';
	import { ArticleSection, Seo } from '$lib';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { privacy, legalLastUpdated } from '$lib/data/legal.js';
	import { m } from '$lib/paraglide/messages.js';
</script>
