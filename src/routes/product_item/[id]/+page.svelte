<script lang="ts">
	import { page } from '$app/stores';
	import { getProduct } from '$lib/stores/productStore';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Star, ShoppingCart } from 'lucide-svelte';

	const productId = parseInt($page.params.id);
	const product = getProduct(productId);
</script>

{#if product}
	<div class="container mx-auto p-4">
		<Card class="mx-auto max-w-3xl">
			<CardHeader>
				<CardTitle class="text-3xl font-bold">{product.name}</CardTitle>
				<CardDescription>{product.category}</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<AspectRatio ratio={16 / 9}>
					<img
						src={product.imageUrl}
						alt={product.name}
						class="h-full w-full rounded-md object-cover"
					/>
				</AspectRatio>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
					<div class="flex items-center space-x-1 text-yellow-400">
						<Star class="h-5 w-5 fill-current" />
						<span class="text-sm font-medium">{product.rating.toFixed(1)}</span>
					</div>
				</div>
				<p class="text-lg">{product.description}</p>
				<p class="text-sm text-muted-foreground">
					Released: {new Date(product.releaseDate).toLocaleDateString()}
				</p>
				<Button class="w-full" size="lg">
					<ShoppingCart class="mr-2 h-5 w-5" />
					Add to Cart
				</Button>
			</CardContent>
		</Card>
	</div>
{:else}
	<div class="container mx-auto p-4 text-center">
		<h1 class="text-2xl font-bold">Product not found</h1>
		<Button variant="default" class="mt-4" href="/">Back to Products</Button>
	</div>
{/if}
