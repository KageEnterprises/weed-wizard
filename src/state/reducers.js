import { combineReducers } from 'redux';

import {
  SELECT_WEED,
  SELECT_TOOL,
  INCREASE_HIGHNESS,
  DECREASE_WEED_QUANTITY,
  DECAY_HIGHNESS,
  UPDATE_NOTIFICATIONS,
  ADD_NOTIFICATION,
  CHANGE_WEED_UOM,
  ADD_SEED
} from './actions';

import {
  COME_DOWN_RATE,
  DEFAULT_NOTIFICATION_LIFE
} from '../utils/constants';

const initialPlayerState = {
  weed: [
    {
      id: 0,
      quantity: 0.125, // in ozs
      uom: 'oz', // always saved in ozs
      selected: true,
      seeds: 0
    }
  ],
  tools: [
    {
      id: 0,
      quantity: 1,
      selected: true
    }
  ],
  highness: 0
};

const initialSettings = {
  settingsUoM: 'oz' // unit of measurement
};

/**
 * Player action reducers
 * @param state
 * @param action
 * @returns {*}
 */
function player(state = initialPlayerState, action = null) {
  switch (action.type) {
    case SELECT_WEED:
      return {
        ...state,
        weed: state.weed.map((weed, idx) => {
          return {
            ...weed,
            selected: idx === action.index
          };
        })
      };

    case SELECT_TOOL:
      return {
        ...state,
        tools: state.tools.map((tool, idx) => {
          return {
            ...tool,
            selected: idx === action.index
          };
        })
      };

    case INCREASE_HIGHNESS:
      return {
        ...state,
        highness: state.highness + action.amount
      };

    case DECREASE_WEED_QUANTITY:
      return {
        ...state,
        weed: state.weed.map((strain) => {
          if (strain.id === action.strainId) {
            return {
              ...strain,
              quantity: strain.quantity - action.amount
            };
          }
          return strain;
        })
      };

    case DECAY_HIGHNESS:
      return {
        ...state,
        highness: Math.max(state.highness - (COME_DOWN_RATE * action.timeDelta), 0)
      };

    case ADD_SEED:
      return {
        ...state,
        weed: state.weed.map((strain) => {
          if (strain.id === action.strain.id) {
            return {
              ...strain,
              seeds: strain.seeds + 1
            };
          }
          return strain;
        })
      };

    default:
      return state;
  }
}

/**
 * Notification action reducers
 * @param state
 * @param action
 * @returns {*}
 */
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

/**
 * Garden reducers
 */
function garden(state = [null], action = null) {
  switch (action.type) {
    default:
      return state;
  }
}

/**
 * Settings reducers
 * @param settings
 * @param action
 */
function settings(settings = initialSettings, action = null) {
  switch (action.type) {
    case CHANGE_WEED_UOM:
      return {
        ...settings,
        settingsUoM: action.uom
      };
    default:
      return settings;
  }
}

export default combineReducers({
  player,
  notifications,
  settings,
  garden
});
