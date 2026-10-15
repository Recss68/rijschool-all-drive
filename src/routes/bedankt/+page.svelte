<!--
	Thank-you page after a successful form. Its URL (/bedankt?form=aanmelden or ?form=contact,
	/en/thank-you in English) is the conversion URL for Google Ads.
-->
<Seo title={m.meta_thanks_title()} description={m.meta_thanks_description()} noindex />

<section class="breadcrumb thanks-hero">
	<div class="check" aria-hidden="true">
		<svg viewBox="0 0 24 24" width="36" height="36">
			<path
				d="M5 12.5l4.5 4.5L19 7.5"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
	</div>
	<h1>{isSignup ? m.signup_success_title() : m.form_success_title()}</h1>
	<p>{isSignup ? m.signup_success_text() : m.thanks_contact_text()}</p>
</section>

<section class="section next-steps">
	<div class="section-inner">
		<h2>{m.thanks_next_heading()}</h2>
		<ol class="steps">
			<li>{m.thanks_step_1()}</li>
			<li>{m.thanks_step_2()}</li>
			<li>{isSignup ? m.thanks_step_3_signup() : m.thanks_step_3_contact()}</li>
		</ol>

		<div class="hurry">
			<h3>{m.thanks_hurry_heading()}</h3>
			<p>{m.thanks_hurry_text()}</p>
			<div class="hurry-buttons">
				<a class="btn-secondary" href={business.whatsappUrl}>WhatsApp</a>
				<a class="btn-primary" href="tel:{business.phone}">{business.phoneDisplay}</a>
			</div>
		</div>
	</div>
</section>

<RelatedCards heading={m.thanks_prepare_heading()} cta={m.info_read_more()} items={articles} />

<script>
	import { page } from '$app/state';
	import { RelatedCards, Seo } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { infoPages } from '$lib/data/info';
	import { pickByLocale } from '$lib/utils/get-localized-data';

	const isSignup = $derived(page.url.searchParams.get('form') !== 'contact');

	const articles = infoPages.map((info) => {
		const content = pickByLocale(info);
		return { href: `/${info.slug}`, title: content.title, text: content.metaDescription };
	});
</script>

<style>
	.thanks-hero {
		.check {
			display: grid;
			place-items: center;
			width: 64px;
			height: 64px;
			margin: 0 auto var(--space-6);
			border-radius: 50%;
			background-color: var(--c-green);
			color: var(--c-white);
			box-shadow:
				0 0 0 8px rgb(0 166 62 / 0.2),
				0 8px 24px rgb(0 0 0 / 0.25);
			animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		p {
			max-width: 640px;
			margin-inline: auto;
		}
	}

	.next-steps {
		.section-inner {
			max-width: 720px;
		}
		h2 {
			font-size: var(--fs-hl-md);
			margin-bottom: var(--space-6);
		}
	}

	.steps {
		list-style: none;
		counter-reset: step;
		padding: 0;
		margin: 0 0 var(--space-10);
		li {
			counter-increment: step;
			position: relative;
			padding: 0 0 var(--space-6) var(--space-14);
			min-height: var(--space-10);
			color: var(--c-text-light);
			&::before {
				content: counter(step);
				position: absolute;
				left: 0;
				top: -0.15rem;
				width: var(--space-10);
				height: var(--space-10);
				display: grid;
				place-items: center;
				border-radius: 50%;
				background-color: var(--c-accent);
				color: var(--c-white);
				font-family: var(--font-heading);
				font-weight: var(--fw-bold);
			}
			&:not(:last-child)::after {
				content: '';
				position: absolute;
				left: calc(var(--space-10) / 2 - 1px);
				top: var(--space-10);
				bottom: 0;
				width: 2px;
				background-color: var(--c-icon-bg);
			}
		}
	}

	.hurry {
		padding: var(--space-6);
		border-radius: var(--radius-m);
		background-color: var(--c-section);
		border: 1px solid var(--c-border-light);
		h3 {
			margin: 0 0 var(--space-2);
			font-size: var(--fs-hl-sm-mobile);
		}
		p {
			margin: 0 0 var(--space-4);
		}
	}

	.hurry-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		a {
			min-height: 48px;
			padding-inline: var(--space-6);
			display: inline-flex;
			align-items: center;
		}
	}

	@keyframes pop {
		from {
			transform: scale(0.6);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.thanks-hero .check {
			animation: none;
		}
	}
</style>
