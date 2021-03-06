import { combineReducers } from 'redux';

import auth from './auth';
import groups from './groups';
import messages from './messages';
import group from './group';
import members from './members';
import searchedUsers from './searchedUsers';
import viewNumber from './setView';
import seenLast from './seenLast';
import newMessages from './newMessages';
import initialNewMessages from './initialNewMessages';
import willShow from './willShow';
import resetPasswordUser from './resetPasswordUser';
import setPiority from './setPiority';
import showGoogleForm from './showGoogleForm';
import showDashboardForm from './showDashboardForm';
import initialDashboardPage from './initialDashboardPage';
import screenSize from './screenSize';
import setCurrentPage from './setCurrentPage';
import error from './error';
import isLoading from './isLoading';
import offset from './offset';

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
  setCurrentPage,
  error,
  isLoading,
  offset
});
