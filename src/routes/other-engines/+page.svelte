<script lang="ts">
	import ProductList from '../../components/product_list.svelte';

	const otherProducts = [
		{
			id: '1',
			name: 'Other Game Engine Asset',
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

<ProductList products={otherProducts} pageTitle="Other Game Engine Assets" />
