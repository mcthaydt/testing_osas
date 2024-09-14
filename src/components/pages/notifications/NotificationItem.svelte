<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';
	import { iconMap, type Notification } from '$lib/stores/notificationStore';
	import { getNotificationColor, formatDate } from '../../../lib/utils/notificationUtils';

	export let notification: Notification;
	export let onMarkAsRead: (id: number) => void;
	export let onDelete: (id: number, event: Event) => void;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onMarkAsRead(notification.id);
		}
	}
</script>

<div
	class="flex items-start space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-accent sm:space-x-4 sm:p-4"
	on:click={() => onMarkAsRead(notification.id)}
	on:keydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	<div class="flex-shrink-0">
		<div class="rounded-xl bg-secondary-foreground p-1 sm:p-2">
			<svelte:component
				this={iconMap[notification.type]}
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
				<Button
					variant="ghost"
					size="icon"
					class="h-6 w-6 sm:h-8 sm:w-8"
					on:click={(event) => onDelete(notification.id, event)}
				>
					<Trash2 class="h-3 w-3 text-red-500 sm:h-4 sm:w-4" />
				</Button>
			</div>
		</div>
		<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
			{notification.description}
		</p>
		<p class="mt-1 text-xs text-muted-foreground">{formatDate(notification.date)}</p>
	</div>
</div>
