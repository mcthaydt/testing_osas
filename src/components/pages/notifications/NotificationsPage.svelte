<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { notificationStore, type Notification } from '$lib/stores/notificationStore';
	import { initialNotifications } from '../../../lib/utils/notificationUtils';
	import NotificationList from './NotificationList.svelte';

	let notifications: Notification[] = [];

	notificationStore.subscribe((value) => {
		notifications = value;
	});

	onMount(() => {
		localStorage.clear();
		const storedNotifications = localStorage.getItem('notifications');
		let initialNotificationsData = storedNotifications
			? JSON.parse(storedNotifications)
			: initialNotifications.map((n, index) => ({ ...n, id: index + 1 }));

		initialNotificationsData = initialNotificationsData
			.sort(
				(a: Notification, b: Notification) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			)
			.slice(0, 20);

		notificationStore.set(initialNotificationsData);
		notificationStore.saveToLocalStorage();
		notificationStore.init();
	});

	function markAsRead(id: number) {
		notificationStore.markAsRead(id);
		notificationStore.saveToLocalStorage();
	}

	function markAllAsRead() {
		notificationStore.markAllAsRead();
		notificationStore.saveToLocalStorage();
	}

	function deleteNotification(id: number, event: Event) {
		event.stopPropagation();
		notificationStore.deleteNotification(id);
		notificationStore.saveToLocalStorage();
	}

	function onDestroy() {
		notificationStore.saveToLocalStorage();
	}
</script>

<svelte:window on:beforeunload={onDestroy} />

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
				<Button variant="outline" class="mt-2 w-full sm:mt-0 sm:w-auto" on:click={markAllAsRead}>
					Mark all as read
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<NotificationList {notifications} onMarkAsRead={markAsRead} onDelete={deleteNotification} />
		</CardContent>
	</Card>
</div>
