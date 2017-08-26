import axios from 'axios';
import { SET_ALL_USERS } from './types';

export function setAllUser(allUsers) {
  return {
    type: SET_ALL_USERS,
    allUsers
  };
}

export function getAllUsersRequest() {
  return dispatch => {
    return axios.get('/api/v1/allUsers').then(res => {
      const allUsers = res.data;
      dispatch(setAllUser(allUsers));
    });
  };
}
