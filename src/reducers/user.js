
import {
  SET_USER,
} from '../actions/user';

const initialUserState = {
  email: '',
  firstName: '',
  lastName: '',
};

function user(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    default:
      return state;
  }
}

export default user;
