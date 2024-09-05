import { writable } from 'svelte/store';

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    upvotes: number;
    releaseDate: Date;
    description: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        imageUrl:
            'https://images.pexels.com/photos/28191710/pexels-photo-28191710/free-photo-of-victoria-architecture.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        upvotes: 10,
        releaseDate: new Date('2023-05-01'),
        description: 'A stunning piece of architectural design with historical significance.'
    },
    {
        id: 2,
        name: 'Product 2',
        imageUrl:
            'https://images.pexels.com/photos/27978903/pexels-photo-27978903/free-photo-of-a-mountain-with-snow-on-it-and-clouds-in-the-sky.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        upvotes: 5,
        releaseDate: new Date('2023-05-15'),
        description: 'A majestic mountain landscape capturing the serene beauty of nature.'
    },
    {
        id: 3,
        name: 'Product 3',
        imageUrl:
            'https://images.pexels.com/photos/27738895/pexels-photo-27738895/free-photo-of-yilki-atlari.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        upvotes: 15,
        releaseDate: new Date('2023-04-20'),
        description: 'A wild herd of horses galloping across a breathtaking landscape.'
    },
    {
        id: 4,
        name: 'Product 4',
        imageUrl:
            'https://images.pexels.com/photos/27807013/pexels-photo-27807013/free-photo-of-a-large-tree-in-a-park-with-a-path.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        upvotes: 8,
        releaseDate: new Date('2023-05-10'),
        description: 'A peaceful park scene, with a towering tree and a quiet path winding through.'
    }
];

export const products = writable<Product[]>(initialProducts);

export function upvote(id: number) {
    products.update(currentProducts => 
        currentProducts.map(product => 
            product.id === id ? { ...product, upvotes: product.upvotes + 1 } : product
        )
    );
}