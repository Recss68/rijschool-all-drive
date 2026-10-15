// Informational pages (/[slug]) linked from the footer "Informatie" column.
// Every other .js file in this folder is one page; adding a page = adding one file.
//
// Each file exports `page` = {
//   slug, order,
//   nl: { title, metaTitle, metaDescription, intro,
//         articles[{ heading, variant?, paragraphs?, items?, links? }] },
//   variant: 'steps' (numbered steps), 'callout' (highlighted tip box) or 'sources' (official links box)
//   en: { ...same keys }
// }

const modules = import.meta.glob('./*.js', { eager: true });

export const infoPages = Object.entries(modules)
	.filter(([path]) => !path.endsWith('/index.js'))
	.map(([, mod]) => mod.page)
	.sort((a, b) => a.order - b.order);

export const getInfoPage = (slug) => infoPages.find((page) => page.slug === slug);
