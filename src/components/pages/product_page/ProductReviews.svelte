<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Star } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
	export let submitReview: (rating: number, review: string) => void;
	export let hasPurchased: boolean;

	let userRating = 0;
	let userReview = '';

	function handleSubmitReview() {
		if (userRating > 0) {
			submitReview(userRating, userReview);
			userRating = 0;
			userReview = '';
		}
	}
</script>

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
						<span class="text-sm text-muted-foreground">
							{new Date(review.date).toLocaleDateString()}
						</span>
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
				<Button on:click={handleSubmitReview}>Submit Review</Button>
			</div>
		{/if}
	</CardContent>
</Card>
