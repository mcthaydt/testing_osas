<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';

	const geographicData = [
		{ country: 'USA', downloads: 5000, revenue: 25000 },
		{ country: 'UK', downloads: 3000, revenue: 15000 },
		{ country: 'Germany', downloads: 2000, revenue: 10000 }
	];

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-lg sm:text-xl">Asset Analytics</CardTitle>
		<CardDescription>Detailed statistics about your assets' performance</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="space-y-6 sm:space-y-8">
			<div class="max-w-full overflow-x-auto">
				<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Geographic Distribution</h3>
				<div class="w-full">
					<table class="w-full min-w-[200px] max-w-full">
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
									<td class="text-right text-xs sm:text-sm">{formatCurrency(data.revenue)}</td>
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
