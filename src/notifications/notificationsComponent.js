import PropTypes  from 'prop-types';
import React      from 'react';
import {
  List,
  ListItem,
  ListSubHeader } from 'react-toolbox/lib/list';

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
    return this.props.notifications
      .map((notification, idx) => {
        const message = typeof notification.message === 'string' ?
          <span>{notification.message}</span> :
          notification.message;

        return (
          <ListItem
            key={idx}>
            {message}
          </ListItem>
        );
      });
  }

  render() {
    return (
      <List>
        <ListSubHeader caption='Notifications' />
        {this.renderNotifications()}
      </List>
    );
  }
}

export default NotificationsComponent;
