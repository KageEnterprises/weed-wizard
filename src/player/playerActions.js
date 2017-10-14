export const ADD_SEED = 'ADD_SEED';
export const DECAY_HIGHNESS = 'DECAY_HIGHNESS';
export const DECREASE_SEED_QUANTITY = 'DECREASE_SEED_QUANTITY';
export const DECREASE_WEED_QUANTITY = 'DECREASE_WEED_QUANTITY';
export const INCREASE_HIGHNESS = 'INCREASE_HIGHNESS';
export const INCREASE_WEED_QUANTITY = 'INCREASE_WEED_QUANTITY';
export const SELECT_TOOL = 'SELECT_TOOL';
export const SELECT_WEED = 'SELECT_WEED';

export function addSeed(strain) {
  return {
    type: ADD_SEED,
    strain
  };
}

export function decayHighness(timeDelta) {
  return {
    type: DECAY_HIGHNESS,
    timeDelta
  };
}

export function decreaseSeedQuantity(strainId) {
  return {
    type: DECREASE_SEED_QUANTITY,
    strainId
  };
}

export function decreaseWeedQuantity(strainId, amount) {
  return {
    type: DECREASE_WEED_QUANTITY,
    strainId,
    amount
  };
}

export function increaseHighness(amount) {
  return {
    type: INCREASE_HIGHNESS,
    amount
  };
}

export function increaseWeedQuantity(strainId, amount) {
  return {
    type: INCREASE_WEED_QUANTITY,
    strainId,
    amount
  };
}

export function selectTool(index) {
  return {
    type: SELECT_TOOL,
    index
  };
}

export function selectWeed(index) {
  return {
    type: SELECT_WEED,
    index
  };
}
