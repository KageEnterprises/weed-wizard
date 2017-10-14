import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATIONS
} from './notificationsActions';
import NotificationsState from './notificationsState';

export default function notifications(state = NotificationsState, action = null) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return state.filter((notification) => {
        const notificationLife = notification.life;
        return new Date().valueOf() - notification.timeStamp < notificationLife;
      });

    case ADD_NOTIFICATION:
      return [
        {
          message: action.message,
          life: action.life,
          timeStamp: new Date().valueOf()
        },
        ...state
      ];

    default:
      return state;
  }
}
