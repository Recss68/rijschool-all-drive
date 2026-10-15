<Seo
	title={content.metaTitle}
	description={content.metaDescription}
	schema={[breadcrumbs([{ name: content.title, path: `/${data.slug}` }])]}
/>

<ArticleHero
	trail={[{ label: m.header_home(), href: '/' }, { label: m.footer_info_heading() }]}
	title={content.title}
	lead={content.intro}
	meta="{business.name} · {m.info_reading_time({ minutes })}"
/>

<ArticleLayout toc={sections.map((s) => ({ id: s.id, label: s.heading }))}>
	<ArticleBlocks {sections} />
</ArticleLayout>

<RelatedCards heading={m.info_related()} cta={m.info_read_more()} items={related} />

<CtaSection />

<script>
	import { ArticleHero, ArticleLayout, ArticleBlocks, RelatedCards, CtaSection, Seo } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { infoPages, getInfoPage } from '$lib/data/info';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { slugify, readingMinutes } from '$lib/utils/text';
	import { breadcrumbs } from '$lib/seo/schema.js';

	let { data } = $props();

	const content = $derived(pickByLocale(getInfoPage(data.slug)));

	// Sections with stable anchor ids for the table of contents
	const sections = $derived(
		content.articles.map((article) => ({ ...article, id: slugify(article.heading) }))
	);

	const minutes = $derived(
		readingMinutes([
			content.intro,
			...content.articles.flatMap((a) => [a.heading, ...(a.paragraphs ?? []), ...(a.items ?? [])]),
		])
	);

	const related = $derived(
		infoPages
			.filter((page) => page.slug !== data.slug)
			.map((page) => {
				const item = pickByLocale(page);
				return { href: `/${page.slug}`, title: item.title, text: item.metaDescription };
			})
	);
</script>
