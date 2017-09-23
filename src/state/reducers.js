import { combineReducers } from 'redux';

import {
  SMOKE_WEED,
  DECAY_HIGHNESS,
  UPDATE_NOTIFICATIONS,
  ADD_NOTIFICATION
} from './actions';

import {
  CONVERSIONS,
  COME_DOWN_RATE,
  DEFAULT_NOTIFICATION_LIFE
} from '../utils/constants';

const initialPlayerState = {
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
};

function getHigh(state = initialPlayerState, action = null) {
  const weed = Object.assign(
    {},
    action.strain,
    state.weed.filter(strain => strain.id === action.strain.id )[0]
  );
  let { highness } = state;

  highness = Math.min(highness + weed.highness, 10);
  weed.quantity = Math.max(weed.quantity - (action.tool.size * CONVERSIONS.BOWL_TO_OZ), 0);

  return {
    ...state,
    weed: state.weed.map((strain) => {
      if (strain.id === action.strain.id) {
        return weed;
      }
      return strain;
    }).filter(strain => strain.quantity > 0),
    highness
  };
}

function player(state = initialPlayerState, action = null) {
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

function notifications(state = [{
  message: 'Welcome to Weed Wizard!',
  life: DEFAULT_NOTIFICATION_LIFE,
  timeStamp: new Date().valueOf()
}], action = null) {
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

export default combineReducers({
  player,
  notifications
});
