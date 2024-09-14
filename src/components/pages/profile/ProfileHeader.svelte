<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Github, Twitter, Globe, MapPin } from 'lucide-svelte';

	export let user;
	export let isCurrentUser;
	export let isFollowing;
	export let viewMode;
	export let toggleViewMode;
	export let handleFollow;
</script>

<div class="relative">
	<div class="h-32 w-full rounded-t-lg bg-gradient-to-r from-blue-500 to-purple-600 sm:h-48"></div>
	<div class="absolute bottom-0 left-4 translate-y-1/2 transform sm:left-8">
		<Avatar class="h-24 w-24 border-4 border-white sm:h-32 sm:w-32">
			<AvatarImage src={user.avatar} alt={user.username} />
			<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
		</Avatar>
	</div>
</div>

<div class="mt-16 pb-4 sm:mt-20">
	<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">{user.username}</h1>
			<p class="mt-1 text-base text-gray-500 sm:text-lg">{user.bio}</p>
		</div>
		<div
			class="mt-4 flex flex-col items-start space-y-2 sm:mt-0 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
		>
			<Button variant="outline" class="w-full sm:w-auto" on:click={toggleViewMode}>
				{viewMode === 'seller' ? 'Switch to Buyer View' : 'Switch to Seller View'}
			</Button>
			{#if !isCurrentUser}
				<Button
					variant={isFollowing ? 'outline' : 'default'}
					class="w-full sm:w-auto"
					on:click={handleFollow}
				>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</Button>
			{/if}
		</div>
	</div>

	<div class="mt-4 flex flex-wrap gap-4">
		{#if user.website}
			<div class="flex items-center text-gray-600">
				<Globe class="mr-2 h-5 w-5" />
				<a
					href={user.website}
					target="_blank"
					rel="noopener noreferrer"
					class="max-w-[200px] truncate hover:underline"
				>
					{user.website}
				</a>
			</div>
		{/if}
		{#if user.socialLinks.github}
			<div class="flex items-center text-gray-600">
				<Github class="mr-2 h-5 w-5" />
				<a
					href={`https://github.com/${user.socialLinks.github}`}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:underline"
				>
					{user.socialLinks.github}
				</a>
			</div>
		{/if}
		{#if user.socialLinks.twitter}
			<div class="flex items-center text-gray-600">
				<Twitter class="mr-2 h-5 w-5" />
				<a
					href={`https://twitter.com/${user.socialLinks.twitter}`}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:underline"
				>
					{user.socialLinks.twitter}
				</a>
			</div>
		{/if}
		{#if user.location}
			<div class="flex items-center text-gray-600">
				<MapPin class="mr-2 h-5 w-5" />
				<span>{user.location}</span>
			</div>
		{/if}
	</div>
</div>
