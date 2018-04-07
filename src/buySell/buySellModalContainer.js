import { connect }            from 'react-redux';

import {
  changeBuySellModalView,
  setBuySellModalVisible }    from './buySellActions';
import BuySellModalComponent  from './buySellModalComponent';
import {
  pauseGame,
  resumeGame }                from '../game/gameActions';
import { cancelSale }         from '../sellScreen/sellScreenActions';

const mapStateToProps = state => {
  const forSaleCount = Object.keys(state.forSale).reduce((acc, key) => {
    acc += state.forSale[key].filter(item => item.quantity > 0).length;
    return acc;
  }, 0);

  return {
    forSaleCount,
    isOpen: state.buySell.visible,
    view: state.buySell.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: (index) => {
      dispatch(changeBuySellModalView(index));
    },

    closeBuySell: () => {
      dispatch(setBuySellModalVisible(false));
      dispatch(cancelSale());
    },

    pauseGame: () => {
      dispatch(pauseGame());
    },

    resumeGame: () => {
      dispatch(resumeGame());
    }
  };
};

const AlertsContainer = connect(mapStateToProps, mapDispatchToProps)(BuySellModalComponent);

export default AlertsContainer;
