<script lang="ts">
	import { onMount } from 'svelte';
	import { products, type Product } from './../../lib/stores/productStore';
	import { notificationStore } from './../../lib/stores/notificationStore';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Download, DollarSign, Package, Activity, Bell, Settings } from 'lucide-svelte';
	import Chart from 'chart.js/auto';
	import { goto } from '$app/navigation';

	let totalDownloads = 10000;
	let totalRevenue = 50000;
	let activeAssets = 15;
	let userAssets: Product[] = [];
	let salesData = [
		{ name: 'Jan', downloads: 400, revenue: 2400 },
		{ name: 'Feb', downloads: 300, revenue: 1398 },
		{ name: 'Mar', downloads: 200, revenue: 9800 },
		{ name: 'Apr', downloads: 278, revenue: 3908 },
		{ name: 'May', downloads: 189, revenue: 4800 },
		{ name: 'Jun', downloads: 239, revenue: 3800 }
	];

	let geographicData = [
		{ country: 'USA', downloads: 5000, revenue: 25000 },
		{ country: 'UK', downloads: 3000, revenue: 15000 },
		{ country: 'Germany', downloads: 2000, revenue: 10000 }
	];

	let salesHistory = [
		{ date: '2023-06-01', asset: 'Asset 1', amount: 99.99, status: 'completed' },
		{ date: '2023-06-02', asset: 'Asset 2', amount: 49.99, status: 'pending' },
		{ date: '2023-06-03', asset: 'Asset 3', amount: 149.99, status: 'completed' }
	];

	let chartCanvas: HTMLCanvasElement;
	let notifications: Notification[] = [];

	function getProductsByUser(userId: string): Product[] {
		return $products.filter((product) => product.assetDeveloper === userId);
	}

	// Mock data for community activity
	let communityActivity = [
		{ user: 'User1', action: 'Downloaded', asset: 'Asset 1', date: '2023-06-01' },
		{ user: 'User2', action: 'Reviewed', asset: 'Asset 2', date: '2023-06-02' },
		{ user: 'User3', action: 'Purchased', asset: 'Asset 3', date: '2023-06-03' }
	];

	function handleLicenseUpdate(assetId: string, newLicense: string) {
		// Implement license update logic
		console.log(`Updating license for asset ${assetId} to ${newLicense}`);
	}

	function handleAddCollaborator(assetId: string) {
		// Implement add collaborator logic
		console.log(`Adding collaborator to asset ${assetId}`);
	}

	onMount(async () => {
		userAssets = getProductsByUser('currentUserId');
		notifications = $notificationStore;

		const ctx = chartCanvas.getContext('2d');
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: salesData.map((d) => d.name),
				datasets: [
					{
						label: 'Downloads',
						data: salesData.map((d) => d.downloads),
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					},
					{
						label: 'Revenue',
						data: salesData.map((d) => d.revenue),
						borderColor: 'rgb(255, 99, 132)',
						tension: 0.1
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<div class="container mx-auto max-w-full overflow-x-hidden px-2 py-4 sm:px-4 sm:py-8">
	<h1 class="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">Seller Dashboard</h1>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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

	<div class="mt-6 sm:mt-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-lg sm:text-xl">Sales & Revenue Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="max-w-full overflow-hidden">
					<canvas bind:this={chartCanvas}></canvas>
				</div>
			</CardContent>
		</Card>
	</div>

	<Tabs defaultValue="assets" class="mt-6 sm:mt-8">
		<TabsList class="grid grid-cols-2 gap-2 sm:grid-cols-4">
			<TabsTrigger value="assets" class="text-sm">Assets</TabsTrigger>
			<TabsTrigger value="analytics" class="text-sm">Analytics</TabsTrigger>
			<TabsTrigger value="sales" class="text-sm">Sales</TabsTrigger>
			<TabsTrigger value="community" class="text-sm">Community</TabsTrigger>
		</TabsList>

		<TabsContent value="assets">
			<Card>
				<CardHeader>
					<CardTitle class="text-lg sm:text-xl">Asset Management</CardTitle>
					<CardDescription>Manage your published assets</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="mb-4">
						<Button on:click={() => goto('upload/')} class="w-full sm:w-auto"
							>Upload New Asset</Button
						>
					</div>
					<div class="space-y-4">
						{#each userAssets as asset}
							<div
								class="flex flex-col items-start justify-between rounded-lg border p-3 sm:flex-row sm:items-center sm:p-4"
							>
								<div class="mb-3 flex items-center space-x-3 sm:mb-0 sm:space-x-4">
									<img
										src={asset.imageUrl}
										alt={asset.name}
										class="h-12 w-12 rounded object-cover sm:h-16 sm:w-16"
									/>
									<div>
										<h3 class="text-base font-semibold sm:text-lg">{asset.name}</h3>
										<p class="text-xs text-gray-500 sm:text-sm">{asset.description}</p>
									</div>
								</div>
								<div class="flex w-full flex-wrap gap-2 sm:w-auto">
									<Badge
										variant={asset.status === 'approved' ? 'default' : 'secondary'}
										class="text-xs"
									>
										{asset.status}
									</Badge>
									<Button variant="outline" size="sm" class="w-full text-xs sm:w-auto">Edit</Button>
									<Button variant="outline" size="sm" class="w-full text-xs sm:w-auto"
										>Manage Versions</Button
									>
								</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="analytics">
			<Card>
				<CardHeader>
					<CardTitle class="text-lg sm:text-xl">Asset Analytics</CardTitle>
					<CardDescription>Detailed statistics about your assets' performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6 sm:space-y-8">
						<div class="overflow-x-auto">
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
								Geographic Distribution
							</h3>
							<div class="w-full overflow-x-auto">
								<table class="w-full min-w-[300px]">
									<thead>
										<tr>
											<th class="text-left text-xs sm:text-sm">Country</th>
											<th class="text-right text-xs sm:text-sm">Downloads</th>
											<th class="text-right text-xs sm:text-sm">Revenue</th>
										</tr>
									</thead>
									<tbody>
										{#each geographicData as data}
											<tr>
												<td class="text-xs sm:text-sm">{data.country}</td>
												<td class="text-right text-xs sm:text-sm">{data.downloads}</td>
												<td class="text-right text-xs sm:text-sm">{formatCurrency(data.revenue)}</td
												>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">User Engagement</h3>
							<p class="text-xs sm:text-sm">
								User engagement metrics and visualizations to be implemented here.
							</p>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Download Trends</h3>
							<p class="text-xs sm:text-sm">Download trends chart to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
								Asset Performance Comparison
							</h3>
							<p class="text-xs sm:text-sm">Asset performance comparison to be implemented here.</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="sales">
			<Card>
				<CardHeader>
					<CardTitle class="text-lg sm:text-xl">Sales & Revenue</CardTitle>
					<CardDescription>Track your sales and manage payments</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6 sm:space-y-8">
						<div class="overflow-x-auto">
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Recent Sales</h3>
							<div class="w-full overflow-x-auto">
								<table class="w-full min-w-[300px]">
									<thead>
										<tr>
											<th class="text-left text-xs sm:text-sm">Date</th>
											<th class="text-left text-xs sm:text-sm">Asset</th>
											<th class="text-right text-xs sm:text-sm">Amount</th>
											<th class="text-right text-xs sm:text-sm">Status</th>
										</tr>
									</thead>
									<tbody>
										{#each salesHistory as sale}
											<tr>
												<td class="text-xs sm:text-sm">{sale.date}</td>
												<td class="text-xs sm:text-sm">{sale.asset}</td>
												<td class="text-right text-xs sm:text-sm">{formatCurrency(sale.amount)}</td>
												<td class="text-right">
													<Badge
														variant={sale.status === 'completed' ? 'default' : 'secondary'}
														class="text-xs"
													>
														{sale.status}
													</Badge>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Revenue Summary</h3>
							<p class="text-xs sm:text-sm">
								Revenue summary visualization to be implemented here.
							</p>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Payout History</h3>
							<p class="text-xs sm:text-sm">Payout history to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Payment Settings</h3>
							<Button variant="outline" class="w-full text-xs sm:w-auto sm:text-sm">
								<Settings class="mr-2 h-4 w-4" />
								Manage Payout Methods
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="community">
			<Card>
				<CardHeader>
					<CardTitle class="text-lg sm:text-xl">Community Interaction</CardTitle>
					<CardDescription>Stay connected with your asset users</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6 sm:space-y-8">
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Recent Activity</h3>
							<ScrollArea class="h-[300px]">
								{#each communityActivity as activity}
									<div
										class="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center"
									>
										<div class="mb-2 flex items-center space-x-3 sm:mb-0 sm:space-x-4">
											<Avatar>
												<AvatarFallback>{activity.user[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p class="text-sm font-semibold">{activity.user}</p>
												<p class="text-xs text-gray-500 sm:text-sm">
													{activity.action}
													{activity.asset}
												</p>
											</div>
										</div>
										<p class="text-xs text-gray-500 sm:text-sm">{activity.date}</p>
									</div>
								{/each}
							</ScrollArea>
						</div>
						<div>
							<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">User Communication</h3>
							<p class="mb-2 text-xs sm:text-sm">
								Connect with users who have purchased your assets:
							</p>
							<Button variant="outline" class="w-full text-xs sm:w-auto sm:text-sm"
								>Open Discord Channel</Button
							>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>

	<div class="mt-6 sm:mt-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-lg sm:text-xl">License Management</CardTitle>
				<CardDescription>Manage licenses for your assets</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each userAssets as asset}
						<div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
							<div class="mb-2 sm:mb-0">
								<h3 class="text-sm font-semibold sm:text-base">{asset.name}</h3>
								<p class="text-xs text-gray-500 sm:text-sm">Current License: {asset.license}</p>
							</div>
							<Button
								variant="outline"
								on:click={() => handleLicenseUpdate(asset.id, 'new-license')}
								class="w-full text-xs sm:w-auto sm:text-sm"
							>
								Update License
							</Button>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>

	<div class="mt-6 sm:mt-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-lg sm:text-xl">Collaborator Access</CardTitle>
				<CardDescription>Manage collaborators for your assets</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each userAssets as asset}
						<div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
							<div class="mb-2 sm:mb-0">
								<h3 class="text-sm font-semibold sm:text-base">{asset.name}</h3>
								<p class="text-xs text-gray-500 sm:text-sm">
									Collaborators: {asset.collaborators ? asset.collaborators.length : 0}
								</p>
							</div>
							<Button
								variant="outline"
								on:click={() => handleAddCollaborator(asset.id)}
								class="w-full text-xs sm:w-auto sm:text-sm"
							>
								Add Collaborator
							</Button>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>
</div>
