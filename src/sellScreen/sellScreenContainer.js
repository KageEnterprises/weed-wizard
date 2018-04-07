import { connect }          from 'react-redux';

import {
  seedsForSale,
  toolsForSale,
  weedForSale }             from './sellScreenActions';
import SellScreenComponent  from './sellScreenComponent';

const mapStateToProps = state => {
  const { forSale } = state;
  const {
      money,
      tools,
      weed } = state.player;
  const { settingsUoM } = state.settings;

  return {
    forSale,
    inventory: {
      tools,
      weed
    },
    money,
    settingsUoM
  };
};

const mapDispatchToProps = dispatch => {
  return {
    seedsForSale: (weed, quantity) => {
      dispatch(seedsForSale(weed, quantity));
    },

    toolsForSale: (tool, quantity) => {
      dispatch(toolsForSale(tool, quantity));
    },

    weedForSale: (weed, quantity) => {
      dispatch(weedForSale(weed, quantity));
    }
  };
};

const SellScreenContainer = connect(mapStateToProps, mapDispatchToProps)(SellScreenComponent);

export default SellScreenContainer;
