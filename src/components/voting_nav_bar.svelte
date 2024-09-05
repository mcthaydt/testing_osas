<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	const navItems = [
		{ label: 'OSAS', href: '/voting/osas' },
		{ label: 'Assets', href: '/voting' }
	];

	$: activeHref = $page.url.pathname;
</script>

<nav class="fixed bottom-4 right-4 z-0 flex space-x-2">
	{#each navItems as item}
		<Button
			href={item.href}
			variant={activeHref === item.href || (activeHref === '/voting' && item.href === '/voting')
				? 'default'
				: 'ghost'}
			size="sm"
			class={activeHref === item.href || (activeHref === '/voting' && item.href === '/voting')
				? 'bg-primary text-primary-foreground'
				: ''}
		>
			{item.label}
		</Button>
	{/each}
</nav>
