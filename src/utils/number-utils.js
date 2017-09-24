export function parseQuantity(quantity) {
  if (quantity < 0.125) {
    return 'less than an eighth of an';
  } else if (quantity === 0.125) {
    return 'an eighth of an';
  } else if (quantity < 0.25) {
    return 'less than a quarter of an';
  } else if (quantity === 0.25) {
    return 'a quarter of an';
  } else if (quantity < 0.375) {
    return 'less than three eighths of an';
  } else if (quantity === 0.375) {
    return 'three eighths of an';
  } else if (quantity < 0.5) {
    return 'less than a half of an';
  } else if (quantity === 0.5) {
    return 'a half of an';
  } else if (quantity < 0.625) {
    return 'less than five eighths of an';
  } else if (quantity === 0.625) {
    return 'five eighths of an';
  } else if (quantity < 0.75) {
    return 'less than three quarters of an';
  } else if (quantity === 0.75) {
    return 'three quarters of an';
  } else if (quantity < 0.875) {
    return 'less than seven eighths of an';
  } else if (quantity === 0.875) {
    return 'seven eighths of an';
  } else if (quantity < 1) {
    return 'less than an';
  } else if (quantity === 1) {
    return 'an';
  } else if (quantity < 1.5) {
    return 'less than one and a half';
  } else if (quantity === 1.5) {
    return 'one and a half';
  } else if (quantity < 2) {
    return 'less than two';
  //} else if (quantity === 2) {
  //  return 'two';
  //} else if (quantity < 3) {
  //  return 'less than three';
  //} else if (quantity === 3) {
  //  return 'three';
  //} else if (quantity < 4) {
  //  return 'less than four';
  //} else if (quantity === 4) {
  //  return 'four';
  //} else if (quantity < 5) {
  //  return 'less than five';
  } else {
    return fixedTo1orRounded(quantity);
  }
}

export function fixedTo1orRounded(number) {
  const fixed = number.toFixed(1);

  return fixed[fixed.length - 1] === '0'
    ? Math.round(number)
    : fixed;
}
