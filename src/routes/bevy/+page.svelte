<script lang="ts">
	import ProductList from '../../components/product_list.svelte';

	const bevyProducts = [
		{
			id: '1',
			name: 'Bevy Asset',
			description: 'Advanced game development kit',
			price: 499.99,
			category: 'Dev Tools',
			rating: 4.9,
			releaseDate: '2023-05-15',
			imageUrl:
				'https://images.pexels.com/photos/23947682/pexels-photo-23947682/free-photo-of-camera-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
		}
		// ... more products for Godot page
	];
</script>

<ProductList products={bevyProducts} pageTitle="Bevy Engine Assets" />
