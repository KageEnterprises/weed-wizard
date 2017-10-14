import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const AGE_NOTIFICATIONS = 'AGE_NOTIFICATIONS';
export const NOTIFICATIONS_UPDATED = 'NOTIFICATIONS_UPDATED';

export function addNotification(message, life = DEFAULT_NOTIFICATION_LIFE) {
  return {
    type: ADD_NOTIFICATION,
    message,
    life
  };
}

export function ageNotifications() {
  return {
    type: AGE_NOTIFICATIONS
  };
}

export function notificationsUpdated() {
  return {
    type: NOTIFICATIONS_UPDATED
  }
}
