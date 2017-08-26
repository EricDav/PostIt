import axios from 'axios';
import { WILL_SHOW, RESET_PASSWORD_USER } from './types';

export function willShowResetPasswordPage(willShow) {
  return {
    type: WILL_SHOW,
    willShow
  }
}

export function setResetPasswordUser(resetPasswordUser) {
  return {
    type: RESET_PASSWORD_USER,
    resetPasswordUser
  }
}

export function VerifyCodeAndUpdatePassword(userData) {
  return dispatch => {
    return axios.post('/api/v1/resetPassword', userData);
  };
}
export function sendSecretCode(userData) {
  return dispatch => {
    return axios.post('/api/v1/sendSecretCode', userData).then(res => {
      dispatch(willShowResetPasswordPage(true));
      dispatch(setResetPasswordUser(res.data));
    });
  };
}
