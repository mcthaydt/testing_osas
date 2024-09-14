<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { BotMessageSquare, Cat, Mail } from 'lucide-svelte';
	import SupportCard from './SupportCard.svelte';

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
				<SupportCard {...option} />
			{/each}
		</div>
	</ScrollArea>
</div>
