<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Star, Download } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let user: any;
	export let userAssets: Product[];
</script>

<Card>
	<CardHeader>
		<CardTitle>Portfolio</CardTitle>
		<CardDescription>Showcase of {user.username}'s published assets</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each userAssets as asset}
				<Card>
					<img
						src={asset.imageUrl}
						alt={asset.name}
						class="h-48 w-full rounded-t-lg object-cover"
					/>
					<CardHeader>
						<CardTitle class="text-lg">{asset.name}</CardTitle>
						<CardDescription class="text-sm">{asset.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<Star class="mr-1 h-5 w-5 text-yellow-400" />
								<span>{asset.rating.toFixed(1)}</span>
							</div>
							<div class="flex items-center">
								<Download class="mr-1 h-5 w-5 text-gray-500" />
								<span>{asset.upvotes}</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button class="w-full">View Asset</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</CardContent>
</Card>
