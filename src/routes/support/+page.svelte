<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ArrowRight } from 'lucide-svelte';

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let submitted = false;

	function handleSubmit() {

		submitted = true;
	}
</script>

<div class="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
	<div class="flex max-h-screen items-center justify-center">
		<Card class="w-full max-w-md">
			<CardHeader>
				<CardTitle class="text-left text-2xl sm:text-3xl">Contact Support</CardTitle>
			</CardHeader>
			<CardContent>
				{#if submitted}
					<p class="text-center text-green-600">
						Thank you for your message. We'll get back to you soon!
					</p>
				{:else}
					<form on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 gap-4">
						<Input type="text" bind:value={name} placeholder="Name / Username" required />
						<Input type="email" bind:value={email} placeholder="Email" required />
						<Input bind:value={subject} placeholder="Subject" required />
						<Textarea bind:value={message} placeholder="Message" required />
						<Button type="submit" variant="outline" class="w-full">
							Send Message
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
					</form>
				{/if}
			</CardContent>
		</Card>
	</div>
</div>
