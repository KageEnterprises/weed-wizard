import { connect }      from 'react-redux';

import { dismissAlert } from './alertsActions';
import AlertsComponent  from './alertsComponent';
import {
  pauseGame,
  resumeGame }          from '../game/gameActions';

const mapStateToProps = state => {
  return {
    content: state.alerts.content,
    header: state.alerts.header,
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

