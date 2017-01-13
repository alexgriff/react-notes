import {
  GET_REPOS,
  SHOW_REPO
} from '../actions/types';
import showdown from 'showdown';

const defaultState = {
  repos: [],
  selectedRepo: {
    repoName: "",
    content: ""
  }
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_REPOS:
      return {
        ...state,
        repos: [...state.repos, ...action.payload]
      };
    case SHOW_REPO:
      const converter = new showdown.Converter();
      const html = converter.makeHtml(action.payload.content);

      return {...state, selectedRepo: {
        repoName: action.payload.repoName,
        content: html
      }}
    default:
      return state;
  }
}
