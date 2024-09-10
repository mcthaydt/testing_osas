<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { ArrowUp } from 'lucide-svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { SelectValue } from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	// Sample data
	let items = [
		{ id: 1, title: 'Feature 1', upvotes: 10, date: new Date('2023-05-01') },
		{ id: 2, title: 'Feature 2', upvotes: 5, date: new Date('2023-05-15') },
		{ id: 3, title: 'Feature 3', upvotes: 15, date: new Date('2023-04-20') },
		{ id: 4, title: 'Feature 4', upvotes: 8, date: new Date('2023-05-10') }
	];
	let sortBy: SelectValue<string> = { value: 'dateDesc' };
	let showModal = false;
	let newFeatureTitle = '';

	function upvote(id: number) {
		items = items.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item));
	}

	function createNewFeature() {
		if (newFeatureTitle.trim()) {
			const newFeature = {
				id: items.length + 1,
				title: newFeatureTitle,
				upvotes: 0,
				date: new Date()
			};
			items = [...items, newFeature];
			newFeatureTitle = '';
			showModal = false;
		}
	}

	$: sortedItems = [...items].sort((a, b) => {
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
					<Card>
						<CardContent class="flex items-center p-4">
							<div class="mr-4 flex flex-col items-center">
								<Button variant="outline" size="icon" on:click={() => upvote(item.id)}>
									<ArrowUp class="h-4 w-4" />
								</Button>
								<span class="mt-1 text-sm font-medium">{item.upvotes}</span>
							</div>
							<div>
								<h2 class="text-lg font-semibold">{item.title}</h2>
								<p class="text-sm text-muted-foreground">{item.date.toLocaleDateString()}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			{/each}
		</ul>
	</ScrollArea>
</div>

<Dialog.Root bind:open={showModal}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New Feature</Dialog.Title>
			<Dialog.Description>
				Enter a title for the new feature. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<Input id="title" class="col-span-3" bind:value={newFeatureTitle} />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={createNewFeature}>Save Feature</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
