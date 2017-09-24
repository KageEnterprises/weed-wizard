import { STRAINS } from './constants';

export function getStrainById(id) {
  let res;

  STRAINS.forEach((strain) => {
    if (strain.id === id) {
      res = strain;
    }
  });

  return res;
}
