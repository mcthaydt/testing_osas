<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	const navItems = [
		{ label: 'FAQ', href: '/support/faq' },
		{ label: 'Legal', href: '/support/legal' },
		{ label: 'Contact', href: '/support' }
	];

	$: activeHref = $page.url.pathname;
</script>

<nav class="fixed bottom-4 right-4 z-0 flex space-x-2">
	{#each navItems as item}
		<Button
			href={item.href}
			variant={activeHref === item.href || (activeHref === '/support' && item.href === '/support')
				? 'default'
				: 'ghost'}
			size="sm"
			class={activeHref === item.href || (activeHref === '/support' && item.href === '/support')
				? 'bg-primary text-primary-foreground'
				: ''}
		>
			{item.label}
		</Button>
	{/each}
</nav>
