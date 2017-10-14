import { CHANGE_WEED_UOM } from './settingsActions';
import SettingsState from './settingsState';

export default function settings(settings = SettingsState, action = null) {
  switch (action.type) {
    case CHANGE_WEED_UOM:
      return {
        ...settings,
        settingsUoM: action.uom
      };
    default:
      return settings;
  }
}
