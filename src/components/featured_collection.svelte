<script>
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import ProductCard from './product_card.svelte';

	const products = [
		{
			id: '1',
			name: 'Godot Asset',
			description: 'Advanced game development kit',
			price: 499.99,
			category: 'Dev Tools',
			rating: 4.9,
			releaseDate: '2023-05-15',
			imageUrl:
				'https://images.pexels.com/photos/23947682/pexels-photo-23947682/free-photo-of-camera-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
		}
		// Add more product objects here to test scrolling
	];

	export let showModal = false;
</script>

<Select.Dialog bind:open={showModal}>
	<Select.DialogContent class="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[900px]">
		<Select.DialogHeader>
			<Select.DialogTitle>Featured Collection</Select.DialogTitle>
			<Select.DialogDescription>
				Explore our curated collection of high-quality assets for your game development needs.
			</Select.DialogDescription>
		</Select.DialogHeader>
		<ScrollArea class="h-[50vh] w-full pr-4 md:h-[60vh]">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
				{#each products as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		</ScrollArea>
		<Select.DialogFooter class="mt-4">
			<Button variant="outline" on:click={() => (showModal = false)}>Close</Button>
		</Select.DialogFooter>
	</Select.DialogContent>
</Select.Dialog>

<style>
	/* Custom styles for better mobile appearance */
	:global(.scroll-area-viewport) {
		padding-right: 16px;
	}

	@media (max-width: 640px) {
		:global(.dialog-content) {
			width: 95vw;
			max-width: none;
		}
	}
</style>
