<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	let promoCode = '';

	function applyPromoCode() {
		// Implement promo code logic here
		console.log('Applying promo code:', promoCode);
	}
</script>

<div class="mt-6">
	<h3 class="mb-2 text-lg font-semibold">Have a promo code?</h3>
	<div class="flex space-x-2">
		<Input
			type="text"
			placeholder="Enter promo code"
			bind:value={promoCode}
			class="border-gray-700 bg-gray-800 text-white focus:border-gray-600"
		/>
		<Button
			variant="outline"
			on:click={applyPromoCode}
			class="border-gray-600 text-white hover:bg-gray-700"
		>
			Apply
		</Button>
	</div>
</div>
