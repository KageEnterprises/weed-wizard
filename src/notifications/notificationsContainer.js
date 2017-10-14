import { connect } from 'react-redux';
import NotificationsComponent from './notificationsComponent';

import {
  ageNotifications,
  notificationsUpdated,
} from './notificationsActions';

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
