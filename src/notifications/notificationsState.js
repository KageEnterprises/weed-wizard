import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

const now = new Date().valueOf();

const NotificationsState = [{
  created: now,
  lastUpdated: now,
  life: DEFAULT_NOTIFICATION_LIFE,
  message: 'Welcome to Weed Wizard!'
}];

export default NotificationsState;
