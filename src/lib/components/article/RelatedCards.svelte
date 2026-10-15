<section class="section related" class:white={tone === 'white'}>
	<div class="section-inner">
		<h2>{heading}</h2>
		<ul role="list">
			{#each items as item (item.href)}
				<li>
					<a href={localizeHref(item.href)}>
						<h3>{item.title}</h3>
						<p>{item.text}</p>
						<span class="more">
							{cta}
							<span class="arrow" aria-hidden="true">→</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<script>
	import { localizeHref } from '$lib/paraglide/runtime';

	/** @type {{ heading: string, cta: string, items: { href: string, title: string, text: string }[], tone?: 'section' | 'white' }} */
	let { heading, cta, items, tone = 'section' } = $props();
</script>

<style>
	.related {
		background-color: var(--c-section);
		&.white {
			background-color: var(--c-white);
		}
		h2 {
			text-align: center;
			font-size: var(--fs-hl-lg);
			margin-bottom: var(--space-8);
		}
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: grid;
			gap: var(--space-5);
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
		}
	}

	a {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		height: 100%;
		padding: var(--space-6);
		background-color: var(--c-white);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		transition:
			border-color 0.2s ease-out,
			box-shadow 0.2s ease-out;

		&:hover {
			border-color: var(--c-accent);
			box-shadow:
				0 1px 2px rgb(0 38 70 / 0.06),
				0 8px 24px rgb(0 38 70 / 0.08);
			.arrow {
				transform: translateX(3px);
			}
		}
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 3px;
		}
	}

	.white a {
		background-color: var(--c-section);
		&:hover {
			background-color: var(--c-white);
		}
	}

	h3 {
		margin: 0;
		font-size: var(--fs-hl-sm-mobile);
		color: var(--c-navy-900);
		text-wrap: balance;
	}

	p {
		margin: 0;
		flex-grow: 1;
		color: var(--c-text-light);
		font-size: var(--fs-label-s-mobile);
		text-wrap: pretty;
	}

	.more {
		margin-top: var(--space-2);
		font-size: var(--fs-label-s-mobile);
		font-weight: var(--fw-semibold);
		color: var(--c-accent);
	}

	.arrow {
		display: inline-block;
		transition: transform 0.2s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		a:hover .arrow {
			transform: none;
		}
	}
</style>
