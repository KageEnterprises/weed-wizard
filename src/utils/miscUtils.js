import { WEED_UOMS } from './constants';

export function randomArrayItem(array) {
  const length = array.length;
  const randIdx = Math.floor(Math.random() * length);

  return array[randIdx];
}

export function getUomByName(name) {
  let res;

  WEED_UOMS.forEach((uom) => {
    if (uom.name === name) {
      res = uom;
    }
  });

  return res;
}
