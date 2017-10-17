import axios from 'axios';

import { SET_SEARCHED_USERS, SET_CURRENT_USER, SET_PASSWORD_RESET_PAGE,
  ADD_USER, RESET_PASSWORD_USER, SET_CURRENT_PAGE,
  WILL_SHOW } from './ActionTypes';

/* global Materialize */

/**
 * @description set all searchedUsers to state
 * 
 * @param  {array} searchedUsers  list of searched users
 * 
 * @return {object} dispatch object
 */
export function setSearchedUsers(searchedUsers) {
  return {
    type: SET_SEARCHED_USERS,
    searchedUsers
  };
}


/**
 * @description set the current page
 * 
 * @param  {number} pageNumber the number of the page to show
 * 
 * @return {object} dispatch object
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
 * @param  {object} user current user details
 * 
 * @return {object} dispatch object
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
 * @param  {boolean} show the page to show
 * 
 * @return {object} dispatch object
 */
export function setPasswordResetPage(show) {
  return {
    type: SET_PASSWORD_RESET_PAGE,
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
 * @description Request to the API to reset a user password
 * 
 * @param  {array} userData the user payload
 * 
 * @return {object} dispatch object
 */
export function VerifyCodeAndUpdatePassword(userData) {
  return () => axios.post('/api/v1/resetPassword', userData);
}

/**
 * @description set the user requesting for reset password
 * 
 * @param  {array} userData
 * @return {object} returns object
 */
export function resetPasswordPage(show) {
  return dispatch =>
    dispatch(willShowResetPasswordPage(show));
}

/**
 * @description Request to the API to send verification code
 * 
 * @param  {object} userData
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
 * @param  {integer} userId the id of the user to be added to  the group
 * @param  {integer} groupId the group id
 * 
 * @return {object} dispatch object
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
 * 
 * @return {object} dispatch object
 */
export function showResetPasswordPage(shouldShow) {
  return dispatch =>
    dispatch(setPasswordResetPage(shouldShow));
}


/**
 * @description reset user password
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function resetPassword(userData) {
  return () =>
    axios.put('/api/v1/resetPassword', userData);
}

/**
 *  @description update user information action creator
 * 
 * @param {object} userData user payload
 * @param {object} updatedUser updated user payload
 * 
 * @return {object} dispatch object
 */
export function updateUserProfile(userData, updatedUser) {
  return dispatch =>
    axios.put('/api/v1/user/update', userData).then(() => {
      dispatch(setCurrentUser(updatedUser));
    });
}


/**
 * @description Request to the API to fetch all users that matches the
 * search parameter
 * 
 * @param  {string} searchKey the search parameter
 * 
 * @return {object} dispatch object
 */
export function searchUsers(searchKey) {
  if (typeof (searchKey) !== 'string') {
    return (dispatch) => {
      dispatch(setSearchedUsers([]));
    };
  }
  return dispatch =>
    axios.get(`/api/v1/users/${searchKey}/search`).then((res) => {
      dispatch(setSearchedUsers(res.data.searchedUsers));
    })
      .catch(() => {
        Materialize.toast('An error occured! could not leave group',
          1500, 'red');
      });
}

/**
 * @description set a user Information when updated
 * 
 * @param {object} user user payload
 * 
 * @return {object} dispatch object
 */
export function setUpdatedUser(user) {
  return (dispatch) => {
    dispatch(setCurrentUser(user));
  };
}

/**
 * @description set a user 
 * 
 * @param {object} pageNumber the number that determines which form to show
 * in the home page
 * 
 * @return {object} dispatch object
 */
export function setPage(pageNumber) {
  return (dispatch) => {
    dispatch(setCurrentPage(pageNumber));
  };
}
