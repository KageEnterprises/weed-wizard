export const CONVERSIONS = {
  OZ_TO_G: 28.3495,
  G_TO_OZ: 0.035274,
  BOWL_TO_G: 0.25, // 0.25 - 0.35 for a small bowl
  BOWL_TO_OZ: 0.00881849
};

export const COME_DOWN_RATE = .0001; // per millisecond
export const DEFAULT_NOTIFICATION_LIFE = 10000;
export const HIGHNESS_CAP = 10;
export const BASE_SEED_DROP_RATE = 0.2;
export const BASE_TIME_PER_PLANT_GROWTH_PHASE = 300000; // 5 minutes
export const BASE_HARVEST_PER_PLANT = 12; // In ounces

export const PLANT_GROWTH_PHASES = [
  'Seedling',
  'Vegetative',
  'Budding',
  'Flowering',
  'Mature',
  'Over-Mature'
];

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
    seedDropMod: 1,
    harvestAmount: 1,
    highness: 1,
    uom: 'oz'
  },
  {
    id: 1,
    prices: {
      g: 7,
      eighth: 20,
      quarter: 37,
      half: 69,
      oz: 125,
      lb: 1900
    },
    growthRate: 1,
    seedDropMod: 0.7,
    harvestAmount: 1,
    highness: 1.2,
    uom: 'oz'
  }
];

export const STRAINS = [
  {
    id: 0,
    tier: 0,
    label: `Schwag`,
    description: `The schwiggitiest of schwag. Really not dank at all. Kinda gross, actually.`
  },
  {
    id: 1,
    tier: 1,
    label: `Dutchmen's Purps`,
    description: `An indica-heavy strain favored by sailors and lighthouse keepers.`
  },
  {
    id: 2,
    tier: 1,
    label: `Avalon Canna Cat`,
    description: `The purrfect strain for pretending cardboard boxes are castles and sleeping 18 hours a day.`
  },
  {
    id: 3,
    tier: 1,
    label: `Oregon Sorbet`,
    description: `Light and refreshing. The spritzer of weeds.`
  },
  {
    id: 4,
    tier: 1,
    label: `Goat Moonshine`,
    description: `As the name implies, this strain was first discovered in a field of stoned goats. Beware the munchies; you might try to eat anything.`
  },
  {
    id: 5,
    tier: 1,
    label: `Bob Mist`,
    description: `Some weed gets you in touch with Jah. This weed gets you in touch with Bob.`
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
    plural: 'ounces',
    article: 'an'
  },
  {
    id: 1,
    name: 'g',
    label: 'gram',
    plural: 'grams',
    article: 'a'
  }
];
