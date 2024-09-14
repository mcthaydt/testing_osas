<script lang="ts">
	import { onMount } from 'svelte';
	import { productStore } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes';
	import { notificationStore } from '$lib/stores/notificationStore';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import DashboardHeader from './DashboardHeader.svelte';
	import SalesOverview from './SalesOverview.svelte';
	import AssetManagement from './AssetManagement.svelte';
	import Analytics from './Analytics.svelte';
	import Sales from './Sales.svelte';
	import Community from './Community.svelte';
	import LicenseManagement from './LicenseManagement.svelte';
	import CollaboratorAccess from './CollaboratorAccess.svelte';
	import { setUser } from '$lib/stores/userStore';

	let userAssets: Product[] = [];
	let notifications: any[] = [];

	onMount(() => {
		setUser('user-123');

		const unsubscribe = productStore.subscribe((products) => {
			userAssets = products.filter((product) => product.assetDeveloper === 'currentUserId');
		});
		notifications = $notificationStore;

		return unsubscribe;
	});

	function handleLicenseUpdate(assetId: string, newLicense: string) {
		console.log(`Updating license for asset ${assetId} to ${newLicense}`);
	}

	function handleAddCollaborator(assetId: string) {
		console.log(`Adding collaborator to asset ${assetId}`);
	}
</script>

<div class="container mx-auto max-w-full overflow-x-hidden px-2 py-4 sm:px-4 sm:py-8">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">Seller Dashboard</h1>

	<DashboardHeader {userAssets} {notifications} />

	<SalesOverview />

	<Tabs defaultValue="assets" class="mt-6 sm:mt-8">
		<TabsList class="mx-auto grid max-w-md grid-cols-2 gap-2 sm:grid-cols-2">
			<TabsTrigger value="assets" class="text-sm">Assets</TabsTrigger>
			<TabsTrigger value="analytics" class="text-sm">Analytics</TabsTrigger>
		</TabsList>
		<div class="mt-4"></div>
		<TabsList class="mx-auto grid max-w-md grid-cols-2 gap-2 sm:grid-cols-2">
			<TabsTrigger value="sales" class="text-sm">Sales</TabsTrigger>
			<TabsTrigger value="community" class="text-sm">Community</TabsTrigger>
		</TabsList>
		<div class="mb-4"></div>

		<TabsContent value="assets">
			<AssetManagement {userAssets} />
		</TabsContent>

		<TabsContent value="analytics">
			<Analytics />
		</TabsContent>

		<TabsContent value="sales">
			<Sales />
		</TabsContent>

		<TabsContent value="community">
			<Community />
		</TabsContent>
	</Tabs>

	<div class="mb-4"></div>
	<LicenseManagement {userAssets} {handleLicenseUpdate} />
	<div class="mb-4"></div>
	<CollaboratorAccess {userAssets} {handleAddCollaborator} />
</div>
