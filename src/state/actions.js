import { DEFAULT_NOTIFICATION_LIFE } from '../utils/constants';

export const SELECT_WEED = 'SELECT_WEED';
export const SELECT_TOOL = 'SELECT_TOOL';
export const INCREASE_HIGHNESS = 'INCREASE_HIGHNESS';
export const DECREASE_WEED_QUANTITY = 'DECREASE_WEED_QUANTITY';
export const DECREASE_SEED_QUANTITY = 'DECREASE_SEED_QUANTITY';
export const DECAY_HIGHNESS = 'DECAY_HIGHNESS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CHANGE_WEED_UOM = 'CHANGE_WEED_UOM';
export const ADD_SEED = 'ADD_SEED';
export const PLANT_SEED = 'PLANT_SEED';
export const AGE_PLANT = 'AGE_PLANT';

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

export function increaseHighness(amount) {
  return {
    type: INCREASE_HIGHNESS,
    amount
  };
}

export function decreaseWeedQuantity(strainId, amount) {
  return {
    type: DECREASE_WEED_QUANTITY,
    strainId,
    amount
  };
}

export function decreaseSeedQuantity(strainId) {
  return {
    type: DECREASE_SEED_QUANTITY,
    strainId
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

export function changeSettingsUoM(uom) {
  return {
    type: CHANGE_WEED_UOM,
    uom
  };
}

export function addSeed(strain) {
  return {
    type: ADD_SEED,
    strain
  };
}

export function plantSeed(strain) {
  return {
    type: PLANT_SEED,
    strain
  };
}

export function agePlant(plant) {
  return {
    type: AGE_PLANT,
    plant
  };
}
