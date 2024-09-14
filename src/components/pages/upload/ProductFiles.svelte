<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let productFiles: File[];

	function handleProductFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			productFiles = [...productFiles, ...Array.from(target.files)];
		}
	}

	function removeProductFile(index: number) {
		productFiles = productFiles.filter((_, i) => i !== index);
	}
</script>

<h3 class="text-xl font-semibold">Product Files</h3>
<div class="space-y-2">
	<Label for="productFiles">Upload Product Files</Label>
	<Input id="productFiles" type="file" on:change={handleProductFileChange} multiple accept="*/*" />
</div>
{#if productFiles.length > 0}
	<div class="space-y-2">
		<h4 class="text-lg font-semibold">Uploaded Files:</h4>
		{#each productFiles as file, index}
			<div class="flex items-center justify-between">
				<span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
				<Button type="button" variant="destructive" on:click={() => removeProductFile(index)}>
					Remove
				</Button>
			</div>
		{/each}
	</div>
{/if}
