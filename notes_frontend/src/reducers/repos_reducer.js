import {
  GET_REPOS,
  SHOW_REPO
} from '../actions/types';



const defaultState = {
  repos: [],
  selectedRepo: null
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_REPOS:
      return {
        ...state,
        repos: [...state.repos, ...action.payload]
      };
    case SHOW_REPO:
      const { repo, content } = action.payload;
      return {...state,
        selectedRepo: {
          ...repo,
          content
        }
      };
    default:
      return state;
  }
}
