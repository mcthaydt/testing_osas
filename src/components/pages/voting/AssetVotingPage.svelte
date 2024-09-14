<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { productStore, getPendingProducts } from '$lib/stores/productStore';
	import type { SelectValue } from '$lib/components/ui/select';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { calculateRemainingTime } from '$lib/utils/productUtils';
	import ProductCard from './VotingCard.svelte';
	import SortSelect from '../SortSelect.svelte';
	import { onMount } from 'svelte';

	let sortBy: SelectValue<string> = { value: 'dateDesc' };
	let pendingProducts = [];

	$: sortedProducts = [...pendingProducts].sort((a, b) => {
		switch (sortBy.value) {
			case 'dateDesc':
				return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
			case 'dateAsc':
				return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
			case 'upvotes':
				return b.upvotes - a.upvotes;
			case 'timeLeft':
				return calculateRemainingTime(a.uploadDate) - calculateRemainingTime(b.uploadDate);
			default:
				return 0;
		}
	});

	function handleUpvote(id: string) {
		productStore.upvote(id, 'user0');
	}

	onMount(() => {
		const unsubscribe = getPendingProducts.subscribe((value) => {
			pendingProducts = value;
		});

		return unsubscribe;
	});
</script>

<div class="container mx-auto space-y-6 p-4">
	<h1 class="text-3xl font-bold tracking-tight">Asset Voting</h1>
	<div>
		<SortSelect bind:sortBy />
	</div>
	<ScrollArea class="h-[600px] w-full rounded-md border p-4">
		<ul class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each sortedProducts as product (product.id)}
				<div animate:flip={{ duration: 300 }} transition:fade={{ duration: 300 }}>
					<ProductCard {product} onUpvote={handleUpvote} />
				</div>
			{/each}
		</ul>
	</ScrollArea>
</div>
