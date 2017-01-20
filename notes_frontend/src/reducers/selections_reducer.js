import {
  VIEW_USER_REPO_HIGHLIGHTS,
  LEAVE_VIEW_MODE
} from '../actions/types';

const defaultState = {
  highlights: [],
  viewMode: false
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case VIEW_USER_REPO_HIGHLIGHTS:
      return {
        highlights: action.payload,
        viewMode: true
      };
    case LEAVE_VIEW_MODE:
      return {
        highlights: [],
        viewMode: false
      };
    default:
      return state;
  }
}
