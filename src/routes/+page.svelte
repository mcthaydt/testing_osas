<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/dialog';
	import { Github, Twitter, ChevronLeft, ChevronRight, ArrowUp, ExternalLink } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { products, upvote } from '$lib/stores/productStore';
	import { fade } from 'svelte/transition';
	import FeaturedCollection from '../components/featured_collection.svelte';

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

	const featuredCollection = {
		name: 'Top Performers',
		description: 'Assets that are doing well in the market',
		image:
			'https://images.pexels.com/photos/27180675/pexels-photo-27180675/free-photo-of-perito-moreno-glacier-in-patagonia.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
	};

	let showFeaturedCollectionModal = false;
	let showCookieConsent = false;

	onMount(() => {
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (!cookieConsent) {
			showCookieConsent = true;
		}
	});

	function acceptCookies() {
		localStorage.setItem('cookieConsent', 'true');
		showCookieConsent = false;
	}

	$: productsNearingDeadline = $products.filter((product) => {
		const uploadTime = new Date(product.uploadDate).getTime();
		const now = new Date().getTime();
		const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
		const hoursRemaining = remainingTime / (1000 * 60 * 60);
		return product.status === 'pending' && hoursRemaining <= 24 && hoursRemaining > 0;
	});
	$: sortedProducts = productsNearingDeadline.sort((a, b) => b.upvotes - a.upvotes);
	$: signupCount = 0;

	onMount(async () => {
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
			console.log('Google Sheets API response:', data); // Log the response
			if (data.values && data.values.length > 0) {
				signupCount = data.values.length; // Count the number of email addresses
			} else {
				signupCount = 0; // No data found
			}
		} catch (error) {
			console.error('Error fetching signup count:', error);
		}
	});

	function getRemainingTime(uploadDate: string) {
		const uploadTime = new Date(uploadDate).getTime();
		const now = new Date().getTime();
		const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
		const hours = Math.floor(remainingTime / (1000 * 60 * 60));
		const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}h ${minutes}m`;
	}

	function handleUpvote(id: string) {
		upvote(id);
	}
</script>

<main class="container mx-auto px-4">
	<section class="hero py-20 text-center">
		<Badge variant="outline" class="mb-4">Over {signupCount} Prelaunch Signups</Badge>
		<h1 class="mb-4 text-4xl font-semibold tracking-normal">
			Asset Store for Open Source Game Engines
		</h1>
		<p class="mb-8 text-lg">
			Access high-quality, free and paid game assets to bring your vision to life
		</p>
		<div class="mx-auto mb-12 max-w-[425px] rounded-xl">
			<AspectRatio ratio={16 / 9} class="rounded-xl bg-muted">
				<!-- svelte-ignore a11y_media_has_caption -->
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<video
					src="https://media.istockphoto.com/id/1499384294/ko/비디오/바다에서-수영하는-돌고래의-수중-영상.mp4?s=mp4-480x480-is&k=20&c=tf43Gnm98xXTQYP1O7gWsV1gQTWIXJAw7TwtsfU71nU="
					class="rounded-xl object-cover"
					autoplay
					muted
				/>
			</AspectRatio>
		</div>
		<div class="mt-4 flex justify-center">
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<a href="/godot">
					<Button variant="default" size="default">Browse Godot Assets</Button>
				</a>
				<a href="/bevy">
					<Button variant="secondary" size="default">Browse Bevy Assets</Button>
				</a>
			</div>
		</div>
	</section>

	<section class="featured-asset py-16">
		<h2 class="mb-8 text-center text-3xl font-bold">Featured Collection</h2>
		<Card class="overflow-hidden">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<img
					src={featuredCollection.image}
					alt={featuredCollection.name}
					class="h-full w-full object-cover"
				/>
				<div class="p-6">
					<CardHeader>
						<CardTitle>{featuredCollection.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{featuredCollection.description}</p>
					</CardContent>
					<CardFooter>
						<div class="flex flex-col gap-2 md:flex-row">
							<Button
								variant="outline"
								size="lg"
								on:click={() => (showFeaturedCollectionModal = true)}>View Collection</Button
							>
						</div>
					</CardFooter>
				</div>
			</div>
		</Card>
	</section>

	<section class="features py-16">
		<h2 class="mb-12 text-center text-3xl font-bold">Why OSAS?</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<Card>
					<CardHeader>
						<CardTitle>{feature.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{feature.description}</p>
					</CardContent>
				</Card>
			{/each}
		</div>
	</section>

	<section class="features container py-16">
		<h2 class="mb-2 text-center text-3xl font-bold">Under 24 Hours Remaining</h2>
		<p class="mb-12 text-center text-sm text-muted-foreground">
			These assets have less than 24 hours to get above the minimum votes
		</p>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
			{#each sortedProducts as product (product.id)}
				<div animate:flip={{ duration: 300 }} transition:fade={{ duration: 300 }}>
					<Card class="mx-auto w-full max-w-md">
						<CardContent class="flex flex-col space-y-4 p-4">
							<AspectRatio ratio={16 / 9}>
								<img
									src={product.imageUrl}
									alt={`Image of ${product.name}`}
									class="h-full w-full rounded-md object-cover"
								/>
							</AspectRatio>
							<div class="flex items-center space-x-4">
								<div class="flex flex-col items-center">
									<Button variant="outline" size="icon" on:click={() => handleUpvote(product.id)}>
										<ArrowUp class="h-4 w-4" />
									</Button>
									<span class="mt-1 text-sm font-medium">{product.upvotes}</span>
								</div>
								<div>
									<h2 class="text-lg font-semibold">{product.name}</h2>
									<p class="text-sm text-muted-foreground">
										Time left: {getRemainingTime(product.uploadDate)}
									</p>
									<p class="mt-2 text-sm">{product.description}</p>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline" class="w-full" href={`/product_item/${product.id}`}>
								<ExternalLink class="mr-2 h-4 w-4" />
								View Product
							</Button>
						</CardFooter>
					</Card>
				</div>
			{/each}
		</div>
	</section>

	<section class="cta mb-12 rounded-lg bg-primary-foreground p-16 text-center">
		<h2 class="mb-4 text-3xl font-bold text-secondary">Any Questions?</h2>
		<p class="mb-8 text-secondary">
			For Frequently Asked Questions, Legal Information, and Community
		</p>
		<a href="support/">
			<Button variant="outline" size="lg">Visit Support</Button>
		</a>
	</section>

	<section class="cta rounded-lg bg-secondary p-16 text-center">
		<h2 class="mb-4 text-3xl font-bold">Sharing is Caring</h2>
		<p class="mb-8">We'll let you know when we launch</p>
		<a href="https://forms.gle/p8EMx4DoQ3axtvEm9">
			<Button variant="default" size="lg">Join Waitlist</Button>
		</a>
	</section>

	<footer class="border-t py-12">
		<div class="flex items-center justify-between">
			<div class="text-sm">&copy; 2024 SOS Holdings Company. All rights reserved.</div>
			<div class="flex space-x-4">
				<a href="https://github.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
					<Github size={24} />
				</a>
				<a href="https://x.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
					<Twitter size={24} />
				</a>
			</div>
		</div>
	</footer>
</main>

<Select.Dialog bind:open={showCookieConsent}>
	<Select.DialogContent>
		<Select.DialogHeader>
			<Select.DialogTitle>Cookie Consent</Select.DialogTitle>
			<Select.DialogDescription>
				We use cookies to enhance your browsing experience, serve personalized ads or content, and
				analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
			</Select.DialogDescription>
		</Select.DialogHeader>
		<Select.DialogFooter>
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<Button class="min-w-[125px]" variant="outline" on:click={() => (showCookieConsent = false)}
					>Decline</Button
				>
				<Button class="min-w-[125px]" on:click={acceptCookies}>Accept All</Button>
			</div>
		</Select.DialogFooter>
	</Select.DialogContent>
</Select.Dialog>

<FeaturedCollection bind:showModal={showFeaturedCollectionModal} />
