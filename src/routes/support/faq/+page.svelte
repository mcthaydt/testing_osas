<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	const faqItems = [
		{
			question: 'How does your store differ from other game asset marketplaces?',
			answer:
				'We primarily support open-source game engines, with a focus on Godot and Bevy. Our marketplace is designed to cater specifically to the needs of developers working with these engines, but many of our assets are versatile and can be used across other engines as well, depending on their format.'
		},
		{
			question: 'What measures do you take to ensure the quality of assets on your store?',
			answer:
				'We have a community voting process for all assets submitted to our marketplace. Each asset is evaluated for quality, usability, and compatibility. We also encourage user reviews and feedback to maintain high standards.'
		},
		{
			question: 'How do you handle version control and updates for assets?',
			answer:
				'We ensure that asset creators can update their assets with new versions easily. Our platform tracks asset versions and allows users to download the latest updates while maintaining access to previous versions if needed.'
		},
		{
			question: 'Is there a community forum or space for users to discuss assets and share tips?',
			answer:
				'Yes, we will eventually create a Discord where users can discuss assets, share tips, and collaborate on projects. This space also allows for direct interaction between asset creators and users.'
		},
		{
			question: "How do you protect creators' intellectual property?",
			answer:
				'We take intellectual property protection seriously. Our platform includes measures to prevent unauthorized distribution of assets and respects the licensing terms set by asset creators.'
		},
		{
			question: 'Are there any plans to support proprietary game engines in the future?',
			answer:
				'We are continually evaluating the needs of our users and may consider supporting proprietary game engines in the future. Stay tuned for updates on this potential expansion.'
		},
		{
			question: 'Are AI-Generated Assets allowed on the site?',
			answer:
				'Yes, but they must be tagged as such. Users can opt to hide these from their account.'
		}
	];
</script>

<div class="container mx-auto py-10">
	<Card>
		<CardHeader>
			<CardTitle class="text-3xl">Frequently Asked Questions</CardTitle>
		</CardHeader>
		<CardContent>
			<Accordion.Root class="w-full">
				{#each faqItems as item, index}
					<Accordion.Item value={`item-${index + 1}`}>
						<Accordion.Trigger class="text-left">{item.question}</Accordion.Trigger>
						<Accordion.Content>
							{item.answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</CardContent>
	</Card>
</div>

<style>
	/* Specific to this page */
	:global(body) {
		overflow-y: visible;
	}
</style>
