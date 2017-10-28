import { connect }        from 'react-redux';

import SellScreenComponent from './sellScreenComponent';

const mapStateToProps = state => {
  const {
      money,
      tools,
      weed } = state.player;
  const { settingsUoM } = state.settings;

  return {
    money,
    settingsUoM,
    tools,
    weed
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const SellScreenContainer = connect(mapStateToProps, mapDispatchToProps)(SellScreenComponent);

export default SellScreenContainer;
