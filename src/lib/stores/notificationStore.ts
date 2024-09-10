import { writable } from 'svelte/store';
import { Bell, Download, Star, ShoppingCart, MessageSquare } from 'lucide-svelte';

type NotificationType = 'update' | 'review' | 'sale' | 'comment' | 'system';

export interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    description: string;
    date: string;
    read: boolean;
    icon: keyof typeof iconMap;
}

export const iconMap = {
    'update': Download,
    'review': Star,
    'sale': ShoppingCart,
    'comment': MessageSquare,
    'system': Bell
};

function createNotificationStore() {
    const { subscribe, set, update } = writable<Notification[]>([]);
    return {
        subscribe,
        set,
        markAsRead: (id: number) => update(notifications => 
            notifications.map(n => n.id === id ? {...n, read: true} : n)
        ),
        markAllAsRead: () => update(notifications => 
            notifications.map(n => ({...n, read: true}))
        ),
        deleteNotification: (id: number) => update(notifications => 
            notifications.filter(n => n.id !== id)
        ),
        addNotification: (notification: Omit<Notification, 'id'>) => update(notifications => {
            const newNotification = { ...notification, id: Date.now() };
            return [newNotification, ...notifications].slice(0, 20);
        }),
        init: () => {
            const storedNotifications = localStorage.getItem('notifications');
            if (storedNotifications) {
                set(JSON.parse(storedNotifications));
            }
        },
        saveToLocalStorage: () => {
            subscribe(notifications => {
                localStorage.setItem('notifications', JSON.stringify(notifications));
            })();
        }
    };
}

export const notificationStore = createNotificationStore();