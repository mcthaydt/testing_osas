<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { featureStore } from '../../../lib/stores/featureStore';

	export let showModal: boolean;

	let newFeatureTitle = '';

	function createNewFeature() {
		if (newFeatureTitle.trim()) {
			featureStore.addFeature(newFeatureTitle);
			newFeatureTitle = '';
			showModal = false;
		}
	}
</script>

<Dialog.Root bind:open={showModal}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New Feature</Dialog.Title>
			<Dialog.Description>
				Enter a title for the new feature. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<Input id="title" class="col-span-3" bind:value={newFeatureTitle} />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={createNewFeature}>Save Feature</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
