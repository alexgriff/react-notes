import {
  VIEW_USER_REPO_HIGHLIGHTS,
  VIEW_USER_HIGHLIGHTS,
  LEAVE_VIEW_MODE
} from '../actions/types';

const defaultState = {
  highlights: [],
  notes: [],
  viewMode: false
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case VIEW_USER_REPO_HIGHLIGHTS:
      return {
        highlights: action.payload,
        viewMode: true
      };
    case VIEW_USER_HIGHLIGHTS:
      return {
        ...state,
        notes: action.payload
      }
    case LEAVE_VIEW_MODE:
      return {
        highlights: [],
        viewMode: false
      };
    default:
      return state;
  }
}
