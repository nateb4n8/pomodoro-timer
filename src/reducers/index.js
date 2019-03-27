import { combineReducers } from 'redux';

import user from './user';
import timer from './timer';
import settings from './settings';

export default combineReducers({
  user,
  timer,
  settings,
});
