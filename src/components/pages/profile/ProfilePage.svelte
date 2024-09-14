<script lang="ts">
	import { onMount } from 'svelte';
	import { productStore } from '$lib/stores/productStore';
	import type { Product } from '$lib/types/productTypes';
	import ProfileHeader from './ProfileHeader.svelte';
	import ProfileStats from './ProfileStats.svelte';
	import ProfileTabs from './ProfileTabs.svelte';
	import FollowersFollowing from './FollowersFollowing.svelte';
	import { mockUser, mockUserStats } from '../../../lib/data/mockData';

	export let userId: string;

	let user = mockUser;
	let stats = mockUserStats;
	let userAssets: Product[] = [];
	let isCurrentUser = false;
	let isFollowing = false;
	let viewMode: 'seller' | 'buyer' = 'seller';
	let purchasedAssets: Product[] = [];

	onMount(() => {
		const unsubscribe = productStore.subscribe((products) => {
			userAssets = products.filter((product) => product.assetDeveloper === user.username);
			purchasedAssets = products.slice(0, 5); // Limit to 5 for demo
		});

		isCurrentUser = userId === user.id;
		isFollowing = user.followers.includes('current-user-id');

		return unsubscribe;
	});

	function toggleViewMode() {
		viewMode = viewMode === 'seller' ? 'buyer' : 'seller';
	}

	function handleFollow() {
		isFollowing = !isFollowing;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<ProfileHeader {user} {isCurrentUser} {isFollowing} {viewMode} {toggleViewMode} {handleFollow} />
	<ProfileStats {stats} {viewMode} />
	<ProfileTabs {viewMode} {user} {userAssets} {purchasedAssets} />
	<FollowersFollowing {user} />
</div>
