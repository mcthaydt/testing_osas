<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';

	export let hasCollaborators: boolean;
	export let collaborators: { email: string; revenueSplit: number }[];
	export let isRevenueSplitValid: boolean;

	const platformFee = 8; // 8% platform fee

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
</script>

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
					The total split exceeds 92%. Please adjust to leave at least 1% for yourself after the
					platform fee.
				</p>
			{/if}
		</div>
	</div>
{/if}
