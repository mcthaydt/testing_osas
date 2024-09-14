// initialUsers.ts

import type { UserWithAllData } from '../types/userTypes';

export const initialUsers: UserWithAllData[] = [
    {
        id: 'user-123',
        username: 'JaneGamedev',
        avatar: 'https://images.pexels.com/photos/28319907/pexels-photo-28319907/free-photo-of-a-woman-holding-a-red-flower-in-her-hand.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        backgroundBanner: 'https://images.pexels.com/photos/28210169/pexels-photo-28210169/free-photo-of-a-small-house-on-a-hillside.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        bio: 'Passionate game developer and asset creator',
        website: 'https://janegamedev.com',
        socialLinks: {
            github: 'janegamedev',
            twitter: 'jane_gamedev'
        },
        location: 'San Francisco, CA',
        followers: ['user1', 'user2', 'user3'],
        following: ['user4', 'user5'],
        badges: ['Top Seller', 'Community Contributor', 'Power Buyer'],
        assetsPublished: 5,
        assetsSold: 1000,
        totalRevenue: 50000,
        averageRating: 4.8,
        assetsPurchased: 25,
        totalSpent: 2000,
        reviewsGiven: 15,
        geographicData: [
            { country: 'USA', downloads: 5000, revenue: 25000 },
            { country: 'UK', downloads: 3000, revenue: 15000 },
            { country: 'Germany', downloads: 2000, revenue: 10000 }
        ],
        communityActivity: [
            { user: 'User1', action: 'Downloaded', asset: 'Asset 1', date: '2023-06-01' },
            { user: 'User2', action: 'Reviewed', asset: 'Asset 2', date: '2023-06-02' },
            { user: 'User3', action: 'Purchased', asset: 'Asset 3', date: '2023-06-03' }
        ],
        salesHistory: [
            { date: '2023-06-01', asset: 'Asset 1', amount: 99.99, status: 'completed' },
            { date: '2023-06-02', asset: 'Asset 2', amount: 49.99, status: 'pending' },
            { date: '2023-06-03', asset: 'Asset 3', amount: 149.99, status: 'completed' }
        ],
        salesData: [
            { name: 'Jan', downloads: 400, revenue: 2400 },
            { name: 'Feb', downloads: 300, revenue: 1398 },
            { name: 'Mar', downloads: 200, revenue: 9800 },
            { name: 'Apr', downloads: 278, revenue: 3908 },
            { name: 'May', downloads: 189, revenue: 4800 },
            { name: 'Jun', downloads: 239, revenue: 3800 }
        ]
    },
    // Add more users here as needed
];