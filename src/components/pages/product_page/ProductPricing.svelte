<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Star, ShoppingCart, Download, Users } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
	export let addToCart: () => void;
	export let copyToClipboard: (text: string) => void;
	export let upvoteProduct: () => void;
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-3xl font-bold text-primary">${product.price.toFixed(2)}</CardTitle>
		<CardDescription>
			<div class="flex items-center space-x-1">
				<Star class="h-5 w-5 fill-primary" />
				<span class="text-sm font-medium">{product.rating.toFixed(1)} Rating</span>
			</div>
			<div class="flex items-center space-x-1">
				<Users class="h-5 w-5" />
				<span class="text-sm font-medium">{product.voters.length} Votes</span>
			</div>
		</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-lg">{product.description}</p>
	</CardContent>
	<CardFooter>
		{#if product.status === 'pending'}
			<div class="flex flex-col space-y-2">
				<Button class="w-full" size="lg" on:click={() => copyToClipboard(window.location.href)}>
					<Download class="mr-2 h-5 w-5" />
					Share
				</Button>
				<Button class="w-full" size="lg" on:click={upvoteProduct}>
					<Star class="mr-2 h-5 w-5" />
					Upvote
				</Button>
			</div>
		{:else}
			<Button class="w-full" size="lg" on:click={addToCart}>
				<ShoppingCart class="mr-2 h-5 w-5" />
				Add to Cart
			</Button>
		{/if}
	</CardFooter>
</Card>
