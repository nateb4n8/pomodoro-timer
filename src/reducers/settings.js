import moment from 'moment';

import {
  UPDATE_WORK_DURATION,
  UPDATE_BREAK_DURATION,
  TOGGLE_LONG_BREAK,
  UPDATE_LONG_BREAK_DURATION,
  UPDATE_WORK_SESSIONS,
} from '../actions/settings';


const initialState = {
  workDuration: moment.duration(25, 'minutes').asSeconds(),
  breakDuration: moment.duration(5, 'minutes').asSeconds(),
  longBreakEnabled: false,
  longBreakDuration: moment.duration(10, 'minutes').asSeconds(),
  workSessions: 4,
};

function settings(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WORK_DURATION:
      return {
        ...state,
        workDuration: moment.duration(action.workDuration, 'minutes').asSeconds(),
      };

    case UPDATE_BREAK_DURATION:
      return {
        ...state,
        breakDuration: moment.duration(action.breakDuration, 'minutes').asSeconds(),
      };

    case TOGGLE_LONG_BREAK:
      return {
        ...state,
        longBreakEnabled: !state.longBreakEnabled,
      };

    case UPDATE_LONG_BREAK_DURATION:
      return {
        ...state,
        longBreakDuration: moment.duration(action.longBreakDuration, 'minutes').asSeconds(),
      };

    case UPDATE_WORK_SESSIONS:
      return {
        ...state,
        workSessions: action.workSessions,
      };

    default:
      return state;
  }
}

export default settings;
