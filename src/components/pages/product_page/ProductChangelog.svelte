<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
</script>

<Card>
	<CardHeader>
		<CardTitle>Changelog</CardTitle>
	</CardHeader>
	<CardContent>
		{#if product.changelog && product.changelog.length > 0}
			{#each product.changelog as entry}
				<div class="mb-4 border-b pb-4">
					<h3 class="text-lg font-semibold">Version {entry.version} - {entry.date}</h3>
					<ul class="list-inside list-disc">
						{#each entry.changes as change}
							<li>{change}</li>
						{/each}
					</ul>
				</div>
			{/each}
		{:else}
			<p>No changelog entries available.</p>
		{/if}
	</CardContent>
</Card>
