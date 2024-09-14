<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';

	const paymentOptions = [
		{ name: 'PayPal', url: 'https://www.paypal.com', colspan: 1 },
		{ name: 'Cash App', url: 'https://cash.app', colspan: 1 },
		{ name: 'Coinbase', url: 'https://www.coinbase.com', colspan: 2 }
	];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
	{#each paymentOptions as option}
		<a
			href={option.url}
			target="_blank"
			rel="noopener noreferrer"
			class:sm:col-span-2={option.colspan === 2}
		>
			<Button variant="outline" class="w-full">
				{option.name}
				<ArrowRight class="ml-2 h-4 w-4" />
			</Button>
		</a>
	{/each}
</div>
