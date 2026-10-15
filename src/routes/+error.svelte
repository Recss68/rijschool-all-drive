<!-- Error page (404 and others). The status code stays as is; agents asking for Markdown get the Markdown 404. -->
<svelte:head>
	<title>{is404 ? m.error_404_meta() : m.error_other_title()} | {business.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error-page">
	<div class="scene" aria-hidden="true">
		<svg viewBox="0 0 400 180" focusable="false">
			<!-- clouds drifting by -->
			<g class="clouds">
				<path class="cloud" d="M40 46a10 10 0 0 1 19-4 8 8 0 0 1 13 6H40Z"></path>
				<path class="cloud" d="M250 30a12 12 0 0 1 23-5 9 9 0 0 1 15 7h-38Z"></path>
				<path class="cloud" d="M440 52a10 10 0 0 1 19-4 8 8 0 0 1 13 6h-32Z"></path>
				<path class="cloud" d="M650 34a12 12 0 0 1 23-5 9 9 0 0 1 15 7h-38Z"></path>
			</g>

			<!-- road with moving centre line -->
			<rect x="0" y="142" width="400" height="38" class="road"></rect>
			<line x1="-60" y1="161" x2="460" y2="161" class="dashes"></line>

			<!-- the lesson car -->
			<g class="car">
				<ellipse cx="219" cy="141" rx="98" ry="5" class="shadow"></ellipse>
				<g class="speed">
					<line x1="72" y1="92" x2="96" y2="92"></line>
					<line x1="62" y1="106" x2="92" y2="106"></line>
					<line x1="78" y1="120" x2="98" y2="120"></line>
				</g>
				<g transform="translate(110 40)">
					<!-- roof sign -->
					<rect x="88" y="4" width="46" height="15" rx="3" class="sign"></rect>
					<text x="111" y="15.5" class="sign-text">L</text>
					<!-- body -->
					<path
						class="body"
						d="M8 74Q8 60 22 58L56 54L88 26Q92 22 98 22H152Q160 22 164 28L186 54L198 56Q212 59 212 74V82Q212 88 206 88H14Q8 88 8 82Z"
					></path>
					<!-- windows -->
					<path class="window" d="M94 30H128V53H68Z"></path>
					<path class="window" d="M134 30H157Q160 30 162 33L178 53H134Z"></path>
					<line x1="131" y1="30" x2="131" y2="86" class="door"></line>
					<rect x="140" y="60" width="12" height="3" rx="1.5" class="handle"></rect>
					<!-- lights -->
					<ellipse cx="205" cy="66" rx="5" ry="4" class="headlight"></ellipse>
					<rect x="9" y="62" width="6" height="8" rx="2" class="taillight"></rect>
				</g>
				<!-- wheels: rotated via a <g> wrapper for consistent transform-origin -->
				<g class="wheel"
					><circle cx="166" cy="128" r="18" class="tyre"></circle><circle
						cx="166"
						cy="128"
						r="8"
						class="rim"
					></circle><path d="M166 112V144M150 128H182" class="spoke"></path></g
				>
				<g class="wheel"
					><circle cx="280" cy="128" r="18" class="tyre"></circle><circle
						cx="280"
						cy="128"
						r="8"
						class="rim"
					></circle><path d="M280 112V144M264 128H296" class="spoke"></path></g
				>
				<!-- exhaust -->
				<circle cx="112" cy="122" r="5" class="puff p1"></circle>
				<circle cx="104" cy="118" r="4" class="puff p2"></circle>
			</g>
		</svg>
	</div>

	<div class="content">
		<span class="code">{page.status}</span>
		<h1>{is404 ? m.error_404_title() : m.error_other_title()}</h1>
		<p class="lead">{is404 ? m.error_404_text() : m.error_other_text()}</p>

		<div class="actions">
			<a class="btn-secondary" href={localizeHref('/')}
				>{m.error_home()} <span aria-hidden="true">→</span></a
			>
			<a class="btn-primary" href={business.whatsappUrl}>{m.error_whatsapp()}</a>
		</div>

		<nav class="suggestions" aria-label={m.error_links_heading()}>
			<h2>{m.error_links_heading()}</h2>
			<ul role="list">
				{#each links as link (link.path)}
					<li><a href={localizeHref(link.path)}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</section>

<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';

	const is404 = $derived(page.status === 404);

	const links = [
		{ path: '/prijzen', label: m.header_prices() },
		{ path: '/werkgebied', label: m.footer_cities_heading() },
		{ path: '/proefles', label: m.error_link_trial() },
		{ path: '/over-ons', label: m.header_about() },
		{ path: '/contact', label: m.header_contact() },
	];
</script>

<style>
	.error-page {
		padding: var(--space-26) var(--space-4) var(--space-16);
		background: linear-gradient(to bottom, var(--c-sky-50), var(--c-white) 60%);
		text-align: center;
	}

	.scene {
		max-width: 560px;
		margin: 0 auto;
		svg {
			display: block;
			width: 100%;
			height: auto;
			/* clip the moving road line and drifting clouds to the scene */
			overflow: hidden;
		}
	}

	/* ---------- scene ---------- */
	.cloud {
		fill: var(--c-white);
		stroke: var(--c-sky-100);
		stroke-width: 1.5;
	}
	.road {
		fill: var(--gd-100);
	}
	.dashes {
		stroke: var(--c-white);
		stroke-width: 3;
		stroke-dasharray: 26 18;
	}
	.shadow {
		fill: rgb(0 0 0 / 0.25);
	}
	.speed line {
		stroke: var(--c-slate-600);
		stroke-width: 3;
		stroke-linecap: round;
	}
	.sign {
		fill: var(--c-white);
		stroke: var(--c-navy-900);
		stroke-width: 1.5;
	}
	.sign-text {
		font-family: var(--font-heading);
		font-size: 12px;
		font-weight: 800;
		fill: var(--c-accent);
		text-anchor: middle;
	}
	.body {
		fill: var(--c-accent);
	}
	.window {
		fill: var(--c-sky-100);
	}
	.door {
		stroke: rgb(0 38 70 / 0.35);
		stroke-width: 1.5;
	}
	.handle {
		fill: rgb(255 255 255 / 0.7);
	}
	.headlight {
		fill: var(--c-yellow);
	}
	.taillight {
		fill: #ef4444;
	}
	.tyre {
		fill: var(--c-slate-900);
	}
	.rim {
		fill: var(--c-border-gray);
	}
	.spoke {
		stroke: var(--c-slate-900);
		stroke-width: 3;
	}
	.puff {
		fill: var(--c-border-light);
	}

	/* ---------- motion (transform/opacity only) ---------- */
	.dashes {
		animation: road 0.5s linear infinite;
	}
	.clouds {
		animation: drift 14s linear infinite;
	}
	.car {
		animation: bob 0.35s ease-in-out infinite alternate;
	}
	.wheel {
		transform-box: fill-box;
		transform-origin: center;
		animation: spin 0.5s linear infinite;
	}
	.speed line {
		animation: speed 0.8s ease-in infinite;
		&:nth-child(2) {
			animation-delay: 0.25s;
		}
		&:nth-child(3) {
			animation-delay: 0.5s;
		}
	}
	.puff {
		transform-box: fill-box;
		transform-origin: center;
		animation: puff 1s ease-out infinite;
		&.p2 {
			animation-delay: 0.5s;
		}
	}

	@keyframes road {
		to {
			transform: translateX(-44px);
		}
	}
	@keyframes drift {
		to {
			transform: translateX(-410px);
		}
	}
	@keyframes bob {
		to {
			transform: translateY(-1.5px);
		}
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes speed {
		from {
			opacity: 0;
			transform: translateX(16px);
		}
		40% {
			opacity: 1;
		}
		to {
			opacity: 0;
			transform: translateX(-20px);
		}
	}
	@keyframes puff {
		from {
			opacity: 0.9;
			transform: translate(0, 0) scale(0.6);
		}
		to {
			opacity: 0;
			transform: translate(-22px, -10px) scale(1.6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dashes,
		.clouds,
		.car,
		.wheel,
		.speed line,
		.puff {
			animation: none;
		}
		.speed,
		.puff {
			display: none;
		}
	}

	/* ---------- text ---------- */
	.content {
		max-width: 620px;
		margin: var(--space-8) auto 0;
	}
	.code {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-round);
		background-color: var(--c-icon-bg);
		color: var(--c-span);
		font-weight: var(--fw-bold);
		font-variant-numeric: tabular-nums;
	}
	h1 {
		margin-top: var(--space-4);
		font-size: var(--fs-hl-lg);
	}
	.lead {
		font-size: var(--fs-hl-sm-mobile);
		text-wrap: pretty;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-3);
		margin-top: var(--space-6);
		a {
			min-height: 48px;
			display: inline-flex;
			align-items: center;
			padding-inline: var(--space-6);
		}
	}

	.suggestions {
		margin-top: var(--space-10);
		h2 {
			font-size: var(--fs-label-s-mobile);
			font-family: var(--font-body);
			font-weight: var(--fw-semibold);
			color: var(--c-text-light);
			margin-bottom: var(--space-3);
		}
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--space-2);
		}
		a {
			display: inline-flex;
			align-items: center;
			min-height: 40px;
			padding: 0 var(--space-4);
			font-size: var(--fs-label-sm-mobile);
			border: 1px solid var(--c-border-light);
			border-radius: var(--radius-round);
			background-color: var(--c-white);
			color: var(--c-navy-900);
			font-weight: var(--fw-semibold);
			touch-action: manipulation;
			transition: border-color 0.15s ease-out;
			&:hover {
				border-color: var(--c-accent);
				color: var(--c-accent);
			}
			&:focus-visible {
				outline: 2px solid var(--c-accent);
				outline-offset: 2px;
			}
		}
	}
</style>
