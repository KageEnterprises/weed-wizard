import PropTypes  from 'prop-types';
import React      from 'react';
import Modal      from 'react-modal';

import Button     from '../components/button';

import styles     from './alerts.css';

class AlertsComponent extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    header: PropTypes.string,
    isOpen: PropTypes.bool,

    dismissAlert: PropTypes.func,
    pauseGame: PropTypes.func,
    resumeGame: PropTypes.func
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.props.pauseGame();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen) {
      this.props.pauseGame();
    }
  }

  closeModal() {
    this.props.dismissAlert();
    this.props.resumeGame();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={styles.content}
        overlayClassName={styles.overlay}
        shouldCloseOnOverlayClick={false}>
        {this.props.header ?
          <h3>{this.props.header}</h3> :
          null}
        {this.props.content ?
          this.props.content :
          null}
        <Button
          label="Okay"
          onClick={() => { this.closeModal(); }} />
      </Modal>
    );
  }
}

export default AlertsComponent;

