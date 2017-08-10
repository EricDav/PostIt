import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import groups from './groups';

export default combineReducers({
  flashMessages,
  auth,
  groups
});
