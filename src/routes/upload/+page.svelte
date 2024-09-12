<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';
	import { addProduct } from '$lib/stores/productStore';
	import { goto } from '$app/navigation';

	let name = '';
	let description = '';
	let extendedDescription = '';
	let images: (File | null)[] = [null, null, null];
	let video: File | null = null;
	let category = '';
	let price = 0;
	let tags = '';
	let isAiGenerated = false;
	let hasCollaborators = false;
	let collaborators: { email: string; revenueSplit: number }[] = [];
	let license = '';
	let version = '';

	const platformFee = 8; // 8% platform fee

	async function handleSubmit() {
		const allCollaborators = [
			...collaborators,
			{ email: 'current.user@example.com', revenueSplit: creatorSplit }
		];

		// Convert images and video to URLs (in a real app, you'd upload these to a server)
		const imageUrls = images
			.map((image) => (image ? URL.createObjectURL(image) : ''))
			.filter(Boolean);
		const videoUrl = video ? URL.createObjectURL(video) : '';

		const newProduct = {
			name,
			description,
			extendedDescription,
			price,
			category,
			rating: 0, // Initial rating
			releaseDate: new Date().toISOString(),
			uploadDate: new Date().toISOString(),
			imageUrl: imageUrls[0] || '', // Use the first image as the main image
			tags: tags.split(',').map((tag) => tag.trim()),
			upvotes: 0,
			isAiGenerated,
			collaborators: allCollaborators,
			license,
			version,
			additionalImages: imageUrls.slice(1),
			videoUrl
		};

		addProduct(newProduct);

		// Redirect to the voting page or show a success message
		alert('Product submitted for voting!');
		goto('/voting'); // Adjust this to your actual voting page route
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
	$: creatorSplit = 92 - totalCollaboratorSplit; // 92% is what's left after the 8% platform fee
	$: isRevenueSplitValid = totalCollaboratorSplit <= 91; // Ensure at least 1% for the creator after platform fee

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
					<Input id="name" bind:value={name} placeholder="Enter asset name" required />
				</div>

				<div class="space-y-2">
					<Label for="description">Short Description</Label>
					<Textarea
						id="description"
						bind:value={description}
						placeholder="Enter a brief description of your asset"
						rows="3"
					/>
				</div>

				<div class="space-y-2">
					<Label for="extendedDescription">Extended Description</Label>
					<Textarea
						id="extendedDescription"
						bind:value={extendedDescription}
						placeholder="Enter a detailed description of your asset, including features, use cases, and any other relevant information"
						rows="6"
					/>
				</div>

				{#each [0, 1, 2] as index}
					<div class="space-y-2">
						<Label for={`image-${index}`}
							>Image Upload {index + 1} {index === 0 ? '(Required)' : '(Optional)'}</Label
						>
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
					<Select bind:value={category}>
						<SelectTrigger>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Characters">Characters</SelectItem>
							<SelectItem value="Environments">Environments</SelectItem>
							<SelectItem value="Props">Props</SelectItem>
							<SelectItem value="Audio">Audio</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<!-- Licensing and Pricing Section -->
				<h3 class="text-xl font-semibold">Licensing and Pricing</h3>
				<div class="space-y-2">
					<Label for="price">Price ($)</Label>
					<Input id="price" type="number" bind:value={price} min="0" step="0.01" required />
				</div>

				<div class="space-y-2">
					<Label for="license">License</Label>
					<Select bind:value={license}>
						<SelectTrigger>
							<SelectValue placeholder="Select a license" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="MIT">MIT</SelectItem>
							<SelectItem value="GPL">GPL</SelectItem>
							<SelectItem value="CC0">CC0 (Public Domain)</SelectItem>
							<SelectItem value="Custom">Custom License</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div class="space-y-2">
					<Label for="version">Version</Label>
					<Input id="version" bind:value={version} placeholder="e.g., 1.0.0" required />
				</div>

				<!-- Additional Information Section -->
				<h3 class="text-xl font-semibold">Additional Information</h3>
				<div class="space-y-2">
					<Label for="tags">Tags</Label>
					<Input
						id="tags"
						bind:value={tags}
						placeholder="Enter tags separated by commas"
						required
					/>
				</div>

				<div class="flex items-center space-x-2">
					<Switch id="ai-generated" bind:checked={isAiGenerated} />
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
								<Button type="button" variant="outline" on:click={() => removeCollaborator(index)}
									>Remove</Button
								>
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
				disabled={hasCollaborators && !isRevenueSplitValid}>Submit to Asset Voting</Button
			>
		</CardFooter>
	</Card>
</div>
