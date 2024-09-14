<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Chart from 'chart.js/auto';

	let chartCanvas: HTMLCanvasElement;

	const salesData = [
		{ name: 'Jan', downloads: 400, revenue: 2400 },
		{ name: 'Feb', downloads: 300, revenue: 1398 },
		{ name: 'Mar', downloads: 200, revenue: 9800 },
		{ name: 'Apr', downloads: 278, revenue: 3908 },
		{ name: 'May', downloads: 189, revenue: 4800 },
		{ name: 'Jun', downloads: 239, revenue: 3800 }
	];

	onMount(() => {
		const ctx = chartCanvas.getContext('2d');
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: salesData.map((d) => d.name),
				datasets: [
					{
						label: 'Downloads',
						data: salesData.map((d) => d.downloads),
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					},
					{
						label: 'Revenue',
						data: salesData.map((d) => d.revenue),
						borderColor: 'rgb(255, 99, 132)',
						tension: 0.1
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-lg sm:text-xl">Sales & Revenue Overview</CardTitle>
	</CardHeader>
	<CardContent>
		<div class="relative h-[250px] w-full sm:h-[300px] md:h-[400px]">
			<canvas bind:this={chartCanvas} class="absolute inset-0"></canvas>
		</div>
	</CardContent>
</Card>
