<script lang="ts">
	import { onMount } from 'svelte';
	import { productStore } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes';
	import type { UserWithStats } from '$lib/types/userTypes';
	import ProfileHeader from './ProfileHeader.svelte';
	import ProfileStats from './ProfileStats.svelte';
	import ProfileTabs from './ProfileTabs.svelte';
	import FollowersFollowing from './FollowersFollowing.svelte';
	import { setUser } from '$lib/stores/userStore';

	export let user: UserWithStats;
	let userAssets: Product[] = [];
	let isCurrentUser = false; // You might want to implement a way to determine this
	let isFollowing = false; // You might want to implement a way to determine this
	let viewMode: 'seller' | 'buyer' = 'seller';
	let purchasedAssets: Product[] = [];

	onMount(() => {
		setUser('user-123');
		productStore.subscribe((products) => {
			userAssets = products.filter((product) => product.assetDeveloper === user.username);
			purchasedAssets = products.slice(0, 5); // Limit to 5 for demo
		});
	});

	function toggleViewMode() {
		viewMode = viewMode === 'seller' ? 'buyer' : 'seller';
	}

	function handleFollow() {
		// Implement follow logic
		isFollowing = !isFollowing;
	}

	function handleTip(assetId: string) {
		console.log(`Tipping for asset: ${assetId}`);
		// Implement tipping logic
	}
</script>

<div class="container mx-auto px-4 py-8">
	<ProfileHeader {user} {isCurrentUser} {isFollowing} {viewMode} {toggleViewMode} {handleFollow} />
	<ProfileStats stats={user} {viewMode} />
	<ProfileTabs {viewMode} {user} {userAssets} {purchasedAssets} {handleTip} />
	<FollowersFollowing {user} />
</div>
