<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import {
		Home,
		Users,
		HelpCircle,
		BarChart2,
		Bolt,
		FileText,
		Bell,
		DollarSign
	} from 'lucide-svelte';
	import { notificationStore, type Notification } from './../lib/stores/notificationStore';

	let isExpanded = false;
	$: notificationCount = $notificationStore.filter((n) => !n.read).length;

	const mainMenuItems = [
		{ icon: Home, text: 'Godot', link: '/godot' },
		{ icon: BarChart2, text: 'Bevy', link: '/bevy' },
		{ icon: Users, text: 'Other Engines', link: '/other-engines' },
		{ icon: Bolt, text: 'General', link: '/general' },
		{ icon: FileText, text: 'Voting', link: '/voting' },
		{ icon: Bell, text: 'Notifications', link: '/notifications', hasNotification: true }
	];
	const bottomMenuItems = [
		{ icon: HelpCircle, text: 'Support', link: '/support' },
		{ icon: DollarSign, text: 'Donate', link: '/donate' }
	];

	function handleMouseEnter() {
		isExpanded = true;
	}
	function handleMouseLeave() {
		isExpanded = false;
	}
	function handleClick() {
		isExpanded = false;
	}

	// Function to update notification count
	function updateNotificationCount() {
		const storedNotifications = localStorage.getItem('notifications');
		if (storedNotifications) {
			const notifications = JSON.parse(storedNotifications);
			notificationCount = notifications.filter((n) => !n.read).length;
		}
	}

	onMount(() => {
		notificationStore.init();

		const unsubscribe = notificationStore.subscribe(() => {
			notificationStore.saveToLocalStorage();
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<aside
	class="fixed left-0 top-16 z-10 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden rounded-md bg-background shadow-lg transition-all duration-300 ease-in-out"
	class:w-16={!isExpanded}
	class:w-64={isExpanded}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<nav class="flex h-full flex-col py-6">
		<div class="flex-grow">
			{#each mainMenuItems as item, i}
				<a
					href={item.link}
					class="relative flex cursor-pointer items-center px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
					on:click={handleClick}
				>
					<div
						class="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary"
					>
						<svelte:component this={item.icon} size={18} class="text-primary" />
						{#if item.hasNotification && notificationCount > 0}
							<span
								class="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
								style="font-size: 0.65rem"
								in:fly={{ x: -20, duration: 200, delay: 100 }}
								out:fly={{ x: -20, duration: 200 }}
							>
								{notificationCount}
							</span>
						{/if}
					</div>
					{#if isExpanded}
						<span
							class="ml-4 whitespace-nowrap font-medium"
							in:fly={{ x: -20, duration: 200, delay: 100 }}
							out:fly={{ x: -20, duration: 200 }}
						>
							{item.text}
						</span>
					{/if}
				</a>
				{#if i === 3}
					<div class="my-4"></div>
				{/if}
			{/each}
		</div>
		<div class="mt-auto">
			{#each bottomMenuItems as item}
				<a
					href={item.link}
					class="relative flex cursor-pointer items-center px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
					on:click={handleClick}
				>
					<div
						class="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary"
					>
						<svelte:component this={item.icon} size={18} class="text-primary" />
					</div>
					{#if isExpanded}
						<span
							class="ml-4 whitespace-nowrap font-medium"
							in:fly={{ x: -20, duration: 200, delay: 100 }}
							out:fly={{ x: -20, duration: 200 }}
						>
							{item.text}
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</nav>
</aside>
