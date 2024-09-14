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
	import { Star, DollarSign } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let user: any;
	export let purchasedAssets: Product[];
	export let handleTip: (assetId: string) => void;

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Recent Purchases</CardTitle>
		<CardDescription>Assets {user.username} has recently bought</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each purchasedAssets as asset}
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
							<p class="text-sm text-gray-500">Purchased on {formatDate(asset.uploadDate)}</p>
						</div>
					</CardContent>
					<CardFooter class="flex flex-col gap-2 sm:flex-row">
						<Button class="w-full sm:w-1/2">View Asset</Button>
						<Button class="w-full sm:w-1/2" variant="outline" on:click={() => handleTip(asset.id)}>
							<DollarSign class="mr-2 h-4 w-4" />
							Tip Developer
						</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</CardContent>
</Card>
