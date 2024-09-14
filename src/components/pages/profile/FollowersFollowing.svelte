<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';

	export let user: any;
</script>

<div class="mt-8">
	<h2 class="mb-4 text-xl font-bold sm:text-2xl">Followers and Following</h2>
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
		<Card>
			<CardHeader>
				<CardTitle>Followers ({user.followers.length})</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea class="h-[200px]">
					{#each user.followers as followerId}
						<div class="mb-4 flex items-center">
							<Avatar class="mr-3 h-10 w-10 flex-shrink-0">
								<AvatarFallback>{followerId[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div class="min-w-0 flex-grow">
								<p class="truncate font-semibold">{followerId}</p>
								<p class="text-sm text-gray-500">Follower</p>
							</div>
						</div>
					{/each}
				</ScrollArea>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Following ({user.following.length})</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea class="h-[200px]">
					{#each user.following as followingId}
						<div class="mb-4 flex items-center">
							<Avatar class="mr-3 h-10 w-10 flex-shrink-0">
								<AvatarFallback>{followingId[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div class="min-w-0 flex-grow">
								<p class="truncate font-semibold">{followingId}</p>
								<p class="text-sm text-gray-500">Following</p>
							</div>
						</div>
					{/each}
				</ScrollArea>
			</CardContent>
		</Card>
	</div>
</div>
