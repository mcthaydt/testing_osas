<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Download, DollarSign, Package, Bell } from 'lucide-svelte';
	import { userStore } from '$lib/stores/userStore';

	$: user = $userStore;
	$: totalDownloads = user ? user.assetsSold : 0;
	$: totalRevenue = user ? user.totalRevenue : 0;
	$: activeAssets = user ? user.assetsPublished : 0;
	$: notifications = []; // You'll need to implement this based on your notification system

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<div class="my-2 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Downloads</CardTitle>
			<Download class="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="text-lg font-bold sm:text-xl lg:text-2xl">
				{totalDownloads.toLocaleString()}
			</div>
		</CardContent>
	</Card>
	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Revenue</CardTitle>
			<DollarSign class="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="text-lg font-bold sm:text-xl lg:text-2xl">{formatCurrency(totalRevenue)}</div>
		</CardContent>
	</Card>
	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Assets</CardTitle>
			<Package class="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="text-lg font-bold sm:text-xl lg:text-2xl">{activeAssets}</div>
		</CardContent>
	</Card>
	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Notifications</CardTitle>
			<Bell class="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="text-lg font-bold sm:text-xl lg:text-2xl">{notifications.length}</div>
		</CardContent>
	</Card>
</div>
