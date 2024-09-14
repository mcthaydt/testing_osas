<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
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
	import type { Product } from '$lib/types/productTypes';
	import { goto } from '$app/navigation';

	import BasicAssetInfo from './BasicAssetInfo.svelte';
	import ProductFiles from './ProductFiles.svelte';
	import LicensingAndPricing from './LicensingAndPricing.svelte';
	import AdditionalInformation from './AdditionalInformation.svelte';
	import CollaboratorsSection from './CollaboratorsSection.svelte';

	let product: Partial<Product> = {
		name: '',
		description: '',
		extendedDescription: '',
		price: 0,
		engine: { value: '' },
		engineVersion: '',
		category: { value: '' },
		releaseDate: new Date().toISOString().split('T')[0],
		uploadDate: new Date().toISOString().split('T')[0],
		imageUrl: '',
		additionalImages: [],
		videoUrl: '',
		tags: [],
		isAiGenerated: false,
		collaborators: [],
		license: { value: '' },
		version: '',
		assetDeveloper: '',
		files: []
	};

	let images: (File | null)[] = [null, null, null];
	let video: File | null = null;
	let productFiles: File[] = [];
	let showSuccessDialog = false;
	let hasCollaborators = false;
	let collaborators: { email: string; revenueSplit: number }[] = [];
	let isRevenueSplitValid = true;

	function handleSubmit() {
		// Prepare and submit the product
		const newProduct: Omit<Product, 'id' | 'upvotes' | 'status' | 'voters' | 'rating' | 'reviews'> =
			{
				...product,
				imageUrl: images[0] ? URL.createObjectURL(images[0]) : '',
				additionalImages: images
					.slice(1)
					.map((img) => (img ? URL.createObjectURL(img) : ''))
					.filter(Boolean),
				videoUrl: video ? URL.createObjectURL(video) : '',
				collaborators: hasCollaborators ? collaborators : [],
				files: productFiles.map((file, index) => ({
					id: `${Date.now()}-file-${index}`,
					filename: file.name,
					fileSize: file.size,
					fileType: file.type,
					downloadUrl: URL.createObjectURL(file),
					version: product.version || '1.0.0'
				})),
				changelog: []
			} as Product;

		console.log(newProduct);
		addProduct(newProduct);
		showSuccessDialog = true;
	}

	function handleSuccessConfirm() {
		showSuccessDialog = false;
		goto('/voting');
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
				<BasicAssetInfo bind:product bind:images bind:video />
				<ProductFiles bind:productFiles />
				<LicensingAndPricing bind:product />
				<AdditionalInformation bind:product />
				<CollaboratorsSection bind:hasCollaborators bind:collaborators bind:isRevenueSplitValid />
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
