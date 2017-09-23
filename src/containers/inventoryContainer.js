import { connect } from 'react-redux';
import InventoryComponent from '../components/inventoryComponent';

const mapStateToProps = state => {
  const { weed, tools, highness } = state.player;

  return { weed, tools, highness };
};

const InventoryContainer = connect(mapStateToProps)(InventoryComponent);

export default InventoryContainer;
