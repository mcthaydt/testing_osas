<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { showFeaturedCollectionModal } from '$lib/stores/modalStore';

	const featuredCollection = {
		name: 'Top Performers',
		description: 'Assets that are doing well in the market',
		image:
			'https://images.pexels.com/photos/27180675/pexels-photo-27180675/free-photo-of-perito-moreno-glacier-in-patagonia.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
	};
</script>

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
							on:click={() => showFeaturedCollectionModal.set(true)}
						>
							View Collection
						</Button>
					</div>
				</CardFooter>
			</div>
		</div>
	</Card>
</section>
