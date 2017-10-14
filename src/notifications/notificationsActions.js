import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export function addNotification(message, life = DEFAULT_NOTIFICATION_LIFE) {
  return {
    type: ADD_NOTIFICATION,
    message,
    life
  };
}

export function updateNotifications() {
  return {
    type: UPDATE_NOTIFICATIONS
  };
}
