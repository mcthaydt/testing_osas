import { writable, derived, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

// User Types
export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    bannerImage: string;
    bio: string;
    website: string;
    socialLinks: {
        github?: string;
        twitter?: string;
    };
    location?: string;
    joinDate: string;
    isSeller: boolean;
    followers: string[];
    following: string[];
    badges: string[];
}

export interface UserStats {
    assetsSold: number;
    assetsPublished: number;
    totalRevenue: number;
    averageRating: number;
}

// User Store
function createUserStore() {
    const { subscribe, set, update }: Writable<User[]> = writable([]);

    return {
        subscribe,
        addUser: (user: User) => update(users => [...users, user]),
        updateUser: (id: string, updates: Partial<User>) => update(users =>
            users.map(user => user.id === id ? { ...user, ...updates } : user)
        ),
        deleteUser: (id: string) => update(users => users.filter(user => user.id !== id)),
        getUserById: (id: string) => get({ subscribe }).find(user => user.id === id),
        setUsers: (users: User[]) => set(users),
    };
}

export const users = createUserStore();

// Derived Stores
export const sellerUsers = derived(users, $users => $users.filter(user => user.isSeller));

// User Stats Store
function createUserStatsStore() {
    const { subscribe, set, update }: Writable<Record<string, UserStats>> = writable({});

    return {
        subscribe,
        updateStats: (userId: string, stats: Partial<UserStats>) => update(allStats => ({
            ...allStats,
            [userId]: { ...allStats[userId], ...stats }
        })),
        getStats: (userId: string) => get({ subscribe })[userId] || {
            assetsSold: 0,
            assetsPublished: 0,
            totalRevenue: 0,
            averageRating: 0
        },
    };
}

export const userStats = createUserStatsStore();

// Helper Functions
export function registerUser(userData: Omit<User, 'id' | 'joinDate' | 'followers' | 'following' | 'badges' | 'isSeller'>): void {
    const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        joinDate: new Date().toISOString(),
        followers: [],
        following: [],
        badges: [],
        isSeller: false
    };
    users.addUser(newUser);
    userStats.updateStats(newUser.id, {
        assetsSold: 0,
        assetsPublished: 0,
        totalRevenue: 0,
        averageRating: 0
    });
}

export function followUser(followerId: string, followedId: string): void {
    users.updateUser(followerId, { following: [...get(users).find(u => u.id === followerId)!.following, followedId] });
    users.updateUser(followedId, { followers: [...get(users).find(u => u.id === followedId)!.followers, followerId] });
}

export function unfollowUser(followerId: string, unfollowedId: string): void {
    users.updateUser(followerId, { following: get(users).find(u => u.id === followerId)!.following.filter(id => id !== unfollowedId) });
    users.updateUser(unfollowedId, { followers: get(users).find(u => u.id === unfollowedId)!.followers.filter(id => id !== followerId) });
}

export function upgradeToPremium(userId: string): void {
    users.updateUser(userId, { isSeller: true });
}

// LocalStorage Management
export function saveUsersToLocalStorage(): void {
    users.subscribe($users => localStorage.setItem('users', JSON.stringify($users)))();
    userStats.subscribe($stats => localStorage.setItem('userStats', JSON.stringify($stats)))();
}

export function loadUsersFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    const storedStats = localStorage.getItem('userStats');
    if (storedUsers) {
        users.setUsers(JSON.parse(storedUsers));
    }
    if (storedStats) {
        userStats.set(JSON.parse(storedStats));
    }
}

// Initialize from localStorage when the store is first created
loadUsersFromLocalStorage();

// Save to localStorage whenever the stores change
saveUsersToLocalStorage();