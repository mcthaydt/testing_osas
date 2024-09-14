<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Star } from 'lucide-svelte';
	import type { Product } from '$lib/types/productTypes';

	export let userAssets: Product[];
	export let reviewsGiven = false;

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getAllReviews() {
		return userAssets.flatMap((asset) => asset.reviews || []);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>{reviewsGiven ? 'Reviews Given' : 'Reviews'}</CardTitle>
		<CardDescription>
			{reviewsGiven
				? "Reviews you've left for purchased assets"
				: 'What others are saying about your assets'}
		</CardDescription>
	</CardHeader>
	<CardContent>
		<ScrollArea class="h-[400px]">
			{#each reviewsGiven ? userAssets : getAllReviews() as review}
				<div class="mb-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<Avatar class="mr-3 h-10 w-10">
								<AvatarFallback>{review.user[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div>
								<p class="font-semibold">{review.user}</p>
								<p class="text-sm text-gray-500">{formatDate(review.date)}</p>
							</div>
						</div>
						<div class="flex items-center">
							<Star class="mr-1 h-5 w-5 text-yellow-400" />
							<span>{review.rating}</span>
						</div>
					</div>
					<p class="mt-2">{review.comment}</p>
					<Separator class="my-4" />
				</div>
			{/each}
		</ScrollArea>
	</CardContent>
</Card>
