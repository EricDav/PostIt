import axios from 'axios';
import { WILL_SHOW, RESET_PASSWORD_USER } from './types';

/**
 * @param  {boolean} willShow
 * @description decide weather to show the confirm password page
 * @return {object} returns object
 */
export function willShowResetPasswordPage(willShow) {
  return {
    type: WILL_SHOW,
    willShow
  };
}

/**
 * @param  {object} resetPasswordUser
 * @description set the user requesting for reset password
 * @return {object} returns object
 */
export function setResetPasswordUser(resetPasswordUser) {
  return {
    type: RESET_PASSWORD_USER,
    resetPasswordUser
  };
}

/**
 * @param  {array} userData
 * @description api call that checks if code is valid
 * @return {object} returns object
 */
export function VerifyCodeAndUpdatePassword(userData) {
  return dispatch => {
    return axios.post('/api/v1/resetPassword', userData);
  };
}

/**
 * @param  {object}userData
 * @description current user information
 * @return {object} returns object
 */
export function sendSecretCode(userData) {
  return dispatch => {
    return axios.post('/api/v1/sendSecretCode', userData).then((res) => {
      dispatch(willShowResetPasswordPage(true));
      dispatch(setResetPasswordUser(res.data));
    });
  };
}
