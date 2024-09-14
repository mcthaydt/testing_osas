<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let allTags: string[] = [];
	export let selectedTags: string[] = [];

	let showTagFilter = false;

	function toggleTag(tag: string) {
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
	}
</script>

<div>
	<Button
		variant="outline"
		class="flex items-center justify-between"
		on:click={() => (showTagFilter = !showTagFilter)}
	>
		Filter by Tags
		{#if showTagFilter}
			<ChevronUp class="ml-2 h-4 w-4" />
		{:else}
			<ChevronDown class="ml-2 h-4 w-4" />
		{/if}
	</Button>

	{#if showTagFilter}
		<div class="mt-2 flex flex-wrap gap-2" transition:fade>
			{#each allTags as tag}
				<div class="flex items-center space-x-2">
					<Checkbox
						id={tag}
						checked={selectedTags.includes(tag)}
						onCheckedChange={() => toggleTag(tag)}
					/>
					<label
						for={tag}
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{tag}
					</label>
				</div>
			{/each}
		</div>
	{/if}
</div>
