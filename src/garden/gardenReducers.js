import {
  AGE_PLANT,
  PLANT_SEED,
  REMOVE_PLANT,
  UPDATE_PLANT }                from './gardenActions';
import GardenState              from './gardenState';

import { PLANT_GROWTH_PHASES }  from '../utils/constants';
import { plantAgeFilter }       from '../utils/weedUtils';

export default function garden(state = GardenState, action = null) {
  const now = new Date().valueOf();
  const plantFromState = action.plant ? state[action.plant.gardenSquare] : null;
  let newPlant;

  switch (action.type) {
    case AGE_PLANT:
      const newPlantAge = plantFromState.age + action.ageDiff;
      const newPlantPhaseIndex = plantAgeFilter(newPlantAge);
      newPlant = {
        ...plantFromState,
        age: newPlantAge,
        lastUpdated: now,
        phase: PLANT_GROWTH_PHASES[newPlantPhaseIndex],
        phaseIndex: newPlantPhaseIndex
      };

      return [
        ...state.slice(0, action.plant.gardenSquare),
        newPlant,
        ...state.slice(action.plant.gardenSquare + 1)
      ];

    case PLANT_SEED:
      const { strain } = action;
      const firstEmptyGardenSquare = state.indexOf(null);
      return [
        ...state.slice(0, firstEmptyGardenSquare),
        {
          ...strain,
          age: 0,
          lastUpdated: now,
          phase: PLANT_GROWTH_PHASES[0],
          phaseIndex: 0,
          gardenSquare: firstEmptyGardenSquare
        },
        ...state.slice(firstEmptyGardenSquare + 1)
      ];

    case REMOVE_PLANT:
      return state.map((gardenSquare, idx) => {
        if (idx === action.gardenSquare) {
          return null;
        }
        return gardenSquare;
      });

    case UPDATE_PLANT:
      newPlant = {
        ...plantFromState,
        lastUpdated: action.lastUpdated
      };
      return [
        ...state.slice(0, action.plant.gardenSquare),
        newPlant,
        ...state.slice(action.plant.gardenSquare + 1)
      ];

    default:
      return state;
  }
}
