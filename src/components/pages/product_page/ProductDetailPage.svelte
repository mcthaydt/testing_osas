<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { cartStore, type CartItem } from '$lib/stores/cartStore';
	import type { Product } from '$lib/types/productTypes';
	import AlertDialog from './AlertDialog.svelte';
	import ProductHeader from './ProductHeader.svelte';
	import ProductGallery from './ProductGallery.svelte';
	import ProductPricing from './ProductPricing.svelte';
	import ProductDetails from './ProductDetails.svelte';
	import ProductTabs from './ProductTabs.svelte';

	export let product: Product | undefined;
	export let addReview: (productId: string, rating: number, review: string) => void;
	export let upvoteProduct: (productId: string) => void;

	// Test condition for purchased item
	let hasPurchased = true;
	let showAlertDialog = false;
	let alertDialogTitle = '';
	let alertDialogDescription = '';
	let alertDialogTimeout: number | null = null;

	function showAlertDialogWithTimeout(title: string, description: string) {
		alertDialogTitle = title;
		alertDialogDescription = description;
		showAlertDialog = true;
		if (alertDialogTimeout) {
			clearTimeout(alertDialogTimeout);
		}
		alertDialogTimeout = setTimeout(() => {
			showAlertDialog = false;
			alertDialogTimeout = null;
		}, 3000);
	}

	function addToCart() {
		if (product) {
			const cartItem: CartItem = {
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: 1,
				imageUrl: product.imageUrl,
				category: product.category
			};
			cartStore.addItem(cartItem);
			showAlertDialogWithTimeout('Cart Updated', 'Item added to cart');
		}
	}

	function submitReview(rating: number, review: string) {
		if (product) {
			addReview(product.id, rating, review);
			showAlertDialogWithTimeout('Review Submitted', 'Your review was submitted successfully');
		}
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			showAlertDialogWithTimeout('URL Copied', 'The product URL has been copied to your clipboard');
		});
	}

	function handleUpvote() {
		if (product) {
			upvoteProduct(product.id);
			showAlertDialogWithTimeout('Product Upvoted', 'Thank you for your vote!');
		}
	}

	onMount(() => {
		return () => {
			if (alertDialogTimeout) {
				clearTimeout(alertDialogTimeout);
			}
		};
	});
</script>

<AlertDialog
	open={showAlertDialog}
	title={alertDialogTitle}
	description={alertDialogDescription}
	onClose={() => (showAlertDialog = false)}
/>

{#if product}
	<div class="container mx-auto p-4">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-6">
				<ProductHeader {product} />
				<ProductGallery {product} />
			</div>
			<div class="space-y-6">
				<ProductPricing {product} {addToCart} {copyToClipboard} upvoteProduct={handleUpvote} />
				<ProductDetails {product} />
			</div>
		</div>
		<div class="mt-12">
			<ProductTabs {product} {submitReview} {hasPurchased} />
		</div>
	</div>
{:else}
	<div class="container mx-auto p-4 text-center">
		<h1 class="text-2xl font-bold">Product not found</h1>
		<Button variant="default" class="mt-4" href="/">Back to Products</Button>
	</div>
{/if}
