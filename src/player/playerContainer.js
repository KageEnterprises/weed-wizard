import { connect }            from 'react-redux';

import {
  decayHighness,
  selectTool,
  selectWeed }                from './playerActions';
import PlayerComponent        from './playerComponent';
import { changeSettingsUoM }  from '../settings/settingsActions';

const mapStateToProps = state => {
  const {
    highness,
    tools,
    weed } = state.player;
  const { settingsUoM } = state.settings;

  return {
    gameIsRunning: state.game.isRunning,
    highness,
    settingsUoM,
    tools,
    weed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    decayHighness: (timeDelta) => {
      dispatch(decayHighness(timeDelta));
    },

    onChangeSettingsUoM: (uom) => {
      dispatch(changeSettingsUoM(uom));
    },

    selectTool: (idx) => {
      dispatch(selectTool(idx));
    },

    selectWeed: (idx) => {
      dispatch(selectWeed(idx));
    }
  };
};

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);

export default PlayerContainer;
