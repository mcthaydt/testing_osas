<script lang="ts">
	import type { CartItem } from '$lib/stores/cartStore';
	import CartItemComponent from './CartItem.svelte';

	export let cartItems: CartItem[];
	export let updateQuantity: (id: string, change: number) => void;
	export let removeItem: (id: string) => void;
</script>

{#each cartItems as item (item.id)}
	<CartItemComponent {item} {updateQuantity} {removeItem} />
{/each}
