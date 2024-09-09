<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import {
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem
	} from '$lib/components/ui/select';
	import { Search } from 'lucide-svelte';
	import ProductCard from './product_card.svelte';

	export let products = [];
	export let pageTitle = 'Products';

	let searchTerm = '';
	let selectedCategory = 'All';
	let sortOption = 'name';

	$: filteredProducts = products
		.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(selectedCategory === 'All' || product.category === selectedCategory)
		)
		.sort((a, b) => {
			switch (sortOption) {
				case 'priceHighToLow':
					return b.price - a.price;
				case 'priceLowToHigh':
					return a.price - b.price;
				case 'rating':
					return b.rating - a.rating;
				case 'releaseDate':
					return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
				default:
					return a.name.localeCompare(b.name);
			}
		});

	$: categories = ['All', ...new Set(products.map((p) => p.category))];
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
			<Select bind:value={selectedCategory} class="w-full sm:w-auto">
				<SelectTrigger class="w-full sm:w-[180px]">
					<SelectValue placeholder="Select category" />
				</SelectTrigger>
				<SelectContent>
					{#each categories as category}
						<SelectItem value={category}>{category}</SelectItem>
					{/each}
				</SelectContent>
			</Select>
			<Select bind:value={sortOption} class="w-full sm:w-auto">
				<SelectTrigger class="w-full sm:w-[180px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="name">Name</SelectItem>
					<SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
					<SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
					<SelectItem value="rating">Rating</SelectItem>
					<SelectItem value="releaseDate">Release Date</SelectItem>
				</SelectContent>
			</Select>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredProducts as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
</div>
