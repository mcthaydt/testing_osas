<script lang="ts">
	import { Github, Twitter } from 'lucide-svelte';
</script>

<footer class="border-t py-12">
	<div class="flex items-center justify-between">
		<div class="text-sm">&copy; 2024 SOS Holdings Company. All rights reserved.</div>
		<div class="flex space-x-4">
			<a href="https://github.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
				<Github size={24} />
			</a>
			<a href="https://x.com/mcthaydt" class="text-gray-500 hover:text-blue-500">
				<Twitter size={24} />
			</a>
		</div>
	</div>
</footer>
