<Seo
	title={m.meta_rates_title()}
	description={m.meta_rates_description({ lesson: formatEuro(business.prices.singleLesson) })}
	schema={[
		breadcrumbs([
			{ name: m.header_prices(), path: '/prijzen' },
			{ name: m.rates_heading(), path: '/losse-tarieven' },
		]),
		singleRatesCatalog(rateLabels),
	]}
/>

<section class="breadcrumb">
	<h1>{m.rates_heading()}</h1>
	<p>{m.rates_page_text()}</p>
	<CtaButtons center />
</section>

<section class="section rates-page">
	<div class="section-inner">
		<SingleRates />
		<p class="packages">
			{m.rates_packages_text()}
			<a href={localizeHref('/prijzen')}
				>{m.rates_packages_link()} <span aria-hidden="true">→</span></a
			>
		</p>
	</div>
</section>

<CtaSection />

<script>
	import { Seo, CtaButtons, CtaSection, SingleRates } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';
	import { formatEuro } from '$lib/utils/format-euro';
	import { breadcrumbs, singleRatesCatalog } from '$lib/seo/schema.js';

	const rateLabels = {
		trialLesson: m.rate_trial(),
		singleLesson: `${m.rate_lesson()} (${m.rate_lesson_detail()})`,
		interimExam: m.rate_interim_exam(),
		exam: m.rate_exam(),
		fearOfFailureExam: m.rate_fear_exam(),
		bnor: `${m.rate_bnor()} (${m.rate_bnor_detail()})`,
	};
</script>

<style>
	.rates-page {
		background-color: var(--c-section);
		.packages {
			max-width: 640px;
			margin: var(--space-8) auto 0;
			text-align: center;
			a {
				color: var(--c-accent);
				font-weight: var(--fw-semibold);
			}
		}
	}
</style>
