import axios from 'axios';

import { WILL_SHOW, RESET_PASSWORD_USER } from './types';

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
