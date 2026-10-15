<!--
	Service area: schematic SVG map (left) + compact list of city pages (right).
	Used on the home page and the /werkgebied hub. Markers are real links; on touch
	the first tap opens the info card, the link inside (or a second tap) navigates.
-->
<div class="service-area" bind:this={root}>
	<figure class="map-wrap" onpointerleave={(e) => e.pointerType === 'mouse' && (active = null)}>
		<div
			class="map"
			style:aspect-ratio="{MAP_WIDTH} / {bounds.height}"
			role="group"
			aria-label={m.map_label()}
		>
			<svg viewBox="0 0 {MAP_WIDTH} {bounds.height}" aria-hidden="true" focusable="false">
				<!-- water (North Sea, IJmeer) shows through where there are no municipalities -->
				<rect width={MAP_WIDTH} height={bounds.height} class="water"></rect>
				{#each shapes as shape (shape.name)}
					<path d={shape.d} class="municipality" class:served={shape.served}></path>
				{/each}
			</svg>

			{#each points as point (point.slug)}
				<a
					class="marker label-{point.label}"
					class:edge-right={point.left > 75}
					class:active={active === point.slug}
					href={localizeHref(`/rijschool-${point.slug}`)}
					style:left="{point.left}%"
					style:top="{point.top}%"
					aria-describedby={active === point.slug ? `map-card-${point.slug}` : undefined}
					onpointerdown={(e) => (pointerType = e.pointerType)}
					onclick={(e) => onMarkerClick(e, point.slug)}
					onpointerenter={(e) => e.pointerType === 'mouse' && (active = point.slug)}
					onfocus={() => onFocus(point.slug)}
				>
					<span class="dot" aria-hidden="true"></span>
					<span class="name" translate="no">{point.name}</span>
				</a>
			{/each}
		</div>
		{#if activePoint}
			<div
				class="card"
				id="map-card-{activePoint.slug}"
				class:below={activePoint.top < 34}
				class:align-start={activePoint.left < 24}
				class:align-end={activePoint.left > 76}
				style:left="{activePoint.left}%"
				style:--ty={activePoint.ty}
			>
				<strong translate="no">{activePoint.name}</strong>
				<ul class="areas" role="list">
					{#each activePoint.areas.slice(0, 5) as area (area)}
						<li translate="no">{area}</li>
					{/each}
					{#if activePoint.areas.length > 5}
						<li>+{activePoint.areas.length - 5}</li>
					{/if}
				</ul>
				<a href={localizeHref(`/rijschool-${activePoint.slug}`)}>
					{m.area_card_cta({ city: activePoint.name })}
					<span aria-hidden="true">→</span>
				</a>
			</div>
		{/if}
		<figcaption>{m.map_caption()}</figcaption>
	</figure>

	<ul class="city-list" role="list">
		{#each points as point (point.slug)}
			<li>
				<a
					href={localizeHref(`/rijschool-${point.slug}`)}
					class:active={active === point.slug}
					onpointerdown={(e) => (pointerType = e.pointerType)}
					onpointerenter={(e) => e.pointerType === 'mouse' && (active = point.slug)}
					onpointerleave={(e) => e.pointerType === 'mouse' && (active = null)}
					onfocus={() => onFocus(point.slug)}
				>
					<span class="pin" aria-hidden="true"></span>
					<span class="city">
						<span class="city-name" translate="no">{point.name}</span>
						<span class="count"
							>{point.areas.length === 1
								? m.area_count_one()
								: m.area_count({ count: point.areas.length })}</span
						>
					</span>
					<span class="arrow" aria-hidden="true">→</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<svelte:document onpointerdown={onDocumentPointer} onkeydown={onKeydown} onfocusin={onFocusIn} />

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { cities } from '$lib/data/cities';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import {
		MAP_WIDTH,
		MUNICIPALITIES,
		mapBounds,
		project,
		municipalityPath,
	} from '$lib/utils/map.js';

	const bounds = mapBounds(cities);
	const servedNames = new Set(cities.map((c) => c.municipality).filter(Boolean));
	// Served municipalities last, so their blue outline is drawn on top of the neighbours
	const shapes = MUNICIPALITIES.map((f) => ({
		name: f.name,
		served: servedNames.has(f.name),
		d: municipalityPath(f, bounds),
	})).sort((a, b) => Number(a.served) - Number(b.served));

	const points = cities.map((city) => {
		const { x, y } = project(city.coordinates.lat, city.coordinates.lon, bounds);
		return {
			slug: city.slug,
			name: city.name,
			label: city.mapLabel ?? 'top',
			areas: pickByLocale(city).areas,
			left: (x / MAP_WIDTH) * 100,
			top: (y / bounds.height) * 100,
			// y as a percentage of the map width, for container query units (cqw)
			ty: (y / MAP_WIDTH) * 100,
		};
	});

	let root;
	let active = $state(null);
	let pointerType = 'mouse';
	const activePoint = $derived(points.find((p) => p.slug === active));

	// Browsers also fire emulated mouse and focus events on a tap, before the click.
	// Only real mouse pointers and keyboard focus open the card; touch goes through onMarkerClick.
	function onFocus(slug) {
		if (pointerType !== 'touch') active = slug;
	}

	// Touch has no hover: the first tap shows the card, a second tap follows the link
	function onMarkerClick(event, slug) {
		if (pointerType === 'touch' && active !== slug) {
			event.preventDefault();
			active = slug;
		}
	}

	function onDocumentPointer(event) {
		if (active && root && !root.contains(event.target)) active = null;
	}

	function onFocusIn(event) {
		if (active && root && !root.contains(event.target)) active = null;
	}

	function onKeydown(event) {
		pointerType = 'keyboard';
		if (event.key !== 'Escape' || !active) return;
		const slug = active;
		active = null;
		root?.querySelector(`.marker[href$="-${slug}"]`)?.focus();
	}
</script>

<style>
	.service-area {
		display: grid;
		gap: var(--space-6);
		align-items: start;
		text-align: left;
		@media (min-width: 900px) {
			grid-template-columns: minmax(0, 1.7fr) minmax(260px, 1fr);
		}
	}

	/* ---------- map ---------- */
	.map-wrap {
		margin: 0;
		position: relative;
		/* lets the info card use cqw to find the marker's height on the map */
		container-type: inline-size;
	}

	.map {
		position: relative;
		width: 100%;
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		background-color: var(--c-white);
		box-shadow:
			0 1px 2px rgb(0 38 70 / 0.04),
			0 8px 24px rgb(0 38 70 / 0.05);
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-m);
	}
	.water {
		fill: var(--c-sky-100);
	}
	.municipality {
		fill: var(--c-white);
		stroke: var(--c-border-light);
		stroke-width: 0.8;
		stroke-linejoin: round;
		&.served {
			fill: var(--c-icon-bg);
			stroke: var(--c-accent);
			stroke-width: 1.4;
		}
	}

	figcaption {
		margin-top: var(--space-2);
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}

	/* marker: 44px hit area around a small dot, label next to it */
	.marker {
		position: absolute;
		width: 44px;
		height: 44px;
		transform: translate(-50%, -50%);
		display: grid;
		place-items: center;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		z-index: 1;
		&:focus-visible {
			outline: none;
			.dot {
				outline: 2px solid var(--c-accent);
				outline-offset: 4px;
			}
		}
		&.active,
		&:hover {
			z-index: 3;
			.dot {
				transform: scale(1.3);
			}
			.name {
				color: var(--c-accent);
			}
		}
	}

	.dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: var(--c-accent);
		border: 3px solid var(--c-white);
		box-shadow:
			0 0 0 1px rgb(21 93 252 / 0.35),
			0 2px 6px rgb(0 38 70 / 0.25);
		transition: transform 0.15s ease-out;
	}

	.name {
		position: absolute;
		white-space: nowrap;
		font-family: var(--font-heading);
		font-weight: var(--fw-bold);
		font-size: var(--fs-label-s-mobile);
		color: var(--c-navy-900);
		background-color: rgb(255 255 255 / 0.9);
		padding: 0 var(--space-1);
		border-radius: 4px;
		pointer-events: none;
	}
	.label-top .name {
		bottom: 100%;
		margin-bottom: -6px;
	}
	.label-bottom .name {
		top: 100%;
		margin-top: -6px;
	}
	.label-right .name {
		left: 100%;
		margin-left: -8px;
	}
	.label-left .name {
		right: 100%;
		margin-right: -8px;
	}
	/* on narrow screens, right-hand labels near the edge flip to the left so they stay on the map */
	@media (max-width: 600px) {
		.edge-right.label-right .name {
			left: auto;
			margin-left: 0;
			right: 100%;
			margin-right: -8px;
		}
	}

	/* info card above the marker (below it near the top edge); a panel under the map on phones */
	.card {
		position: absolute;
		top: calc(var(--ty) * 1cqw);
		z-index: 4;
		width: max-content;
		max-width: min(260px, 80vw);
		display: grid;
		gap: var(--space-2);
		padding: var(--space-4);
		background-color: var(--c-white);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-soft);
		box-shadow:
			0 2px 4px rgb(0 38 70 / 0.06),
			0 12px 32px rgb(0 38 70 / 0.14);
		transform: translate(-50%, calc(-100% - 22px));
		animation: card-in 0.15s ease-out;
		&.below {
			transform: translate(-50%, 22px);
		}
		&.align-start {
			transform: translate(-16%, calc(-100% - 22px));
			&.below {
				transform: translate(-16%, 22px);
			}
		}
		&.align-end {
			transform: translate(-84%, calc(-100% - 22px));
			&.below {
				transform: translate(-84%, 22px);
			}
		}
		strong {
			font-family: var(--font-heading);
			color: var(--c-navy-900);
		}
		a {
			color: var(--c-accent);
			font-weight: var(--fw-semibold);
			font-size: var(--fs-label-s-mobile);
			touch-action: manipulation;
			&:focus-visible {
				outline: 2px solid var(--c-accent);
				outline-offset: 2px;
				border-radius: 4px;
			}
		}
	}

	.areas {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		li {
			white-space: nowrap;
			font-size: var(--fs-label-s-mobile);
			line-height: 1.4;
			color: var(--c-text-light);
			background-color: var(--c-section);
			padding: 2px var(--space-2);
			border-radius: var(--radius-softest);
		}
	}

	@media (max-width: 600px) {
		.card,
		.card.below,
		.card.align-start,
		.card.align-end,
		.card.below.align-start,
		.card.below.align-end {
			position: static;
			transform: none;
			width: auto;
			max-width: none;
			margin-top: var(--space-3);
		}
	}

	@keyframes card-in {
		from {
			opacity: 0;
		}
	}

	/* ---------- compact list ---------- */
	.city-list {
		list-style: none;
		padding: 0;
		margin: 0;
		background-color: var(--c-white);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		overflow: hidden;
		li + li {
			border-top: 1px solid var(--c-border-light);
		}
		a {
			display: flex;
			align-items: center;
			gap: var(--space-3);
			min-height: 56px;
			padding: var(--space-3) var(--space-5);
			touch-action: manipulation;
			-webkit-tap-highlight-color: transparent;
			transition: background-color 0.15s ease-out;
			&:hover,
			&.active {
				background-color: var(--c-sky-50);
				.arrow {
					transform: translateX(3px);
					color: var(--c-accent);
				}
				.pin {
					transform: scale(1.25);
				}
			}
			&:focus-visible {
				outline: 2px solid var(--c-accent);
				outline-offset: -2px;
			}
		}
	}

	.pin {
		flex-shrink: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--c-accent);
		transition: transform 0.15s ease-out;
	}

	.city {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
	.city-name {
		font-family: var(--font-heading);
		font-weight: var(--fw-bold);
		color: var(--c-navy-900);
	}
	.count {
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}
	.arrow {
		color: var(--c-border-gray);
		transition:
			transform 0.15s ease-out,
			color 0.15s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		.dot,
		.pin,
		.arrow,
		.city-list a {
			transition: none;
		}
		.card {
			animation: none;
		}
	}
</style>
