import {create} from 'zustand';

interface NotificationType {
  notificationSize: number;
}

interface NotificationActions extends NotificationType {
  setNotificationSize: (size: number) => void;
}

export const useNotification = create<NotificationActions>(set => ({
  notificationSize: 1,
  setNotificationSize: (size: number) => set({notificationSize: size}),
}));
