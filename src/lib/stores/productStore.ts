import { writable } from 'svelte/store';

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    rating: number;
    price: number;
    releaseDate: string;
    description: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Elegant Timepiece',
        imageUrl: 'https://images.pexels.com/photos/28137426/pexels-photo-28137426/free-photo-of-ng-i-lai-do-d-m-l-p-an.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        category: 'Watches',
        rating: 4.5,
        price: 199.99,
        releaseDate: '2023-05-01',
        description: 'A sophisticated watch that combines style with precision timekeeping.'
    },
    {
        id: 2,
        name: 'Smartphone Pro',
        imageUrl: 'https://example.com/phone1.jpg',
        category: 'Electronics',
        rating: 4.8,
        price: 799.99,
        releaseDate: '2023-06-15',
        description: 'The latest smartphone with cutting-edge features and a stunning display.'
    },
    // Add more products as needed
];

export const products = writable<Product[]>(initialProducts);

export function getProduct(id: number): Product | undefined {
    return initialProducts.find(p => p.id === id);
}