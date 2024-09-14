import { writable, derived, get } from 'svelte/store';
import type { Product, Review } from '../types/productTypes';
import { calculateNewStatus, isWithinVotingPeriod } from '../utils/productUtils';
import { initialProducts } from '../data/initialProducts';

function createProductStore() {
    const { subscribe, set, update } = writable<Product[]>(initialProducts);
    return {
        subscribe,
        upvote: (id: string, userId: string) => update(products => 
            products.map(product => 
                product.id === id && !product.voters.includes(userId)
                    ? { 
                        ...product, 
                        upvotes: product.upvotes + 1, 
                        status: calculateNewStatus(product.upvotes + 1, product.status),
                        voters: [...product.voters, userId] 
                      }
                    : product
            )
        ),
        addProduct: (product: Omit<Product, 'id' | 'upvotes' | 'status' | 'voters' | 'rating' | 'reviews'>) => update(products => [
            ...products,
            {
                ...product,
                id: `product-${Date.now()}`,
                upvotes: 0,
                status: 'pending',
                voters: [],
                rating: 0,
                reviews: []
            }
        ]),
        updateProduct: (id: string, updates: Partial<Product>) => update(products =>
            products.map(p => p.id === id ? { ...p, ...updates } : p)
        ),
        deleteProduct: (id: string) => update(products => products.filter(p => p.id !== id)),
        addReview: (productId: string, review: Review) => update(products => 
            products.map(product => {
                if (product.id === productId) {
                    const newReviews = [...product.reviews, review];
                    const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
                    return { ...product, reviews: newReviews, rating: Number(newRating.toFixed(1)) };
                }
                return product;
            })
        ),
    };
}

export const productStore = createProductStore();

export const getPendingProducts = derived(productStore, $products => 
    $products.filter(p => p.status === 'pending' && isWithinVotingPeriod(p.uploadDate))
);

export const getProductsByEngine = (engine: string) => derived(
    productStore,
    $products => $products.filter(p => p.engine === engine)
);

export function getProduct(id: string): Product | undefined {
    return get(productStore).find(p => p.id === id);
}

export const { upvote, addReview, addProduct } = productStore;