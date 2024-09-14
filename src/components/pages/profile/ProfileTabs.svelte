<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import PortfolioTab from './PortfolioTab.svelte';
	import ReviewsTab from './ReviewsTab.svelte';
	import PurchasesTab from './PurchasesTab.svelte';
	import BadgesTab from './BadgesTab.svelte';
	import ActivityTab from './ActivityTab.svelte';
	import type { Product } from '$lib/types/productTypes';

	export let viewMode: 'seller' | 'buyer';
	export let user: any;
	export let userAssets: Product[];
	export let purchasedAssets: Product[];
	export let handleTip: (assetId: string) => void;
</script>

<Tabs defaultValue={viewMode === 'seller' ? 'portfolio' : 'purchases'} class="mt-8">
	<!-- First set of TabsList -->
	<TabsList class="mx-auto grid max-w-md grid-cols-2 gap-2 sm:grid-cols-2">
		{#if viewMode === 'seller'}
			<TabsTrigger value="portfolio" class="text-sm">Portfolio</TabsTrigger>
			<TabsTrigger value="reviews" class="text-sm">Reviews</TabsTrigger>
		{:else}
			<TabsTrigger value="purchases" class="text-sm">Purchases</TabsTrigger>
			<TabsTrigger value="reviews-given" class="text-sm">Reviews Given</TabsTrigger>
		{/if}
	</TabsList>

	<!-- Spacer between the two sets -->
	<div class="mt-4"></div>

	<!-- Second set of TabsList -->
	<TabsList class="mx-auto grid max-w-md grid-cols-2 gap-2 sm:grid-cols-2">
		<TabsTrigger value="badges" class="text-sm">Badges</TabsTrigger>
		<TabsTrigger value="activity" class="text-sm">Activity</TabsTrigger>
	</TabsList>

	<!-- Spacer below the second set -->
	<div class="mb-4"></div>

	<!-- Tabs Content -->
	{#if viewMode === 'seller'}
		<TabsContent value="portfolio">
			<PortfolioTab {user} {userAssets} />
		</TabsContent>
		<TabsContent value="reviews">
			<ReviewsTab {userAssets} />
		</TabsContent>
	{:else}
		<TabsContent value="purchases">
			<PurchasesTab {user} {purchasedAssets} {handleTip} />
		</TabsContent>
		<TabsContent value="reviews-given">
			<ReviewsTab {purchasedAssets} reviewsGiven={true} />
		</TabsContent>
	{/if}

	<TabsContent value="badges">
		<BadgesTab {user} />
	</TabsContent>
	<TabsContent value="activity">
		<ActivityTab {viewMode} {userAssets} {purchasedAssets} />
	</TabsContent>
</Tabs>
