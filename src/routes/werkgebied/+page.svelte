<Seo
	title={m.meta_werkgebied_title()}
	description={m.meta_werkgebied_description()}
	schema={[breadcrumbs([{ name: m.footer_cities_heading(), path: '/werkgebied' }])]}
/>

<ArticleHero
	trail={[{ label: m.header_home(), href: '/' }]}
	title={m.werkgebied_title()}
	lead={m.werkgebied_lead()}
	meta="{business.name} · {m.city_fact_types()}"
/>

<section class="section werkgebied">
	<div class="section-inner">
		<h2>{m.werkgebied_cities_heading()}</h2>
		<ServiceArea />
		<p class="note">{m.werkgebied_note()}</p>
	</div>
</section>

<CtaSection />

<script>
	import { ArticleHero, CtaSection, Seo, ServiceArea } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { breadcrumbs } from '$lib/seo/schema.js';
</script>

<style>
	.werkgebied {
		background-color: var(--c-section);
		h2 {
			text-align: center;
			font-size: var(--fs-hl-lg);
			margin-bottom: var(--space-8);
		}
		.note {
			text-align: center;
			margin-top: var(--space-8);
		}
	}
</style>
