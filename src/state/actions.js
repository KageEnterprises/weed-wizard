import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

export const SMOKE_WEED = 'SMOKE_WEED';

export function smokeWeed(strain, tool) {
  return {
    type: SMOKE_WEED,
    strain: strain,
    tool: tool
  };
}

export const DECAY_HIGHNESS = 'DECAY_HIGHNESS';

export function decayHighness(timeDelta) {
  return {
    type: DECAY_HIGHNESS,
    timeDelta
  };
}

export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export function updateNotifications() {
  return {
    type: UPDATE_NOTIFICATIONS
  };
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function addNotification(message, life = DEFAULT_NOTIFICATION_LIFE) {
  return {
    type: ADD_NOTIFICATION,
    message,
    life
  };
}
