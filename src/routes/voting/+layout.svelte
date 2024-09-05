<script>
	import VotingNavBar from '../../components/voting_nav_bar.svelte';
</script>

<div class="relative min-h-full">
	<div class="pb-16">
		<slot />
	</div>
	<VotingNavBar />
</div>
