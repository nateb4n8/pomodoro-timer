export const UPDATE_TIMER = 'UPDATE_TIMER';
export const RESET_SESSION = 'RESET_SESSION';
export const SET_PAUSED = 'SET_PAUSED';

export function updateTimer({ timeRemaining }) {
  return {
    type: UPDATE_TIMER,
    timeRemaining,
  };
}

export function resetSession() {
  return {
    type: RESET_SESSION,
  };
}

export const setPaused = () => ({ type: SET_PAUSED });


export const SET_WORK_STARTED = 'SET_WORK_STARTED';
export const WORK_COMPLETE = 'WORK_COMPLETE';

export const setWorkStarted = () => ({ type: SET_WORK_STARTED });
export const workComplete = () => ({ type: WORK_COMPLETE });

export const SET_BREAK_STARTED = 'SET_BREAK_STARTED';
export const SET_BREAK_COMPLETE = 'SET_BREAK_COMPLETE';

export const setBreakStarted = () => ({ type: SET_BREAK_STARTED });
export const setBreakComplete = () => ({ type: SET_BREAK_COMPLETE });
