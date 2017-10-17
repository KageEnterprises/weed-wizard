import { connect }                from 'react-redux';

import { setBuySellModalVisible } from './buySellActions';
import BuySellModalComponent      from './buySellModalComponent';
import {
  pauseGame,
  resumeGame }                    from '../game/gameActions';

const mapStateToProps = state => {
  return {
    isOpen: state.buySell.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
