<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';

	const communityActivity = [
		{ user: 'User1', action: 'Downloaded', asset: 'Asset 1', date: '2023-06-01' },
		{ user: 'User2', action: 'Reviewed', asset: 'Asset 2', date: '2023-06-02' },
		{ user: 'User3', action: 'Purchased', asset: 'Asset 3', date: '2023-06-03' }
	];
</script>

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
						<div class="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
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
				<p class="mb-2 text-xs sm:text-sm">Connect with users who have purchased your assets:</p>
				<Button variant="outline" class="w-full text-xs sm:w-auto sm:text-sm"
					>Open Discord Channel</Button
				>
			</div>
		</div>
	</CardContent>
</Card>
