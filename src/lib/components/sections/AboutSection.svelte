<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
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
				<h2>{m.about_heading()}</h2>
			</div>
			<p>{@html m.about_para1()}</p>
			<p>{@html m.about_para2()}</p>
			<p>{@html m.about_para3()}</p>
			<p>{@html m.about_para4()}</p>
			<ul>
				<li>{m.about_list_1()}</li>
				<li>{m.about_list_2()}</li>
				<li>{m.about_list_3()}</li>
				<li>{m.about_list_4()}</li>
			</ul>
			<p>{@html m.about_para5()}</p>
			{#if showLink}
				<a class="rec-btn" href="/over-ons">{m.about_read_more()} <span class="arrow">→</span></a>
			{/if}
		</div>
	</div>
</section>

<script>
	import { m } from '$lib/paraglide/messages.js';

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
