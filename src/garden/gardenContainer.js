import { connect } from 'react-redux';
import GardenComponent from './gardenComponent';
import { agePlant } from '../state/actions';

const mapStateToProps = state => {
  return {
    garden: state.garden
  };
};

const mapDispatchToProps = dispatch => {
  return {
    agePlant: (plant) => {
      dispatch(agePlant(plant));
    }
  };
};

const GardenContainer = connect(mapStateToProps, mapDispatchToProps)(GardenComponent);

export default GardenContainer;
