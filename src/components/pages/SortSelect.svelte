<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { SelectValue } from '$lib/components/ui/select';

	export let sortBy: SelectValue<string>;
</script>

<Select.Root bind:selected={sortBy}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Sort by" />
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="dateDesc">Newest First</Select.Item>
		<Select.Item value="dateAsc">Oldest First</Select.Item>
		<Select.Item value="upvotes">Most Upvotes</Select.Item>
		<Select.Item value="timeLeft">Least Time Left</Select.Item>
	</Select.Content>
</Select.Root>
