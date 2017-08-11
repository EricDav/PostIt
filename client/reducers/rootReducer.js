import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import groups from './groups';
import messages from './groupMessages';
import group from './currentGroup';

export default combineReducers({
  flashMessages,
  auth,
  groups,
  messages,
  group
});
