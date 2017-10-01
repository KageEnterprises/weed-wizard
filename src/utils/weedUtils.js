import {
  TIERS,
  STRAINS
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
