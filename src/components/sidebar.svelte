<script lang="ts">
	import { fly } from 'svelte/transition';
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

	let isExpanded = false;

	const mainMenuItems = [
		{ icon: Home, text: 'Godot', link: '/godot' },
		{ icon: BarChart2, text: 'Bevy', link: '/bevy' },
		{ icon: Users, text: 'Other Engines', link: '/other-engines' },
		{ icon: Bolt, text: 'General', link: '/general' },
		{ icon: FileText, text: 'Voting', link: '/voting' },
		{ icon: Bell, text: 'Notifications', link: '/notifications' }
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
</script>

<aside
	class="fixed left-0 top-16 z-10 h-[calc(100vh-4rem)] overflow-hidden rounded-md bg-background shadow-lg transition-all duration-300 ease-in-out"
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
					class="flex cursor-pointer items-center px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
				>
					<div
						class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary"
					>
						<svelte:component this={item.icon} size={18} class="text-primary" />
					</div>
					<div class="w-full overflow-hidden">
						{#if isExpanded}
							<span
								class="ml-4 whitespace-nowrap font-medium"
								in:fly={{ x: -20, duration: 200, delay: 100 }}
								out:fly={{ x: -20, duration: 200 }}
							>
								{item.text}
							</span>
						{/if}
					</div>
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
					class="flex cursor-pointer items-center px-4 py-3 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
				>
					<div
						class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-secondary"
					>
						<svelte:component this={item.icon} size={18} class="text-primary" />
					</div>
					<div class="w-full overflow-hidden">
						{#if isExpanded}
							<span
								class="ml-4 whitespace-nowrap font-medium"
								in:fly={{ x: -20, duration: 200, delay: 100 }}
								out:fly={{ x: -20, duration: 200 }}
							>
								{item.text}
							</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</nav>
</aside>
