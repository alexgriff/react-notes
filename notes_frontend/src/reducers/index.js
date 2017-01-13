import { combineReducers } from 'redux';
import auth from './auth_reducer';
import repos from './repos_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  auth,
  repos,
  user
 });

export default rootReducer;
