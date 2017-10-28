import PropTypes            from 'prop-types';
import React                from 'react';
import { Dialog }           from 'react-toolbox/lib/dialog';
import {
  Tab,
  Tabs }                    from 'react-toolbox';

import SellScreenContainer  from '../sellScreen/sellScreenContainer';

class BuySellModalComponent extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    view: PropTypes.number,

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
    return (
      <Dialog
        title='Buy / Sell'
        type='large'
        active={this.props.isOpen}
        actions={[{
          label: 'Cancel',
          raised: true,
          onClick: this.closeModal
        }]}>
        <Tabs
          hideMode='display'
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
