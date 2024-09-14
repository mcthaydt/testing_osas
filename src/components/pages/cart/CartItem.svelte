<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Plus, Minus, Trash2, ExternalLink } from 'lucide-svelte';
	import type { CartItem } from '$lib/stores/cartStore';

	export let item: CartItem;
	export let updateQuantity: (id: string, change: number) => void;
	export let removeItem: (id: string) => void;
</script>

<div class="flex flex-col items-center border-b border-gray-700 py-4 sm:flex-row sm:items-start">
	<img src={item.imageUrl} alt={item.name} class="h-24 w-24 rounded-md object-cover" />
	<div class="mt-4 flex-grow text-center sm:ml-4 sm:mt-0 sm:text-left">
		<h3 class="text-lg font-semibold">{item.name}</h3>
		<p class="text-sm text-gray-400">{item.category}</p>
		<a
			href={`/product_item/${item.id}`}
			class="mt-1 inline-flex items-center text-sm text-blue-400 hover:underline"
		>
			View Product <ExternalLink class="ml-1 h-3 w-3" />
		</a>
	</div>
	<div
		class="mt-4 flex flex-col items-center space-y-2 sm:mt-0 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0"
	>
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
</div>
