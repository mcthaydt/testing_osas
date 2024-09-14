<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ArrowUp } from 'lucide-svelte';
	import type { Feature } from '../../../lib/stores/featureStore';
	import { featureStore } from '../../../lib/stores/featureStore';

	export let feature: Feature;

	function upvote() {
		featureStore.upvote(feature.id);
	}
</script>

<Card>
	<CardContent class="flex items-center p-4">
		<div class="mr-4 flex flex-col items-center">
			<Button variant="outline" size="icon" on:click={upvote}>
				<ArrowUp class="h-4 w-4" />
			</Button>
			<span class="mt-1 text-sm font-medium">{feature.upvotes}</span>
		</div>
		<div>
			<h2 class="text-lg font-semibold">{feature.title}</h2>
			<p class="text-sm text-muted-foreground">{feature.date.toLocaleDateString()}</p>
		</div>
	</CardContent>
</Card>
