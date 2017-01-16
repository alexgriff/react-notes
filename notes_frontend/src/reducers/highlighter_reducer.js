import {
  HIGHLIGHTER_FOCUS,
  HIGHLIGHTER_BLUR
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case HIGHLIGHTER_FOCUS:
      return {...state, ...{index: action.payload, focus: true}};
    case HIGHLIGHTER_BLUR:
      return {...state, ...{focus: false, index: null}};
    default:
      return state;
  }
}
