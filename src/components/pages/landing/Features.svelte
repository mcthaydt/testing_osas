<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	export let features: Array<{ title: string; description: string }>;
</script>

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
