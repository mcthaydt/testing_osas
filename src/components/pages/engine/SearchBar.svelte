<script lang="ts">
    import { Input } from '$lib/components/ui/input';
    import { Search } from 'lucide-svelte';

    export let value = '';
</script>

<div class="relative w-full">
    <Search
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5"
    />
    <Input
        type="text"
        placeholder="Search products..."
        class="w-full pl-10"
        bind:value
    />
</div>