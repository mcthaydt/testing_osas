import type { Notification } from '$lib/stores/notificationStore';

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function getNotificationColor(type: Notification['type']): string {
    const colors: Record<Notification['type'], string> = {
        update: 'text-blue-500',
        review: 'text-yellow-500',
        sale: 'text-green-500',
        comment: 'text-purple-500',
        system: 'text-red-500'
    };
    return colors[type];
}

export const initialNotifications: Omit<Notification, 'id'>[] = [
    {
        type: 'update',
        title: 'Asset Update Available',
        description: 'A new version of "Fantasy Character Pack" is available.',
        date: '2023-06-15T10:30:00',
        read: false
    },
    {
        type: 'review',
        title: 'New Review',
        description: 'Your asset "Sci-Fi Weapons Pack" received a 5-star review!',
        date: '2023-06-14T15:45:00',
        read: true
    },
    {
        type: 'sale',
        title: 'New Sale',
        description: 'Your asset "Medieval Village Props" was purchased.',
        date: '2023-06-13T09:20:00',
        read: false
    },
    {
        type: 'comment',
        title: 'New Comment',
        description: 'Someone commented on your "2D Platformer Tileset" asset.',
        date: '2023-06-12T14:10:00',
        read: true
    },
    {
        type: 'system',
        title: 'System Maintenance',
        description: 'The store will be undergoing maintenance in 24 hours.',
        date: '2023-06-11T11:00:00',
        read: false
    }
];