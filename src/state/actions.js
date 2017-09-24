import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

export const SELECT_WEED = 'SELECT_WEED';
export const SELECT_TOOL = 'SELECT_TOOL';
export const SMOKE_WEED = 'SMOKE_WEED';
export const DECAY_HIGHNESS = 'DECAY_HIGHNESS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function selectWeed(index) {
  return {
    type: SELECT_WEED,
    index
  };
}

export function selectTool(index) {
  return {
    type: SELECT_TOOL,
    index
  };
}

export function smokeWeed(strain, tool) {
  return {
    type: SMOKE_WEED,
    strain: strain,
    tool: tool
  };
}

export function decayHighness(timeDelta) {
  return {
    type: DECAY_HIGHNESS,
    timeDelta
  };
}

export function updateNotifications() {
  return {
    type: UPDATE_NOTIFICATIONS
  };
}

export function addNotification(message, life = DEFAULT_NOTIFICATION_LIFE) {
  return {
    type: ADD_NOTIFICATION,
    message,
    life
  };
}
