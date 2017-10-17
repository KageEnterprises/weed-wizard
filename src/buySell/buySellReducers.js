import { SET_BUY_SELL_MODAL_VISIBLE } from './buySellActions';
import BuySellState                   from './buySellState';

export default function buySell(state = BuySellState, action = null) {
  switch (action.type) {
    case SET_BUY_SELL_MODAL_VISIBLE:
      return {
        ...state,
        visible: action.visible
      };

    default:
      return state;
  }
}
