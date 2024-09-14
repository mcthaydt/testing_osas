// userStore.ts

import { writable, derived, get } from 'svelte/store';
import type { UserWithAllData, AnalyticsData, CommunityData, SalesData, SalesOverviewData } from '../types/userTypes';
import { initialUsers } from '../data/initialUsers';

function createUserStore() {
    const { subscribe, set, update } = writable<UserWithAllData | null>(null);
    
    return {
        subscribe,
        setUser: (userId: string) => {
            const user = initialUsers.find(u => u.id === userId);
            if (user) {
                set(user);
            } else {
                set(null);
                console.error(`User with id ${userId} not found`);
            }
        },
        updateUser: (updates: Partial<UserWithAllData>) => update(user => user ? { ...user, ...updates } : null),
        follow: (followerId: string) => update(user => {
            if (user) {
                return {
                    ...user,
                    followers: [...user.followers, followerId]
                };
            }
            return user;
        }),
        unfollow: (followerId: string) => update(user => {
            if (user) {
                return {
                    ...user,
                    followers: user.followers.filter(id => id !== followerId)
                };
            }
            return user;
        }),
        addBadge: (badge: string) => update(user => {
            if (user) {
                return {
                    ...user,
                    badges: [...user.badges, badge]
                };
            }
            return user;
        }),
        incrementSales: (amount: number) => update(user => {
            if (user) {
                return {
                    ...user,
                    assetsSold: user.assetsSold + 1,
                    totalRevenue: user.totalRevenue + amount
                };
            }
            return user;
        }),
        incrementPurchases: (amount: number) => update(user => {
            if (user) {
                return {
                    ...user,
                    assetsPurchased: user.assetsPurchased + 1,
                    totalSpent: user.totalSpent + amount
                };
            }
            return user;
        }),
        addReview: (rating: number) => update(user => {
            if (user) {
                const newTotalRating = user.averageRating * user.reviewsGiven + rating;
                const newReviewsGiven = user.reviewsGiven + 1;
                return {
                    ...user,
                    reviewsGiven: newReviewsGiven,
                    averageRating: Number((newTotalRating / newReviewsGiven).toFixed(1))
                };
            }
            return user;
        }),
        updateAnalytics: (updates: Partial<AnalyticsData>) => update(user => {
            if (user) {
                return {
                    ...user,
                    ...updates
                };
            }
            return user;
        }),
        updateCommunity: (updates: Partial<CommunityData>) => update(user => {
            if (user) {
                return {
                    ...user,
                    ...updates
                };
            }
            return user;
        }),
        updateSales: (updates: Partial<SalesData>) => update(user => {
            if (user) {
                return {
                    ...user,
                    ...updates
                };
            }
            return user;
        }),
        updateSalesOverview: (updates: Partial<SalesOverviewData>) => update(user => {
            if (user) {
                return {
                    ...user,
                    ...updates
                };
            }
            return user;
        }),
    };
}

export const userStore = createUserStore();
export const getCurrentUser = () => get(userStore);
export const isFollowing = (userId: string) => derived(
    userStore,
    $user => $user ? $user.following.includes(userId) : false
);

export const { 
    setUser, 
    updateUser, 
    follow, 
    unfollow, 
    addBadge, 
    incrementSales, 
    incrementPurchases, 
    addReview, 
    updateAnalytics, 
    updateCommunity, 
    updateSales, 
    updateSalesOverview 
} = userStore;