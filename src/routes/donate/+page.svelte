<script>
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background">
	<div class="max-w-md rounded-lg border bg-card p-8 shadow-sm">
		<h1 class="mb-8 text-center text-3xl font-bold text-card-foreground">
			Thank You for Your Contribution!
		</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
				<Button variant="outline" class="w-full">
					PayPal
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</a>
			<a href="https://cash.app" target="_blank" rel="noopener noreferrer">
				<Button variant="outline" class="w-full">
					Cash App
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</a>
			<a
				href="https://www.coinbase.com"
				target="_blank"
				rel="noopener noreferrer"
				class="sm:col-span-2"
			>
				<Button variant="outline" class="w-full">
					Coinbase
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</a>
		</div>
	</div>
</div>
