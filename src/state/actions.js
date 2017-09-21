export const SMOKE_WEED = 'SMOKE_WEED';

export function smokeWeed(strainId, toolId) {
  return {
    type: SMOKE_WEED,
    strain: strainId,
    tool: toolId
  };
}

export const DECAY_HIGHNESS = 'DECAY_HIGHNESS';

export function decayHighness(timeDelta) {
  return {
    type: DECAY_HIGHNESS,
    timeDelta
  };
}
