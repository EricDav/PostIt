import { combineReducers } from 'redux';
import auth from './auth';
import groups from './groups';
import messages from './groupMessages';
import group from './currentGroup';
import members from './currentGroupMembers';
import allUsers from './allUsers';
import viewNumber from './setView';
import seenLast from './messageSeenLast';
import newMessages from './newMessages';
import initialNewMessages from './initialNewMessages';

export default combineReducers({
  auth,
  groups,
  messages,
  group,
  members,
  allUsers,
  viewNumber,
  seenLast,
  newMessages,
  initialNewMessages
});
