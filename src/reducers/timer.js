import moment from 'moment';

import {
  SET_START_TIME,
  INC_COMPLETED,
  SET_STATUS_IDLE,
  SET_STATUS_RUNNING,
  SET_STATUS_PAUSED,
  SET_TIME_REMAINING,
  UPDATE_TIMER,
} from '../actions/timer';

const initialState = {
  status: 'IDLE',
  startTime: null,
  timeRemaining: moment.duration(25, 'minutes').as('seconds'),
  completeAmt: 0,
  sessionAmt: 4,
};

function timer(state = initialState, action) {
  switch (action.type) {
    case SET_START_TIME:
      return {
        ...state,
        startTime: action.time,
      };

    case INC_COMPLETED:
      return {
        ...state,
        completeAmt: state.completeAmt + 1,
      };

    case SET_STATUS_IDLE:
      return {
        ...state,
        status: 'IDLE',
      };

    case SET_STATUS_RUNNING:
      return {
        ...state,
        status: 'RUNNING',
      };

    case SET_STATUS_PAUSED:
      return {
        ...state,
        status: 'PAUSED',
      };

    case SET_TIME_REMAINING:
      return {
        ...state,
        timeRemaining: action.timeRemaining,
      };

    case UPDATE_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        timeRemaining: action.timeRemaining,
      };

    default:
      return state;
  }
}

export default timer;
