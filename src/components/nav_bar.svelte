<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ShoppingCart, Upload, PersonStanding, Database } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cartStore } from '$lib/stores/cartStore'; // Assume we have a cartStore

	const goToCart = () => goto('/cart');
	const goToUpload = () => goto('/upload');

	let cartItemCount = 0;

	// Subscribe to the cartStore to update the cart item count
	cartStore.subscribe((items) => {
		cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
	});
</script>

<nav class="flex h-12 w-full items-center justify-between bg-background p-8">
	<a href="/" class="text-xl font-bold text-primary">OSAS</a>
	<div class="flex items-center gap-4">
		<div class="flex gap-4">
			<Button on:click={() => goto('/dashboard')}>
				<Database size={24} />
			</Button>
			<Button on:click={() => goto('/profile')}>
				<PersonStanding size={24} />
			</Button>
			<button
				class="relative text-primary hover:text-slate-800"
				aria-label="Shopping Cart"
				on:click={goToCart}
			>
				<ShoppingCart size={24} />
				{#if cartItemCount > 0}
					<span
						class="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-xs font-bold text-stone-900"
						in:fly={{ y: -10, duration: 200 }}
						out:fly={{ y: -10, duration: 200 }}
					>
						{cartItemCount}
					</span>
				{/if}
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
