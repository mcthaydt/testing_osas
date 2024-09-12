// $lib/stores/cartStore.ts
import { writable } from 'svelte/store';

export interface CartItem {
	id: string;  // Changed to string to match the product id
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
	category: string;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (item: CartItem) => update(items => {
			const existingItem = items.find(i => i.id === item.id);
			if (existingItem) {
				existingItem.quantity += 1;
				return items;
			}
			return [...items, item];
		}),
		removeItem: (id: string) => update(items => items.filter(i => i.id !== id)),
		updateQuantity: (id: string, quantity: number) => update(items =>
			items.map(item => item.id === id ? { ...item, quantity } : item)
		),
		clearCart: () => set([])
	};
}

export const cartStore = createCartStore();