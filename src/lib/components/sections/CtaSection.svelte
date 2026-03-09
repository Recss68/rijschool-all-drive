<section class="cta-section gradient section">
	<div class="section-inner">
		{#if isPricePage}
			<h2>Nog vragen over onze prijzen?</h2>
			<p>
				Neem contact met ons op voor persoonlijk advies over welk pakket het beste bij jou past!
			</p>
		{:else}
			<h2>Klaar om te beginnen?</h2>
			<p>
				Start vandaag nog met je eerste gratis proefles en ervaar zelf waarom zo veel leerlingen
				voor ons kiezen.
			</p>
		{/if}
		<div class="cta-buttons">
			<a class="btn-white" href="https://wa.me/31627824428"
				>Boek je proefles <span class="arrow">→</span></a
			>
			<a class="btn-outline" href="tel:+31627824428">Bel direct!</a>
		</div>
	</div>
</section>

<script>
	export let isPricePage = false;
</script>

<style>
	.cta-section {
		text-align: center;
		background: linear-gradient(to bottom right, var(--g2-0), var(--g2-100));
		h2 {
			font-size: var(--fs-hl-lg-mobile);
		}
		p {
			font-size: var(--fs-hl-md-mobile);
		}
		h2,
		p {
			color: var(--c-white);
		}
		.section-inner {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: var(--space-4);
			.cta-buttons {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: var(--space-4);
				width: 100%;
			}
		}
		@media (min-width: 1024px) {
			h2 {
				font-size: var(--fs-hl-lg-desktop);
			}
			p {
				max-width: 60%;
			}
			.section-inner {
				.cta-buttons {
					flex-direction: row;
					.btn-outline,
					.btn-white {
						padding-right: var(--space-6);
						padding-left: var(--space-6);
					}
				}
			}
		}
	}
</style>
