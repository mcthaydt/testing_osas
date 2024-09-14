<script lang="ts">
	import type { PageData } from './$types';
	import ProfilePage from '../../../components/pages/profile/ProfilePage.svelte';
	import { initialUsers } from '$lib/data/initialUsers';

	export let data: PageData;

	$: user = initialUsers.find((u) => u.id === data.id);
</script>

{#if user}
	<ProfilePage {user} />
{:else}
	<div class="container mx-auto px-4 py-8">
		<p>
			User not found. <a href="/profile" class="text-blue-500 hover:underline">View all users</a>
		</p>
	</div>
{/if}
