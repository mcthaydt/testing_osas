<script lang="ts">
	import ProductList from '../../components/product_list.svelte';
	import { getProductsByCategory } from '$lib/stores/productStore';

	const bevyProducts = getProductsByCategory('Bevy');
</script>

<ProductList engine="Bevy" pageTitle="Bevy Engine Assets" />
