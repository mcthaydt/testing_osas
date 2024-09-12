<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Plus, Minus, Trash2, ExternalLink } from 'lucide-svelte';
	import { cartStore, type CartItem } from '$lib/stores/cartStore';

	let cartItems: CartItem[] = [];
	let subtotal = 0;
	let tax = 0;
	let total = 0;

	// Subscribe to the cartStore
	cartStore.subscribe((items) => {
		cartItems = items;
		calculateTotals();
	});

	function calculateTotals() {
		subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
		tax = subtotal * 0.08; // Assuming 8% tax
		total = subtotal + tax;
	}

	function updateQuantity(id: string, change: number) {
		const item = cartItems.find((item) => item.id === id);
		if (item) {
			const newQuantity = Math.max(1, item.quantity + change);
			cartStore.updateQuantity(id, newQuantity);
		}
	}

	function removeItem(id: string) {
		cartStore.removeItem(id);
	}
</script>

<div class="container mx-auto px-4 py-8 text-white">
	<h1 class="mb-8 text-3xl font-bold">Your Cart</h1>
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<div class="lg:col-span-2">
			{#each cartItems as item (item.id)}
				<div class="flex items-center space-x-4 border-b border-gray-700 py-4">
					<img src={item.imageUrl} alt={item.name} class="h-24 w-24 rounded-md object-cover" />
					<div class="flex-grow">
						<h3 class="text-lg font-semibold">{item.name}</h3>
						<p class="text-sm text-gray-400">{item.category}</p>
						<a
							href={`/product_item/${item.id}`}
							class="mt-1 inline-flex items-center text-sm text-blue-400 hover:underline"
						>
							View Product <ExternalLink class="ml-1 h-3 w-3" />
						</a>
					</div>
					<div class="flex items-center space-x-2">
						<Button
							variant="outline"
							size="icon"
							on:click={() => updateQuantity(item.id, -1)}
							class="border-gray-600 text-white hover:bg-gray-700"
						>
							<Minus class="h-4 w-4" />
						</Button>
						<span class="w-8 text-center">{item.quantity}</span>
						<Button
							variant="outline"
							size="icon"
							on:click={() => updateQuantity(item.id, 1)}
							class="border-gray-600 text-white hover:bg-gray-700"
						>
							<Plus class="h-4 w-4" />
						</Button>
					</div>
					<p class="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
					<Button
						variant="ghost"
						size="icon"
						on:click={() => removeItem(item.id)}
						class="text-red-400 hover:bg-gray-800 hover:text-red-300"
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				</div>
			{/each}
		</div>
		<div class="lg:col-span-1">
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
			<div class="mt-6">
				<h3 class="mb-2 text-lg font-semibold">Have a promo code?</h3>
				<div class="flex space-x-2">
					<Input
						type="text"
						placeholder="Enter promo code"
						class="border-gray-700 bg-gray-800 text-white focus:border-gray-600"
					/>
					<Button variant="outline" class="border-gray-600 text-white hover:bg-gray-700"
						>Apply</Button
					>
				</div>
			</div>
		</div>
	</div>
</div>

