import {
  VALIDATE_SELECTION,
  HIGHLIGHTER_CLICK
} from '../actions/types';

const defaultState = {
  index: null,
  focus: false,
  selection: {
    valid: false
  }
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case HIGHLIGHTER_CLICK:

    // r u clicking the same button that's already focused?
      if (action.payload === state.index) {
        return {
          ...state,
          index: null,
          focus: false,
          selection: {valid: false}
        };
      } else {
        return {
          ...state,
          index: action.payload,
          focus: true,
          selection: {valid: false}
        };
      }

    case VALIDATE_SELECTION:
      return {
        ...state,
        selection: action.payload
      }

    default:
      return state;
  }
}
