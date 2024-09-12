<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import ProductCard from './product_card.svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { SelectValue } from '$lib/components/ui/select';
	import { products } from '$lib/stores/productStore';

	export let pageTitle = 'Products';
	export let engine: 'Godot' | 'Bevy';

	let searchTerm = '';
	let selectedCategory: SelectValue<string> = { value: 'All' };
	let sortOption: SelectValue<string> = { value: 'name' };
	let selectedTags: string[] = [];
	let showTagFilter = false;

	$: allProducts = $products.filter((p) => p.category === engine && p.status === 'approved');
	$: allTags = [...new Set(allProducts.flatMap((p) => p.tags))];

	$: filteredProducts = allProducts
		.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(selectedCategory.value === 'All' || product.category === selectedCategory.value) &&
				(selectedTags.length === 0 || selectedTags.every((tag) => product.tags.includes(tag)))
		)
		.sort((a, b) => {
			switch (sortOption.value) {
				case 'priceHighToLow':
					return b.price - a.price;
				case 'priceLowToHigh':
					return a.price - b.price;
				case 'rating':
					return b.rating - a.rating;
				case 'releaseDate':
					return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
				case 'upvotes':
					return b.upvotes - a.upvotes;
				default:
					return a.name.localeCompare(b.name);
			}
		});

	$: categories = ['All', ...new Set(allProducts.map((p) => p.category))];

	function toggleTag(tag: string) {
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
	}
</script>

<div class="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">{pageTitle}</h1>
	<div class="mb-4 flex flex-col space-y-4 sm:mb-6">
		<div class="relative w-full">
			<Search
				class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5"
			/>
			<Input
				type="text"
				placeholder="Search products..."
				class="w-full pl-10"
				bind:value={searchTerm}
			/>
		</div>
		<div class="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
			<Select.Root bind:selected={selectedCategory}>
				<Select.Trigger class="w-full sm:w-[180px]">
					<Select.Value placeholder="Select category" />
				</Select.Trigger>
				<Select.Content>
					{#each categories as category}
						<Select.Item value={category}>{category}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root bind:selected={sortOption}>
				<Select.Trigger class="w-full sm:w-[180px]">
					<Select.Value placeholder="Sort by" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="name">Name</Select.Item>
					<Select.Item value="priceHighToLow">Price: High to Low</Select.Item>
					<Select.Item value="priceLowToHigh">Price: Low to High</Select.Item>
					<Select.Item value="rating">Rating</Select.Item>
					<Select.Item value="releaseDate">Release Date</Select.Item>
					<Select.Item value="upvotes">Upvotes</Select.Item>
				</Select.Content>
			</Select.Root>
			<Button
				variant="outline"
				class="flex items-center justify-between"
				on:click={() => (showTagFilter = !showTagFilter)}
			>
				Filter by Tags
				{#if showTagFilter}
					<ChevronUp class="ml-2 h-4 w-4" />
				{:else}
					<ChevronDown class="ml-2 h-4 w-4" />
				{/if}
			</Button>
		</div>
		{#if showTagFilter}
			<div class="flex flex-wrap gap-2" transition:fade>
				{#each allTags as tag}
					<div class="flex items-center space-x-2">
						<Checkbox
							id={tag}
							checked={selectedTags.includes(tag)}
							onCheckedChange={() => toggleTag(tag)}
						/>
						<label
							for={tag}
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{tag}
						</label>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredProducts as product (product.id)}
			<div animate:flip={{ duration: 300 }}>
				<div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
					<ProductCard {product} />
				</div>
			</div>
		{/each}
	</div>
</div>
