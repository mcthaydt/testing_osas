<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	export let signupCount: number;
</script>

<section class="hero py-20 text-center">
	<Badge variant="outline" class="mb-4">Over {signupCount} Prelaunch Signups</Badge>
	<h1 class="mb-4 text-4xl font-semibold tracking-normal">
		Asset Store for Open Source Game Engines
	</h1>
	<p class="mb-8 text-lg">
		Access high-quality, free and paid game assets to bring your vision to life
	</p>
	<div class="mx-auto mb-12 max-w-[425px] rounded-xl">
		<AspectRatio ratio={16 / 9} class="rounded-xl bg-muted">
			<video
				src="https://media.istockphoto.com/id/1499384294/ko/비디오/바다에서-수영하는-돌고래의-수중-영상.mp4?s=mp4-480x480-is&k=20&c=tf43Gnm98xXTQYP1O7gWsV1gQTWIXJAw7TwtsfU71nU="
				class="rounded-xl object-cover"
				autoplay
				muted
			/>
		</AspectRatio>
	</div>
	<div class="mt-4 flex justify-center">
		<div class="flex flex-col items-center gap-4 sm:flex-row">
			<a href="/godot">
				<Button variant="default" size="default">Browse Godot Assets</Button>
			</a>
			<a href="/bevy">
				<Button variant="secondary" size="default">Browse Bevy Assets</Button>
			</a>
		</div>
	</div>
</section>
