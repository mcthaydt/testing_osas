<script lang="ts">
	import { cartStore, type CartItem } from '$lib/stores/cartStore';
	import CartItemList from './CartItemList.svelte';
	import OrderSummary from './OrderSummary.svelte';
	import PromoCode from './PromoCode.svelte';

	let cartItems: CartItem[] = [];
	let subtotal = 0;
	let tax = 0;
	let total = 0;

	$: {
		subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
		tax = subtotal * 0.08; // Assuming 8% tax
		total = subtotal + tax;
	}

	cartStore.subscribe((items) => {
		cartItems = items;
	});

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
			<CartItemList {cartItems} {updateQuantity} {removeItem} />
		</div>
		<div class="lg:col-span-1">
			<OrderSummary {subtotal} {tax} {total} />
			<PromoCode />
		</div>
	</div>
</div>
