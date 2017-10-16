import {
  ADD_NOTIFICATION,
  AGE_NOTIFICATIONS,
  NOTIFICATIONS_UPDATED } from './notificationsActions';
import NotificationsState from './notificationsState';

export default function notifications(state = NotificationsState, action = null) {
  const now = new Date().valueOf();

  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        {
          created: now,
          message: action.message,
          life: action.life,
          lastUpdated: now
        },
        ...state
      ];

    case AGE_NOTIFICATIONS:
      return state
        .map(notification => {
          return {
            ...notification,
            life: notification.life - (now - notification.lastUpdated),
            lastUpdated: now
          };
        })
        .filter(notification => notification.life > 0);

    case NOTIFICATIONS_UPDATED:
      return state.map(notification => {
        return {
          ...notification,
          lastUpdated: now
        };
      });

    default:
      return state;
  }
}
