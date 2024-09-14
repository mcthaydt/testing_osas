<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Settings } from 'lucide-svelte';

	$: salesHistory = $userStore?.salesHistory || [];

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-lg sm:text-xl">Sales & Revenue</CardTitle>
		<CardDescription>Track your sales and manage payments</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="space-y-6 sm:space-y-8">
			<div class="max-w-full overflow-x-auto">
				<h3 class="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Recent Sales</h3>
				<div class="w-full">
					<table class="w-full min-w-[200px] max-w-full">
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
											class="text-xs sm:text-sm"
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
				<p class="text-xs sm:text-sm">Revenue summary visualization to be implemented here.</p>
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
