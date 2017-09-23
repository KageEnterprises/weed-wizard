import { connect } from 'react-redux';
import NotificationsComponent from './notificationsComponent';

import { updateNotifications } from '../state/actions';

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNotifications: () => {
      dispatch(updateNotifications());
    }
  };
};

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);

export default NotificationsContainer;
