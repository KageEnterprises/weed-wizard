import { connect }            from 'react-redux';

import {
  ageNotifications,
  notificationsUpdated }      from './notificationsActions';
import NotificationsComponent from './notificationsComponent';

const mapStateToProps = state => {
  return {
    gameIsRunning: state.game.isRunning,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ageNotifications: () => {
      dispatch(ageNotifications());
    },

    notificationsUpdated: () => {
      dispatch(notificationsUpdated());
    }
  };
};

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);

export default NotificationsContainer;
