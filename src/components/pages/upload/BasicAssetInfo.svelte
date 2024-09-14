<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import type { Product } from '$lib/types/productTypes';

	export let product: Partial<Product>;
	export let images: (File | null)[];
	export let video: File | null;

	function handleImageChange(index: number, event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			images[index] = target.files[0];
		}
	}

	function handleVideoChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			video = target.files[0];
		}
	}

	function getPreviewUrl(file: File | null) {
		return file ? URL.createObjectURL(file) : '';
	}
</script>

<h3 class="text-xl font-semibold">Basic Asset Info</h3>
<div class="space-y-2">
	<Label for="name">Asset Name</Label>
	<Input id="name" bind:value={product.name} placeholder="Enter asset name" required />
</div>

<div class="space-y-2">
	<Label for="description">Short Description</Label>
	<Textarea
		id="description"
		bind:value={product.description}
		placeholder="Enter a brief description of your asset"
		rows="3"
	/>
</div>

<div class="space-y-2">
	<Label for="extendedDescription">Extended Description</Label>
	<Textarea
		id="extendedDescription"
		bind:value={product.extendedDescription}
		placeholder="Enter a detailed description of your asset, including features, use cases, and any other relevant information"
		rows="6"
	/>
</div>

{#each [0, 1, 2] as index}
	<div class="space-y-2">
		<Label for={`image-${index}`}>
			Image Upload {index + 1}
			{index === 0 ? '(Required)' : '(Optional)'}
		</Label>
		<Input
			id={`image-${index}`}
			type="file"
			accept="image/*"
			on:change={(event) => handleImageChange(index, event)}
			required={index === 0}
		/>
		{#if images[index]}
			<img src={getPreviewUrl(images[index])} alt={`Preview ${index + 1}`} class="mt-2 h-40" />
		{/if}
	</div>
{/each}

<div class="space-y-2">
	<Label for="video">Video Upload (Optional)</Label>
	<Input id="video" type="file" accept="video/*" on:change={handleVideoChange} />
	{#if video}
		<video src={getPreviewUrl(video)} controls class="mt-2 h-40"></video>
	{/if}
</div>

<div class="space-y-2">
	<Label for="category">Category</Label>
	<Select.Root bind:selected={product.category}>
		<Select.Trigger>
			<Select.Value placeholder="Select a category" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="3D Model">3D Model</Select.Item>
			<Select.Item value="2D Art">2D Art</Select.Item>
			<Select.Item value="Audio">Audio</Select.Item>
			<Select.Item value="Script">Script</Select.Item>
			<Select.Item value="Shader">Shader</Select.Item>
			<Select.Item value="Texture">Texture</Select.Item>
			<Select.Item value="Animation">Animation</Select.Item>
			<Select.Item value="UI">UI</Select.Item>
			<Select.Item value="VFX">VFX</Select.Item>
			<Select.Item value="Other">Other</Select.Item>
		</Select.Content>
	</Select.Root>
</div>

<div class="space-y-2">
	<Label for="engine">Engine</Label>
	<Select.Root bind:selected={product.engine}>
		<Select.Trigger>
			<Select.Value placeholder="Select an engine" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="Godot">Godot</Select.Item>
			<Select.Item value="Bevy">Bevy</Select.Item>
			<Select.Item value="Other">Other</Select.Item>
			<Select.Item value="General">General</Select.Item>
		</Select.Content>
	</Select.Root>
</div>

<div class="space-y-2">
	<Label for="engineVersion">Engine Version</Label>
	<Input
		id="engineVersion"
		bind:value={product.engineVersion}
		placeholder="e.g., 4.26, 2020.3"
		required
	/>
</div>

<div class="space-y-2">
	<Label for="version">Product Version</Label>
	<Input id="version" bind:value={product.version} placeholder="e.g., 1.0.0" required />
</div>
