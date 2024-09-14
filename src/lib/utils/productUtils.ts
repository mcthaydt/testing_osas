import type { Product, ProductStatus } from '../types/productTypes';

export const UPVOTE_THRESHOLD = 10;
export const VOTING_PERIOD_DAYS = 30;

export function calculateNewStatus(upvotes: number, currentStatus: ProductStatus): ProductStatus {
    return upvotes >= UPVOTE_THRESHOLD ? 'approved' : currentStatus;
}

export function isWithinVotingPeriod(uploadDate: string): boolean {
    const currentDate = new Date();
    const uploadDateTime = new Date(uploadDate).getTime();
    const daysSinceUpload = (currentDate.getTime() - uploadDateTime) / (1000 * 3600 * 24);
    return daysSinceUpload <= VOTING_PERIOD_DAYS;
}

export function calculateRemainingTime(uploadDate: string): number {
    const currentDate = new Date();
    const uploadDateTime = new Date(uploadDate).getTime();
    const daysSinceUpload = (currentDate.getTime() - uploadDateTime) / (1000 * 3600 * 24);
    return VOTING_PERIOD_DAYS - daysSinceUpload;
}

export function calculateAverageRating(reviews: { rating: number }[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
}