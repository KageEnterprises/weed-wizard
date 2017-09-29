import { CONVERSIONS } from './constants';
import { getUomByName } from './misc-utils';

export function parseQuantity(weed, uom = 'oz') {
  const fullUom = getUomByName(uom);
  const convertedQuantity = weed.uom === uom
    ? weed.quantity
    : weed.quantity * CONVERSIONS[`${weed.uom.toUpperCase()}_TO_${uom.toUpperCase()}`];

  if (convertedQuantity < 0.125) {
    return `less than an eighth of ${fullUom.article}`;
  } else if (convertedQuantity === 0.125) {
    return `an eighth of ${fullUom.article}`;
  } else if (convertedQuantity < 0.25) {
    return `less than a quarter of ${fullUom.article}`;
  } else if (convertedQuantity === 0.25) {
    return `a quarter of ${fullUom.article}`;
  } else if (convertedQuantity < 0.375) {
    return `less than three eighths of ${fullUom.article}`;
  } else if (convertedQuantity === 0.375) {
    return `three eighths of ${fullUom.article}`;
  } else if (convertedQuantity < 0.5) {
    return `less than a half of ${fullUom.article}`;
  } else if (convertedQuantity === 0.5) {
    return `a half of ${fullUom.article}`;
  } else if (convertedQuantity < 0.625) {
    return `less than five eighths of ${fullUom.article}`;
  } else if (convertedQuantity === 0.625) {
    return `five eighths of ${fullUom.article}`;
  } else if (convertedQuantity < 0.75) {
    return `less than three quarters of ${fullUom.article}`;
  } else if (convertedQuantity === 0.75) {
    return `three quarters of ${fullUom.article}`;
  } else if (convertedQuantity < 0.875) {
    return `less than seven eighths of ${fullUom.article}`;
  } else if (convertedQuantity === 0.875) {
    return `seven eighths of ${fullUom.article}`;
  } else if (convertedQuantity < 1) {
    return `less than ${fullUom.article}`;
  } else if (convertedQuantity === 1) {
    return `${fullUom.article}`;
  } else if (convertedQuantity < 1.5) {
    return `less than one and a half`;
  } else if (convertedQuantity === 1.5) {
    return `one and a half`;
  } else if (convertedQuantity < 2) {
    return `less than two`;
  //} else if (convertedQuantity === 2) {
  //  return `two`;
  //} else if (convertedQuantity < 3) {
  //  return `less than three`;
  //} else if (convertedQuantity === 3) {
  //  return `three`;
  //} else if (convertedQuantity < 4) {
  //  return `less than four`;
  //} else if (convertedQuantity === 4) {
  //  return `four`;
  //} else if (convertedQuantity < 5) {
  //  return `less than five`;
  } else {
    return fixedTo1orRounded(convertedQuantity);
  }
}

export function fixedTo1orRounded(number) {
  const fixed = number.toFixed(1);

  return fixed[fixed.length - 1] === '0'
    ? Math.round(number)
    : fixed;
}
