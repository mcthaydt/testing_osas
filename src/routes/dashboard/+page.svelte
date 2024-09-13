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

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">Seller Dashboard</h1>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Downloads</CardTitle>
				<Download class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
				<DollarSign class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Active Assets</CardTitle>
				<Package class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{activeAssets}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Notifications</CardTitle>
				<Bell class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{notifications.length}</div>
			</CardContent>
		</Card>
	</div>

	<div class="mt-8">
		<Card>
			<CardHeader>
				<CardTitle>Sales & Revenue Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<canvas bind:this={chartCanvas}></canvas>
			</CardContent>
		</Card>
	</div>

	<Tabs defaultValue="assets" class="mt-8">
		<TabsList>
			<TabsTrigger value="assets">Asset Management</TabsTrigger>
			<TabsTrigger value="analytics">Analytics</TabsTrigger>
			<TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
			<TabsTrigger value="community">Community</TabsTrigger>
		</TabsList>

		<TabsContent value="assets">
			<Card>
				<CardHeader>
					<CardTitle>Asset Management</CardTitle>
					<CardDescription>Manage your published assets</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="mb-4">
						<Button on:click={() => goto('upload/')}>Upload New Asset</Button>
					</div>
					<div class="space-y-4">
						{#each userAssets as asset}
							<div class="flex items-center justify-between rounded-lg border p-4">
								<div class="flex items-center space-x-4">
									<img
										src={asset.imageUrl}
										alt={asset.name}
										class="h-16 w-16 rounded object-cover"
									/>
									<div>
										<h3 class="text-lg font-semibold">{asset.name}</h3>
										<p class="text-sm text-gray-500">{asset.description}</p>
									</div>
								</div>
								<div class="flex items-center space-x-2">
									<Badge variant={asset.status === 'approved' ? 'default' : 'secondary'}>
										{asset.status}
									</Badge>
									<Button variant="outline" size="sm">Edit</Button>
									<Button variant="outline" size="sm">Manage Versions</Button>
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
					<CardTitle>Asset Analytics</CardTitle>
					<CardDescription>Detailed statistics about your assets' performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-8">
						<div>
							<h3 class="mb-4 text-xl font-semibold">Geographic Distribution</h3>
							<table class="w-full">
								<thead>
									<tr>
										<th class="text-left">Country</th>
										<th class="text-right">Downloads</th>
										<th class="text-right">Revenue</th>
									</tr>
								</thead>
								<tbody>
									{#each geographicData as data}
										<tr>
											<td>{data.country}</td>
											<td class="text-right">{data.downloads}</td>
											<td class="text-right">{formatCurrency(data.revenue)}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">User Engagement</h3>
							<!-- Add user engagement charts or metrics here -->
							<p>User engagement metrics and visualizations to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">Download Trends</h3>
							<!-- Add download trends chart here -->
							<p>Download trends chart to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">Asset Performance Comparison</h3>
							<!-- Add asset performance comparison chart or table here -->
							<p>Asset performance comparison to be implemented here.</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="sales">
			<Card>
				<CardHeader>
					<CardTitle>Sales & Revenue</CardTitle>
					<CardDescription>Track your sales and manage payments</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-8">
						<div>
							<h3 class="mb-4 text-xl font-semibold">Recent Sales</h3>
							<table class="w-full">
								<thead>
									<tr>
										<th class="text-left">Date</th>
										<th class="text-left">Asset</th>
										<th class="text-right">Amount</th>
										<th class="text-right">Status</th>
									</tr>
								</thead>
								<tbody>
									{#each salesHistory as sale}
										<tr>
											<td>{sale.date}</td>
											<td>{sale.asset}</td>
											<td class="text-right">{formatCurrency(sale.amount)}</td>
											<td class="text-right">
												<Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
													{sale.status}
												</Badge>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">Revenue Summary</h3>
							<!-- Add revenue summary chart or breakdown here -->
							<p>Revenue summary visualization to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">Payout History</h3>
							<!-- Add payout history table or chart here -->
							<p>Payout history to be implemented here.</p>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">Payment Settings</h3>
							<Button variant="outline">
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
					<CardTitle>Community Interaction</CardTitle>
					<CardDescription>Stay connected with your asset users</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-8">
						<div>
							<h3 class="mb-4 text-xl font-semibold">Recent Activity</h3>
							<ScrollArea class="h-[300px]">
								{#each communityActivity as activity}
									<div class="mb-4 flex items-center justify-between">
										<div class="flex items-center space-x-4">
											<Avatar>
												<AvatarFallback>{activity.user[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p class="font-semibold">{activity.user}</p>
												<p class="text-sm text-gray-500">{activity.action} {activity.asset}</p>
											</div>
										</div>
										<p class="text-sm text-gray-500">{activity.date}</p>
									</div>
								{/each}
							</ScrollArea>
						</div>
						<div>
							<h3 class="mb-4 text-xl font-semibold">User Communication</h3>
							<p class="mb-2">Connect with users who have purchased your assets:</p>
							<Button variant="outline">Open Discord Channel</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<!-- Add these sections outside the Tabs component -->

		<div class="mt-8">
			<Card>
				<CardHeader>
					<CardTitle>License Management</CardTitle>
					<CardDescription>Manage licenses for your assets</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each userAssets as asset}
							<div class="flex items-center justify-between">
								<div>
									<h3 class="font-semibold">{asset.name}</h3>
									<p class="text-sm text-gray-500">Current License: {asset.license}</p>
								</div>
								<Button
									variant="outline"
									on:click={() => handleLicenseUpdate(asset.id, 'new-license')}
								>
									Update License
								</Button>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>

		<div class="mt-8">
			<Card>
				<CardHeader>
					<CardTitle>Collaborator Access</CardTitle>
					<CardDescription>Manage collaborators for your assets</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each userAssets as asset}
							<div class="flex items-center justify-between">
								<div>
									<h3 class="font-semibold">{asset.name}</h3>
									<p class="text-sm text-gray-500">
										Collaborators: {asset.collaborators ? asset.collaborators.length : 0}
									</p>
								</div>
								<Button variant="outline" on:click={() => handleAddCollaborator(asset.id)}>
									Add Collaborator
								</Button>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>
	</Tabs>
</div>
