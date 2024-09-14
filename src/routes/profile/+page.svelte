<script lang="ts">
	import { initialUsers } from '$lib/data/initialUsers';
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold">User Profiles</h1>

	<ul class="mt-4">
		{#each initialUsers as user}
			<li class="mb-2">
				<a href="/profile/{user.id}" class="text-blue-500 hover:underline">{user.username}</a>
			</li>
		{/each}
	</ul>
</div>
