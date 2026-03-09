<section class="section gradient hero-section">
	<div class="section-inner">
		<div class="parent-hero">
			<div class="hero-grid-1 fadeInUp">
				<span class="sub-title">
					<svg viewBox="0 0 24 24" width="15" aria-hidden="true" class="icon">
						<path
							d="M20 6L9 17l-5-5"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
					Officieel erkende rijschool</span
				>
				<h1 id="my-text">Start vandaag met <br />jouw rijbewijs.</h1>
				<p>
					Leer rijden met ervaren instructeurs in een veilige en professionele omgeving. Start
					vandaag nog met jouw eerste proefles.
				</p>
				<div class="hero-buttons">
					<a href="https://wa.me/31627824428" class="btn-white"
						>Proefles boeken<span class="arrow">→</span></a
					>
					<a href="/prijzen" class="btn-outline">Bekijk prijzen</a>
				</div>
				<hr class="divider-blue" />
				<ul>
					<li><span class="t-highlight">90%</span> Slagingspercentage</li>
					<li><span class="t-highlight">30+</span> Geslaagden</li>
					<li><span class="t-highlight">4.9/5</span> Beoordeling</li>
				</ul>
			</div>
			<div class="hero-grid-2 fadeInUp">
				<picture>
					<source srcset="/images/hero-picture.avif" loading="lazy" type="image/avif" />
					<source srcset="/images/hero-picture.webp" loading="lazy" type="image/webp" />
					<img
						class="hero-image"
						src="/images/hero-picture.jpg"
						alt="Instructor and Student"
						loading="lazy"
						fetchpriority="high"
					/>
				</picture>
			</div>
		</div>
	</div>
</section>

<script>
	import { gsap } from 'gsap';
	import { onMount, onDestroy } from 'svelte';

	let split;

	onMount(async () => {
		// respect user preference for reduced motion
		try {
			if (
				typeof window !== 'undefined' &&
				window.matchMedia('(prefers-reduced-motion: reduce)').matches
			) {
				// user prefers reduced motion — skip animation
				return;
			}

			// ensure gsap is available and the registerPlugin function exists
			if (!gsap || typeof gsap.registerPlugin !== 'function') {
				console.warn('GSAP is not available; skipping SplitText animation.');
				return;
			}

			// dynamically import SplitText (avoids import-time failures)
			let SplitTextModule;
			try {
				SplitTextModule = await import('gsap/SplitText');
			} catch (err) {
				// some environments or GSAP installs don't include SplitText
				console.warn('Could not load gsap/SplitText; skipping text-splitting animation.', err);
				return;
			}

			const SplitText =
				SplitTextModule &&
				(SplitTextModule.default || SplitTextModule.SplitText || SplitTextModule);
			if (!SplitText) {
				console.warn('SplitText plugin not found on import; skipping animation.');
				return;
			}

			gsap.registerPlugin(SplitText);
			split = new SplitText('#my-text', { type: 'chars' });

			// animate the chars in
			gsap.from(split.chars, {
				y: 8,
				opacity: 0,
				stagger: 0.05,
				delay: 0.2,
				duration: 0.45,
				ease: 'power2.out',
			});
		} catch (e) {
			console.warn('Error while trying to run SplitText animation:', e);
		}
	});

	onDestroy(() => {
		if (split && typeof split.revert === 'function') split.revert();
	});
</script>

<style>
	@media (min-width: 768px) {
		.parent-hero {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: var(--space-18);
		}

		.hero-grid-1 {
			grid-area: 1 / 1 / 2 / 2;
		}
		.hero-grid-2 {
			grid-area: 1 / 2 / 2 / 3;
			display: flex;
			justify-content: center;
		}
	}

	.hero-section {
		padding-top: var(--space-26);
		color: var(--c-white);
		background: linear-gradient(to bottom right, var(--g-0), var(--g-50), var(--g-100));
		h1,
		p {
			margin-top: var(--space-8);
		}
		h1 {
			color: var(--c-white);
			font-size: var(--fs-display-md);
		}
		p {
			color: var(--c-slate-200);
		}
		ul {
			padding: 0;
			margin: 0;
			margin-top: var(--space-8);
			list-style: none;
			display: flex;
			gap: var(--space-6);
			justify-content: center;
			li {
				font-size: var(--fs-body-sm);
			}
		}
	}

	.hero-buttons {
		margin-top: var(--space-10);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		@media (min-width: 786px) {
			flex-direction: row;
		}
	}

	.hero-image {
		display: none;
		border-radius: var(--radius-round);
		@media (min-width: 768px) {
			display: block;
			aspect-ratio: 16 / 9;
			object-fit: cover;
			width: 100%;
			height: 100%;
			box-shadow: var(--shadow-md);
			opacity: 0.8;
		}
	}
</style>
