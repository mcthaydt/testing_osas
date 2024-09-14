<script lang="ts">
	import { Separator } from '$lib/components/ui/select';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import type { Notification } from '$lib/stores/notificationStore';
	import NotificationItem from './NotificationItem.svelte';

	export let notifications: Notification[];
	export let onMarkAsRead: (id: number) => void;
	export let onDelete: (id: number, event: Event) => void;
</script>

<ScrollArea class="h-[400px] w-full rounded-md border p-2 sm:h-[600px] sm:p-4">
	<ul class="space-y-4">
		{#each notifications as notification (notification.id)}
			<li>
				<NotificationItem {notification} {onMarkAsRead} {onDelete} />
				{#if notification !== notifications[notifications.length - 1]}
					<Separator class="my-2 sm:my-4" />
				{/if}
			</li>
		{/each}
	</ul>
</ScrollArea>
