<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import type { Product } from '$lib/types/productTypes';

	export let product: Partial<Product>;
</script>

<h3 class="text-xl font-semibold">Licensing and Pricing</h3>
<div class="space-y-2">
	<Label for="price">Price ($)</Label>
	<Input id="price" type="number" bind:value={product.price} min="0" step="0.01" required />
</div>

<div class="space-y-2">
	<Label for="license">License</Label>
	<Select.Root bind:selected={product.license}>
		<Select.Trigger>
			<Select.Value placeholder="Select a license" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="MIT">MIT</Select.Item>
			<Select.Item value="GPL">GPL</Select.Item>
			<Select.Item value="CC0">CC0 (Public Domain)</Select.Item>
			<Select.Item value="Custom">Custom License</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
