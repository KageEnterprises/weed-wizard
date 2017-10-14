import {
  ADD_ALERT,
  DISMISS_ALERT
} from './alertsActions';

import AlertsState from './alertsState';

export default function alerts(state = AlertsState, action = null) {
  switch (action.type) {
    case ADD_ALERT:
      const { header, content } = action;
      return {
        header,
        content,
        isOpen: true
      };

    case DISMISS_ALERT:
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
}
