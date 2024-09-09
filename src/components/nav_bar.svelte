<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { ShoppingCart, Upload } from 'lucide-svelte';
	import { goto } from '$app/navigation'; // Import SvelteKit's navigation function

	const goToCart = () => goto('/cart'); // Navigate to /cart
	const goToUpload = () => goto('/upload'); // Navigate to /upload
</script>

<nav class="flex h-12 w-full items-center justify-between bg-background p-8">
	<a href="/" class="text-xl font-bold text-primary">OSAS</a>
	<div class="flex items-center gap-4">
		<div class="flex gap-4">
			<Button>Test Dashboard</Button>
			<Button>Test Profile</Button>
			<button
				class="text-primary hover:text-slate-800"
				aria-label="Shopping Cart"
				on:click={goToCart}
			>
				<ShoppingCart size={24} />
			</button>
			<button
				class="text-primary hover:text-slate-800"
				aria-label="Upload Button"
				on:click={goToUpload}
			>
				<Upload size={24} />
			</button>
		</div>
	</div>
</nav>
