import {
  GET_REPOS,
  SHOW_REPO,
  GET_NOTE_COUNT,
  INCREMENT_NOTE_COUNT
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
      return {
        ...state,
        selectedRepo: {
          ...state.selectedRepo,
          ...repo,
          content
        }
      };
    case GET_NOTE_COUNT:
      return {
        ...state,
        selectedRepo: {
          ...state.selectedRepo,
          noteCount: action.payload
        }
      };
    case INCREMENT_NOTE_COUNT:
      if (state.selectedRepo._id === action.payload) {
        return {
          ...state,
          selectedRepo: {
            ...state.selectedRepo,
            noteCount: state.selectedRepo.noteCount + 1
          }
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
