<section class="about-section section">
	<div class="section-inner">
		<picture>
			<source srcset="/images/alldrive-auto.avif" type="image/avif" />
			<source srcset="/images/alldrive-auto.webp" type="image/webp" />
			<img
				src="/images/alldrive-auto.jpg"
				alt="rijschool-alldrive-car"
				width="600"
				height="500"
				loading="lazy"
				decoding="async"
			/>
		</picture>

		<div class="t-content">
			<div class="section-heading">
				<h2>{m.about_heading()}</h2>
			</div>
			<p>{m.about_intro()}</p>
			<dl>
				{#each questions as item (item.q)}
					<dt>{item.q}</dt>
					<dd>{item.a}</dd>
				{/each}
			</dl>
			{#if showLink}
				<a class="rec-btn" href="/over-ons">{m.about_read_more()} <span class="arrow">→</span></a>
			{/if}
		</div>
	</div>
</section>

<script>
	import { m } from '$lib/paraglide/messages.js';

	export let showLink = true;

	const questions = [
		{ q: m.about_q1(), a: m.about_a1() },
		{ q: m.about_q2(), a: m.about_a2() },
		{ q: m.about_q3(), a: m.about_a3() },
		{ q: m.about_q4(), a: m.about_a4() },
		{ q: m.about_q5(), a: m.about_a5() },
		{ q: m.about_q6(), a: m.about_a6() },
	];
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
		dl {
			margin: var(--space-6) 0;
		}
		dt {
			color: var(--c-text);
			font-weight: var(--fw-semibold);
			margin-top: var(--space-4);
		}
		dd {
			margin: var(--space-1) 0 0;
		}
	}
</style>
