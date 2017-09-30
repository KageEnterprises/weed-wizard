import { connect } from 'react-redux';
import PlayerActionsComponent from './playerActionsComponent';

import { smokeWeed, addNotification } from '../state/actions';

import { getToolById } from '../utils/tool-utils';
import { getStrainById } from '../utils/weed-utils';

const mapStateToProps = state => {
  return {
    hasWeed: state.player.weed.length > 0,
    selectedWeed: state.player.weed.filter(weed => weed.selected)[0],
    selectedTool: state.player.tools.filter(tool => tool.selected)[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSmokeWeed: (strainId, toolId) => {
      const strain = getStrainById(strainId);
      const tool = getToolById(toolId);

      dispatch(smokeWeed(strain, tool));
      dispatch(addNotification(`You smoked ${strain.label} out of ${tool.label}.`));
    }
  };
};

const PlayerActionsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerActionsComponent);

export default PlayerActionsContainer;
