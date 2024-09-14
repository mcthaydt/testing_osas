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
	<TabsList class="grid w-full grid-cols-2 sm:grid-cols-4">
		{#if viewMode === 'seller'}
			<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
			<TabsTrigger value="reviews">Reviews</TabsTrigger>
		{:else}
			<TabsTrigger value="purchases">Purchases</TabsTrigger>
			<TabsTrigger value="reviews-given">Reviews Given</TabsTrigger>
		{/if}
		<TabsTrigger value="badges">Badges</TabsTrigger>
		<TabsTrigger value="activity">Activity</TabsTrigger>
	</TabsList>

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
