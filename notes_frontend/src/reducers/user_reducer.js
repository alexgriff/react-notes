import {
  FETCH_USER,
  UPDATE_LABEL,
  UPDATE_SUFFIX
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_USER:
      return {...state, attributes: action.payload};
    case UPDATE_LABEL:
      return {...state, attributes: action.payload};
    case UPDATE_SUFFIX:
      return {attributes: {...state.attributes, suffix: action.payload}};
    default:
      return state;
  }
}
