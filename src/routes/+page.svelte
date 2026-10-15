<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<Seo
	title={m.meta_home_title()}
	description={m.meta_home_description()}
	schema={[organization()]}
/>

<Hero />

<section class="benefits-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_benefits_heading()}</h2>
			<p>{m.home_benefits_text()}</p>
		</div>
		<BenefitCards />
	</div>
</section>

<section class="price-cards-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_packages_heading()}</h2>
			<p>{m.home_packages_text()}</p>
		</div>
		<PriceCards />
		<p class="section-footer">
			{@html m.home_packages_footer()}
		</p>
	</div>
</section>

<section class="rates-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_rates_heading()}</h2>
			<p>{m.home_rates_text()}</p>
		</div>
		<SingleRates showLink />
	</div>
</section>

<section class="service-area-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_area_heading()}</h2>
			<p>{m.home_area_text()}</p>
		</div>
		<ServiceArea />
		<p class="section-footer">
			<a href={localizeHref('/werkgebied')}
				>{m.home_area_link()} <span aria-hidden="true">→</span></a
			>
		</p>
	</div>
</section>

<RelatedCards
	heading={m.home_services_heading()}
	cta={m.home_services_cta()}
	items={serviceCards}
	tone="white"
/>

<section class="process-steps-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_process_heading()}</h2>
			<p>{m.home_process_text()}</p>
		</div>
		<ProcessSteps />
	</div>
</section>

<section class="reviews-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_reviews_heading()}</h2>
			<p>{m.home_reviews_text()}</p>
		</div>
		<Reviews />
	</div>
</section>

<section class="success-stories-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_success_heading()}</h2>
			<p>{m.home_success_text()}</p>
		</div>
		<SuccessStories />
		<p class="section-footer">
			{@html m.home_success_footer()}
		</p>
	</div>
</section>

<AboutSection />

<CtaSection />

<script>
	import { organization } from '$lib/seo/schema.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { services } from '$lib/data/services';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import {
		Hero,
		BenefitCards,
		RecommendedPriceCards as PriceCards,
		ProcessSteps,
		Reviews,
		SuccessStories,
		AboutSection,
		CtaSection,
		Seo,
		ServiceArea,
		RelatedCards,
		SingleRates,
	} from '$lib';
	import { m } from '$lib/paraglide/messages.js';

	const serviceCards = services.map((service) => {
		const content = pickByLocale(service);
		return { href: `/${service.slug}`, title: content.cardTitle, text: content.summary };
	});
</script>

<style>
	.benefits-container,
	.service-area-container,
	.rates-container,
	.price-cards-container,
	.process-steps-container,
	.reviews-container,
	.success-stories-container {
		background-color: var(--c-section);
		text-align: center;
		h2 {
			font-size: var(--fs-hl-lg);
		}
	}

	.price-cards-container,
	.reviews-container {
		background-color: var(--c-white);
	}
</style>
