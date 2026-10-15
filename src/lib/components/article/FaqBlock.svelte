<section class="block faq" {id}>
	<h2>{heading}</h2>
	{#each faq as item (item.q)}
		<h3>{item.q}</h3>
		<p>{item.a}</p>
	{/each}
	{@render children?.()}
</section>

<script>
	/** @type {{ id: string, heading: string, faq: { q: string, a: string }[], children?: import('svelte').Snippet }} */
	let { id, heading, faq, children } = $props();
</script>

<style>
	.faq {
		h3 {
			font-size: var(--fs-hl-sm-mobile);
			margin: var(--space-6) 0 var(--space-2);
		}
		p {
			color: var(--c-text-light);
		}
	}
</style>
