import React from 'react';

import NotificationsDisplay from './NotificationsDisplay';
import AppContext from '../../AppContext';

class NotificationsContainer extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        { context => (
          <NotificationsDisplay
            loop={ context.loop }
            notifications={ context.notifications } />
        ) }
      </AppContext.Consumer>
    );
  }
}

export default NotificationsContainer;