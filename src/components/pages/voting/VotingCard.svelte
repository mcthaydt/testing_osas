<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { ArrowUp, ExternalLink, Clock } from 'lucide-svelte';
	import { getRemainingTime, truncateText } from '../../../lib/utils/assetVotingUtils';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
	export let onUpvote: (id: string) => void;

	function handleUpvote() {
		onUpvote(product.id);
	}
</script>

<Card class="mx-auto w-full max-w-md">
	<CardContent class="flex flex-col space-y-4 p-4">
		<AspectRatio ratio={16 / 9}>
			<img
				src={product.imageUrl}
				alt={`Image of ${product.name}`}
				class="h-full w-full rounded-md object-cover"
			/>
		</AspectRatio>
		<div class="flex items-center space-x-4">
			<div class="flex flex-col items-center">
				<Button variant="outline" size="icon" on:click={handleUpvote}>
					<ArrowUp class="h-4 w-4" />
				</Button>
				<span class="mt-1 text-sm font-medium">{product.upvotes}</span>
			</div>
			<div>
				<h2 class="text-lg font-semibold">{product.name}</h2>
				<p class="flex items-center text-sm text-muted-foreground">
					<Clock class="mr-1 h-4 w-4" />
					Time left: {getRemainingTime(product.uploadDate)}
				</p>
				<p class="mt-2 text-sm">{truncateText(product.description, 100)}</p>
			</div>
		</div>
	</CardContent>
	<CardFooter>
		<Button variant="outline" class="w-full" href={`/product_item/${product.id}`}>
			<ExternalLink class="mr-2 h-4 w-4" />
			View Product
		</Button>
	</CardFooter>
</Card>
