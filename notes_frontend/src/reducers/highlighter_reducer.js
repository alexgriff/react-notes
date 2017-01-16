import {
  HIGHLIGHTER_CLICK
} from '../actions/types';

const defaultState = {
  index: null,
  focus: false
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case HIGHLIGHTER_CLICK:
      let focus;

      // r u clicking the same button thats already clicked?
      if (action.payload === state.index) {
        focus = !state.focus;
      } else {
        focus = true;
      }

      return {...state, ...{index: action.payload, focus}};
    default:
      return state;
  }
}
