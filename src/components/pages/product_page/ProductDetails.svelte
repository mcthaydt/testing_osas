<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import type { Product } from '$lib/types/productTypes';
	export let product: Product;
</script>

<Card>
	<CardHeader>
		<CardTitle>Product Details</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2">
		<p><strong>Engine:</strong> {product.engine?.value || 'Not specified'}</p>
		<p>
			<strong>Engine Version:</strong>
			{product.engineVersion || 'Not specified'}
		</p>
		<p><strong>Version:</strong> {product.version || 'Not specified'}</p>
		<p><strong>License:</strong> {product.license?.value || 'Not specified'}</p>
		<p>
			<strong>Release Date:</strong>
			{product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : 'Not specified'}
		</p>
		<p><strong>AI Generated:</strong> {product.isAiGenerated ? 'Yes' : 'No'}</p>
		<p><strong>Developer:</strong> {product.assetDeveloper || 'Not specified'}</p>
	</CardContent>
</Card>

{#if product.collaborators && product.collaborators.length > 0}
	<Card>
		<CardHeader>
			<CardTitle>Collaborators</CardTitle>
		</CardHeader>
		<CardContent>
			<ul class="list-inside list-disc">
				{#each product.collaborators as collaborator}
					<li>{collaborator.email}</li>
				{/each}
			</ul>
		</CardContent>
	</Card>
{/if}

{#if product.tags && product.tags.length > 0}
	<Card>
		<CardHeader>
			<CardTitle>Tags</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="flex flex-wrap gap-2">
				{#each product.tags as tag}
					<Badge variant="outline">{tag}</Badge>
				{/each}
			</div>
		</CardContent>
	</Card>
{/if}