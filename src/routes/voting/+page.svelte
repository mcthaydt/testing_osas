<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { ArrowUp, ExternalLink, Clock } from 'lucide-svelte';
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { products, upvote } from '$lib/stores/productStore';
	import type { SelectValue } from '$lib/components/ui/select';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let sortBy: SelectValue<string> = { value: 'dateDesc' };

	$: pendingProducts = $products.filter((p) => p.status === 'pending');
	$: sortedProducts = [...pendingProducts].sort((a, b) => {
		switch (sortBy.value) {
			case 'dateDesc':
				return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
			case 'dateAsc':
				return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
			case 'upvotes':
				return b.upvotes - a.upvotes;
			case 'timeLeft':
				return getRemainingTimeInHours(a.uploadDate) - getRemainingTimeInHours(b.uploadDate);
			default:
				return 0;
		}
	});

	function getRemainingTime(uploadDate: string): string {
		const uploadTime = new Date(uploadDate).getTime();
		const now = new Date().getTime();
		const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
		const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
		const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
		return `${days}d ${hours}h ${minutes}m`;
	}

	function getRemainingTimeInHours(uploadDate: string): number {
		const uploadTime = new Date(uploadDate).getTime();
		const now = new Date().getTime();
		const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
		return remainingTime / (1000 * 60 * 60);
	}

	function handleUpvote(id: string) {
		upvote(id);
	}
</script>

<div class="container mx-auto space-y-6 p-4">
	<h1 class="text-3xl font-bold tracking-tight">Asset Voting</h1>
	<div>
		<Select.Root bind:selected={sortBy}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Sort by" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="dateDesc">Newest First</Select.Item>
				<Select.Item value="dateAsc">Oldest First</Select.Item>
				<Select.Item value="upvotes">Most Upvotes</Select.Item>
				<Select.Item value="timeLeft">Least Time Left</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<ScrollArea class="h-[600px] w-full rounded-md border p-4">
		<ul class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
									<p class="flex items-center text-sm text-muted-foreground">
										<Clock class="mr-1 h-4 w-4" />
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
		</ul>
	</ScrollArea>
</div>
