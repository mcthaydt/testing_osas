<script lang="ts">
	import { goto } from '$app/navigation';
	import { initialUsers } from '$lib/data/initialUsers';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let searchTerm = '';
	let searchResults: Array<{ id: string; username: string }> = [];

	function handleSearch() {
		searchResults = initialUsers
			.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
			.map((user) => ({ id: user.id, username: user.username }));
	}

	function handleSelectUser(id: string) {
		goto(`/profile/${id}`);
		searchTerm = '';
		searchResults = [];
	}
</script>

<div class="mb-4">
	<form on:submit|preventDefault={handleSearch} class="flex gap-2">
		<Input type="text" placeholder="Search by username" bind:value={searchTerm} class="flex-grow" />
		<Button type="submit">Search</Button>
	</form>
	{#if searchResults.length > 0}
		<div class="mt-2 rounded bg-white shadow">
			{#each searchResults as result}
				<button
					class="block w-full px-4 py-2 text-left hover:bg-gray-100"
					on:click={() => handleSelectUser(result.id)}
				>
					{result.username}
				</button>
			{/each}
		</div>
	{/if}
</div>
