<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
</script>

<Card>
	<CardHeader>
		<CardTitle>Extended Description</CardTitle>
	</CardHeader>
	<CardContent>
		<p>{product.extendedDescription}</p>
	</CardContent>
</Card>
