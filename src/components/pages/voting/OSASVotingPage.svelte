<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { SelectValue } from '$lib/components/ui/select';
	import { featureStore } from '../../../lib/stores/featureStore';
	import FeatureItem from './FeatureItem.svelte';
	import NewFeatureDialog from './NewFeatureDialog.svelte';

	let sortBy: SelectValue<string> = { value: 'dateDesc' };
	let showModal = false;

	$: sortedItems = $featureStore.sort((a, b) => {
		switch (sortBy.value) {
			case 'dateDesc':
				return b.date.getTime() - a.date.getTime();
			case 'dateAsc':
				return a.date.getTime() - b.date.getTime();
			case 'upvotes':
				return b.upvotes - a.upvotes;
			default:
				return 0;
		}
	});
</script>

<div class="container mx-auto space-y-6 p-4">
	<h1 class="text-3xl font-bold tracking-tight">OSAS Feature Voting</h1>
	<div>
		<Select.Root bind:selected={sortBy}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Sort by" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="dateDesc">Newest First</Select.Item>
				<Select.Item value="dateAsc">Oldest First</Select.Item>
				<Select.Item value="upvotes">Most Upvotes</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<ScrollArea class="h-[600px] w-full rounded-md border p-4">
		<Card class="mb-4">
			<CardContent class="flex justify-center p-4">
				<Button variant="outline" on:click={() => (showModal = true)}>Request New Feature</Button>
			</CardContent>
		</Card>
		<ul class="space-y-4">
			{#each sortedItems as item (item.id)}
				<div animate:flip={{ duration: 300 }} transition:fade={{ duration: 300 }}>
					<FeatureItem feature={item} />
				</div>
			{/each}
		</ul>
	</ScrollArea>
</div>
<NewFeatureDialog bind:showModal />
