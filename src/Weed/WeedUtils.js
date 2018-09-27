import { BASE_TIME_PER_PLANT_GROWTH_PHASE } from '../utils/Constants';
import {
  PLANT_GROWTH_PHASES,
  STRAINS,
  TIERS
} from './WeedList';

export const getRandomTier1Strain = () => {
  const tier1 = TIERS[1];
  const tier1Strains = STRAINS.filter(STRAIN => STRAIN.tier === 1);

  return {
    ...tier1,
    ...tier1Strains[Math.floor(Math.random() * tier1Strains.length)]
  };
};

export const getStrainById = id => {
  const strain = STRAINS.find(STRAIN => STRAIN.id === id);
  const tier = TIERS.find(TIER => TIER.id === strain.tier);

  return {
    ...tier,
    ...strain
  };
};

export const plantAgePhaseFilter = age => Math.min(
    PLANT_GROWTH_PHASES.length - 1,
    Math.floor(age / BASE_TIME_PER_PLANT_GROWTH_PHASE));