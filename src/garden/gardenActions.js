export const AGE_PLANT = 'AGE_PLANT';
export const PLANT_SEED = 'PLANT_SEED';
export const REMOVE_PLANT = 'REMOVE_PLANT';

export function agePlant(plant) {
  return {
    type: AGE_PLANT,
    plant
  };
}

export function plantSeed(strain) {
  return {
    type: PLANT_SEED,
    strain
  };
}

export function removePlant(gardenSquare) {
  return {
    type: REMOVE_PLANT,
    gardenSquare
  };
}

