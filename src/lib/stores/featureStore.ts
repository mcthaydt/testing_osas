import { writable } from 'svelte/store';

export interface Feature {
    id: number;
    title: string;
    upvotes: number;
    date: Date;
}

function createFeatureStore() {
    const { subscribe, set, update } = writable<Feature[]>([
        { id: 1, title: 'Feature 1', upvotes: 10, date: new Date('2023-05-01') },
        { id: 2, title: 'Feature 2', upvotes: 5, date: new Date('2023-05-15') },
        { id: 3, title: 'Feature 3', upvotes: 15, date: new Date('2023-04-20') },
        { id: 4, title: 'Feature 4', upvotes: 8, date: new Date('2023-05-10') }
    ]);

    return {
        subscribe,
        upvote: (id: number) => update(features => 
            features.map(feature => 
                feature.id === id ? { ...feature, upvotes: feature.upvotes + 1 } : feature
            )
        ),
        addFeature: (title: string) => update(features => [
            ...features,
            { id: Math.max(...features.map(f => f.id)) + 1, title, upvotes: 0, date: new Date() }
        ])
    };
}

export const featureStore = createFeatureStore();