<script lang="ts">
	import {
		AlertDialog,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle
	} from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';

	export let open = false;
	export let title: string;
	export let description: string;
	export let onClose: () => void;
</script>

<AlertDialog {open}>
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>{title}</AlertDialogTitle>
			<AlertDialogDescription>
				{description}
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<Button on:click={onClose}>OK</Button>
		</AlertDialogFooter>
	</AlertDialogContent>
</AlertDialog>
