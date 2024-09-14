<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	export let user: any;
</script>

<Card>
	<CardHeader>
		<CardTitle>Badges & Achievements</CardTitle>
		<CardDescription>{user.username}'s accomplishments and milestones</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="flex flex-wrap gap-2">
			{#each user.badges as badge}
				<Badge variant="secondary" class="text-sm">{badge}</Badge>
			{/each}
		</div>
	</CardContent>
</Card>
