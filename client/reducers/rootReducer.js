import { combineReducers } from 'redux';
import auth from './auth';
import groups from './groups';
import messages from './groupMessages';
import group from './currentGroup';
import members from './currentGroupMembers';
import allUsers from './allUsers';

export default combineReducers({
  auth,
  groups,
  messages,
  group,
  members,
  allUsers
});
