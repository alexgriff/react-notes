import {
  SIGNIN_USER,
  SIGNOUT_USER
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case SIGNIN_USER:
      return {...state, error: "", authenticated: true };
    case SIGNOUT_USER:
      return {...state, error: "", authenticated: false, user: undefined}
    default:
      return state;
  }
}
