import PropTypes            from 'prop-types';
import React                from 'react';
import { Dialog }           from 'react-toolbox/lib/dialog';
import {
  Tab,
  Tabs }                    from 'react-toolbox';

import SellScreenContainer  from '../sellScreen/sellScreenContainer';

class BuySellModalComponent extends React.Component {
  static propTypes = {
    forSaleCount: PropTypes.number,
    isOpen: PropTypes.bool,
    view: PropTypes.number, // 0 for buy, 1 for sell

    changeView: PropTypes.func,
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

  changeView = (index) => {
    this.props.changeView(index);
  };

  closeModal = () => {
    this.props.closeBuySell();
    this.props.resumeGame();
  };

  render() {
    const actions = [{
      label: 'Cancel',
      raised: true,
      onClick: this.closeModal
    }];

    if (this.props.view === 1) {
      actions.push({
        label: 'Find Buyer',
        raised: this.props.forSaleCount > 0,
        primary: true,
        disabled: this.props.forSaleCount <= 0
      });
    }

    return (
      <Dialog
        title='Buy / Sell'
        type='large'
        active={this.props.isOpen}
        actions={actions}>
        <Tabs
          index={this.props.view}
          onChange={(index) => { this.changeView(index); }}>
          <Tab label='Buy'>
            Buy
          </Tab>
          <Tab label='Sell'>
            <SellScreenContainer />
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

export default BuySellModalComponent;
