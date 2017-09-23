import { connect } from 'react-redux';
import PlayerStatusComponent from '../components/playerStatusComponent';

const mapStateToProps = state => {
  const { weed, tools, highness } = state.player;

  return { weed, tools, highness };
};

const PlayerStatusContainer = connect(mapStateToProps)(PlayerStatusComponent);

export default PlayerStatusContainer;
