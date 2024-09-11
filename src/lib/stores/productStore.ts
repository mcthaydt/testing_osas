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
    tags: string[];
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Fantasy Character Pack',
        imageUrl: 'https://example.com/fantasy-character-pack.jpg',
        category: 'Characters',
        rating: 4.5,
        price: 19.99,
        releaseDate: '2023-05-01',
        description: 'A set of high-quality fantasy character models ready for game integration.',
        tags: ['3D', 'fantasy', 'characters', 'godot 4']
    },
    {
        id: 2,
        name: 'Sci-Fi Spaceship Collection',
        imageUrl: 'https://example.com/sci-fi-spaceships.jpg',
        category: 'Vehicles',
        rating: 4.8,
        price: 24.99,
        releaseDate: '2023-06-15',
        description: 'A collection of detailed sci-fi spaceship models with various designs.',
        tags: ['3D', 'sci-fi', 'vehicles', 'ai generated', 'godot 4']
    },
    // Add more game assets as needed
];

export const products = writable<Product[]>(initialProducts);

export function getProduct(id: number): Product | undefined {
    return initialProducts.find(p => p.id === id);
}

export function getProductsByTag(tag: string): Product[] {
    return initialProducts.filter(p => p.tags.includes(tag));
}

export function addProduct(product: Omit<Product, 'id'>): void {
    const newId = Math.max(...initialProducts.map(p => p.id)) + 1;
    const newProduct = { ...product, id: newId };
    initialProducts.push(newProduct);
    products.update(currentProducts => [...currentProducts, newProduct]);
}

export function updateProduct(id: number, updates: Partial<Product>): void {
    const index = initialProducts.findIndex(p => p.id === id);
    if (index !== -1) {
        initialProducts[index] = { ...initialProducts[index], ...updates };
        products.update(currentProducts => 
            currentProducts.map(p => p.id === id ? { ...p, ...updates } : p)
        );
    }
}

export function deleteProduct(id: number): void {
    const index = initialProducts.findIndex(p => p.id === id);
    if (index !== -1) {
        initialProducts.splice(index, 1);
        products.update(currentProducts => 
            currentProducts.filter(p => p.id !== id)
        );
    }
}