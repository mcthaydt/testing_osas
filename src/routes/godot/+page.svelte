<script lang="ts">
	import ProductList from '../../components/product_list.svelte';
	import { getProductsByCategory } from '$lib/stores/productStore';

	const godotProducts = getProductsByCategory('Godot');
</script>

<ProductList engine="Godot" pageTitle="Godot Engine Assets" />
