import { connect } from 'react-redux';
import PlayerStatusComponent from '../playerStatus/playerStatusComponent';

import {
  selectWeed,
  selectTool,
  addNotification,
  changeSettingsUoM
} from '../state/actions';

const mapStateToProps = state => {
  const { weed, tools, highness } = state.player;
  const { settingsUoM } = state.settings;

  return { weed, tools, highness, settingsUoM };
};

const mapDispatchToProps = dispatch => {
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
    }
  };
};

const PlayerStatusContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerStatusComponent);

export default PlayerStatusContainer;
