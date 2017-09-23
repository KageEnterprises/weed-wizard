import { combineReducers } from 'redux';

import { SMOKE_WEED, DECAY_HIGHNESS } from './actions';

import { getStrainById } from '../utils/weed-utils';
import { getToolById } from '../utils/tool-utils';
import { CONVERSIONS, COME_DOWN_RATE } from '../utils/constants';

const initialState = {
  player: {
    weed: [
      {
        id: 0,
        quantity: 0.125 // in ozs
      }
    ],
    tools: [
      {
        id: 0,
        quantity: 1
      }
    ],
    highness: 0
  }
};

function getHigh(state = initialState.player, action = null) {
  const weed = Object.assign(
    {},
    getStrainById(action.strainId),
    state.weed.filter(strain => strain.id === action.strainId )[0]
  );
  const tool = getToolById(action.toolId);
  let { highness } = state;

  highness = Math.min(highness + weed.highness, 10);
  weed.quantity = Math.max(weed.quantity - (tool.size * CONVERSIONS.BOWL_TO_OZ), 0);

  return {
    ...state,
    weed: state.weed.map((strain) => {
      if (strain.id === action.strainId) {
        return weed;
      }
      return strain;
    }).filter(strain => strain.quantity > 0),
    highness
  };
}

function player(state = initialState.player, action = null) {
  switch (action.type) {
    case SMOKE_WEED:
      return getHigh(state, action);

    case DECAY_HIGHNESS:
      return {
        ...state,
        highness: Math.max(state.highness - (COME_DOWN_RATE * action.timeDelta), 0)
      };

    default:
      return state;
  }
}

export default combineReducers({
  player
});
