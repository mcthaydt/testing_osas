<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import type { Product } from '$lib/types/productTypes';

	export let userAssets: Product[];
	export let handleLicenseUpdate: (assetId: string, newLicense: string) => void;
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-lg sm:text-xl">License Management</CardTitle>
		<CardDescription>Manage licenses for your assets</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			{#each userAssets as asset}
				<div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
					<div class="mb-2 sm:mb-0">
						<h3 class="text-sm font-semibold sm:text-base">{asset.name}</h3>
						<p class="text-xs text-gray-500 sm:text-sm">Current License: {asset.license}</p>
					</div>
					<Button
						variant="outline"
						on:click={() => handleLicenseUpdate(asset.id, 'new-license')}
						class="w-full text-xs sm:w-auto sm:text-sm"
					>
						Update License
					</Button>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
