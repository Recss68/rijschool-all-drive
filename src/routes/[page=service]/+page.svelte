<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<Seo
	title={content.metaTitle}
	description={content.metaDescription}
	schema={[
		schemaService({
			name: content.title,
			description: answer,
			path: `/${service.slug}`,
			serviceType: service.serviceType,
			areaCities: serviceCities,
			offers: service.showPrice
				? {
						'@type': 'Offer',
						price:
							service.slug === 'proefles' ? business.prices.trialLesson : business.prices.lesson,
						priceCurrency: 'EUR',
						description: service.slug === 'proefles' ? m.rate_trial_detail() : m.rate_hour_detail(),
					}
				: undefined,
		}),
		breadcrumbs([{ name: content.title, path: `/${service.slug}` }]),
		faqPage(faq),
	]}
/>

<ArticleHero
	trail={[{ label: m.header_home(), href: '/' }, { label: m.service_breadcrumb() }]}
	title={content.title}
	lead={answer}
	meta="{business.name} · {m.city_fact_types()}"
	cta={service.cta}
/>

<ArticleLayout
	toc={[...sections, faqSection].map((s) => ({ id: s.id, label: s.heading }))}
	cta={service.cta}
>
	<ArticleBlocks {sections} />
	<FaqBlock id={faqSection.id} heading={faqSection.heading} {faq}>
		<p class="inline-links">{@html m.service_more_info()}</p>
	</FaqBlock>
</ArticleLayout>

<RelatedCards
	heading={m.service_related_heading()}
	cta={m.home_services_cta()}
	items={otherServices}
	tone="white"
	cardMin="260px"
/>

<RelatedCards heading={m.service_cities_heading()} cta={m.city_view_page()} items={cityCards} />

<CtaSection />

<script>
	import {
		ArticleHero,
		ArticleLayout,
		ArticleBlocks,
		FaqBlock,
		RelatedCards,
		CtaSection,
		Seo,
	} from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { services, getService } from '$lib/data/services';
	import { cities, offersAutomatic } from '$lib/data/cities';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { fillPlaceholders } from '$lib/utils/placeholders';
	import { slugify } from '$lib/utils/text';
	import { service as schemaService, breadcrumbs, faqPage } from '$lib/seo/schema.js';

	let { data } = $props();

	const service = $derived(getService(data.slug));
	const content = $derived(pickByLocale(service));
	const answer = $derived(fillPlaceholders(content.answer));
	const faq = $derived(content.faq.map(({ q, a }) => ({ q, a: fillPlaceholders(a) })));

	const sections = $derived(
		content.articles.map((article) => ({ ...article, id: slugify(article.heading) }))
	);
	const faqSection = $derived({
		id: slugify(m.service_faq_heading()),
		heading: m.service_faq_heading(),
	});

	// the automatic lessons page only lists cities where automatic lessons are given
	const serviceCities = $derived(
		cities.filter((city) => service.slug !== 'automaat-rijles' || offersAutomatic(city))
	);
	// links to every other service, so each service page is reachable from all the others
	const otherServices = $derived(
		services
			.filter((other) => other.slug !== service.slug)
			.map((other) => {
				const item = pickByLocale(other);
				return { href: `/${other.slug}`, title: item.cardTitle, text: item.summary };
			})
	);

	const cityCards = $derived(
		serviceCities.map((city) => ({
			href: `/rijschool-${city.slug}`,
			title: pickByLocale(city).h1 ?? m.city_hero_title({ city: city.name }),
			text: pickByLocale(city).metaDescription,
		}))
	);
</script>
