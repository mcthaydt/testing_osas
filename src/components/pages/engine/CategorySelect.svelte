<script lang="ts">
    import * as Select from '$lib/components/ui/select';
    import type { SelectValue } from '$lib/components/ui/select';

    export let selected: SelectValue<string>;
    export let categories: string[] = [];
</script>

<Select.Root bind:selected>
    <Select.Trigger class="w-full sm:w-[180px]">
        <Select.Value placeholder="Select category" />
    </Select.Trigger>
    <Select.Content>
        {#each categories as category}
            <Select.Item value={category}>{category}</Select.Item>
        {/each}
    </Select.Content>
</Select.Root>