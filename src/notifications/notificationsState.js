import React                          from 'react';
import { DEFAULT_NOTIFICATION_LIFE }  from '../utils/constants';

const now = new Date().valueOf();

const NotificationsState = [
  {
    created: now,
    lastUpdated: now,
    life: DEFAULT_NOTIFICATION_LIFE,
    message: 'Welcome to Weed Wizard!'
  },
  {
    created: now - 1000,
    lastUpdated: now - 1000,
    life: DEFAULT_NOTIFICATION_LIFE - 1000,
    message: (
      <span>All weed names in this game are from or inspired by the <a
        href="http://weednamemaker.com/">Weed Name Maker</a>.
      </span>
    )
  },
];

export default NotificationsState;
