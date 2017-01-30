import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import ReposMain from './components/repositories/ReposMain';
import NotesIndex from './components/notes/NotesIndex';
import RequireAuth from './components/RequireAuthentication';
import Welcome from './components/Welcome'

import reducers from './reducers';
import { SIGNIN_USER } from './actions/types';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// before anything is rendered to DOM check if a token exists in localStorage
// i.e update application state (dispatch an action to auth_reducer)
const token = localStorage.getItem('accessToken');

// if we have a token, consider user signed in
if (token) {
  // we need to dispatch an action
  store.dispatch({type: SIGNIN_USER});
}

ReactDOM.render(
  <Provider store={store} >
    <Router history={hashHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="repos" component={RequireAuth(ReposMain)} />
        <Route path="notes" component={RequireAuth(NotesIndex)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
