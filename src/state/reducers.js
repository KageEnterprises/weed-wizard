import { combineReducers } from 'redux';

import {
  SELECT_WEED,
  SELECT_TOOL,
  INCREASE_HIGHNESS,
  INCREASE_WEED_QUANTITY,
  DECREASE_WEED_QUANTITY,
  DECREASE_SEED_QUANTITY,
  DECAY_HIGHNESS,
  UPDATE_NOTIFICATIONS,
  ADD_NOTIFICATION,
  CHANGE_WEED_UOM,
  ADD_SEED,
  PLANT_SEED,
  AGE_PLANT,
  REMOVE_PLANT
} from './actions';

import {
  COME_DOWN_RATE,
  DEFAULT_NOTIFICATION_LIFE,
  PLANT_GROWTH_PHASES
} from '../utils/constants';

import {
  getStrainById,
  plantAgeFilter
} from '../utils/weedUtils';

const initialPlayerState = () => {
  const strainProps = getStrainById(0);

  return {
    weed: [
      {
        ...strainProps,
        id: 0,
        quantity: 0.125, // in ozs
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
function player(state = initialPlayerState(), action = null) {
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

    case INCREASE_WEED_QUANTITY:
      if (state.weed.some(weed => weed.id === action.strainId)) {
        return {
          ...state,
          weed: state.weed.map((weed) => {
            if (weed.id === action.strainId) {
              return {
                ...weed,
                quantity: weed.quantity + action.amount
              };
            }
            return weed;
          })
        };
      }
      const strainProps = getStrainById(action.strainId);
      const newWeed = {
        ...strainProps,
        quantity: action.amount
      };
      return {
        ...state,
        weed: [
          ...state.weed,
          newWeed
        ]
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
        }).filter(strain => strain.quantity || strain.seeds)
      };

    case DECREASE_SEED_QUANTITY:
      return {
        ...state,
        weed: state.weed.map((strain) => {
          if (strain.id === action.strainId) {
            return {
              ...strain,
              seeds: Math.max(strain.seeds - 1, 0)
            };
          }
          return strain;
        }).filter(strain => strain.quantity || strain.seeds)
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
              seeds: (strain.seeds || 0) + 1
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
    case PLANT_SEED:
      const { strain } = action;
      const firstEmptyGardenSquare = state.indexOf(null);
      return [
        ...state.slice(0, firstEmptyGardenSquare),
        {
          ...strain,
          age: 0,
          ageUpdated: new Date(),
          phase: PLANT_GROWTH_PHASES[0],
          phaseIndex: 0,
          gardenSquare: firstEmptyGardenSquare
        },
        ...state.slice(firstEmptyGardenSquare + 1)
      ];

    case AGE_PLANT:
      const now = new Date();
      const plantFromState = state[action.plant.gardenSquare];
      const newPlantAge = plantFromState.age + (now - plantFromState.ageUpdated);
      const newPlantPhaseIndex = plantAgeFilter(newPlantAge);
      const newPlant = {
        ...plantFromState,
        age: newPlantAge,
        ageUpdated: now,
        phase: PLANT_GROWTH_PHASES[newPlantPhaseIndex],
        phaseIndex: newPlantPhaseIndex
      };

      return [
        ...state.slice(0, action.plant.gardenSquare),
        newPlant,
        ...state.slice(action.plant.gardenSquare + 1)
      ];

    case REMOVE_PLANT:
      return state.map((gardenSquare, idx) => {
        if (idx === action.gardenSquare) {
          return null;
        }
        return gardenSquare;
      });

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
