<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog';
	import { addProduct } from '$lib/stores/productStore';
	import { goto } from '$app/navigation';
	import type { SelectValue } from '$lib/components/ui/select';

	let nextId = 1; // Simple incrementing ID

	let product = {
		id: '',
		name: '',
		description: '',
		extendedDescription: '',
		price: 0,
		engine: { value: '' } as SelectValue<string>,
		engineVersion: '',
		category: { value: '' } as SelectValue<string>,
		rating: 0,
		releaseDate: new Date().toISOString().split('T')[0],
		uploadDate: new Date().toISOString().split('T')[0],
		imageUrl: '',
		additionalImages: [],
		videoUrl: '',
		tags: [],
		upvotes: 0,
		status: 'pending',
		isAiGenerated: false,
		collaborators: [],
		license: { value: '' } as SelectValue<string>,
		version: '',
		reviews: [],
		changelog: [],
		engineVersions: [],
		voters: [],
		assetDeveloper: ''
	};

	let images: (File | null)[] = [null, null, null];
	let video: File | null = null;
	let tagsInput = '';
	let hasCollaborators = false;
	let collaborators: { email: string; revenueSplit: number }[] = [];
	let showSuccessDialog = false;

	const platformFee = 8; // 8% platform fee

	async function handleSubmit() {
		const newProduct = {
			name: product.name,
			description: product.description,
			extendedDescription: product.extendedDescription,
			price: product.price,
			engine: product.engine.value || 'Not specified',
			category:
				(product.category.value as
					| '3D Model'
					| '2D Art'
					| 'Audio'
					| 'Script'
					| 'Shader'
					| 'Texture'
					| 'Animation'
					| 'UI'
					| 'VFX'
					| 'Other') || 'Other',
			releaseDate: product.releaseDate,
			imageUrl: images[0] ? URL.createObjectURL(images[0]) : '',
			additionalImages: images
				.slice(1)
				.map((img) => (img ? URL.createObjectURL(img) : ''))
				.filter(Boolean),
			videoUrl: video ? URL.createObjectURL(video) : '',
			tags: tagsInput
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag !== ''),
			isAiGenerated: product.isAiGenerated,
			collaborators: hasCollaborators ? collaborators : [],
			license: product.license.value || 'Not specified',
			version: product.version || '1.0.0',
			engineVersions: [
				{
					version: product.engineVersion || 'Not specified',
					releaseDate: product.releaseDate
				}
			]
		};

		addProduct(newProduct, product.assetDeveloper || 'Anonymous');

		// Show success dialog
		showSuccessDialog = true;
		console.log('Product:', newProduct);
	}

	function handleSuccessConfirm() {
		showSuccessDialog = false;
		goto('/voting');
	}

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

	function addCollaborator() {
		if (collaborators.length < 2) {
			collaborators = [...collaborators, { email: '', revenueSplit: 0 }];
		}
	}

	function removeCollaborator(index: number) {
		collaborators = collaborators.filter((_, i) => i !== index);
	}

	$: totalCollaboratorSplit = collaborators.reduce((sum, c) => sum + c.revenueSplit, 0);
	$: creatorSplit = 92 - totalCollaboratorSplit;
	$: isRevenueSplitValid = totalCollaboratorSplit <= 91;

	function getPreviewUrl(file: File | null) {
		return file ? URL.createObjectURL(file) : '';
	}
</script>

<div class="container mx-auto py-10">
	<Card class="mx-auto w-full max-w-3xl">
		<CardHeader>
			<CardTitle class="text-3xl font-bold">Upload New Asset</CardTitle>
			<CardDescription>
				Fill in the details to upload your new asset to the marketplace.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- Basic Asset Info Section -->
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
							<img
								src={getPreviewUrl(images[index])}
								alt={`Preview ${index + 1}`}
								class="mt-2 h-40"
							/>
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

				<!-- Licensing and Pricing Section -->
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

				<!-- Additional Information Section -->
				<h3 class="text-xl font-semibold">Additional Information</h3>
				<div class="space-y-2">
					<Label for="tags">Tags</Label>
					<Input
						id="tags"
						bind:value={tagsInput}
						placeholder="Enter tags separated by commas"
						required
					/>
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

				<!-- Collaborators Section -->
				<div class="flex items-center space-x-2">
					<Switch id="has-collaborators" bind:checked={hasCollaborators} />
					<Label for="has-collaborators">Additional Collaborators</Label>
				</div>

				{#if hasCollaborators}
					<div class="space-y-4">
						<h3 class="text-lg font-semibold">Collaborators</h3>
						{#each collaborators as collaborator, index}
							<div class="flex space-x-2">
								<Input
									type="email"
									placeholder="Collaborator Email"
									bind:value={collaborator.email}
									required
								/>
								<Input
									type="number"
									placeholder="Revenue Split %"
									bind:value={collaborator.revenueSplit}
									min="0"
									max="91"
									required
								/>
								<Button type="button" variant="outline" on:click={() => removeCollaborator(index)}>
									Remove
								</Button>
							</div>
						{/each}
						<Button
							type="button"
							variant="secondary"
							on:click={addCollaborator}
							disabled={collaborators.length >= 2}
						>
							Add Collaborator
						</Button>

						<!-- Revenue Split Display -->
						<div class="mt-4 space-y-2">
							<div class="flex items-center justify-between">
								<p>Platform Fee:</p>
								<p>{platformFee}%</p>
							</div>
							<div class="flex items-center justify-between">
								<p>Your Revenue Split:</p>
								<p class:text-red-500={!isRevenueSplitValid}>{creatorSplit}%</p>
							</div>
							<div class="flex items-center justify-between">
								<p>Total Collaborator Split:</p>
								<p>{totalCollaboratorSplit}%</p>
							</div>
							{#if !isRevenueSplitValid}
								<p class="text-red-500">
									The total split exceeds 92%. Please adjust to leave at least 1% for yourself after
									the platform fee.
								</p>
							{/if}
						</div>
					</div>
				{/if}
			</form>
		</CardContent>
		<CardFooter class="flex justify-end">
			<Button
				type="submit"
				on:click={handleSubmit}
				disabled={hasCollaborators && !isRevenueSplitValid}
			>
				Submit to Asset Voting
			</Button>
		</CardFooter>
	</Card>
</div>

<AlertDialog bind:open={showSuccessDialog}>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>Asset Submitted Successfully</AlertDialogTitle>
			<AlertDialogDescription>
				Your asset has been submitted for voting. You will be redirected to the voting page.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogAction on:click={handleSuccessConfirm}>OK</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
