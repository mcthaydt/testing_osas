<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	const faqItems = [
		{
			question: 'What game engines do you support?',
			answer:
				'We primarily support open source game engines, with a focus on Godot and Bevy. However, many of our assets can be used in other engines as well, depending on their format.'
		},
		{
			question: 'Are the assets on your store free?',
			answer:
				'We offer both free and paid assets. Free assets are clearly marked and can be downloaded without charge. Paid assets require purchase before download.'
		},
		{
			question: 'Can I use the assets in commercial projects?',
			answer:
				'License terms vary by asset. Each asset page clearly states the license terms. Many assets are available for commercial use, but always check the specific license before using in your project.'
		},
		{
			question: 'How do I submit my own assets to the store?',
			answer:
				"We welcome submissions from creators! Visit our 'Become a Seller' page to learn about our submission process, quality guidelines, and revenue sharing model."
		},
		{
			question: 'What file formats do you support?',
			answer:
				"We support a wide range of formats including, but not limited to, .gltf, .obj, .fbx for 3D models, .png, .jpg for textures, .wav, .ogg for audio, and .gdscript, .rs for scripts. Check each asset's description for specific format information."
		},
		{
			question: 'Do you offer refunds?',
			answer:
				'We offer refunds within 14 days of purchase if the asset is unused and unmodified. Please contact our support team with your order number to request a refund.'
		},
		{
			question: "How can I get support for an asset I've purchased?",
			answer:
				"Each asset page has a 'Support' tab where you can contact the asset creator directly. For store-related issues, please use our general support contact form."
		},
		{
			question: 'Do you offer asset packs or bundles?',
			answer:
				"Yes, we offer curated asset packs and themed bundles at discounted prices. Check our 'Bundles' section for current offerings."
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
