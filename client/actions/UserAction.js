import axios from 'axios';

import { SET_SEARCHED_USERS, SET_CURRENT_USER, SET_RESET_PASSWORD_USER_PAGE,
  SET_SHOW_UPDATE_USER_PAGE, ADD_USER, RESET_PASSWORD_USER, SET_CURRENT_PAGE,
  WILL_SHOW } from './ActionTypes';

/* global Materialize */

/**
 * @description set all searchedUsers to state
 * 
 * @param  {array} searchedUsers
 * @return {object} returns object
 */
export function setSearchedUser(searchedUsers) {
  return {
    type: SET_SEARCHED_USERS,
    searchedUsers
  };
}

/**
 * @description set all users to state
 * 
 * @param  {number} page number
 * @return {object} returns object
 */
export function setCurrentPage(pageNumber) {
  return {
    type: SET_CURRENT_PAGE,
    pageNumber
  };
}

/**
 * @description action for user current user information in store
 * 
 * @param  {object} user
 * @return {object} returns object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @description set weather to show reset password user page
 * 
 * @param  {boolean} show
 * @return {object} returns object
 */
export function setResetPasswordUserPage(show) {
  return {
    type: SET_RESET_PASSWORD_USER_PAGE,
    show
  };
}

/**
 * @description update state to 
 * 
 * @param  {object} user
 * @return {object} returns object
 */
export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

/**
 * @description decide weather to show the confirm password page
 * 
 * @param  {boolean} willShow
 * @return {object} returns object
 */
export function willShowResetPasswordPage(willShow) {
  return {
    type: WILL_SHOW,
    willShow
  };
}

/**
 * @description set the user requesting for reset password
 * 
 * @param  {object} resetPasswordUser
 * @return {object} returns object
 */
export function setResetPasswordUser(resetPasswordUser) {
  return {
    type: RESET_PASSWORD_USER,
    resetPasswordUser
  };
}

/**
 * @description api call that checks if code is valid
 * 
 * @param  {array} userData
 * @return {object} returns object
 */
export function VerifyCodeAndUpdatePassword(userData) {
  return () => {
    return axios.post('/api/v1/resetPassword', userData);
  };
}

export function setResetPasswordPage(show) {
  return dispatch =>
    dispatch(willShowResetPasswordPage(show));
}

/**
 * @description sends code for verification
 * 
 * @param  {object}userData
 * @return {object} returns object
 */
export function sendSecretCode(userData) {
  return dispatch =>
    axios.post('/api/v1/sendSecretCode', userData).then((res) => {
      dispatch(willShowResetPasswordPage(true));
      dispatch(setResetPasswordUser(res.data));
    });
}

/**
 * @description make a post request that add a user to a group
 * 
 * @param  {integer} userId
 * @param  {integer} groupId
 * @return {object} returns object
 */
export function addUserToAGroup(userId, groupId) {
  return dispatch =>
    axios.post(`/api/v1/groups/${groupId}/user`, userId).then((res) => {
      dispatch(addUser(res.data.user));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}


/**
 * @description set weather to show reset password user page
 * 
 * @param  {boolean} shouldShow
 * @return {object} returns object
 */
export function showResetPasswordUserPage(shouldShow) {
  return dispatch =>
    dispatch(setResetPasswordUserPage(shouldShow));
}


/**
 * @description reset user password
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function resetPassword(userData) {
  return axios.put('/api/v1/resetPassword', userData);
}

/**
 *  @description update user information action creator
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function updateUserProfile(userData) {
  return dispatch =>
    axios.put('/api/v1/user/update', userData).then(() => {
      dispatch(setShowUpdateUserPage(false));
    });
}


/**
 * @description make a get request to fetch all users
 * 
 * @param  {array} allUsers
 * @return {object} returns object
 */
export function searchUsers(searchKey) {
  if (typeof (searchKey) !== 'string') {
    return (dispatch) => {
      dispatch(setSearchedUser([]));
    };
  }
  return dispatch =>
    axios.get(`/api/v1/users/${searchKey}/search`).then((res) => {
      dispatch(setSearchedUser(res.data.searchedUsers));
    })
      .catch(() => {
        Materialize.toast('An error occured! could not leave group',
          1500, 'red');
      });
}

/**
 * @description set a user Information when updated
 * 
 * @param {object} user
 * @return {object} returns object
 */
export function setUpdatedUser(user) {
  return (dispatch) => {
    dispatch(setCurrentUser(user));
  };
}

export function setPage(pageNumber) {
  return (dispatch) => {
    dispatch(setCurrentPage(pageNumber));
  };
}
