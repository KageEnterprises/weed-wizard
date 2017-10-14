export const ADD_ALERT = 'ADD_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

export function addAlert(header, content) {
  return {
    type: ADD_ALERT,
    header,
    content
  };
}

export function dismissAlert() {
  return {
    type: DISMISS_ALERT
  };
}
