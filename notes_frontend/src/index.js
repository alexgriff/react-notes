import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import UserShow from './components/UserShow';
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
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <Route path="repos" component={UserShow} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
