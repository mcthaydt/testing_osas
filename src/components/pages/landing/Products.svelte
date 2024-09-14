<script lang="ts">
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { ArrowUp, ExternalLink } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let sortedProducts: any[];
	export let handleUpvote: (id: string) => void;
	export let getRemainingTime: (uploadDate: string) => string;
</script>

<section class="features container py-16">
	<h2 class="mb-2 text-center text-3xl font-bold">Under 24 Hours Remaining</h2>
	<p class="mb-12 text-center text-sm text-muted-foreground">
		These assets have less than 24 hours to get above the minimum votes (10)
	</p>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
		{#each sortedProducts as product (product.id)}
			<div animate:flip={{ duration: 300 }} transition:fade={{ duration: 300 }}>
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
								<Button variant="outline" size="icon" on:click={() => handleUpvote(product.id)}>
									<ArrowUp class="h-4 w-4" />
								</Button>
								<span class="mt-1 text-sm font-medium">{product.upvotes}</span>
							</div>
							<div>
								<h2 class="text-lg font-semibold">{product.name}</h2>
								<p class="text-sm text-muted-foreground">
									Time left: {getRemainingTime(product.uploadDate)}
								</p>
								<p class="mt-2 text-sm">{product.description}</p>
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
			</div>
		{/each}
	</div>
</section>
