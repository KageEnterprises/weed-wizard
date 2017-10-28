export const CHANGE_BUY_SELL_MODAL_VIEW = 'CHANGE_BUY_SELL_MODAL_VIEW';
export const SET_BUY_SELL_MODAL_VISIBLE = 'SET_BUY_SELL_MODAL_VISIBLE';

export function changeBuySellModalView(index) {
  return {
    type: CHANGE_BUY_SELL_MODAL_VIEW,
    index
  };
}

export function setBuySellModalVisible(visible) {
  return {
    type: SET_BUY_SELL_MODAL_VISIBLE,
    visible
  };
}
