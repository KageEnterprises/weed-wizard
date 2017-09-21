import { connect } from 'react-redux';
import InventoryComponent from '../components/inventory';

function getWeed(weed) {
  return weed;
}

function getTools(tools) {
  return tools;
}

function getHighness(highness) {
  return highness;
}

const mapStateToProps = state => {
  return {
    weed: getWeed(state.weed),
    tools: getTools(state.tools),
    highness: getHighness(state.highness)
  };
};

const InventoryContainer = connect(mapStateToProps)(InventoryComponent);

export default InventoryContainer;
