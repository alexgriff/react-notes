import axios from 'axios';
import { API_ROOT } from '../constants';
import * as types from './types';
import { browserHistory } from 'react-router';
import parseMarkdown from '../markdown_parser/markdown_parser';


export function signinUser(_id, accessToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('_id', _id);
  browserHistory.push('/repos');
  return {type: types.SIGNIN_USER};
}


export function signoutUser() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('_id');
  browserHistory.push('/');
  return {type: types.SIGNOUT_USER};
}

export function fetchUser() {
  return function(dispatch) {
    const id = localStorage.getItem('_id');
    axios.get(`${API_ROOT}/api/users/${id}`)
      .then( response => {
        dispatch({type: types.FETCH_USER, payload: response.data});
      })
      .catch( error => {

      });
  }
}

// Auth action creator is pretty diff than normal action creator
// has to do a bunch of things, branching logic, side-effects
// not just make ajax & return action
//
// export function signinUser( { email, password }) {
//   // will return a FUNCTION, not an action
//   // will be automatically called by redux-thunk middleware
//   // the point is to give us access to the 'dispatch' method
//   // this is how redux thunk works <- action creators return a function
//   // the purpose of redux-thunk is to allow us to dispatch multiple actions
//   // inside of one action creator
//   return function(dispatch) {
//     // submit email/pw to server <- the API server (not webpack server)
//   axios.post(`${API_ROOT}/api/signin`, { email, password })
//     .then(response => {
//       // if request is good...
//       // - update state to indicate user is authenticated
//       dispatch({type: types.AUTH_USER});
//
//       // - save the JWT token in localStorage
//       localStorage.setItem('token', response.data.token);
//
//       // - redirect to the route '/feature' (using react-router)
//       browserHistory.push('/feature');
//     })
//     .catch(() => {
//       // if its bad
//       // - show an error to user
//       dispatch(authError('Bad login info'))
//     });
//   }



export function fetchAllRepos() {
  return function(dispatch) {
    axios.get(`${API_ROOT}/api/repos`)
      .then( response => {
        dispatch({
          type: types.GET_REPOS,
          payload: response.data.repos
        });
      })
      .catch( error => {
        debugger;
      })
  }
}


export function fetchRepo(repo, userId, viewMode) {
  const config = {
    headers: {'Authorization': `token ${localStorage.getItem('accessToken')}`}
  };

  return function(dispatch) {
    axios.get(`${repo.url}/readme`, config)
    .then( response => {
      axios.get(response.data.download_url)
        .then( markdown => {
          dispatch({
            type: types.SHOW_REPO,
            payload: {
              repo,
              content: parseMarkdown(markdown.data)
             }
          });
        })
        .then(() => {

          if (viewMode) {
            axios.get(`${API_ROOT}/api/users/${userId}/repos/${repo._id}/highlights`)
              .then( response => {
                dispatch({
                  type: types.VIEW_USER_REPO_HIGHLIGHTS,
                  payload: response.data.highlights
                });
              });
          }

          axios.get(`${API_ROOT}/api/users/${userId}/repos/${repo._id}`)
            .then( response => {
              dispatch({type: types.GET_NOTE_COUNT, payload: response.data.count})
            });
        });
    })
    .catch( error => {
      console.log(error);
    });
  }
}

export function handleUpdateLabel(label, index, userId) {
  return function(dispatch) {
    axios.put(`${API_ROOT}/api/users/${userId}`, {highlighterIndex: index, label})
      .then( response  => {
        dispatch({type: types.UPDATE_LABEL, payload: response.data.user})
      });
  }
}

export function handleHighlighterClick(index){
  return({type: types.HIGHLIGHTER_CLICK, payload: index})
}

export function validateSelection(startIndex, elementId, highlighterIndex, text) {
  if (startIndex === -1) {
    return({type: types.VALIDATE_SELECTION, payload: {valid: false}});
  } else {
    return({
      type: types.VALIDATE_SELECTION,
      payload: {
        valid: true,
        elementId,
        highlighterIndex,
        startIndex,
        text
      }
    });
  }
}


export function saveHighlight(selection, userId, repoId, highlighterIndex, label) {
  return function(dispatch) {
    axios.post(
      `${API_ROOT}/api/highlights`,
      {
        text: selection.text,
        startIndex: selection.startIndex,
        elementId: selection.elementId,
        userId,
        repoId,
        highlighterIndex,
        label
      }
    ).then( response => {
      //TODO i dont yet do anything or dispatch an action here
      console.log(response);
      dispatch({type: types.VALIDATE_SELECTION, payload: {valid: false}})
    })
    .then(() => {
      dispatch({type: types.INCREMENT_NOTE_COUNT, payload: repoId});
    });
  }
}

export function fetchUserRepoHighlights(repoId, userId) {
  return function(dispatch) {
    axios.get(`${API_ROOT}/api/users/${userId}/repos/${repoId}/highlights`)
      .then( response => {
        dispatch({
          type: types.VIEW_USER_REPO_HIGHLIGHTS,
          payload: response.data.highlights
        });
      });
  }
}

export function fetchAllUserHighlights(userId) {
  return function(dispatch) {
    axios.get(`${API_ROOT}/api/users/${userId}/highlights`)
      .then( response => {
        dispatch({
          type: types.VIEW_USER_HIGHLIGHTS,
          payload: response.data.highlights
        });
      });
  }
}

export function toggleMode() {
  return {type: types.LEAVE_VIEW_MODE}
}
