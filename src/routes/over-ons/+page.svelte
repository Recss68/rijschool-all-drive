<svelte:head>
	<title>Over Rijschool All Drive | Rijschool in Amsterdam</title>
	<meta
		name="description"
		content="Maak kennis met Rijschool All Drive in Amsterdam. Ontdek onze persoonlijke aanpak, ervaren instructeurs en waarom wij tot de best beoordeelde rijscholen in Amsterdam behoren."
	/>
</svelte:head>

<script>
	import { AboutSection } from '$lib';
</script>

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
				<p>Ben je op zoek naar een betrouwbare <strong>rijschool in Amsterdam</strong> waar je op een persoonlijke en effectieve manier leert autorijden? Bij Rijschool All Drive bieden wij professionele schakel rijlessen en automaat rijlessen in Amsterdam, afgestemd op jouw niveau en tempo. Of je nu net begint met rijlessen of al wat ervaring hebt, onze aanpak is gericht op duidelijke begeleiding, vertrouwen opbouwen en veilig leren rijden in het drukke verkeer van Amsterdam.</p>
				<p>Als rijschool Amsterdam geloven wij dat iedere leerling op zijn eigen manier leert. Daarom staan persoonlijke aandacht, transparantie en structuur centraal in onze lessen. Onze missie is om leerlingen niet alleen te helpen slagen voor hun rijexamen, maar ook om zelfverzekerde en verantwoordelijke bestuurders te worden. Onze visie is om een toegankelijke en kwalitatieve rijschool in Amsterdam te zijn waar leerlingen zich op hun gemak voelen en stap voor stap worden voorbereid op zelfstandig rijden.</p>
				<p>Met onze flexibele rijlessen in Amsterdam, zowel voor schakel rijlessen als automaat rijlessen, zorgen wij ervoor dat jij goed voorbereid bent op je praktijkexamen. Kies voor een rijschool die kwaliteit, persoonlijke begeleiding en resultaat combineert — kies voor Rijschool All Drive, jouw rijschool Amsterdam.</p>
			</div>

			<div class="lessons-grid-2">
				<article>
					<h3>Onze Visie</h3>
					<ul>
						<li>De meest betrouwbare en hoog gewaardeerde rijschool in Amsterdam worden voor leerlingen die op zoek zijn naar kwalitatieve rijlessen</li>
						<li>Een rijschool in Amsterdam zijn waar kwaliteit, veiligheid en persoonlijke begeleiding centraal staan</li>
						<li>Continu investeren in professionele instructeurs, moderne lesauto’s en effectieve lesmethoden</li>
						<li>De standaard zetten voor kwalitatief rijonderwijs binnen rijschool Amsterdam</li>
						<li>Bijdragen aan veiliger verkeer door leerlingen op te leiden tot zelfverzekerde en verantwoordelijke bestuurders</li>
					</ul>
				</article>

				<article>
					<h3>Onze Missie</h3>
					<ul>
						<li>Elke leerling de best mogelijke rijervaring bieden bij een professionele rijschool in Amsterdam</li>
						<li>Persoonlijke begeleiding en duidelijke uitleg tijdens elke rijles</li>
						<li>Hoogwaardige rijlessen in Amsterdam aanbieden, zowel voor schakel als automaat</li>
						<li>Leerlingen succesvol begeleiden naar hun rijbewijs met een gestructureerde aanpak</li>
						<li>Studenten voorbereiden op zelfstandig, veilig en verantwoordelijk rijden in het verkeer van Amsterdam</li>						
					</ul>
				</article>
			</div>

		</div>
	</div>
</section>

<style>
	.lessons-info {
		background-color: var(--c-section);
		h2 {
			font-size: var(--fs-hl-lg);
			margin-bottom: var(--space-12);
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
	}
</style>