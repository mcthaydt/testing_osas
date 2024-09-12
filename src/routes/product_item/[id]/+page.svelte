<script lang="ts">
	import { page } from '$app/stores';
	import { getProduct, addReview } from '$lib/stores/productStore';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Star, ShoppingCart, Download, Video, Users, Tag } from 'lucide-svelte';
	import { cartStore, type CartItem } from '$lib/stores/cartStore';

	const productId = $page.params.id;
	const product = getProduct(productId);

	// Test condition for purchased item
	let hasPurchased = true;

	let userRating = 0;
	let userReview = '';

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
		}
	}

	function submitReview() {
		if (product && userRating > 0) {
			addReview(product.id, {
				rating: userRating,
				comment: userReview,
				user: 'Current User', // In a real app, you'd get this from your auth system
				date: new Date().toISOString()
			});
			userRating = 0;
			userReview = '';
		}
	}
</script>

{#if product}
	<div class="container mx-auto p-4">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-6">
				<h1 class="text-4xl font-bold">{product.name}</h1>
				<Badge variant="secondary">{product.category}</Badge>
				<AspectRatio ratio={16 / 9}>
					<img
						src={product.imageUrl}
						alt={product.name}
						class="h-full w-full rounded-lg object-cover"
					/>
				</AspectRatio>
				{#if product.additionalImages.length > 0}
					<div class="grid grid-cols-3 gap-4">
						{#each product.additionalImages as image}
							<img src={image} alt="Additional view" class="rounded-md object-cover" />
						{/each}
					</div>
				{/if}
				{#if product.videoUrl}
					<div>
						<h3 class="mb-2 text-xl font-semibold">Product Video</h3>
						<AspectRatio ratio={16 / 9}>
							<video src={product.videoUrl} controls class="rounded-lg">
								Your browser does not support the video tag.
							</video>
						</AspectRatio>
					</div>
				{/if}
			</div>
			<div class="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle class="text-3xl font-bold text-primary"
							>${product.price.toFixed(2)}</CardTitle
						>
						<CardDescription>
							<div class="flex items-center space-x-1">
								<Star class="h-5 w-5 fill-yellow-400" />
								<span class="text-sm font-medium">{product.rating.toFixed(1)} Rating</span>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-lg">{product.description}</p>
					</CardContent>
					<CardFooter>
						<Button class="w-full" size="lg" on:click={addToCart}>
							<ShoppingCart class="mr-2 h-5 w-5" />
							Add to Cart
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Product Details</CardTitle>
					</CardHeader>
					<CardContent class="space-y-2">
						<p><strong>Version:</strong> {product.version}</p>
						<p><strong>License:</strong> {product.license}</p>
						<p>
							<strong>Release Date:</strong>
							{new Date(product.releaseDate).toLocaleDateString()}
						</p>
						<p><strong>AI Generated:</strong> {product.isAiGenerated ? 'Yes' : 'No'}</p>
					</CardContent>
				</Card>
				{#if product.collaborators.length > 0}
					<Card>
						<CardHeader>
							<CardTitle>Collaborators</CardTitle>
						</CardHeader>
						<CardContent>
							<ul class="list-inside list-disc">
								{#each product.collaborators as collaborator}
									<li>{collaborator.email} - {collaborator.revenueSplit}% revenue share</li>
								{/each}
							</ul>
						</CardContent>
					</Card>
				{/if}
				<Card>
					<CardHeader>
						<CardTitle>Tags</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2">
							{#each product.tags as tag}
								<Badge variant="outline">{tag}</Badge>
							{/each}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<div class="mt-12">
			<Tabs defaultValue="description">
				<TabsList>
					<TabsTrigger value="description">Description</TabsTrigger>
					<TabsTrigger value="changelog">Changelog</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
				</TabsList>
				<TabsContent value="description">
					<Card>
						<CardHeader>
							<CardTitle>Extended Description</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{product.extendedDescription}</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="changelog">
					<Card>
						<CardHeader>
							<CardTitle>Changelog</CardTitle>
						</CardHeader>
						<CardContent>
							{#if product.changelog && product.changelog.length > 0}
								{#each product.changelog as entry}
									<div class="mb-4 border-b pb-4">
										<h3 class="text-lg font-semibold">Version {entry.version} - {entry.date}</h3>
										<ul class="list-inside list-disc">
											{#each entry.changes as change}
												<li>{change}</li>
											{/each}
										</ul>
									</div>
								{/each}
							{:else}
								<p>No changelog entries available.</p>
							{/if}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="reviews">
					<Card>
						<CardHeader>
							<CardTitle>Reviews</CardTitle>
						</CardHeader>
						<CardContent>
							{#if product.reviews && product.reviews.length > 0}
								{#each product.reviews as review}
									<div class="mb-4 border-b pb-4">
										<div class="flex items-center justify-between">
											<div class="flex items-center space-x-2">
												<Star class="h-5 w-5 fill-yellow-400" />
												<span>{review.rating}</span>
											</div>
											<span class="text-sm text-muted-foreground"
												>{new Date(review.date).toLocaleDateString()}</span
											>
										</div>
										<p class="mt-2">{review.comment}</p>
										<p class="mt-1 text-sm text-muted-foreground">By {review.user}</p>
									</div>
								{/each}
							{:else}
								<p>No reviews yet.</p>
							{/if}

							{#if hasPurchased}
								<div class="mt-8">
									<h3 class="mb-4 text-xl font-semibold">Leave a Review</h3>
									<div class="mb-4">
										<label for="rating" class="mb-2 block">Rating:</label>
										<div class="flex space-x-2">
											{#each Array(5) as _, i}
												<button on:click={() => (userRating = i + 1)}>
													<Star class="h-6 w-6" fill={i < userRating ? 'gold' : 'none'} />
												</button>
											{/each}
										</div>
									</div>
									<div class="mb-4">
										<label for="review" class="mb-2 block">Review:</label>
										<Textarea id="review" bind:value={userReview} rows="4" />
									</div>
									<Button on:click={submitReview}>Submit Review</Button>
								</div>
							{/if}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	</div>
{:else}
	<div class="container mx-auto p-4 text-center">
		<h1 class="text-2xl font-bold">Product not found</h1>
		<Button variant="default" class="mt-4" href="/">Back to Products</Button>
	</div>
{/if}
