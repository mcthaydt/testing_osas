<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import type { Product } from '$lib/types/productTypes';

	export let userAssets: Product[];
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-lg sm:text-xl">Asset Management</CardTitle>
		<CardDescription>Manage your published assets</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="mb-4">
			<Button on:click={() => goto('/upload')} class="w-full sm:w-auto">Upload New Asset</Button>
		</div>
		<div class="space-y-4">
			{#each userAssets as asset}
				<div
					class="flex flex-col items-start justify-between rounded-lg border p-3 sm:flex-row sm:items-center sm:p-4"
				>
					<div class="mb-3 flex items-center space-x-3 sm:mb-0 sm:space-x-4">
						<img
							src={asset.imageUrl}
							alt={asset.name}
							class="h-12 w-12 rounded object-cover sm:h-16 sm:w-16"
						/>
						<div>
							<h3 class="text-base font-semibold sm:text-lg">{asset.name}</h3>
							<p class="text-xs text-gray-500 sm:text-sm">{asset.description}</p>
						</div>
					</div>
					<div class="flex w-full flex-wrap gap-2 sm:w-auto">
						<Badge variant={asset.status === 'approved' ? 'default' : 'secondary'} class="text-xs">
							{asset.status}
						</Badge>
						<Button variant="outline" size="sm" class="w-full text-xs sm:w-auto">Edit</Button>
						<Button variant="outline" size="sm" class="w-full text-xs sm:w-auto"
							>Manage Versions</Button
						>
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
