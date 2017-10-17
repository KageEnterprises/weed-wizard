import PropTypes  from 'prop-types';
import React      from 'react';
import { Dialog } from 'react-toolbox/lib/dialog';

class BuySellModalComponent extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,

    closeBuySell: PropTypes.func,
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

  closeModal = () => {
    this.props.closeBuySell();
    this.props.resumeGame();
  };

  render() {
    return (
      <Dialog
        title='Buy / Sell'
        active={this.props.isOpen}
        actions={[{
          label: 'Okay',
          primary: true,
          raised: true,
          onClick: this.closeModal
        }]}>
        <div>All the buy/sell shit goes here, woo!!</div>
      </Dialog>
    );
  }
}

export default BuySellModalComponent;
