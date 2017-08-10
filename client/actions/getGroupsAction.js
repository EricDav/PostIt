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
      group.push(groups);
      const userGroups = { userGroups: groups };
      dispatch(setCurrentUserGroups(groups));
    });
  };
}

export const h = group;
