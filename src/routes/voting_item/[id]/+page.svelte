<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { products } from '$lib/stores/votingStore';

	$: productId = parseInt($page.params.id);
	$: product = $products.find((p) => p.id === productId);
</script>

{#if product}
	<div class="container mx-auto p-4">
		<Card class="mx-auto max-w-2xl">
			<CardContent class="p-6">
				<h1 class="mb-4 text-3xl font-bold">{product.name}</h1>
				<AspectRatio ratio={16 / 9} class="mb-4">
					<img
						src={product.imageUrl}
						alt={product.name}
						class="h-full w-full rounded-md object-cover"
					/>
				</AspectRatio>
				<p class="mb-2 text-lg">{product.description}</p>
				<p class="mb-4 text-sm text-muted-foreground">
					Released: {product.releaseDate.toLocaleDateString()}
				</p>
				<p class="text-lg font-semibold">Upvotes: {product.upvotes}</p>
				<Button variant="default" class="mt-4" href="/voting">Back to Voting</Button>
			</CardContent>
		</Card>
	</div>
{:else}
	<div class="container mx-auto p-4 text-center">
		<h1 class="text-2xl font-bold">Product not found</h1>
		<Button variant="default" class="mt-4" href="/voting">Back to Voting</Button>
	</div>
{/if}
