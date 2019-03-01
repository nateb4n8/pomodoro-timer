
import {
  SET_START_TIME,
  INC_COMPLETED,
  SET_STATUS_IDLE,
  SET_STATUS_RUNNING,
  SET_STATUS_PAUSED,
} from '../actions/timer';

const initialState = {
  startTime: null,
  completeAmt: 0,
  status: 'IDLE',
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

    default:
      return state;
  }
}

export default timer;
