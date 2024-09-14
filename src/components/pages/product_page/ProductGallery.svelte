<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type { Product } from '$lib/types/productTypes';

	export let product: Product;
</script>

<div class="space-y-6">
	<AspectRatio ratio={16 / 9}>
		<img src={product.imageUrl} alt={product.name} class="h-full w-full rounded-lg object-cover" />
	</AspectRatio>
	{#if product.additionalImages.length > 0}
		<div class="grid grid-cols-3 gap-4">
			{#each product.additionalImages as image}
				<img src={image} alt="Additional view" class="rounded-md object-cover" />
			{/each}
		</div>
	{/if}
	{#if product.videoUrl}
		<div>
			<h3 class="mb-2 text-xl font-semibold">Product Video</h3>
			<AspectRatio ratio={16 / 9}>
				<video src={product.videoUrl} controls class="rounded-lg">
					Your browser does not support the video tag.
				</video>
			</AspectRatio>
		</div>
	{/if}
</div>
