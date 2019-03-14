import moment from 'moment';

import {
  UPDATE_TIMER,
  RESET_SESSION,
  SET_PAUSED,
  SET_WORK_STARTED,
  WORK_COMPLETE,
  SET_BREAK_COMPLETE,
  SET_BREAK_STARTED,
} from '../actions/timer';

const initialWorkTimer = {
  type: 'WORK',
  duration: moment.duration(0.1, 'minutes').as('seconds'),
  timeRemaining: moment.duration(0.1, 'minutes').as('seconds'),
};

const initialBreakTimer = {
  type: 'BREAK',
  duration: moment.duration(0.05, 'minutes').as('seconds'),
  timeRemaining: moment.duration(0.05, 'minutes').as('seconds'),
};

const initialState = {
  status: 'IDLE',
  startTime: null,
  completeAmt: 0,
  sessionAmt: 4,
  timeIntervals: [],
  ...initialWorkTimer,
};

function getTimeElapsed(date) {
  const now = moment();
  const prev = moment(date);
  const diff = moment.duration(now.diff(prev)).as('seconds');
  return Math.round(diff);
}

function timer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIMER:
      return {
        ...state,
        timeRemaining: action.timeRemaining,
      };

    case RESET_SESSION:
      return initialState;

    case SET_WORK_STARTED:
      return {
        ...state,
        ...initialWorkTimer,
        status: 'RUNNING',
        startTime: new Date(),
      };

    case SET_BREAK_STARTED:
      return {
        ...state,
        ...initialBreakTimer,
        status: 'RUNNING',
        startTime: new Date(),
      };

    case SET_PAUSED:
      return {
        ...state,
        status: 'PAUSED',
        startTime: null,
        timeIntervals: [
          ...state.timeIntervals,
          getTimeElapsed(state.startTime),
        ],
      };

    case WORK_COMPLETE:
      return {
        ...state,
        completeAmt: state.completeAmt + 1,
        status: 'IDLE',
        timeIntervals: [],
        timeRemaining: 0,
      };
    
    case SET_BREAK_COMPLETE:
      return {
        ...state,
        ...initialWorkTimer,
        status: 'IDLE',
        startTime: null,
      };

    default:
      return state;
  }
}

export default timer;
