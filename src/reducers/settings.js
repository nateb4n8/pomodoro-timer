import moment from 'moment';

import {
  UPDATE_WORK_DURATION,
  UPDATE_BREAK_DURATION,
  TOGGLE_LONG_BREAK,
} from '../actions/settings';


function minutesToSeconds(minutes) {
  return moment.duration(minutes, 'minutes').asSeconds();
}

const initialState = {
  workDuration: moment.duration(25, 'minutes').asSeconds(),
  breakDuration: moment.duration(5, 'minutes').asSeconds(),
  longBreakEnabled: false,
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
        breakDuration: action.breakDuration,
      };

    case TOGGLE_LONG_BREAK:
      return {
        ...state,
        longBreakEnabled: !state.longBreakEnabled,
      };

    default:
      return state;
  }
}

export default settings;
