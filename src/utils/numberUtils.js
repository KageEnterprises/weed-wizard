import { CONVERSIONS }  from './constants';
import { getUomByName } from './miscUtils';

export function fixedTo1orRounded(number) {
  const fixed = number.toFixed(1);

  return fixed[fixed.length - 1] === '0'
    ? Math.round(number)
    : fixed;
}

export function parseQuantity(weed, uom = getUomByName('oz')) {
  const convertedQuantity = weed.uom === uom.name
    ? weed.quantity
    : weed.quantity * CONVERSIONS[`${weed.uom.toUpperCase()}_TO_${uom.name.toUpperCase()}`];

  if (convertedQuantity <= 0) {
    return `none!`;
  } else if (convertedQuantity < 0.125) {
    return `less than an eighth of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.125) {
    return `an eighth of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.25) {
    return `less than a quarter of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.25) {
    return `a quarter of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.375) {
    return `less than three eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.375) {
    return `three eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.5) {
    return `less than a half of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.5) {
    return `a half of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.625) {
    return `less than five eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.625) {
    return `five eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.75) {
    return `less than three quarters of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.75) {
    return `three quarters of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 0.875) {
    return `less than seven eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 0.875) {
    return `seven eighths of ${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 1) {
    return `less than ${uom.article} ${uom.label}`;
  } else if (convertedQuantity === 1) {
    return `${uom.article} ${uom.label}`;
  } else if (convertedQuantity < 1.5) {
    return `less than one and a half ${uom.plural}`;
  } else if (convertedQuantity === 1.5) {
    return `one and a half ${uom.plural}`;
  } else if (convertedQuantity < 2) {
    return `less than two ${uom.plural}`;
  } else {
    return `${fixedTo1orRounded(convertedQuantity)} ${uom.plural}`;
  }
}
