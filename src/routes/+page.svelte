<script lang="ts">
	// Component Imports
	import Hero from '../components/pages/landing/Hero.svelte';
	import FeaturedCollection from '../components/pages/landing/FeaturedCollection.svelte';
	import Features from '../components/pages/landing/Features.svelte';
	import Products from '../components/pages/landing/Products.svelte';
	import CallToAction from '../components/pages/landing/CallToAction.svelte';
	import Footer from '../components/pages/landing/Footer.svelte';
	import CookieConsentDialog from '../components/pages/landing/CookieConsentDialog.svelte';
	import FeaturedCollectionModal from '../components/pages/landing/FeaturedCollectionModal.svelte';
	// Svelte and Store Imports
	import { onMount } from 'svelte';
	import { productStore } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes'; // Update this import path if necessary
	// Static Data
	const features = [
		{
			title: 'User-Driven Voting System',
			description: 'Ensures high-quality, community-approved assets that meet your needs.'
		},
		{
			title: 'Exclusive Open Source Marketplace',
			description:
				'Access a curated collection of assets tailored specifically for open source game engines.'
		},
		{
			title: 'Flexible Revenue Sharing Options',
			description: 'Collaborate with ease and fairly compensate all contributors to your assets.'
		},
		{
			title: 'Competitive 8% Transaction Fee',
			description: 'Keep more of your earnings while supporting open source game development.'
		}
	];
	let showFeaturedCollectionModal = false;
	let showCookieConsent = false;
	let signupCount = 0;
	let products: Product[] = [];
	let productsNearingDeadline: Product[] = [];
	let sortedProducts: Product[] = [];

	productStore.subscribe((value) => {
		products = value;
		updateProductLists();
	});

	function updateProductLists() {
		const now = new Date().getTime();
		productsNearingDeadline = products.filter((product) => {
			const uploadTime = new Date(product.uploadDate).getTime();
			const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
			const hoursRemaining = remainingTime / (1000 * 60 * 60);
			return product.status === 'pending' && hoursRemaining <= 24 && hoursRemaining > 0;
		});
		sortedProducts = [...productsNearingDeadline].sort((a, b) => b.upvotes - a.upvotes);
	}

	// Lifecycle
	onMount(async () => {
		// Check for cookie consent
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (!cookieConsent) {
			showCookieConsent = true;
		}
		// Fetch signup count from Google Sheets
		try {
			const response = await fetch(
				'https://sheets.googleapis.com/v4/spreadsheets/1zklkm1psbKyjpe60qJFXgupb0Ly-3-pSH5-VTKvwSxQ/values/Form Responses 1!B2:B?key=AIzaSyAW0FnbcoO0IxV5_nnjZ1G7bqoqek-o32w'
			);
			const data = await response.json();
			console.log('Google Sheets API response:', data);
			if (data.values && data.values.length > 0) {
				signupCount = data.values.length;
			} else {
				signupCount = 0;
			}
		} catch (error) {
			console.error('Error fetching signup count:', error);
		}
	});
	// Helper Functions
	function acceptCookies() {
		localStorage.setItem('cookieConsent', 'true');
		showCookieConsent = false;
	}
	function getRemainingTime(uploadDate: string) {
		const uploadTime = new Date(uploadDate).getTime();
		const now = new Date().getTime();
		const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
		const hours = Math.floor(remainingTime / (1000 * 60 * 60));
		const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}h ${minutes}m`;
	}
	function handleUpvote(id: string) {
		productStore.upvote(id, 'user0');
	}
</script>

<main class="container mx-auto px-4">
	<Hero {signupCount} />
	<FeaturedCollection />
	<Features {features} />
	<Products {sortedProducts} {handleUpvote} {getRemainingTime} />
	<CallToAction />
	<Footer />
</main>
<CookieConsentDialog bind:open={showCookieConsent} />
<FeaturedCollectionModal />
