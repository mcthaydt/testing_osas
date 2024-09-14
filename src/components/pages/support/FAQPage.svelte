<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { faqItems, type FAQItem } from './../../../lib/data/faqData';

	function getItemValue(index: number): string {
		return `item-${index + 1}`;
	}
</script>

<div class="container mx-auto py-10">
	<Card>
		<CardHeader>
			<CardTitle class="text-3xl">Frequently Asked Questions</CardTitle>
		</CardHeader>
		<CardContent>
			<Accordion.Root class="w-full">
				{#each faqItems as item, index}
					<Accordion.Item value={getItemValue(index)}>
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
