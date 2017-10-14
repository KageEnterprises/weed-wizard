export const CHANGE_WEED_UOM = 'CHANGE_WEED_UOM';

export function changeSettingsUoM(uom) {
  return {
    type: CHANGE_WEED_UOM,
    uom
  };
}
