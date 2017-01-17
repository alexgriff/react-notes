import { combineReducers } from 'redux';
import auth from './auth_reducer';
import repos from './repos_reducer';
import user from './user_reducer';
import highlighter from './highlighter_reducer';

const rootReducer = combineReducers({
  auth,
  repos,
  user,
  highlighter,
 });

export default rootReducer;
