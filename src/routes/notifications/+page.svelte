<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Bell, Download, Star, ShoppingCart, MessageSquare, MoreVertical } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/select';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	const notifications = [
		{
			id: 1,
			type: 'update',
			title: 'Asset Update Available',
			description: 'A new version of "Fantasy Character Pack" is available.',
			date: '2023-06-15T10:30:00',
			read: false,
			icon: Download
		},
		{
			id: 2,
			type: 'review',
			title: 'New Review',
			description: 'Your asset "Sci-Fi Weapons Pack" received a 5-star review!',
			date: '2023-06-14T15:45:00',
			read: true,
			icon: Star
		},
		{
			id: 3,
			type: 'sale',
			title: 'New Sale',
			description: 'Your asset "Medieval Village Props" was purchased.',
			date: '2023-06-13T09:20:00',
			read: false,
			icon: ShoppingCart
		},
		{
			id: 4,
			type: 'comment',
			title: 'New Comment',
			description: 'Someone commented on your "2D Platformer Tileset" asset.',
			date: '2023-06-12T14:10:00',
			read: true,
			icon: MessageSquare
		},
		{
			id: 5,
			type: 'system',
			title: 'System Maintenance',
			description: 'The store will be undergoing maintenance in 24 hours.',
			date: '2023-06-11T11:00:00',
			read: false,
			icon: Bell
		}
	];

	function formatDate(dateString: Date) {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getNotificationColor(type: string) {
		const colors = {
			update: 'text-blue-500',
			review: 'text-yellow-500',
			sale: 'text-green-500',
			comment: 'text-purple-500',
			system: 'text-red-500'
		};
		return colors[type] || 'text-gray-500';
	}
</script>

<div class="container mx-auto px-2 sm:px-4">
	<Card class="shadow-lg">
		<CardHeader>
			<div class="flex flex-col items-start justify-between sm:flex-row sm:items-center">
				<div>
					<CardTitle class="text-2xl font-bold sm:text-3xl">Notifications</CardTitle>
					<CardDescription class="mt-1 text-sm text-muted-foreground sm:text-base">
						Stay updated with your asset store activity
					</CardDescription>
				</div>
				<Button variant="outline" class="mt-2 w-full sm:mt-0 sm:w-auto">Mark all as read</Button>
			</div>
		</CardHeader>
		<CardContent>
			<ScrollArea class="h-[400px] w-full rounded-md border p-2 sm:h-[600px] sm:p-4">
				<ul class="space-y-4">
					{#each notifications as notification}
						<li>
							<div
								class="flex items-start space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-accent sm:space-x-4 sm:p-4"
							>
								<div class="flex-shrink-0">
									<div class="rounded-full bg-secondary p-1 sm:p-2">
										<svelte:component
											this={notification.icon}
											class="h-4 w-4 sm:h-5 sm:w-5 {getNotificationColor(notification.type)}"
										/>
									</div>
								</div>
								<div class="flex-grow">
									<div class="flex flex-col justify-between sm:flex-row sm:items-center">
										<h3 class="text-base font-semibold sm:text-lg">{notification.title}</h3>
										<div class="mt-1 flex items-center space-x-2 sm:mt-0">
											<Badge variant={notification.read ? 'secondary' : 'default'} class="text-xs">
												{notification.read ? 'Read' : 'New'}
											</Badge>
											<Button variant="ghost" size="icon" class="h-6 w-6 sm:h-8 sm:w-8">
												<MoreVertical class="h-3 w-3 sm:h-4 sm:w-4" />
											</Button>
										</div>
									</div>
									<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
										{notification.description}
									</p>
									<p class="mt-1 text-xs text-muted-foreground">{formatDate(notification.date)}</p>
								</div>
							</div>
							{#if notification !== notifications[notifications.length - 1]}
								<Separator class="my-2 sm:my-4" />
							{/if}
						</li>
					{/each}
				</ul>
			</ScrollArea>
		</CardContent>
	</Card>
</div>
