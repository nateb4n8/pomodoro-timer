import moment from 'moment';

import {
  SET_STARTED,
  SET_PAUSED,
  SET_COMPLETE,
} from '../actions/breakTimer';

const defaultState = {
  status: 'IDLE',
  startTime: null,
  duration: moment.duration(0.05, 'minutes').as('seconds'),
  timeRemaining: moment.duration(0.05, 'minutes').as('seconds'),
};

const initialState = {
  status: 'IDLE',
  startTime: null,
  duration: moment.duration(0.05, 'minutes').as('seconds'),
  timeRemaining: moment.duration(0.05, 'minutes').as('seconds'),
};

function breakTimer(state = initialState, action) {
  switch (action.type) {
    // case UPDATE_TIMER:
    //   return {
    //     ...state,
    //     timeRemaining: action.timeRemaining,
    //   };

    // case RESET_SESSION:
    //   return defaultState;

    case SET_STARTED:
      return {
        ...state,
        status: 'RUNNING',
        startTime: new Date(),
      };

    case SET_PAUSED:
      return {
        ...state,
        status: 'PAUSED',
        startTime: null,
      };

    case SET_COMPLETE:
      return {
        ...state,
        timeRemaining: defaultState.timeRemaining,
        completeAmt: state.completeAmt + 1,
        status: 'IDLE',
      };

    default:
      return state;
  }
}

export default breakTimer;
