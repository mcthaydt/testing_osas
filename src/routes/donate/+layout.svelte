<main>
	<slot></slot>
</main>

<style>
	/* Ensure the html and body elements take up the full height */
	html,
	body {
		height: 100%;
		margin: 0;
	}

	/* The main wrapper should take up the adjusted height */
	main {
		display: flex;
		min-height: calc(100vh - 4rem);
		align-items: center;
		justify-content: center;
	}
</style>
