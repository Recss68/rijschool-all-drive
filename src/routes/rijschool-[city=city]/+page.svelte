<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<Seo
	title={content.metaTitle}
	description={content.metaDescription}
	schema={[
		schemaService({
			name: m.city_service_name({ city: city.name }),
			description: answer,
			path: `/rijschool-${city.slug}`,
			serviceType: 'Rijles (rijbewijs B)',
			cityData: city,
		}),
		breadcrumbs([
			{ name: m.footer_cities_heading(), path: '/werkgebied' },
			{ name: h1, path: `/rijschool-${city.slug}` },
		]),
		faqPage(faq),
	]}
/>

<ArticleHero
	trail={[
		{ label: m.header_home(), href: '/' },
		{ label: m.footer_cities_heading(), href: '/werkgebied' },
	]}
	title={h1}
	lead={answer}
	meta="{business.name} · {cityTypesFact(city)}"
/>

<ArticleLayout toc={sections.map((s) => ({ id: s.id, label: s.heading }))}>
	<section class="block" id={sections[0].id}>
		<h2>{sections[0].heading}</h2>
		<p>{content.intro}</p>
		{#if city.slug !== 'amsterdam'}
			<p>{m.city_no_branch({ city: city.name })}</p>
		{/if}
		<div class="callout">
			<ul class="check-list">
				{#each facts as fact (fact)}
					<li>{fact}</li>
				{/each}
			</ul>
		</div>
	</section>

	{#if content.districts}
		<section class="block" id={sectionId('districts')}>
			<h2>{m.city_districts_heading()}</h2>
			{#each content.districts as district (district.name)}
				<h3>{district.name}</h3>
				<p>{district.text}</p>
			{/each}
		</section>
	{/if}

	<section class="block" id={sectionId('areas')}>
		<h2>{m.city_areas_heading({ city: city.name })}</h2>
		<ul class="areas">
			{#each content.areas as area (area)}
				<li>{area}</li>
			{/each}
		</ul>
	</section>

	<section class="block" id={sectionId('practice')}>
		<h2>{m.city_practice_heading()}</h2>
		<ul class="check-list">
			{#each content.practice as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</section>

	<section class="block" id={sectionId('services')}>
		<h2>{m.city_services_heading()}</h2>
		<ul class="check-list inline-links">
			{#each cityServices as item (item.slug)}
				<li><a href={localizeHref(`/${item.slug}`)}>{pickByLocale(item).title}</a></li>
			{/each}
		</ul>
	</section>

	<FaqBlock id={sectionId('faq')} heading={m.city_faq_heading({ city: city.name })} {faq}>
		<p class="inline-links">{@html m.city_more_info()}</p>
	</FaqBlock>
</ArticleLayout>

<section class="section city-packages">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.city_packages_heading({ city: city.name })}</h2>
			<p>{m.city_packages_text({ city: city.name })}</p>
		</div>
		<RecommendedPriceCards />
	</div>
</section>

{#if nearby.length}
	<RelatedCards heading={m.city_others_heading()} cta={m.city_view_page()} items={nearby} />
{/if}

<CtaSection />

<script>
	import {
		ArticleHero,
		ArticleLayout,
		FaqBlock,
		RelatedCards,
		RecommendedPriceCards,
		CtaSection,
		Seo,
	} from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';
	import { getCity, offersAutomatic } from '$lib/data/cities';
	import { services } from '$lib/data/services';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { formatEuro } from '$lib/utils/format-euro';
	import { fillPlaceholders, starterPackage } from '$lib/utils/placeholders';
	import { slugify } from '$lib/utils/text';
	import { cityAnswer, cityTypesFact } from '$lib/utils/city-copy';
	import { service as schemaService, breadcrumbs, faqPage } from '$lib/seo/schema.js';

	let { data } = $props();

	const city = $derived(getCity(data.slug));
	const content = $derived(pickByLocale(city));
	const h1 = $derived(content.h1 ?? m.city_hero_title({ city: city.name }));
	const starter = starterPackage();

	// Direct, factual answer for search engines and AI assistants
	const answer = $derived(cityAnswer(city));

	const headings = $derived({
		intro: m.city_facts_heading(),
		districts: m.city_districts_heading(),
		areas: m.city_areas_heading({ city: city.name }),
		practice: m.city_practice_heading(),
		services: m.city_services_heading(),
		faq: m.city_faq_heading({ city: city.name }),
	});
	const sectionId = (key) => slugify(headings[key]);
	const sections = $derived(
		Object.keys(headings)
			.filter((key) => key !== 'districts' || content.districts)
			.map((key) => ({ id: sectionId(key), heading: headings[key] }))
	);

	const facts = $derived([
		cityTypesFact(city),
		m.city_fact_languages(),
		m.city_fact_lesson({ price: formatEuro(business.prices.lesson) }),
		m.city_fact_packages({ price: formatEuro(starter.price), count: starter.lessons }),
		m.city_fact_average({ min: business.averageLessons.min, max: business.averageLessons.max }),
		m.city_fact_pickup({ city: city.name }),
		m.city_fact_instructor(),
		m.city_fact_on_request(),
		...(business.trialLesson.freeWithPackage ? [m.trial_fact_free()] : []),
	]);

	// no link to the automatic lessons page where none are given
	const cityServices = $derived(
		services.filter((s) => s.slug !== 'automaat-rijles' || offersAutomatic(city))
	);

	const faq = $derived(content.faq.map(({ q, a }) => ({ q, a: fillPlaceholders(a) })));

	const nearby = $derived(
		city.nearby
			.map((slug) => getCity(slug))
			.filter(Boolean)
			.map((other) => ({
				href: `/rijschool-${other.slug}`,
				title: pickByLocale(other).h1 ?? m.city_hero_title({ city: other.name }),
				text: pickByLocale(other).metaDescription,
			}))
	);
</script>

<style>
	h3 {
		font-size: var(--fs-hl-sm-mobile);
		margin: var(--space-6) 0 var(--space-2);
	}

	.callout {
		margin-top: var(--space-6);
	}

	.city-packages {
		text-align: center;
		h2 {
			font-size: var(--fs-hl-lg);
		}
	}
</style>
