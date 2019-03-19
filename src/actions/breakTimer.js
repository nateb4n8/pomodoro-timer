export const UPDATE_TIMER = 'UPDATE_TIMER';
export const SET_BREAK_STARTED = 'SET_BREAK_STARTED';
export const SET_BREAK_PAUSED = 'SET_BREAK_PAUSED';
export const SET_BREAK_COMPLETE = 'SET_BREAK_COMPLETE';


export function updateTimer({ timeRemaining }) {
  return {
    type: UPDATE_TIMER,
    timeRemaining,
  };
}

export const setBreakStarted = () => ({ type: SET_BREAK_STARTED });
export const setBreakPaused = () => ({ type: SET_BREAK_PAUSED });
export const breakComplete = () => ({ type: SET_BREAK_COMPLETE });
