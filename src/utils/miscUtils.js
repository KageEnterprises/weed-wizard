import { WEED_UOMS } from './constants';

export function getUomByName(name) {
  let res;

  WEED_UOMS.forEach((uom) => {
    if (uom.name === name) {
      res = uom;
    }
  });

  return res;
}
