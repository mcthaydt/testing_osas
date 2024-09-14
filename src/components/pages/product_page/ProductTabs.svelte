<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import ProductDescription from './ProductDescription.svelte';
	import ProductChangelog from './ProductChangelog.svelte';
	import ProductReviews from './ProductReviews.svelte';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
	export let submitReview: (rating: number, review: string) => void;
	export let hasPurchased: boolean;
</script>

<Tabs defaultValue="description">
	<TabsList>
		<TabsTrigger value="description">Description</TabsTrigger>
		<TabsTrigger value="changelog">Changelog</TabsTrigger>
		<TabsTrigger value="reviews">Reviews</TabsTrigger>
	</TabsList>
	<TabsContent value="description">
		<ProductDescription {product} />
	</TabsContent>
	<TabsContent value="changelog">
		<ProductChangelog {product} />
	</TabsContent>
	<TabsContent value="reviews">
		<ProductReviews {product} {submitReview} {hasPurchased} />
	</TabsContent>
</Tabs>
