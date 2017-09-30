import { connect } from 'react-redux';
import GardenComponent from './gardenComponent';

const mapStateToProps = state => {
  return {
    garden: state.garden
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const GardenContainer = connect(mapStateToProps, mapDispatchToProps)(GardenComponent);

export default GardenContainer;
