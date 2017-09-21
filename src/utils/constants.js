export const CONVERSIONS = {
  OZ_TO_GRAM: 28.3495,
  GRAM_TO_OZ: 0.035274,
  BOWL_TO_GRAM: 0.25, // 0.25 - 0.35 for a small bowl
  BOWL_TO_OZ: 0.00881849
};

export const STRAINS = [
  {
    id: 0,
    label: 'Schwag',
    description: 'The schwiggitiest of schwag. Really not dank at all. Kinda gross, actually.',
    prices: {
      g: 5,
      eighth: 15,
      quarter: 27,
      half: 50,
      oz: 95,
      lb: 1450
    },
    highness: 1, // I guess this is per bowl for now ... Still gotta work something out for this
    growthRate: 1,
    seedRate: 1,
    harvestAmount: 1
  }
];

export const TOOLS = [
  {
    id: 0,
    label: 'Homemade Pipe',
    description: `There are many ways to make your own pipe if you don't have one ... But they never turn out that great.`,
    size: 1 // in bowls
  }
];
