export const CANCEL_SALE = 'CANCEL_SALE';
export const SEEDS_FOR_SALE = 'SEEDS_FOR_SALE';
export const TOOLS_FOR_SALE = 'TOOLS_FOR_SALE';
export const WEED_FOR_SALE = 'WEED_FOR_SALE';

export function cancelSale() {
  return {
    type: CANCEL_SALE
  };
}

export function seedsForSale(weed, quantity) {
  return {
    type: SEEDS_FOR_SALE,
    weed,
    quantity
  };
}

export function toolsForSale(tool, quantity) {
  return {
    type: TOOLS_FOR_SALE,
    tool,
    quantity
  };
}

export function weedForSale(weed, quantity) {
  return {
    type: WEED_FOR_SALE,
    weed,
    quantity
  };
};
