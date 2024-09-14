<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ArrowRight, Lock } from 'lucide-svelte';

	const paymentOptions = [
		{
			name: 'PayPal',
			url: 'https://www.paypal.com/donate/?hosted_button_id=DWBSPNDWHSXB2',
			description: 'Donate securely via PayPal',
			locked: false
		},
		{
			name: 'Cash App',
			url: 'https://cash.app',
			description: 'Quick and easy mobile payments',
			locked: true
		},
		{
			name: 'Coinbase',
			url: 'https://www.coinbase.com',
			description: 'Donate using cryptocurrency',
			locked: true
		}
	];
</script>

<div class="container mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
	<div class="space-y-6">
		{#each paymentOptions as option}
			<Card class="flex flex-col items-center sm:flex-row">
				<CardHeader class="flex-1">
					<CardTitle class="mb-2 text-xl">{option.name}</CardTitle>
					<p class="text-sm text-muted-foreground">{option.description}</p>
				</CardHeader>
				<CardContent class="w-full pt-0 sm:w-auto sm:pt-6">
					<Button
						variant="outline"
						class="w-full sm:w-auto"
						disabled={option.locked}
						href={option.locked ? undefined : option.url}
						target={option.locked ? undefined : '_blank'}
						rel={option.locked ? undefined : 'noopener noreferrer'}
					>
						{#if option.locked}
							<Lock class="mr-2 h-4 w-4" />
							Locked
						{:else}
							Donate
							<ArrowRight class="ml-2 h-4 w-4" />
						{/if}
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>
</div>
