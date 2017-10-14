export const PAUSE_GAME = 'PAUSE_GAME';
export const RESUME_GAME = 'RESUME_GAME';

export function pauseGame() {
  return {
    type: PAUSE_GAME
  };
}

export function resumeGame() {
  return {
    type: RESUME_GAME
  };
}
