<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Lock } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let title: string;
	export let description: string;
	export let icon: ComponentType;
	export let link: string;
	export let locked: boolean;
</script>

<Card class="flex flex-col">
	<CardHeader>
		<CardTitle class="flex items-center text-xl">
			<svelte:component this={icon} class="mr-2 h-6 w-6" />
			{title}
		</CardTitle>
	</CardHeader>
	<CardContent class="flex flex-grow flex-col">
		<p class="mb-4 flex-grow">{description}</p>
		<Button
			href={locked ? undefined : link}
			target={locked ? undefined : '_blank'}
			rel={locked ? undefined : 'noopener noreferrer'}
			variant="outline"
			class="w-full"
			disabled={locked}
		>
			{#if locked}
				<Lock class="mr-2 h-4 w-4" />
				Locked
			{:else}
				Contact via {title}
			{/if}
		</Button>
	</CardContent>
</Card>
