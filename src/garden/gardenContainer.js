import { connect } from 'react-redux';
import GardenComponent from './gardenComponent';
import {
  agePlant,
  increaseWeedQuantity,
  removePlant,
  addNotification
} from '../state/actions';
import { getStrainById } from '../utils/weedUtils';
import { BASE_HARVEST_PER_PLANT } from '../utils/constants';

const mapStateToProps = state => {
  return {
    garden: state.garden
  };
};

const mapDispatchToProps = dispatch => {
  return {
    agePlant: (plant) => {
      dispatch(agePlant(plant));
    },

    harvestPlant: (plant) => {
      const strainProps = getStrainById(plant.id);
      const quantity = BASE_HARVEST_PER_PLANT * strainProps.harvestAmount;
      dispatch(increaseWeedQuantity(plant.id, quantity));
      dispatch(removePlant(plant.gardenSquare));
      dispatch(addNotification(`You harvested ${quantity} ounces of ${plant.label}!`));
    },

    sendNotification: (notification) => {
      dispatch(addNotification(notification));
    }
  };
};

const GardenContainer = connect(mapStateToProps, mapDispatchToProps)(GardenComponent);

export default GardenContainer;
