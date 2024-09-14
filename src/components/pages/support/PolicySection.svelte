<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	export let title: string;
	export let description: string;
	export let content: { heading: string; text: string }[];
</script>

<Card class="mt-4">
	<CardHeader>
		<CardTitle class="text-3xl">{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
	<CardContent>
		<ScrollArea class="h-[600px] w-full rounded-md border p-4">
			{#each content as section}
				<h2 class="mb-4 text-2xl font-semibold">{section.heading}</h2>
				<p class="mb-6">{section.text}</p>
			{/each}
		</ScrollArea>
	</CardContent>
</Card>
