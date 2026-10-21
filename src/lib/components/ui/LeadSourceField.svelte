<!-- Hidden form field with where the visitor came from, only with cookie consent (see $lib/attribution.js) -->
<input type="hidden" name="herkomst" value={mounted ? leadSourceField(consent.analytics) : ''} />

<script>
	import { onMount } from 'svelte';
	import { consent } from '$lib/consent.svelte.js';
	import { captureLeadSource, leadSourceField } from '$lib/attribution.js';

	let mounted = $state(false);

	onMount(() => {
		// children mount before the layout: make sure this visit is read first
		captureLeadSource();
		mounted = true;
	});
</script>
