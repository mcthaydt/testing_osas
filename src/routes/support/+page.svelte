<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { BotMessageSquare, Cat, Mail, Lock } from 'lucide-svelte';

	const supportOptions = [
		{
			title: 'Discord',
			description: 'Join our community for real-time support and discussions.',
			icon: BotMessageSquare,
			link: 'https://discord.gg/your-discord-invite-link',
			locked: true
		},
		{
			title: 'Reddit',
			description: 'Participate in our subreddit for community-driven support.',
			icon: Cat,
			link: 'https://www.reddit.com/r/your-subreddit',
			locked: true
		},
		{
			title: 'Email',
			description: 'Contact our support team directly via email.',
			icon: Mail,
			link: 'mailto:support@yourcompany.com',
			locked: false
		}
	];
</script>

<div class="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
	<ScrollArea>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each supportOptions as option}
				<Card class="flex flex-col">
					<CardHeader>
						<CardTitle class="flex items-center text-xl">
							<svelte:component this={option.icon} class="mr-2 h-6 w-6" />
							{option.title}
						</CardTitle>
					</CardHeader>
					<CardContent class="flex flex-grow flex-col">
						<p class="mb-4 flex-grow">{option.description}</p>
						<Button
							href={option.locked ? undefined : option.link}
							target={option.locked ? undefined : '_blank'}
							rel={option.locked ? undefined : 'noopener noreferrer'}
							variant="outline"
							class="w-full"
							disabled={option.locked}
						>
							{#if option.locked}
								<Lock class="mr-2 h-4 w-4" />
								Locked
							{:else}
								Contact via {option.title}
							{/if}
						</Button>
					</CardContent>
				</Card>
			{/each}
		</div>
	</ScrollArea>
</div>
