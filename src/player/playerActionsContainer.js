import React                      from 'react';
import { connect }                from 'react-redux';

import { setBuySellModalVisible } from '../buySell/buySellActions';
import { addAlert }               from '../alerts/alertsActions';
import { plantSeed }              from '../garden/gardenActions';
import { addNotification }        from '../notifications/notificationsActions';
import {
  addSeed,
  decreaseSeedQuantity,
  decreaseWeedQuantity,
  increaseHighness }              from './playerActions';
import PlayerActionsComponent     from './playerActionsComponent';
import {
  BASE_SEED_DROP_RATE,
  CONVERSIONS }                   from '../utils/constants';
import { getToolById }            from '../utils/toolUtils';
import {
  getRandomTier1Strain,
  getStrainById }                 from '../utils/weedUtils';

const mapStateToProps = state => {
  const selectedWeedFromState = state.player.weed.filter(weed => weed.selected)[0];
  const selectedWeedProps = selectedWeedFromState ? getStrainById(selectedWeedFromState.id) : null;
  const selectedWeed = {
    ...selectedWeedFromState,
    ...selectedWeedProps
  };

  const selectedToolFromState = state.player.tools.filter(tool => tool.selected)[0];
  const selectedToolProps = getToolById(selectedToolFromState.id);
  const selectedTool = {
    ...selectedToolFromState,
    ...selectedToolProps
  };

  const emptyGardenSquare = state.garden.some(gardenSquare => gardenSquare === null);

  return {
    emptyGardenSquare,
    selectedTool,
    selectedWeed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlantSeed: (strain) => {
      let strainToPlant = strain;

      if (strainToPlant.id === 0) {
        strainToPlant = getRandomTier1Strain();
      }

      dispatch(plantSeed(strainToPlant));
      dispatch(decreaseSeedQuantity(strain.id));
      dispatch(addNotification(`You planted a ${strainToPlant.label} plant!`));
    },

    onSmokeWeed: (strain, tool) => {
      const strainProps = getStrainById(strain.id);
      const toolProps = getToolById(tool.id);
      const fullStrain = {
        ...strainProps,
        ...strain
      };
      const fullTool = {
        ...toolProps,
        ...tool
      };
      const baseBowlSize = CONVERSIONS[`BOWL_TO_${fullStrain.uom.toUpperCase()}`];

      const amountToSmoke = Math.min(
        fullStrain.quantity,
        fullTool.size * baseBowlSize
      );

      dispatch(increaseHighness(fullStrain.highness * (amountToSmoke / baseBowlSize)));
      dispatch(decreaseWeedQuantity(strain.id, amountToSmoke));
      dispatch(addNotification(`You smoked ${fullStrain.label} out of ${fullTool.label}.`));

      if (Math.random() <= BASE_SEED_DROP_RATE * fullStrain.seedDropMod) {
        dispatch(addSeed(strain));
        dispatch(addNotification('You found a seed!'));
      }

      if (fullStrain.quantity - amountToSmoke <= 0) {
        dispatch(addNotification(`You ran out of ${fullStrain.label}!`));
      }
    },

    openBuySell: () => {
      dispatch(setBuySellModalVisible(true));
    },

    pauseGame: () => {
      dispatch(addAlert('Game Is Paused', <div><p>Click Okay to unpause</p></div>));
    }
  };
};

const PlayerActionsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerActionsComponent);

export default PlayerActionsContainer;
