import axios from 'axios';
import { API_ROOT } from '../constants';
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  FETCH_USER,
  GET_REPOS,
  SHOW_REPO,
  UPDATE_LABEL,
  HIGHLIGHTER_CLICK,
  VALIDATE_SELECTION
} from './types';
import { browserHistory } from 'react-router';
import parseMarkdown from '../markdown_parser/markdown_parser';


export function signinUser(_id, accessToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('_id', _id);
  browserHistory.push('/repos');
  return {type: SIGNIN_USER};
}


export function signoutUser() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('_id');
  browserHistory.push('/');
  return {type: SIGNOUT_USER};
}

export function fetchUser() {
  return function(dispatch) {
    const id = localStorage.getItem('_id');
    axios.get(`${API_ROOT}/api/users/${id}`)
      .then( response => {
        dispatch({type: FETCH_USER, payload: response.data});
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
//       dispatch({type: AUTH_USER});
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



export function getRepos() {
  return function(dispatch) {
    axios.get(`${API_ROOT}/api/repos`)
      .then( response => {
        dispatch({
          type: GET_REPOS,
          payload: response.data.repos
        });
      })
      .catch( error => {
        debugger;
      })
  }
}

export function showRepo(url, repoName) {
  return function(dispatch) {
    axios.get(`${url}/readme`)
    .then( response => {
      axios.get(response.data.download_url)
        .then( markdown => {
          dispatch({
            type: SHOW_REPO,
            payload: {
              repoName,
              content: parseMarkdown(markdown.data)
             }
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
        dispatch({type: UPDATE_LABEL, payload: response.data.user})
      });
  }
}

export function handleHighlighterClick(index){
  return({type: HIGHLIGHTER_CLICK, payload: index})
}

export function validateSelection(index) {
  if (index === -1) {
    return({type: VALIDATE_SELECTION, payload: false});
  } else {
    return({type: VALIDATE_SELECTION, payload: true});
  }
}
