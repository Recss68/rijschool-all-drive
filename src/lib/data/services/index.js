// Service pages (/[slug]). Every other .js file in this folder is one service.
//
// Each file exports `service` = {
//   slug, order, serviceType, showPrice (false = never show or mark up a price, e.g. spoedcursus),
//   cta: 'trial' | 'intensive' | 'refresher' | 'drivingTest' (all but 'trial' lead to WhatsApp, copy in $lib/utils/cta-copy),
//   nl: { cardTitle, linkTitle? (short footer link text, defaults to title), summary (one short sentence for cards), title, metaTitle, metaDescription, answer, articles[{ heading, variant?, paragraphs?, items?, links? }],
//         faq[{ q, a }] },
//   en: { ...same keys }
// }
// `answer` and FAQ answers may use {lessonPrice}, {fromPrice}, {fromLessons}, {min} and {max}.

const modules = import.meta.glob('./*.js', { eager: true });

export const services = Object.entries(modules)
	.filter(([path]) => !path.endsWith('/index.js'))
	.map(([, mod]) => mod.service)
	.sort((a, b) => a.order - b.order);

export const getService = (slug) => services.find((service) => service.slug === slug);
