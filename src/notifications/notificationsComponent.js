import React from 'react';
import PropTypes from 'prop-types';

import styles from './notifications.css';

class NotificationsComponent extends React.Component {
  static propTypes = {
    gameIsRunning: PropTypes.bool,
    notifications: PropTypes.array,
    ageNotifications: PropTypes.func,
    notificationsUpdated: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.ageNotificationsWhenGameIsRunning = this.ageNotificationsWhenGameIsRunning.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
  }

  componentDidMount() {
    this.context.loop.subscribe(this.ageNotificationsWhenGameIsRunning);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.ageNotificationsWhenGameIsRunning);
  }

  ageNotificationsWhenGameIsRunning() {
    if (this.props.gameIsRunning) {
      this.props.ageNotifications();
    }
    this.props.notificationsUpdated();
  }

  renderNotifications() {
    return this.props.notifications.sort((a, b) => b.timeStamp - a.timeStamp)
      .map(notification => (
        <div key={`${notification.created}${notification.message}`}>
          <p>{notification.message}</p>
        </div>
      ));
  }

  render() {
    return (
      <div className={styles.notifications}>
        <h3>Notifications</h3>
        {this.renderNotifications()}
      </div>
    );
  }
}

export default NotificationsComponent;
