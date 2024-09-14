<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { SelectValue } from '$lib/components/ui/select';

	export let selected: SelectValue<string>;

	const sortOptions = [
		{ value: 'name', label: 'Name' },
		{ value: 'priceHighToLow', label: 'Price: High to Low' },
		{ value: 'priceLowToHigh', label: 'Price: Low to High' },
		{ value: 'rating', label: 'Rating' },
		{ value: 'releaseDate', label: 'Release Date' },
		{ value: 'upvotes', label: 'Upvotes' }
	];
</script>

<Select.Root bind:selected>
	<Select.Trigger class="w-full sm:w-[180px]">
		<Select.Value placeholder="Sort by" />
	</Select.Trigger>
	<Select.Content>
		{#each sortOptions as option}
			<Select.Item value={option.value}>{option.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
