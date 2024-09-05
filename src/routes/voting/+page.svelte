<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem
	} from '$lib/components/ui/select';
	import { ArrowUp, ExternalLink } from 'lucide-svelte';
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { products, upvote } from '$lib/stores/votingStore';

	let sortBy = 'dateDesc';

	$: sortedProducts = [...$products].sort((a, b) => {
		switch (sortBy) {
			case 'dateDesc':
				return b.releaseDate.getTime() - a.releaseDate.getTime();
			case 'dateAsc':
				return a.releaseDate.getTime() - b.releaseDate.getTime();
			case 'upvotes':
				return b.upvotes - a.upvotes;
			default:
				return 0;
		}
	});
</script>

<div class="container mx-auto space-y-6 p-4">
	<h1 class="text-3xl font-bold tracking-tight">Product Voting</h1>

	<div>
		<Select bind:value={sortBy}>
			<SelectTrigger class="w-[180px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="dateDesc">Newest First</SelectItem>
				<SelectItem value="dateAsc">Oldest First</SelectItem>
				<SelectItem value="upvotes">Most Upvotes</SelectItem>
			</SelectContent>
		</Select>
	</div>

	<ScrollArea class="h-[600px] w-full rounded-md border p-4">
		<ul class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each sortedProducts as product (product.id)}
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
								<Button variant="outline" size="icon" on:click={() => upvote(product.id)}>
									<ArrowUp class="h-4 w-4" />
								</Button>
								<span class="mt-1 text-sm font-medium">{product.upvotes}</span>
							</div>
							<div>
								<h2 class="text-lg font-semibold">{product.name}</h2>
								<p class="text-sm text-muted-foreground">
									Released: {product.releaseDate.toLocaleDateString()}
								</p>
								<p class="mt-2 text-sm">{product.description}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="outline" class="w-full" href={`/voting_item/${product.id}`}>
							<ExternalLink class="mr-2 h-4 w-4" />
							View Product
						</Button>
					</CardFooter>
				</Card>
			{/each}
		</ul>
	</ScrollArea>
</div>
