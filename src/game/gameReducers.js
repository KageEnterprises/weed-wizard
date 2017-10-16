import {
  PAUSE_GAME,
  RESUME_GAME }   from './gameActions';
import GameState  from './gameState';

export default function game(state = GameState, action = null) {
  switch (action.type) {
    case PAUSE_GAME:
      return {
        ...state,
        isRunning: false
      };

    case RESUME_GAME:
      return {
        ...state,
        isRunning: true
      };

    default:
      return state;
  }
}
