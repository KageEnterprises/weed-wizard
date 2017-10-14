import {
  ADD_SEED,
  DECAY_HIGHNESS,
  DECREASE_SEED_QUANTITY,
  DECREASE_WEED_QUANTITY,
  INCREASE_HIGHNESS,
  INCREASE_WEED_QUANTITY,
  SELECT_TOOL,
  SELECT_WEED
} from './playerActions';
import PlayerState from './playerState';
import { COME_DOWN_RATE } from '../utils/constants';
import { getStrainById } from '../utils/weedUtils';

export default function player(state = PlayerState, action = null) {
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
