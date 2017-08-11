import axios from 'axios';
import { SET_CURRENT_USER_GROUPS } from './types';

const group = [];

export function setCurrentUserGroups(groups) {
  return {
    type: SET_CURRENT_USER_GROUPS,
    groups
  }
}

export function getGroupsRequest() {
  return dispatch => {
    return axios.get('/api/groups').then(res => {
      const groups = res.data.groups;
      dispatch(setCurrentUserGroups(groups));
    });
  };
}

