import { combineReducers } from 'redux';
import auth from './auth';
import groups from './groups';
import messages from './groupMessages';
import group from './currentGroup';
import members from './currentGroupMembers';
import searchedUsers from './searchedUsers';
import viewNumber from './setView';
import seenLast from './messageSeenLast';
import newMessages from './newMessages';
import initialNewMessages from './initialNewMessages';
import willShow from './willShow';
import resetPasswordUser from './setResetPasswordUser';
import setPiority from './setPiority';
import showGoogleForm from './showGoogleForm';
import showDashboardForm from './showDashboardForm';
import initialDashboardPage from './initialDashboardPage';
import screenSize from './screenSize';
import setCurrentPage from './setCurrentPage';

export default combineReducers({
  auth,
  groups,
  messages,
  group,
  members,
  searchedUsers,
  viewNumber,
  seenLast,
  newMessages,
  initialNewMessages,
  willShow,
  resetPasswordUser,
  setPiority,
  showGoogleForm,
  showDashboardForm,
  initialDashboardPage,
  screenSize,
  setCurrentPage
});
