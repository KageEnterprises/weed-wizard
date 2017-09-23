import { SMOKE_WEED, DECAY_HIGHNESS } from './actions';
import { getStrainById } from '../utils/weed-utils';
import { getToolById } from '../utils/tool-utils';
import { CONVERSIONS } from '../utils/constants';

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

export default function weedWizard(state = initialState, action = null) {
  function getHigh(strain) {
    const myStrain = Object.assign({}, getStrainById(strain), state.player.weed.filter((weed) => {
      return weed.id === strain;
    })[0]);

    let { highness } = state.player;
    if (myStrain.quantity > 0) {
      highness += myStrain.highness;
    }
    return Math.min(highness, 10);
  }

  function comeDown(highness, timeDelta) {
    const rate = .0001; // per millisecond

    return Math.max(highness - (rate * timeDelta), 0);
  }

  switch (action.type) {
    case SMOKE_WEED:
      const myStrain = getStrainById(action.strain);
      const myTool = getToolById(action.tool);

      return Object.assign({}, state, {
        player: {
          ...state.player,
          weed: state.player.weed.map((strain) => {
            if (strain.id === myStrain.id) {
              return Object.assign({}, strain, {
                quantity: Math.max(strain.quantity - (myTool.size * CONVERSIONS.BOWL_TO_OZ), 0)
              });
            }
            return strain;
          }).filter(strain => strain.quantity > 0),
          highness: getHigh(action.strain)
        }
      });
    case DECAY_HIGHNESS:
      return Object.assign({}, state, {
        player: {
          ...state.player,
          highness: comeDown(state.player.highness, action.timeDelta)
        }
      });
    default:
      return state;
  }
}
