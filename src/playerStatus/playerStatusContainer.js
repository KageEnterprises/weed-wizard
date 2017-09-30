import { connect } from 'react-redux';
import PlayerStatusComponent from './playerStatusComponent';

import {
  selectWeed,
  selectTool,
  addNotification,
  changeSettingsUoM,
  decayHighness
} from '../state/actions';

const mapStateToProps = state => {
  const { weed, tools, highness } = state.player;
  const { settingsUoM } = state.settings;

  return { weed, tools, highness, settingsUoM };
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

    weedRanOutNotification: (label) => {
      dispatch(addNotification(`You ran out of ${label}!`));
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

const PlayerStatusContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerStatusComponent);

export default PlayerStatusContainer;
