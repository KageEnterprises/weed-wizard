export const CONVERSIONS = {
  OZ_TO_G: 28.3495,
  G_TO_OZ: 0.035274,
  BOWL_TO_G: 0.25, // 0.25 - 0.35 for a small bowl
  BOWL_TO_OZ: 0.00881849
};

export const COME_DOWN_RATE = .0001; // per millisecond
export const DEFAULT_NOTIFICATION_LIFE = 10000;
export const HIGHNESS_CAP = 10;

export const TIERS = [
  {
    id: 0,
    prices: {
      g: 5,
      eighth: 15,
      quarter: 27,
      half: 50,
      oz: 95,
      lb: 1450
    },
    growthRate: 1,
    seedRate: 1,
    harvestAmount: 1
  }
];

export const STRAINS = [
  {
    id: 0,
    tier: 0,
    label: `Schwag`,
    description: `The schwiggitiest of schwag. Really not dank at all. Kinda gross, actually.`,
    highness: 1
  }
];

export const TOOLS = [
  {
    id: 0,
    label: `Homemade Pipe`,
    description: `There are many ways to make your own pipe if you don't have one ... But they never turn out that great.`,
    size: 1 // in bowls
  }
];

export const WEED_UOMS = [
  {
    id: 0,
    name: 'oz',
    label: 'ounce',
    article: 'an'
  },
  {
    id: 1,
    name: 'g',
    label: 'gram',
    article: 'a'
  }
];
