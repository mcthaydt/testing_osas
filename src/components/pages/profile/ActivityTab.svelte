<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { ShoppingCart, Tag } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let viewMode: 'seller' | 'buyer';
	export let userAssets: Product[];
	export let purchasedAssets: Product[];

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<Card class="w-full max-w-full">
	<CardHeader>
		<CardTitle>Activity Feed</CardTitle>
		<CardDescription>Recent actions and updates</CardDescription>
	</CardHeader>
	<CardContent>
		<ScrollArea class="h-[400px] w-full">
			{#if viewMode === 'seller'}
				{#each userAssets as asset}
					<div class="mb-4">
						<div class="flex items-center">
							<ShoppingCart class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<div class="min-w-0 flex-1">
								<p class="truncate font-semibold">{asset.name}</p>
								<p class="text-sm text-gray-500">{formatDate(asset.uploadDate)}</p>
							</div>
						</div>
						<Separator class="my-4" />
					</div>
				{/each}
			{:else}
				{#each purchasedAssets as asset}
					<div class="mb-4">
						<div class="flex items-center">
							<Tag class="mr-3 h-5 w-5 flex-shrink-0 text-blue-500" />
							<div class="min-w-0 flex-1">
								<p class="truncate font-semibold">{asset.name}</p>
								<p class="text-sm text-gray-500">{formatDate(asset.uploadDate)}</p>
							</div>
						</div>
						<Separator class="my-4" />
					</div>
				{/each}
			{/if}
		</ScrollArea>
	</CardContent>
</Card>
