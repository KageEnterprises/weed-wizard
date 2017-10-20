import PropTypes  from 'prop-types';
import React      from 'react';
import Dialog     from 'react-toolbox/lib/dialog';

class AlertsComponent extends React.Component {
  static propTypes = {
    actions: PropTypes.array,
    content: PropTypes.node,
    header: PropTypes.string,
    isOpen: PropTypes.bool,

    dismissAlert: PropTypes.func,
    pauseGame: PropTypes.func,
    resumeGame: PropTypes.func
  };

  static defaultProps = {
    actions: []
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

  closeModal = () => {
    this.props.dismissAlert();
    this.props.resumeGame();
  };

  render() {
    const actions = this.props.actions.length ?
      this.props.actions : [];

    actions.push({
      label: 'Okay',
      primary: true,
      raised: true,
      onClick: this.closeModal
    });

    return (
      <Dialog
        title={this.props.header ? this.props.header : null}
        actions={actions}
        active={this.props.isOpen}>
        {this.props.content ?
          this.props.content :
          null}
      </Dialog>
    );
  }
}

export default AlertsComponent;

