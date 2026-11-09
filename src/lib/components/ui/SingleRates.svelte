<!-- "Losse tarieven": the single rates from business.js. Used on the home page, /prijzen and /losse-tarieven. -->
<div class="rates">
	<table>
		<caption class="visually-hidden">{m.rates_heading()}</caption>
		<tbody>
			{#each rows as row (row.id)}
				<tr>
					<th scope="row">
						{row.label}
						{#if row.detail}<span class="detail">{row.detail}</span>{/if}
					</th>
					<td>{formatEuro(row.price)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="package-only" role="note">
		<strong>{m.rates_package_only_title()}</strong>
		<p>{packageOnlyNote()}</p>
	</div>
	<p class="duration">{m.lesson_duration_note()}</p>
	{#if showLink}
		<a class="more" href={localizeHref('/losse-tarieven')}
			>{m.rates_link()} <span aria-hidden="true">→</span></a
		>
	{/if}
</div>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatEuro } from '$lib/utils/format-euro';
	import { singleRateRows, packageOnlyNote } from '$lib/utils/rates';

	/** @type {{ showLink?: boolean }} */
	let { showLink = false } = $props();

	const rows = singleRateRows();
</script>

<style>
	.package-only {
		margin-top: var(--space-4);
		padding: var(--space-4) var(--space-5);
		border-left: 4px solid var(--c-yellow);
		border-radius: var(--radius-softest);
		background-color: #fffbeb;
		color: var(--c-navy-900);
		strong {
			display: block;
			font-family: var(--font-heading);
			font-size: var(--fs-label-sm-mobile);
		}
		p {
			margin: var(--space-1) 0 0;
			font-size: var(--fs-label-s-mobile);
			color: var(--c-text);
		}
	}

	.rates {
		width: 100%;
		max-width: 640px;
		margin-inline: auto;
		text-align: left;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background-color: var(--c-white);
		border: 1px solid var(--c-border-light);
		border-radius: var(--radius-m);
		overflow: hidden;
	}

	tr + tr > * {
		border-top: 1px solid var(--c-border-light);
	}

	th,
	td {
		padding: var(--space-4) var(--space-5);
		vertical-align: middle;
	}

	th {
		font-weight: var(--fw-semibold);
		color: var(--c-navy-900);
	}

	.detail {
		display: block;
		font-weight: var(--fw-regular);
		font-size: var(--fs-label-s-mobile);
		color: var(--c-text-light);
	}

	td {
		text-align: right;
		white-space: nowrap;
		font-family: var(--font-heading);
		font-weight: var(--fw-bold);
		color: var(--c-navy-900);
		/* prices line up in one column */
		font-variant-numeric: tabular-nums;
	}

	.duration {
		margin: var(--space-4) 0 0;
		padding: var(--space-4) var(--space-5);
		border-left: 4px solid var(--c-accent);
		border-radius: var(--radius-softest);
		background-color: var(--c-sky-50);
		color: var(--c-text-light);
	}

	.more {
		display: inline-block;
		margin-top: var(--space-4);
		color: var(--c-accent);
		font-weight: var(--fw-semibold);
		&:focus-visible {
			outline: 2px solid var(--c-accent);
			outline-offset: 2px;
			border-radius: 4px;
		}
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
</style>
