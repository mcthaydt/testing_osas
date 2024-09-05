<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem
	} from '$lib/components/ui/select';
	import { ArrowUp } from 'lucide-svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	// Sample data
	let items = [
		{ id: 1, title: 'Feature 1', upvotes: 10, date: new Date('2023-05-01') },
		{ id: 2, title: 'Feature 2', upvotes: 5, date: new Date('2023-05-15') },
		{ id: 3, title: 'Feature 3', upvotes: 15, date: new Date('2023-04-20') },
		{ id: 4, title: 'Feature 4', upvotes: 8, date: new Date('2023-05-10') }
	];

	let sortBy = 'dateDesc';

	function upvote(id: number) {
		items = items.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item));
	}

	$: sortedItems = [...items].sort((a, b) => {
		switch (sortBy) {
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
		<Select bind:value={sortBy}>
			<SelectTrigger class="w-[180px]">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="dateDesc">Newest First</SelectItem>
				<SelectItem value="dateAsc">Oldest First</SelectItem>
				<SelectItem value="upvotes">Most Upvotes</SelectItem>
			</SelectContent>
		</Select>
	</div>

	<ScrollArea class="h-[600px] w-full rounded-md border p-4">
		<Card class="mb-4">
			<CardContent class="flex justify-center p-4">
				<Button variant="outline">Create New Feature</Button>
			</CardContent>
		</Card>
		<ul class="space-y-4">
			{#each sortedItems as item (item.id)}
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
			{/each}
		</ul>
	</ScrollArea>
</div>
