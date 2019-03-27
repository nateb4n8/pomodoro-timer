export const UPDATE_WORK_DURATION = 'UPDATE_WORK_DURATION';
export const UPDATE_BREAK_DURATION = 'UPDATE_BREAK_DURATION';
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
