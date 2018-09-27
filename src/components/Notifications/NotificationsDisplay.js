import React from 'react';

import {
  IconButton,
  Snackbar
} from '@material-ui/core';
import {
  Close as CloseIcon
} from '@material-ui/icons';

import { contextPropTypes } from '../../AppContext';
import {
  DEFAULT_NOTIFICATION_TIME
} from '../../utils/Constants';

class NotificationsDisplay extends React.Component {
  static propTypes = {
    loop: contextPropTypes.loopShape,
    notifications: contextPropTypes.notificationsShape
  };

  constructor(props) {
    super(props);

    this.queue = props.notifications;

    this.state = {
      open: false,
      messageInfo: {}
    };
  }

  componentDidMount() {
    const {
      loop,
      notifications } = this.props;
    const { open } = this.state;

    this.callbackId = loop.subscribe(() => {
      if (!open && notifications.length) this.processQueue();
    });
  }

  componentWillUnmount() {
    this.props.context.loop.unsubscribe(this.callbackId);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  render() {
    const {
      message,
      key
    } = this.state.messageInfo;

    return (
      <Snackbar
        key={ key }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'left',
        } }
        open={ this.state.open }
        autoHideDuration={ DEFAULT_NOTIFICATION_TIME }
        onClose={ this.handleClose }
        onExited={ this.handleExited }
        ContentProps={ {
          'aria-describedby': 'message-id',
        } }
        message={ <span id="message-id">{ message }</span> }
        action={ (
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={ this.handleClose }>
            <CloseIcon />
          </IconButton>
        ) }
      />
    );
  }
}

export default NotificationsDisplay;