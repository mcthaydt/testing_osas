<script lang="ts">
	import ProductList from '../../components/product_list.svelte';

	const godotProducts = [
		{
			id: '1',
			name: 'Godot Asset',
			description: 'Advanced game development kit',
			price: 499.99,
			category: 'Dev Tools',
			rating: 4.9,
			releaseDate: '2023-05-15',
			imageUrl:
				'https://images.pexels.com/photos/23947682/pexels-photo-23947682/free-photo-of-camera-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
			tags: ['3D', 'fantasy', 'characters', 'godot 4']
		},
		{
			id: '2',
			name: 'Godot Asset 2',
			description: 'Advanced game development kit',
			price: 492.99,
			category: 'Test Tools',
			rating: 4.4,
			releaseDate: '2022-05-15',
			imageUrl:
				'https://images.pexels.com/photos/23947682/pexels-photo-23947682/free-photo-of-camera-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
			tags: ['Teag2', 'Lol', 'characters', 'godot 4']
		}
		// ... more products for Godot page
	];
</script>

<ProductList products={godotProducts} pageTitle="Godot Engine Assets" />
