import React from 'react';
import PropTypes from 'prop-types';

import './notifications.css';

class NotificationsComponent extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    updateNotifications: PropTypes.func
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.renderNotifications = this.renderNotifications.bind(this);
  }

  componentDidMount() {
    this.context.loop.subscribe(this.props.updateNotifications);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.props.updateNotifications);
  }

  renderNotifications() {
    return this.props.notifications.sort((a, b) => b.timeStamp - a.timeStamp)
      .map(notification => (
        <div key={notification.timeStamp}>
          <p>{notification.message}</p>
        </div>
      ));
  }

  render() {
    return (
      <div className="notifications">
        <h3>Notifications</h3>
        {this.renderNotifications()}
      </div>
    );
  }
}

export default NotificationsComponent;
