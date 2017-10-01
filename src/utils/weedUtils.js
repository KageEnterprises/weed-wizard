import {
  TIERS,
  STRAINS,
  BASE_TIME_PER_PLANT_GROWTH_PHASE,
  PLANT_GROWTH_PHASES
} from './constants';
import { randomArrayItem } from './miscUtils';

const addTierPropsToStrain = (strain) => {
  const tierProps = getTierPropsById(strain.tier);

  return {
    ...tierProps,
    ...strain
  };
};

export const getStrainById = (id) => {
  let res;

  STRAINS.forEach((strain) => {
    if (strain.id === id) {
      res = strain;
    }
  });

  return addTierPropsToStrain(res);
};

export const getTierPropsById = (id) => {
  if (TIERS[id].id === id) return TIERS[id];

  let res;

  TIERS.forEach((tier) => {
    if (tier.id === id) {
      res = tier;
    }
  });

  return res;
};

export const getRandomTier1Strain = () => {
  const tier1Strains = STRAINS.filter(strain => strain.tier === 1);

  return randomArrayItem(tier1Strains);
};

export const plantAgeFilter = (age) => {
  const growthPhaseIndex = Math.min(
    PLANT_GROWTH_PHASES.length - 1,
    Math.floor(age / BASE_TIME_PER_PLANT_GROWTH_PHASE));

  return PLANT_GROWTH_PHASES[growthPhaseIndex];
};
