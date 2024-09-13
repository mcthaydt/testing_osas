<script lang="ts">
	import { onMount } from 'svelte';
	import { products, getProductsByTag, type Product } from './../../lib/stores/productStore';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Github,
		Twitter,
		Globe,
		MapPin,
		Star,
		Download,
		ShoppingCart,
		Tag,
		DollarSign
	} from 'lucide-svelte';

	// Mock user store (you should replace this with your actual user store)
	const mockUser = {
		id: 'user-123',
		username: 'JaneGameDev',
		avatar: 'https://i.pravatar.cc/150?u=janedev',
		bio: 'Passionate game developer and asset creator',
		website: 'https://janegamedev.com',
		socialLinks: {
			github: 'janegamedev',
			twitter: 'jane_gamedev'
		},
		location: 'San Francisco, CA',
		followers: ['user1', 'user2', 'user3'],
		following: ['user4', 'user5'],
		badges: ['Top Seller', 'Community Contributor', 'Power Buyer']
	};

	const mockUserStats = {
		assetsPublished: 5,
		assetsSold: 1000,
		totalRevenue: 50000,
		averageRating: 4.8,
		assetsPurchased: 25,
		totalSpent: 2000,
		reviewsGiven: 15
	};

	export let userId: string;

	let user = mockUser;
	let stats = mockUserStats;
	let userAssets: any[] = [];
	let isCurrentUser = false;
	let isFollowing = false;
	let viewMode: 'seller' | 'buyer' = 'seller';
	let purchasedAssets: Product[] = [];

	onMount(() => {
		// In a real scenario, you'd fetch the user data based on userId
		// For now, we'll use the mock data
		user = mockUser;
		stats = mockUserStats;

		// Fetch products created by this user
		userAssets = getProductsByTag(user.username);

		// Fetch products purchased by this user (mock data for now)
		purchasedAssets = getProductsByTag('purchased').slice(0, 5); // Limit to 5 for demo

		// These would normally be set based on your auth logic
		isCurrentUser = userId === user.id;
		isFollowing = user.followers.includes('current-user-id');
		purchasedAssets = [$products[0]];
	});

	function handleFollow() {
		// Implement follow logic here
		isFollowing = !isFollowing;
	}

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getAllReviews() {
		return userAssets.flatMap((asset) => asset.reviews);
	}

	function toggleViewMode() {
		viewMode = viewMode === 'seller' ? 'buyer' : 'seller';
	}

	function handleTip(assetId: string) {
		// Implement tipping logic here
		console.log(`Tipping developer for asset ${assetId}`);
		// You would typically open a modal or navigate to a tipping page here
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="relative">
		<div
			class="h-32 w-full rounded-t-lg bg-gradient-to-r from-blue-500 to-purple-600 sm:h-48"
		></div>
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
						class="max-w-[200px] truncate hover:underline">{user.website}</a
					>
				</div>
			{/if}
			{#if user.socialLinks.github}
				<div class="flex items-center text-gray-600">
					<Github class="mr-2 h-5 w-5" />
					<a
						href={`https://github.com/${user.socialLinks.github}`}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline">{user.socialLinks.github}</a
					>
				</div>
			{/if}
			{#if user.socialLinks.twitter}
				<div class="flex items-center text-gray-600">
					<Twitter class="mr-2 h-5 w-5" />
					<a
						href={`https://twitter.com/${user.socialLinks.twitter}`}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:underline">{user.socialLinks.twitter}</a
					>
				</div>
			{/if}
			{#if user.location}
				<div class="flex items-center text-gray-600">
					<MapPin class="mr-2 h-5 w-5" />
					<span>{user.location}</span>
				</div>
			{/if}
		</div>

		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#if viewMode === 'seller'}
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Assets Published</CardTitle>
						<ShoppingCart class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">{stats.assetsPublished}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Assets Sold</CardTitle>
						<Download class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">{stats.assetsSold}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
						<ShoppingCart class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Average Rating</CardTitle>
						<Star class="h-4 w-5 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
					</CardContent>
				</Card>
			{:else}
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Assets Purchased</CardTitle>
						<ShoppingCart class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">{stats.assetsPurchased}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Total Spent</CardTitle>
						<Tag class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Reviews Given</CardTitle>
						<Star class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">{stats.reviewsGiven}</div>
					</CardContent>
				</Card>
			{/if}
		</div>
	</div>
	<Tabs defaultValue={viewMode === 'seller' ? 'portfolio' : 'purchases'} class="mt-8">
		<TabsList class="grid w-full grid-cols-2 sm:grid-cols-4">
			{#if viewMode === 'seller'}
				<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
				<TabsTrigger value="reviews">Reviews</TabsTrigger>
			{:else}
				<TabsTrigger value="purchases">Purchases</TabsTrigger>
				<TabsTrigger value="reviews-given">Reviews Given</TabsTrigger>
			{/if}
			<TabsTrigger value="badges">Badges</TabsTrigger>
			<TabsTrigger value="activity">Activity</TabsTrigger>
		</TabsList>

		{#if viewMode === 'seller'}
			<TabsContent value="portfolio">
				<Card>
					<CardHeader>
						<CardTitle>Portfolio</CardTitle>
						<CardDescription>Showcase of {user.username}'s published assets</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{#each userAssets as asset}
								<Card>
									<img
										src={asset.imageUrl}
										alt={asset.name}
										class="h-48 w-full rounded-t-lg object-cover"
									/>
									<CardHeader>
										<CardTitle class="text-lg">{asset.name}</CardTitle>
										<CardDescription class="text-sm">{asset.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<div class="flex items-center justify-between">
											<div class="flex items-center">
												<Star class="mr-1 h-5 w-5 text-yellow-400" />
												<span>{asset.rating.toFixed(1)}</span>
											</div>
											<div class="flex items-center">
												<Download class="mr-1 h-5 w-5 text-gray-500" />
												<span>{asset.upvotes}</span>
											</div>
										</div>
									</CardContent>
									<CardFooter>
										<Button class="w-full">View Asset</Button>
									</CardFooter>
								</Card>
							{/each}
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="reviews">
				<Card>
					<CardHeader>
						<CardTitle>Reviews</CardTitle>
						<CardDescription>What others are saying about {user.username}'s assets</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea class="h-[400px]">
							{#each getAllReviews() as review}
								<div class="mb-4">
									<div class="flex items-center justify-between">
										<div class="flex items-center">
											<Avatar class="mr-3 h-10 w-10">
												<AvatarFallback>{review.user[0].toUpperCase()}</AvatarFallback>
											</Avatar>
											<div>
												<p class="font-semibold">{review.user}</p>
												<p class="text-sm text-gray-500">{formatDate(review.date)}</p>
											</div>
										</div>
										<div class="flex items-center">
											<Star class="mr-1 h-5 w-5 text-yellow-400" />
											<span>{review.rating}</span>
										</div>
									</div>
									<p class="mt-2">{review.comment}</p>
									<Separator class="my-4" />
								</div>
							{/each}
						</ScrollArea>
					</CardContent>
				</Card>
			</TabsContent>
		{:else}
			<TabsContent value="purchases">
				<Card>
					<CardHeader>
						<CardTitle>Recent Purchases</CardTitle>
						<CardDescription>Assets {user.username} has recently bought</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{#each purchasedAssets as asset}
								<Card>
									<img
										src={asset.imageUrl}
										alt={asset.name}
										class="h-48 w-full rounded-t-lg object-cover"
									/>
									<CardHeader>
										<CardTitle class="text-lg">{asset.name}</CardTitle>
										<CardDescription class="text-sm">{asset.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<div class="flex items-center justify-between">
											<div class="flex items-center">
												<Star class="mr-1 h-5 w-5 text-yellow-400" />
												<span>{asset.rating.toFixed(1)}</span>
											</div>
											<p class="text-sm text-gray-500">
												Purchased on {formatDate(asset.uploadDate)}
											</p>
										</div>
									</CardContent>
									<CardFooter class="flex flex-col gap-2 sm:flex-row">
										<Button class="w-full sm:w-1/2">View Asset</Button>
										<Button
											class="w-full sm:w-1/2"
											variant="outline"
											on:click={() => handleTip(asset.id)}
										>
											<DollarSign class="mr-2 h-4 w-4" />
											Tip Developer
										</Button>
									</CardFooter>
								</Card>
							{/each}
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="reviews-given">
				<Card>
					<CardHeader>
						<CardTitle>Reviews Given</CardTitle>
						<CardDescription>Reviews {user.username} has left for purchased assets</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea class="h-[400px]">
							{#each purchasedAssets as asset}
								{#if asset.reviewGiven}
									<div class="mb-4">
										<div class="flex items-center justify-between">
											<div class="flex items-center">
												<Avatar class="mr-3 h-10 w-10">
													<AvatarImage src={asset.imageUrl} alt={asset.name} />
													<AvatarFallback>{asset.name[0].toUpperCase()}</AvatarFallback>
												</Avatar>
												<div>
													<p class="font-semibold">{asset.name}</p>
													<p class="text-sm text-gray-500">{formatDate(asset.reviewGiven.date)}</p>
												</div>
											</div>
											<div class="flex items-center">
												<Star class="mr-1 h-5 w-5 text-yellow-400" />
												<span>{asset.reviewGiven.rating}</span>
											</div>
										</div>
										<p class="mt-2">{asset.reviewGiven.comment}</p>
										<Separator class="my-4" />
									</div>
								{/if}
							{/each}
						</ScrollArea>
					</CardContent>
				</Card>
			</TabsContent>
		{/if}

		<TabsContent value="badges">
			<Card>
				<CardHeader>
					<CardTitle>Badges & Achievements</CardTitle>
					<CardDescription>{user.username}'s accomplishments and milestones</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="flex flex-wrap gap-2">
						{#each user.badges as badge}
							<Badge variant="secondary" class="text-sm">{badge}</Badge>
						{/each}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
		<TabsContent value="activity">
			<Card>
				<CardHeader>
					<CardTitle>Activity Feed</CardTitle>
					<CardDescription>Recent actions and updates</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea class="h-[400px]">
						{#if viewMode === 'seller'}
							{#each userAssets as asset}
								<div class="mb-4">
									<div class="flex items-center">
										<ShoppingCart class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
										<div class="min-w-0 flex-grow">
											<p class="truncate font-semibold">{asset.name}</p>
											<p class="text-sm text-gray-500">{formatDate(asset.uploadDate)}</p>
										</div>
									</div>
									<Separator class="my-4" />
								</div>
							{/each}
						{:else}
							{#each purchasedAssets as asset}
								<div class="mb-4">
									<div class="flex items-center">
										<Tag class="mr-3 h-5 w-5 flex-shrink-0 text-blue-500" />
										<div class="min-w-0 flex-grow">
											<p class="truncate font-semibold">{asset.name}</p>
											<p class="text-sm text-gray-500">{formatDate(asset.purchaseDate)}</p>
										</div>
									</div>
									<Separator class="my-4" />
								</div>
							{/each}
						{/if}
					</ScrollArea>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>

	<div class="mt-8">
		<h2 class="mb-4 text-xl font-bold sm:text-2xl">Followers and Following</h2>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Followers ({user.followers.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea class="h-[200px]">
						{#each user.followers as followerId}
							<div class="mb-4 flex items-center">
								<Avatar class="mr-3 h-10 w-10 flex-shrink-0">
									<AvatarFallback>{followerId[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<div class="min-w-0 flex-grow">
									<p class="truncate font-semibold">{followerId}</p>
									<p class="text-sm text-gray-500">Follower</p>
								</div>
							</div>
						{/each}
					</ScrollArea>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Following ({user.following.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea class="h-[200px]">
						{#each user.following as followingId}
							<div class="mb-4 flex items-center">
								<Avatar class="mr-3 h-10 w-10 flex-shrink-0">
									<AvatarFallback>{followingId[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<div class="min-w-0 flex-grow">
									<p class="truncate font-semibold">{followingId}</p>
									<p class="text-sm text-gray-500">Following</p>
								</div>
							</div>
						{/each}
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
