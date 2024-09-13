<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Star, ShoppingCart, Info } from 'lucide-svelte';
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { cartStore, type CartItem } from '$lib/stores/cartStore';

	export let product;

	function addToCart() {
		const cartItem: CartItem = {
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			imageUrl: product.imageUrl,
			category: product.category
		};
		cartStore.addItem(cartItem);
		console.log('Added to cart:', product.name);
	}
</script>

<Card class="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
	<AspectRatio ratio={16 / 9} class="bg-muted">
		<img
			src={product.imageUrl}
			alt={product.name}
			class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
			loading="lazy"
		/>
	</AspectRatio>
	<CardHeader class="pb-2">
		<div class="flex items-start justify-between">
			<div class="space-y-1">
				<CardTitle class="line-clamp-2 text-xl font-semibold">{product.name}</CardTitle>
				<p class="text-sm text-muted-foreground">By {product.assetDeveloper}</p>
			</div>
			<div class="flex flex-col items-end">
				<div class="flex items-center space-x-1 text-yellow-400">
					<Star class="h-5 w-5 fill-current" />
					<span class="text-sm font-medium"
						>{product.rating.toFixed(1)} ({product.voters.length})</span
					>
				</div>
				<Badge variant="outline" class="mt-2 text-xs">{product.category}</Badge>
			</div>
		</div>
	</CardHeader>
	<CardContent class="flex-grow pt-2">
		<CardDescription class="mb-4 line-clamp-3">{product.description}</CardDescription>
		<div class="flex items-center justify-between">
			<span class="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
			<div class="text-xs text-muted-foreground">
				Released: {new Date(product.releaseDate).toLocaleDateString()}
			</div>
		</div>
	</CardContent>
	<CardFooter class="grid grid-cols-2 gap-2 pt-4">
		<Button variant="outline" class="w-full" on:click={addToCart}>
			<ShoppingCart class="mr-2 h-5 w-5" />
			Add to Cart
		</Button>
		<Button variant="secondary" href={`/product_item/${product.id}`} class="w-full">
			<Info class="mr-2 h-5 w-5" />
			View Details
		</Button>
	</CardFooter>
</Card>
