<script>
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Github, Twitter, ChevronLeft, ChevronRight } from 'lucide-svelte';

	const features = [
		{ title: 'Voting System', description: 'Assets are only added when users vote them in.' },
		{
			title: 'Open Source Focused',
			description:
				'This marketplace is designed specifically for open source game engines without a dedicated asset store.'
		},
		{
			title: 'Revenue Sharing',
			description: 'Sellers can split their profits among contributors.'
		},
		{
			title: 'Low Distributed Transaction Fee',
			description: 'You keep 92%. We keep 5%. We donate 3% to open source game engines.'
		}
	];

	const featuredAsset = {
		name: 'This product does not exist',
		description: 'But it could - and it could be yours.',
		image:
			'https://images.pexels.com/photos/27180675/pexels-photo-27180675/free-photo-of-perito-moreno-glacier-in-patagonia.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
	};
</script>

<main class="container mx-auto px-4">
	<section class="hero py-20 text-center">
		<h1 class="mb-4 text-5xl font-semibold tracking-normal">Open Source Asset Store</h1>
		<p class="mb-8 text-xl">
			Access high-quality, free and paid assets to bring your game vision to life
		</p>
		<div class="mt-4 flex justify-center">
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<a href="/godot">
					<Button variant="outline" size="lg">Browse Godot Assets</Button>
				</a>
				<a href="/bevy">
					<Button variant="secondary" size="lg">Browse Bevy Assets</Button>
				</a>
			</div>
		</div>
	</section>

	<section class="featured-asset py-16">
		<h2 class="mb-8 text-center text-3xl font-bold">Featured Asset</h2>
		<Card class="overflow-hidden">
			<div class="grid grid-cols-1 md:grid-cols-2">
				<img
					src={featuredAsset.image}
					alt={featuredAsset.name}
					class="h-full w-full object-cover"
				/>
				<div class="p-6">
					<CardHeader>
						<CardTitle class="text-2xl">{featuredAsset.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{featuredAsset.description}</p>
					</CardContent>
					<CardFooter>
						<div class="flex flex-row gap-2">
							<a href="https://forms.gle/p8EMx4DoQ3axtvEm9">
								<Button variant="outline" size="lg">Join Waitlist</Button>
							</a>
							<a href="/product_item/1">
								<Button variant="secondary" size="lg">View More</Button>
							</a>
						</div>
					</CardFooter>
				</div>
			</div>
		</Card>
	</section>

	<section class="features py-16">
		<h2 class="mb-12 text-center text-3xl font-bold">Why OSAS?</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<Card>
					<CardHeader>
						<CardTitle>{feature.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{feature.description}</p>
					</CardContent>
				</Card>
			{/each}
		</div>
	</section>

	<section class="cta rounded-lg bg-primary-foreground p-16 text-center">
		<h2 class="mb-4 text-3xl font-bold">Sharing is Caring</h2>
		<p class="mb-8">We'll let you know when we launch</p>
		<a href="https://forms.gle/p8EMx4DoQ3axtvEm9">
			<Button variant="secondary" size="lg">Join Waitlist</Button>
		</a>
	</section>

	<footer class="border-t py-12">
		<div class="flex items-center justify-between">
			<div class="text-sm">&copy; 2024 717 Holdings Company. All rights reserved.</div>
			<div class="flex space-x-4">
				<a href="https://github.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
					<Github size={24} />
				</a>
				<a href="https://x.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
					<Twitter size={24} />
				</a>
			</div>
		</div>
	</footer>
</main>
