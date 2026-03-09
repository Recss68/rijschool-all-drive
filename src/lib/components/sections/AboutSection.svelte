<section class="about-section section">
	<div class="section-inner">
		<picture>
			<source srcset="/images/alldrive-auto.avif" type="image/avif" />
			<source srcset="/images/alldrive-auto.webp" type="image/webp" />
			<img
				src="/images/alldrive-auto.jpeg"
				alt="rijschool-alldrive-car"
				width="600"
				height="500"
				loading="lazy"
				decoding="async"
			/>
		</picture>

		<div class="t-content">
			<div class="section-heading">
				<h2>Over Rijschool All Drive</h2>
			</div>
			<p>
				Bij Rijschool All Drive, dé <b>rijschool in Amsterdam</b>, geloven we dat leren rijden meer
				is dan alleen het besturen van een auto. Het draait om vertrouwen, veiligheid en
				zelfstandigheid – essentieel voor iedereen die zijn rijbewijs wil halen <b>in Amsterdam</b>.
			</p>
			<p>
				Ben je op zoek naar <b>een betrouwbare rijschool Amsterdam</b> met persoonlijke begeleiding?
				Vraag je je af welke <b>rijschool in Amsterdam</b> een hoog slagingspercentage heeft? Bij ons
				ben je aan het juiste adres.
			</p>
			<p>
				Sinds onze oprichting hebben wij al veel cursisten geholpen om succesvol hun rijbewijs te
				behalen. Met een slagingspercentage van 85% behoren wij tot de best presterende <b
					>rijscholen in Amsterdam</b
				>.
			</p>
			<p>Waarom kiezen zoveel leerlingen voor onze <b>rijschool in Amsterdam?</b></p>
			<ul>
				<li>Persoonlijke begeleiding vanaf je eerste les</li>
				<li>Ervaren en geduldige instructeurs</li>
				<li>Flexibele lestijden in heel Amsterdam</li>
				<li>Duidelijke lespakketten zonder verborgen kosten</li>
			</ul>
			<p>
				Wil jij snel en veilig je rijbewijs halen bij <b
					>een professionele rijschool in Amsterdam?</b
				> Ons team van ervaren instructeurs begeleidt je stap voor stap, van je eerste proefles tot aan
				het praktijkexamen.
			</p>
			{#if showLink}
				<a class="rec-btn" href="/over-ons">Lees meer over ons <span class="arrow">→</span></a>
			{/if}
		</div>
	</div>
</section>

<script>
	export let showLink = true;
</script>

<style>
	.about-section {
		text-align: center;
		position: relative;
		@media (min-width: 786px) {
			.section-inner {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: 1fr;
				column-gap: var(--space-12);
				img {
					grid-column: 1;
					height: 100%;
				}
				.t-content {
					grid-column: 2;
				}
			}
		}
		h2 {
			font-size: var(--fs-hl-lg);
		}
		img {
			object-fit: cover;
			object-position: 75%;
			border-radius: var(--radius-m);
			box-shadow: var(--shadow-m);
			margin-bottom: var(--space-12);
			width: 100%;
		}
		.t-content {
			text-align: left;
			font-size: var(--fs-hl-sm-mobile);
			color: var(--c-text-light);
		}
	}
</style>
