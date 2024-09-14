<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import ProductCard from '../../product_card.svelte';
	import { productStore } from '$lib/stores/productStore';
	import { showFeaturedCollectionModal } from '$lib/stores/modalStore';
	import type { Product } from '$lib/types/productTypes'; // Update this import path if necessary

	function getFeaturedProducts(products: Product[]): Product[] {
		return products.filter((product) => product.rating > 4.5 && product.status === 'approved');
	}

	let products: Product[] = [];
	let featuredProducts: Product[] = [];

	productStore.subscribe((value) => {
		products = value;
		featuredProducts = getFeaturedProducts(products);
	});
</script>

<Select.Dialog bind:open={$showFeaturedCollectionModal}>
	<Select.DialogContent class="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[900px]">
		<Select.DialogHeader>
			<Select.DialogTitle>Featured Collection</Select.DialogTitle>
			<Select.DialogDescription>
				Explore our curated collection of high-quality assets for your game development needs.
			</Select.DialogDescription>
		</Select.DialogHeader>
		<ScrollArea class="h-[50vh] w-full pr-4 md:h-[60vh]">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
				{#each featuredProducts as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		</ScrollArea>
		<Select.DialogFooter class="mt-4">
			<Button variant="outline" on:click={() => showFeaturedCollectionModal.set(false)}
				>Close</Button
			>
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
