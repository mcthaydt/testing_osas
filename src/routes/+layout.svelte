<script>
	import '../app.css';
	import NavBar from '../components/nav_bar.svelte';
	import Sidebar from '../components/sidebar.svelte';
</script>

<div class="flex min-h-[calc(100vh-4rem)]">
	<Sidebar />
	<div class="flex flex-1 flex-col">
		<NavBar />
		<main class="relative ml-24 flex-1">
			<slot></slot>
		</main>
	</div>
</div>
