<!-- HTML comparison table of the main packages (readable for search engines and AI assistants) -->
<div class="table-wrap">
	<table>
		<caption>{m.table_caption()}</caption>
		<thead>
			<tr>
				<th scope="col">{m.table_package()}</th>
				<th scope="col">{m.table_lessons()}</th>
				<th scope="col">{m.table_exam()}</th>
				{#if business.promoFreeInterimExam}
					<th scope="col">{m.table_promo()}</th>
				{/if}
				<th scope="col">{m.table_price()}</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as pkg (pkg.id)}
				<tr>
					<th scope="row">{pkg.title}</th>
					<td>{m.table_lessons_value({ count: pkg.lessons })}</td>
					<td>{pkg.includesExam ? m.table_yes() : m.table_no()}</td>
					{#if business.promoFreeInterimExam}
						<td>{m.table_yes()}</td>
					{/if}
					<td class="price">{formatEuro(pkg.price)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<p class="table-note">
	{m.table_extra_lesson({ price: formatEuro(business.prices.lesson) })}
	{#if business.promoFreeInterimExam}
		{business.promoEndDate
			? m.table_promo_until({
					price: formatEuro(business.prices.interimExam),
					date: formatDate(business.promoEndDate),
				})
			: m.table_promo_note({ price: formatEuro(business.prices.interimExam) })}
	{/if}
</p>
<p class="table-note updated">
	{m.prices_updated({ date: formatDate(business.pricesUpdated) })}
</p>

<script>
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { business } from '$lib/data/business.js';
	import { formatEuro } from '$lib/utils/format-euro';
	import { pickByLocale } from '$lib/utils/get-localized-data';
	import { MAIN_PACKAGE_IDS } from '$lib/seo/schema.js';
	import packagesNl from '$lib/data/pricing-packages.nl.json';
	import packagesEn from '$lib/data/pricing-packages.en.json';

	const packages = pickByLocale({ nl: packagesNl, en: packagesEn });
	const rows = MAIN_PACKAGE_IDS.map((id) => packages.find((pkg) => pkg.id === id));

	const formatDate = (date) =>
		new Date(date).toLocaleDateString(getLocale() === 'en' ? 'en-GB' : 'nl-NL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
</script>

<style>
	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--c-border);
		border-radius: var(--radius-m);
	}
	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 520px;
	}
	caption {
		text-align: left;
		padding: var(--space-4) var(--space-5) 0;
		color: var(--c-text-light);
		font-size: var(--fs-label-s-mobile);
	}
	th,
	td {
		padding: var(--space-4) var(--space-5);
		text-align: left;
		border-bottom: 1px solid var(--c-border-light);
		color: var(--c-text-light);
	}
	thead th {
		color: var(--c-navy-900);
		font-weight: var(--fw-semibold);
	}
	tbody th,
	td:nth-child(2) {
		white-space: nowrap;
	}
	tbody th {
		color: var(--c-navy-900);
		font-family: var(--font-heading);
	}
	tbody tr:last-child > * {
		border-bottom: none;
	}
	.price {
		font-family: var(--font-heading);
		font-weight: var(--fw-bold);
		color: var(--c-navy-900);
	}
	.table-note {
		margin-top: var(--space-4);
		font-size: var(--fs-label-s-mobile);
		&.updated {
			margin-top: 0;
		}
	}
</style>
