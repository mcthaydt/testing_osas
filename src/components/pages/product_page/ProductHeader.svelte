<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { Product } from '$lib/types/productTypes';
	export let product: Product;
</script>

{#if product}
	<h1 class="text-4xl font-bold">{product.name}</h1>
	<Badge variant="outline">Engine: {product.engine || 'Not specified'}</Badge>
	<Badge variant="outline">
		Engine Version: {product.engineVersions[0].version || 'Not specified'}
	</Badge>
{:else}
	<p>Loading product information...</p>
{/if}
