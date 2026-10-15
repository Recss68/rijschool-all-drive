<Seo title={m.meta_signup_title()} description={m.meta_signup_description()} noindex />

<section class="breadcrumb">
	<h1>{m.signup_title()}</h1>
	<p>{m.signup_intro()}</p>
</section>

<section class="section signup">
	<div class="section-inner">
		<SignupForm {form} initialPackage={data.pakket} />
	</div>
</section>

<script>
	import { Seo } from '$lib';
	import { m } from '$lib/paraglide/messages.js';
	import SignupForm from '$lib/components/ui/SignupForm.svelte';

	let { data, form } = $props();
</script>

<style>
	.signup {
		background-color: var(--c-section);
		.section-inner {
			max-width: 640px;
			background-color: var(--c-white);
			border: 1px solid var(--c-border-light);
			border-radius: var(--radius-m);
			padding: var(--space-8) var(--space-6);
		}
	}
</style>
