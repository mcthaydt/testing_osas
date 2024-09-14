<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	export let subtotal: number;
	export let tax: number;
	export let total: number;
</script>

<div class="rounded-lg bg-gray-800 p-6 shadow-md">
	<h2 class="mb-4 text-xl font-semibold">Order Summary</h2>
	<div class="mb-4 space-y-2">
		<div class="flex justify-between">
			<span>Subtotal</span>
			<span>${subtotal.toFixed(2)}</span>
		</div>
		<div class="flex justify-between">
			<span>Tax</span>
			<span>${tax.toFixed(2)}</span>
		</div>
		<Separator class="bg-gray-700" />
		<div class="flex justify-between font-semibold">
			<span>Total</span>
			<span>${total.toFixed(2)}</span>
		</div>
	</div>
	<Button class="w-full bg-white text-gray-900 hover:bg-gray-200">Proceed to Checkout</Button>
</div>
