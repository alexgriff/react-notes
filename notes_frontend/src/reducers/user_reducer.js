import {
  FETCH_USER,
  UPDATE_LABEL
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_USER:
      return {...state, attributes: action.payload};
    case UPDATE_LABEL:
      return {...state, attributes: action.payload};
    default:
      return state;
  }
}
