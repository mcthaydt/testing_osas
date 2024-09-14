export function getRemainingTime(uploadDate: string): string {
    const uploadTime = new Date(uploadDate).getTime();
    const now = new Date().getTime();
    const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
}

export function getRemainingTimeInHours(uploadDate: string): number {
    const uploadTime = new Date(uploadDate).getTime();
    const now = new Date().getTime();
    const remainingTime = 30 * 24 * 60 * 60 * 1000 - (now - uploadTime);
    return remainingTime / (1000 * 60 * 60);
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}