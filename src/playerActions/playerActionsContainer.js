import { connect } from 'react-redux';
import PlayerActionsComponent from '../playerActions/playerActionsComponent';

import { smokeWeed } from '../state/actions';

const mapStateToProps = state => {
  return {
    hasWeed: state.player.weed.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSmokeWeed: (strainId, toolId) => {
      dispatch(smokeWeed(strainId, toolId));
    }
  };
};

const PlayerActionsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerActionsComponent);

export default PlayerActionsContainer;
