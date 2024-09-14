<script lang="ts">
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { SelectValue } from '$lib/components/ui/select';
	import { getProductsByEngine } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes';
	import ProductCard from '../../../components/product_card.svelte';
	import SearchBar from './SearchBar.svelte';
	import CategorySelect from './CategorySelect.svelte';
	import SortSelect from './SortSelect.svelte';
	import EngineVersionSelect from './EngineVersionSelect.svelte';
	import TagFilter from './TagFilter.svelte';

	export let pageTitle = 'Products';
	export let engine: 'Godot' | 'Bevy' | 'Other' | 'General';

	const searchTerm = writable('');
	const selectedCategory = writable<SelectValue<string>>({ value: 'All' });
	const sortOption = writable<SelectValue<string>>({ value: 'name' });
	const selectedEngineVersion = writable<SelectValue<string>>({ value: 'All' });
	const selectedTags = writable<string[]>([]);

	$: productsForEngine = getProductsByEngine(engine);
	$: allProducts = $productsForEngine;
	$: allTags = [...new Set(allProducts.flatMap((p) => p.tags))];
	$: engineVersions = [
		...new Set(allProducts.flatMap((p) => p.engineVersions.map((ev) => ev.version)))
	];
	$: categories = ['All', ...new Set(allProducts.map((p) => p.category))];

	$: filteredProducts = filterAndSortProducts(
		allProducts,
		$searchTerm,
		$selectedCategory.value,
		$selectedTags,
		$selectedEngineVersion.value,
		$sortOption.value
	);

	function filterAndSortProducts(
		products: Product[],
		search: string,
		category: string,
		tags: string[],
		engineVersion: string,
		sort: string
	) {
		return products
			.filter(
				(product) =>
					product.name.toLowerCase().includes(search.toLowerCase()) &&
					(category === 'All' || product.category === category) &&
					(tags.length === 0 || tags.every((tag) => product.tags.includes(tag))) &&
					(engineVersion === 'All' ||
						product.engineVersions.some((ev) => ev.version === engineVersion)) &&
					product.status === 'approved'
			)
			.sort((a, b) => {
				switch (sort) {
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
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">{pageTitle}</h1>
	<div class="mb-4 flex flex-col space-y-4 sm:mb-6">
		<SearchBar bind:value={$searchTerm} />
		<div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
			<CategorySelect bind:selected={$selectedCategory} {categories} />
			<SortSelect bind:selected={$sortOption} />
			<EngineVersionSelect bind:selected={$selectedEngineVersion} versions={engineVersions} />
		</div>
		<TagFilter {allTags} bind:selectedTags={$selectedTags} />
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
