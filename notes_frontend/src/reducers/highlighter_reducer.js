import {
  HIGHLIGHTER_CLICK,
  VALIDATE_SELECTION
} from '../actions/types';

const defaultState = {
  index: null,
  focus: false,
  validSelection: false
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case HIGHLIGHTER_CLICK:
      // r u clicking the same button thats already clicked?
      if (action.payload === state.index) {
        return {...state, ...{index: null, focus: false, validSelection: false}};
      } else {
        return {...state, ...{index: action.payload, focus: true, validSelection: false}};
      }
    case VALIDATE_SELECTION:
      return {...state, validSelection: action.payload};
    default:
      return state;
  }
}
