<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import type { Product } from '$lib/types/productTypes';

	export let product: Partial<Product>;
	let tagsInput = '';

	$: product.tags = tagsInput
		.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => tag !== '');
</script>

<h3 class="text-xl font-semibold">Additional Information</h3>
<div class="space-y-2">
	<Label for="tags">Tags</Label>
	<Input id="tags" bind:value={tagsInput} placeholder="Enter tags separated by commas" required />
</div>

<div class="space-y-2">
	<Label for="assetDeveloper">Developer Name or Email</Label>
	<Input
		id="assetDeveloper"
		bind:value={product.assetDeveloper}
		placeholder="Enter your name or email"
		required
	/>
</div>

<div class="flex items-center space-x-2">
	<Switch id="ai-generated" bind:checked={product.isAiGenerated} />
	<Label for="ai-generated">AI-Generated</Label>
</div>
