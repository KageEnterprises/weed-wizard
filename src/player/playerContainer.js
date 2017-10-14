import { connect } from 'react-redux';
import PlayerComponent from './playerComponent';

import {
  selectWeed,
  selectTool,
  decayHighness
} from './playerActions';

import { changeSettingsUoM } from '../settings/settingsActions';

const mapStateToProps = state => {
  const { weed, tools, highness } = state.player;
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
  let lastUpdate = new Date();

  return {
    selectWeed: (idx) => {
      dispatch(selectWeed(idx));
    },

    selectTool: (idx) => {
      dispatch(selectTool(idx));
    },

    onChangeSettingsUoM: (uom) => {
      dispatch(changeSettingsUoM(uom));
    },

    decayHighness: () => {
      const now = new Date();
      const timeDelta = now - lastUpdate;

      if (timeDelta > 16) {
        dispatch(decayHighness(timeDelta));

        lastUpdate = new Date();
      }
    }
  };
};

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);

export default PlayerContainer;
