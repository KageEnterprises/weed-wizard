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
    money,
    tools,
    weed } = state.player;
  const { settingsUoM } = state.settings;

  return {
    gameIsRunning: state.game.isRunning,
    highness,
    money,
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

    selectWeed: (id) => {
      dispatch(selectWeed(id));
    }
  };
};

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);

export default PlayerContainer;
