export const SET_START_TIME = 'SET_START_TIME';
export const SET_TIME_REMAINING = 'SET_TIME_REMAINING';
export const INC_COMPLETED = 'INC_COMPLETED';
export const SET_STATUS_IDLE = 'SET_STATUS_IDLE';
export const SET_STATUS_RUNNING = 'SET_STATUS_RUNNING';
export const SET_STATUS_PAUSED = 'SET_STATUS_PAUSED';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export function setStartTime(time) {
  return {
    type: SET_START_TIME,
    time,
  };
}

export function setTimeRemaining(timeRemaining) {
  return {
    type: SET_START_TIME,
    timeRemaining,
  };
}

export function incrementCompleted() {
  return {
    type: INC_COMPLETED,
  };
}

export function setStatusIdle() {
  return {
    type: SET_STATUS_IDLE,
  };
}

export function setStatusRunning() {
  return {
    type: SET_STATUS_RUNNING,
  };
}

export function setStatusPaused() {
  return {
    type: SET_STATUS_PAUSED,
  };
}

export function updateTimer({ startTime, timeRemaining }) {
  return {
    type: UPDATE_TIMER,
    startTime,
    timeRemaining,
  };
}
