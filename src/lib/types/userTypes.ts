// userTypes.ts

export interface User {
    id: string;
    username: string;
    avatar: string;
    backgroundBanner: string;
    bio: string;
    website: string;
    socialLinks: {
        github: string;
        twitter: string;
    };
    location: string;
    followers: string[];
    following: string[];
    badges: string[];
}

export interface UserStats {
    assetsPublished: number;
    assetsSold: number;
    totalRevenue: number;
    averageRating: number;
    assetsPurchased: number;
    totalSpent: number;
    reviewsGiven: number;
}

export interface GeographicDataPoint {
    country: string;
    downloads: number;
    revenue: number;
}

export interface AnalyticsData {
    geographicData: GeographicDataPoint[];
}

export interface CommunityActivityItem {
    user: string;
    action: string;
    asset: string;
    date: string;
}

export interface CommunityData {
    communityActivity: CommunityActivityItem[];
}

export interface SaleHistoryItem {
    date: string;
    asset: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
}

export interface SalesData {
    salesHistory: SaleHistoryItem[];
}

export interface SalesDataPoint {
    name: string;
    downloads: number;
    revenue: number;
}

export interface SalesOverviewData {
    salesData: SalesDataPoint[];
}

export interface UserWithStats extends User, UserStats {}

export interface UserWithAllData extends UserWithStats, AnalyticsData, CommunityData, SalesData, SalesOverviewData {}