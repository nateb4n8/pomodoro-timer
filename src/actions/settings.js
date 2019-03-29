export const UPDATE_WORK_DURATION = 'UPDATE_WORK_DURATION';
export const UPDATE_BREAK_DURATION = 'UPDATE_BREAK_DURATION';
export const UPDATE_LONG_BREAK_DURATION = 'UPDATE_LONG_BREAK_DURATION';
export const UPDATE_WORK_SESSIONS = 'UPDATE_WORK_SESSIONS';
export const TOGGLE_LONG_BREAK = 'TOGGLE_LONG_BREAK';

export function updateWorkDuration(workDuration) {
  return {
    type: UPDATE_WORK_DURATION,
    workDuration,
  };
}

export function updateBreakDuration(breakDuration) {
  return {
    type: UPDATE_BREAK_DURATION,
    breakDuration,
  };
}

export function toggleLongBreak() {
  return {
    type: TOGGLE_LONG_BREAK,
  };
}

export function updateLongBreakDuration(longBreakDuration) {
  return {
    type: UPDATE_LONG_BREAK_DURATION,
    longBreakDuration,
  };
}

export function updateWorkSessions(workSessions) {
  return {
    type: UPDATE_WORK_SESSIONS,
    workSessions,
  };
}
