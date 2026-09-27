<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<svelte:head>
	<title>{m.meta_prijzen_title()}</title>
	<meta name="description" content={m.meta_prijzen_description()} />
</svelte:head>

<section class="breadcrumb">
	<h1>{m.prijzen_hero_title()}</h1>
	<p>{m.prijzen_hero_text()}</p>
</section>

<section class="pricing">
	<PricingCards />
</section>

<section class="section package-info">
	<div class="section-inner">
		<h2>{m.prijzen_package_info_heading()}</h2>
		<div class="package-list">
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature1_title()}</h3>
				<p>{m.prijzen_feature1_desc()}</p>
			</article>
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature2_title()}</h3>
				<p>{m.prijzen_feature2_desc()}</p>
			</article>
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature3_title()}</h3>
				<p>{m.prijzen_feature3_desc()}</p>
			</article>
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature4_title()}</h3>
				<p>{m.prijzen_feature4_desc()}</p>
			</article>
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature5_title()}</h3>
				<p>{m.prijzen_feature5_desc()}</p>
			</article>
			<article>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
					></path>
				</svg>
				<h3>{m.prijzen_feature6_title()}</h3>
				<p>
					{m.prijzen_feature6_desc()}
				</p>
			</article>
		</div>
	</div>
</section>

<section class="section price-terms" id="voorwaarden">
	<div class="section-inner">
		<h2>{m.prijzen_terms_heading()}</h2>
		<div class="terms-card">
			<ul>
				{#each priceTerms as term (term)}
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
							></path>
						</svg>
						<span>{term}</span>
					</li>
				{/each}
			</ul>
			<p class="terms-more">{@html m.prijzen_terms_more()}</p>
		</div>
	</div>
</section>

<FaqSection />

<CtaSection isPricePage={true} />

<script>
	import { PricingCards, CtaSection, FaqSection } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { formatEuro } from '$lib/utils/format-euro';

	const { prices, policies } = business;

	// Only confirmed policies are listed (see $lib/data/business.js)
	const priceTerms = [
		business.promoFreeInterimExam &&
			m.prijzen_term_promo({ price: formatEuro(prices.interimExam) }),
		m.prijzen_term_extra_lesson({ price: formatEuro(prices.lesson) }),
		m.prijzen_term_exam({ price: formatEuro(prices.exam) }),
		business.trialLesson.freeWithPackage &&
			m.prijzen_term_trial({ price: formatEuro(prices.lesson) }),
		policies.installments === true && m.prijzen_term_installments_yes(),
		policies.installments === false && m.prijzen_term_installments_no(),
		policies.packageValidityMonths &&
			m.prijzen_term_validity({ months: policies.packageValidityMonths }),
		policies.unusedLessonsRefund === true && m.prijzen_term_refund_yes(),
		policies.unusedLessonsRefund === false && m.prijzen_term_refund_no(),
		policies.cancelHours && m.prijzen_term_cancel({ hours: policies.cancelHours }),
	].filter(Boolean);
</script>

<style>
	.price-terms {
		h2 {
			text-align: center;
			margin-bottom: var(--space-8);
			font-size: var(--fs-hl-lg);
		}
		.terms-card {
			max-width: 760px;
			margin-inline: auto;
			padding: var(--space-6);
			border: 1px solid var(--c-border);
			border-radius: var(--radius-m);
		}
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		li {
			display: flex;
			align-items: flex-start;
			gap: var(--space-3);
			margin-bottom: var(--space-4);
			color: var(--c-text-light);
			svg {
				flex-shrink: 0;
				width: var(--space-6);
				color: var(--c-green);
			}
		}
		.terms-more {
			margin: 0;
			padding-top: var(--space-4);
			border-top: 1px solid var(--c-border-light);
			:global(a) {
				color: var(--c-accent);
				font-weight: var(--fw-semibold);
			}
		}
	}

	.package-info {
		background-color: var(--c-section);
		h2 {
			text-align: center;
			margin-bottom: var(--space-12);
			font-size: var(--fs-hl-lg);
		}
		.package-list {
			article {
				background-color: var(--c-white);
				padding: var(--space-4);
				border-radius: var(--radius-m);
				svg {
					fill: var(--c-green);
					width: 40px;
				}
			}
		}
		@media (min-width: 1024px) {
			.package-list {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: var(--space-6);
			}
		}
	}
</style>
