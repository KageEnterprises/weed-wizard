export const PLANT_GROWTH_PHASES = [
  'Seedling',
  'Vegetative',
  'Budding',
  'Flowering',
  'Mature',
  'Over-Mature'
];

export const STRAINS = [
  {
    id: 0,
    tier: 0,
    name: `Schmendrick's Schwag`,
    description: `The schwiggitiest of schwag. Really not dank at all. Kinda gross, actually.`
  },
  {
    id: 1,
    tier: 1,
    name: `Dutchmen's Purps`,
    description: `An indica-heavy strain favored by sailors and lighthouse keepers.`
  },
  {
    id: 2,
    tier: 1,
    name: `Avalon Canna Cat`,
    description: `The purrfect strain for pretending cardboard boxes are castles and sleeping 18 hours a day.`
  },
  {
    id: 3,
    tier: 1,
    name: `Oregon Sorbet`,
    description: `Light and refreshing. The spritzer of weeds.`
  },
  {
    id: 4,
    tier: 1,
    name: `Goat Moonshine`,
    description: `As the name implies, this strain was first discovered in a field of stoned goats. Beware the munchies; you might try to eat anything.`
  },
  {
    id: 5,
    tier: 1,
    name: `Bob Mist`,
    description: `Some weed gets you in touch with Jah. This weed gets you in touch with Bob.`
  }
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
      lb: 1450,
      seed: 0.25
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
      lb: 1900,
      seed: 0.5
    },
    growthRate: 1,
    seedDropMod: 0.7,
    harvestAmount: 1,
    highness: 1.2,
    uom: 'oz'
  }
];