import { CONVERSIONS }  from './constants';
import { getUomByName } from './miscUtils';

export function fixedTo1orRounded(number) {
  const fixed = number.toFixed(1);

  return fixed[fixed.length - 1] === '0'
    ? Math.round(number).toString()
    : fixed.toString();
}

export function moneyFilter(amount, symbol = '') {
  return `${symbol}${amount.toFixed(2).toString()}`;
}

export function parseQuantity(weed, uom = getUomByName('oz')) {
  const convertedQuantity = weed.uom === uom.name
    ? weed.quantity
    : weed.quantity * CONVERSIONS[`${weed.uom.toUpperCase()}_TO_${uom.name.toUpperCase()}`];

  if (convertedQuantity <= 0) {
    return `0`;
  } else if (convertedQuantity < 0.125) {
    return `< 1/8`;
  } else if (convertedQuantity === 0.125) {
    return `1/8`;
  } else if (convertedQuantity < 0.25) {
    return `< 1/4`;
  } else if (convertedQuantity === 0.25) {
    return `1/4`;
  } else if (convertedQuantity < 0.375) {
    return `< 3/8`;
  } else if (convertedQuantity === 0.375) {
    return `3/8`;
  } else if (convertedQuantity < 0.5) {
    return `< 1/2`;
  } else if (convertedQuantity === 0.5) {
    return `1/2`;
  } else if (convertedQuantity < 0.625) {
    return `< 5/8`;
  } else if (convertedQuantity === 0.625) {
    return `5/8`;
  } else if (convertedQuantity < 0.75) {
    return `< 3/4`;
  } else if (convertedQuantity === 0.75) {
    return `3/4`;
  } else if (convertedQuantity < 0.875) {
    return `< 7/8`;
  } else if (convertedQuantity === 0.875) {
    return `7/8`;
  } else if (convertedQuantity < 1) {
    return `< 1`;
  } else {
    return `${fixedTo1orRounded(convertedQuantity)}`;
  }
}
