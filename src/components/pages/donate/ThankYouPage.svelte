<script lang="ts">
	import PaymentButtons from './PaymentButtons.svelte';
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
	<div class="max-w-md rounded-lg border bg-card p-8 shadow-sm">
		<h1 class="mb-8 text-center text-3xl font-bold text-card-foreground">
			Thank You for Your Contribution!
		</h1>
		<PaymentButtons />
	</div>
</div>
