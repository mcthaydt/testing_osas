<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { SelectValue } from '$lib/components/ui/select';

	export let selected: SelectValue<string>;
	export let versions: string[] = [];
</script>

<Select.Root bind:selected>
	<Select.Trigger class="w-full sm:w-[180px]">
		<Select.Value placeholder="Engine version" />
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="All">All</Select.Item>
		{#each versions as version}
			<Select.Item value={version}>{version}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
