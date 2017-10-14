import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

const now = new Date().valueOf();

const NotificationsState = [{
  created: now,
  message: 'Welcome to Weed Wizard!',
  life: DEFAULT_NOTIFICATION_LIFE,
  lastUpdated: now
}];

export default NotificationsState;
