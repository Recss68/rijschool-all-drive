<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<svelte:head>
	<title>{m.meta_home_title()}</title>
	<meta name="description" content={m.meta_home_description()} />
</svelte:head>

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
	import {
		Hero,
		BenefitCards,
		RecommendedPriceCards as PriceCards,
		ProcessSteps,
		Reviews,
		SuccessStories,
		AboutSection,
		CtaSection,
	} from '$lib';
	import { m } from '$lib/paraglide/messages.js';
</script>

<style>
	.benefits-container,
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
