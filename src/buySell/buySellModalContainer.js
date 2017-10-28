import { connect }            from 'react-redux';

import {
  changeBuySellModalView,
  setBuySellModalVisible }    from './buySellActions';
import BuySellModalComponent  from './buySellModalComponent';
import {
  pauseGame,
  resumeGame }                from '../game/gameActions';

const mapStateToProps = state => {
  return {
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
