<script lang="ts">
	import { page } from '$app/stores';
	import { productStore } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes';
	import ProductDetail from '../../../components/pages/product_page/ProductDetailPage.svelte';

	const productId = $page.params.id;
	let product: Product | undefined;

	productStore.subscribe((products) => {
		product = products.find((p) => p.id === productId);
	});

	function addReview(productId: string, rating: number, review: string) {
		productStore.addReview(productId, {
			rating,
			comment: review,
			user: 'Current User', // In a real app, you'd get this from your auth system
			date: new Date().toISOString()
		});
	}

	function upvoteProduct(productId: string) {
		productStore.upvote(productId, 'Current User');
	}
</script>

<ProductDetail {product} {addReview} {upvoteProduct} />
