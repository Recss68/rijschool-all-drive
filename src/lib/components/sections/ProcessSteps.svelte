<script>
	export let showMethodContent = false;
	export let isWhite = false;
</script>

<div class="process-steps">
	<ol class="steps">
		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>Persoonlijke Intake</h2>
					<p>
						We beginnen altijd met een uitgebreid kennismakingsgesprek om je doelen, verwachtingen
						en eventuele zorgen te bespreken. Dit helpt ons om een lesprogramma op maat te maken.
					</p>
				{:else}
					<h3>Aanmelden & Kennismaken</h3>
					<p>
						Boek je gratis proefles online of neem contact met ons op. We plannen een kennismaking
						en bespreken je doelen en verwachtingen.
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>Stapsgewijze Opbouw</h2>
					<p>
						We bouwen de lessen logisch en stapsgewijs op, van basis rijvaardigheden tot complexe
						verkeerssituaties. Elke les sluit aan bij je voortgang en niveau.
					</p>
				{:else}
					<h3>Theorie & Rijlessen</h3>
					<p>
						Begin met je theorie-examen en start tegelijkertijd met je rijlessen. Wij begeleiden je
						bij beide onderdelen tot je volledig voorbereid bent.
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>Continue Feedback</h2>
					<p>
						Na elke les ontvang je duidelijke feedback over je vorderingen en aandachtspunten. Zo
						weet je precies waar je staat en wat je nog moet leren.
					</p>
				{:else}
					<h3>Voorbereiding Praktijkexamen</h3>
					<p>
						Je instructeur bepaalt wanneer je klaar bent voor het praktijkexamen. We regelen de
						aanmelding en begeleiden je volledig op de dag zelf.
					</p>
				{/if}
			</div>
		</li>

		<li class:is-white={isWhite}>
			<span class="step-number"></span>
			<div class="step-content">
				{#if showMethodContent}
					<h2>Examenbegeleiding</h2>
					<p>
						Wanneer je volledig voorbereid bent, regelen we je examen en begeleiden we je op de dag
						zelf. We blijven bij je tot je geslaagd bent.
					</p>
				{:else}
					<h3>Geslaagd & Rijbewijs!</h3>
					<p>
						Gefeliciteerd! Je hebt je rijbewijs gehaald. Je ontvangt je rijbewijs binnen enkele
						dagen en bent klaar om zelfstandig de weg op te gaan.
					</p>
				{/if}
			</div>
		</li>
	</ol>
</div>

<style>
	.process-steps {
		@media (min-width: 768px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.steps {
		list-style: none;
		text-align: left;
		padding: 0;
		margin: 0;
		counter-reset: step;
		.step-number {
			display: inline-block;
			background-color: var(--c-accent);
			color: var(--c-white);
			padding: var(--space-7) var(--space-8);
			border-radius: var(--radius-round);
			box-shadow: var(--shadow-m);
			margin: var(--space-8) 0 var(--space-6) 0;
		}
		.step-number,
		h3 {
			font-size: var(--fs-hl-sm-desktop);
			font-weight: var(--fw-bold);
		}
		li {
			counter-increment: step;
		}
		.step-number::before {
			content: counter(step, decimal-leading-zero);
		}
		@media (min-width: 786px) {
			li {
				display: grid;
				grid-template-columns: 96px 1fr;
				column-gap: var(--space-6);
				align-items: center;
			}

			.step-number {
				grid-column: 1;
			}

			.step-content {
				grid-column: 2;
			}

			li h3 {
				padding-top: var(--space-3);
				margin-bottom: var(--space-1);
			}

			li p {
				margin: 0;
				max-width: 65ch;
			}
		}
	}

	.is-white {
		background-color: var(--c-white);
		border-radius: var(--radius-soft);
		box-shadow: var(--shadow-m);
		padding: var(--space-5);
		margin-bottom: var(--space-8);
	}
</style>
