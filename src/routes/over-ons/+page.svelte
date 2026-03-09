<svelte:head>
	<title>Over Rijschool All Drive | Rijschool in Amsterdam</title>
	<meta
		name="description"
		content="Maak kennis met Rijschool All Drive in Amsterdam. Ontdek onze persoonlijke aanpak, ervaren instructeurs en waarom wij tot de best beoordeelde rijscholen in Amsterdam behoren."
	/>
</svelte:head>

<section class="breadcrumb">
	<h1>Over Rijschool All Drive</h1>
	<p>Jouw betrouwbare partner voor een veilig en succesvol rijbewijs!</p>
</section>

<AboutSection showLink={false} />

<section class="section lessons-info">
	<div class="section-inner">
		<h2><strong>Rijschool in Amsterdam</strong> voor schakel- en automaatrijlessen</h2>
		<div class="lessons-grid">
			<div class="lessons-grid-1">
				<p>
					Ben je op zoek naar een betrouwbare <strong>rijschool in Amsterdam</strong> waar je op een
					persoonlijke en effectieve manier leert autorijden? Bij
					<strong>Rijschool All Drive</strong>
					bieden wij professionele schakel rijlessen en automaat
					<strong>rijlessen in Amsterdam</strong>, afgestemd op jouw niveau en tempo. Of je nu net
					begint met rijlessen of al wat ervaring hebt, onze aanpak is gericht op duidelijke
					begeleiding, vertrouwen opbouwen en veilig leren rijden in het drukke verkeer van
					Amsterdam.
				</p>
				<p>
					Als <strong>rijschool Amsterdam</strong> geloven wij dat iedere leerling op zijn eigen manier
					leert. Daarom staan persoonlijke aandacht, transparantie en structuur centraal in onze lessen.
					Onze missie is om leerlingen niet alleen te helpen slagen voor hun rijexamen, maar ook om zelfverzekerde
					en verantwoordelijke bestuurders te worden. Onze visie is om een toegankelijke en kwalitatieve
					rijschool in Amsterdam te zijn waar leerlingen zich op hun gemak voelen en stap voor stap worden
					voorbereid op zelfstandig rijden.
				</p>
				<p>
					Met onze flexibele <strong>rijlessen in Amsterdam</strong>, zowel voor
					<strong>schakel rijlessen</strong>
					als <strong>automaat rijlessen</strong>, zorgen wij ervoor dat jij goed voorbereid bent op
					je praktijkexamen. Kies voor een rijschool die kwaliteit, persoonlijke begeleiding en
					resultaat combineert —
					<strong>kies voor Rijschool All Drive, jouw rijschool Amsterdam.</strong>
				</p>
			</div>

			<div class="lessons-grid-2">
				<article>
					<h3>Onze Visie</h3>
					<ul>
						<li>
							De meest betrouwbare en hoog gewaardeerde rijschool in Amsterdam worden voor
							leerlingen die op zoek zijn naar kwalitatieve rijlessen
						</li>
						<li>
							Een rijschool in Amsterdam zijn waar kwaliteit, veiligheid en persoonlijke begeleiding
							centraal staan
						</li>
						<li>Hoogwaardige rijlessen in Amsterdam aanbieden, zowel voor schakel als automaat</li>
						<li>
							Continu investeren in professionele instructeurs, moderne lesauto’s en effectieve
							lesmethoden
						</li>
						<li>De standaard zetten voor kwalitatief rijonderwijs binnen rijschool Amsterdam</li>
						<li>
							Leerlingen succesvol begeleiden naar hun rijbewijs met een duidelijke en
							gestructureerde aanpak
						</li>
						<li>
							Studenten voorbereiden op zelfstandig, veilig en verantwoordelijk rijden in het
							verkeer van Amsterdam
						</li>
						<li>
							Bijdragen aan veiliger verkeer door leerlingen op te leiden tot zelfverzekerde en
							verantwoordelijke bestuurders
						</li>
					</ul>
				</article>
			</div>
		</div>
	</div>
</section>

<section class="section benefits-container">
	<div class="section-inner">
		<div class="section-heading">
			<h2>Waarom kiezen voor Rijschool All Drive?</h2>
			<p>Ontdek wat ons uniek maakt en waarom leerlingen voor ons kiezen.</p>
		</div>
		<BenefitCards />
	</div>
</section>

<section class="section process-steps">
	<div class="section-inner">
		<div class="section-heading">
			<h2>Hoe het werkt</h2>
			<p>Een bewezen aanpak die resulteert in hoge slagingspercentages!</p>
		</div>
		<ProcessSteps showMethodContent={true} isWhite={true} />
	</div>
</section>

<section class="success-stories-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>Geslaagd bij Rijschool All Drive!</h2>
			<p>Ontmoet ekele van onze trotse geslaagde leerlingen!</p>
		</div>
		<SuccessStories />
		<p class="section-footer">
			Wil jij ook je rijbewijs halen? <a href="https://wa.me/31627824428">Neem dan nu contact op!</a
			>
		</p>
	</div>
</section>

<section class="section instructors-container">
	<div class="section-inner">
		<div class="section-heading">
			<h2>Maak kennis met ons instructeursteam</h2>
			<p>Onze ervaren en vriendelijke instructeurs staan klaar om jou te begeleiden naar succes!</p>
		</div>
		<InstructorTeam />
	</div>
</section>

<CtaSection />

<script>
	import {
		AboutSection,
		BenefitCards,
		ProcessSteps,
		SuccessStories,
		InstructorTeam,
		CtaSection,
	} from '$lib';
</script>

<style>
	.section-heading h2,
	h2 {
		font-size: var(--fs-hl-lg);
		margin-bottom: var(--space-5);
	}
	.section-heading {
		h2,
		p {
			text-align: center;
		}
	}

	.lessons-info {
		background-color: var(--c-section);
		h2 {
			text-align: center;
		}

		article {
			background-color: var(--c-white);
			padding: var(--space-4);
			border-radius: var(--radius-round);
			margin-bottom: var(--space-6);
			color: var(--c-text-light);
			h3 {
				background-color: var(--c-accent);
				color: var(--c-white);
				padding: var(--space-2);
				margin: var(--space-4);
				border-radius: var(--radius-soft);
				text-align: center;
			}
			ul li {
				margin-bottom: var(--space-4);
			}
		}

		@media (min-width: 1024px) {
			.lessons-grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-column-gap: var(--space-6);
				align-items: start;
				.lessons-grid-1 {
					margin-top: var(--space-8);
				}
			}

			.lessons-grid > * {
				width: 100%;
				max-width: 560px;
				margin: 0 auto;
			}

			article ul {
				padding: 0 var(--space-10) 0 var(--space-12);
			}
		}
	}

	.process-steps,
	.instructors-container {
		background-color: var(--c-section);
	}
</style>
