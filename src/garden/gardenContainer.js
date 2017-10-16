import { connect }                from 'react-redux';

import {
  agePlant,
  removePlant,
  updatePlant }                   from './gardenActions';
import GardenComponent            from './gardenComponent';
import { addNotification }        from '../notifications/notificationsActions';
import { increaseWeedQuantity }   from '../player/playerActions';
import { BASE_HARVEST_PER_PLANT } from '../utils/constants';
import { getStrainById }          from '../utils/weedUtils';

const mapStateToProps = state => {
  return {
    activeSpells: state.magic.spellsYouKnow
      .filter(spell => spell.active)
      .map(spell => spell.id),
    gameIsRunning: state.game.isRunning,
    garden: state.garden
  };
};

const mapDispatchToProps = dispatch => {
  return {
    agePlant: (plant, ageDiff) => {
      dispatch(agePlant(plant, ageDiff));
    },

    harvestPlant: (plant) => {
      const strainProps = getStrainById(plant.id);
      const quantity = BASE_HARVEST_PER_PLANT * strainProps.harvestAmount;
      dispatch(increaseWeedQuantity(plant.id, quantity));
      dispatch(removePlant(plant.gardenSquare));
      dispatch(addNotification(`You harvested ${quantity} ounces of ${plant.label}!`));
    },

    removePlant: (plant) => {
      dispatch(removePlant(plant.gardenSquare));
    },

    sendNotification: (notification) => {
      dispatch(addNotification(notification));
    },

    updatePlant: (plant, lastUpdated) => {
      dispatch(updatePlant(plant, lastUpdated));
    }
  };
};

const GardenContainer = connect(mapStateToProps, mapDispatchToProps)(GardenComponent);

export default GardenContainer;
