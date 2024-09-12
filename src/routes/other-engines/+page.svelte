<script lang="ts">
	import ProductList from '../../components/product_list.svelte';
	import { getProductsByCategory } from '$lib/stores/productStore';

	const otherProducts = getProductsByCategory('Other');
</script>

<ProductList products={otherProducts} pageTitle="Other Game Engine Assets" />
