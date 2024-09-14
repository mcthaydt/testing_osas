<script lang="ts">
	import * as Select from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	export let open = false;

	function acceptCookies() {
		localStorage.setItem('cookieConsent', 'true');
		open = false;
	}
</script>

<Select.Dialog bind:open>
	<Select.DialogContent>
		<Select.DialogHeader>
			<Select.DialogTitle>Cookie Consent</Select.DialogTitle>
			<Select.DialogDescription>
				We use cookies to enhance your browsing experience, serve personalized ads or content, and
				analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
			</Select.DialogDescription>
		</Select.DialogHeader>
		<Select.DialogFooter>
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<Button class="min-w-[125px]" variant="outline" on:click={() => (open = false)}
					>Decline</Button
				>
				<Button class="min-w-[125px]" on:click={acceptCookies}>Accept All</Button>
			</div>
		</Select.DialogFooter>
	</Select.DialogContent>
</Select.Dialog>
