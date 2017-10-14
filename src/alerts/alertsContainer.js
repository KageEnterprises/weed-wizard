import { connect } from 'react-redux';
import AlertsComponent from './alertsComponent';

import { dismissAlert } from './alertsActions';
import {
  pauseGame,
  resumeGame
} from '../game/gameActions';

const mapStateToProps = state => {
  return {
    header: state.alerts.header,
    content: state.alerts.content,
    isOpen: state.alerts.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dismissAlert: () => {
      dispatch(dismissAlert());
    },

    pauseGame: () => {
      dispatch(pauseGame());
    },

    resumeGame: () => {
      dispatch(resumeGame());
    }
  };
};

const AlertsContainer = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default AlertsContainer;

