<div class="price-cards">
	{#each cards as card (card.pkg.id)}
		<article class:highlighted-card={card.highlighted}>
			{#if card.highlighted}
				<span class="badge">{m.recommended_badge_popular()}</span>
			{/if}
			<h3>{card.pkg.title}</h3>
			<p>{card.subtitle}</p>

			<p class="price">
				{formatEuro(card.pkg.price)}
				<span>{m.recommended_lessons_suffix({ count: card.pkg.lessons })}</span>
			</p>
			<ul>
				{#each features(card.pkg) as feature (feature)}
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"
							></path>
						</svg>
						{feature}
					</li>
				{/each}
			</ul>
			{#if card.highlighted}
				<a class="btn-primary rec-btn" href={business.whatsappUrl}
					>{m.recommended_choose_package()}</a
				>
			{:else}
				<a class="btn-primary" href="/prijzen">{m.recommended_more_info()}</a>
			{/if}
		</article>
	{/each}
</div>
<p class="terms-link"><a href="/prijzen#voorwaarden">{m.recommended_terms_link()}</a></p>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { business } from '$lib/data/business.js';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { formatEuro } from '$lib/utils/format-euro';
	import packagesNl from '$lib/data/pricing-packages.nl.json';
	import packagesEn from '$lib/data/pricing-packages.en.json';

	const packages = pickByLocale({ nl: packagesNl, en: packagesEn });
	const byId = (id) => packages.find((pkg) => pkg.id === id);

	const cards = [
		{ pkg: byId('rij-start'), subtitle: m.recommended_card1_subtitle() },
		{ pkg: byId('door-rij'), subtitle: m.recommended_card2_subtitle(), highlighted: true },
		{ pkg: byId('vol-gas'), subtitle: m.recommended_card3_subtitle() },
	];

	// Concrete, checkable facts per package; unconfirmed policies are left out
	function features(pkg) {
		const { policies, prices } = business;
		return [
			business.promoFreeInterimExam &&
				m.recommended_feature_promo({ price: formatEuro(prices.interimExam) }),
			m.recommended_feature_lessons({ count: pkg.lessons }),
			pkg.includesExam && m.recommended_feature_exam(),
			pkg.includesExam && policies.examCarIncluded && m.recommended_feature_exam_car(),
			m.recommended_feature_extra_lesson({ price: formatEuro(prices.lesson) }),
			m.recommended_feature_fixed_instructor(),
			m.recommended_feature_pickup(),
			policies.installments && m.recommended_feature_installments(),
		].filter(Boolean);
	}
</script>

<style>
	.price-cards {
		display: flex;
		gap: var(--space-6);
		flex-direction: column;
		@media (min-width: 1024px) {
			flex-direction: row;
			justify-content: center;
			margin-top: var(--space-16);
		}
	}

	.terms-link {
		margin-top: var(--space-8);
		a {
			color: var(--c-accent);
			font-weight: var(--fw-semibold);
		}
	}

	.highlighted-card {
		border: none;
		background-color: var(--c-accent);
		box-shadow: var(--shadow-sm);
		h3,
		p,
		.price,
		.price span,
		ul {
			color: var(--c-white);
		}
		li svg {
			fill: var(--c-yellow);
		}
		.badge {
			background-color: var(--c-yellow);
			font-weight: var(--fw-semibold);
			font-size: var(--fs-label-s-mobile);
			padding: 5px 20px 5px 20px;
			border-radius: 0 0 var(--radius-soft) var(--radius-soft);
			position: absolute;
			top: 0;
			left: 65%;
		}
		@media (min-width: 1024px) {
			transform: scale(1.05);
		}
	}

	article {
		position: relative;
		text-align: left;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-soft);
		padding: var(--space-10);
		transition: border-color 0.2s ease-in-out;
		width: 100%;

		&:hover {
			border-color: var(--c-accent);
		}
		.price {
			font-family: var(--font-heading);
			font-weight: var(--fw-bold);
			font-size: var(--fs-highlighted-mobile);
			color: var(--c-black);
			span {
				font-weight: var(--fw-regular);
				color: var(--c-text-light);
				font-size: var(--fs-label-sm-mobile);
			}
		}
		h3 {
			font-size: var(--fs-hl-sm-desktop);
			font-weight: var(--fw-semibold);
		}
		p {
			color: var(--c-text-light);
			font-size: var(--fs-label-sm-mobile);
		}
		ul {
			color: var(--c-text-light);
			padding: 0;
			list-style: none;
			li {
				display: flex;
				align-items: center;
				gap: var(--space-3);
				margin-bottom: var(--space-4);
				svg {
					width: var(--space-6);
					color: var(--c-green);
				}
			}
		}
		.btn-primary {
			display: flex;
			justify-content: center;
		}
	}
</style>
