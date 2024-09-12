<script lang="ts">
	import ProductList from '../../components/product_list.svelte';
	import { getProductsByCategory } from '$lib/stores/productStore';

	const generalProducts = getProductsByCategory('General');
</script>

<ProductList products={generalProducts} pageTitle="General Assets" />
