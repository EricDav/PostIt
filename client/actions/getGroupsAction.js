import axios from 'axios';
import { SET_CURRENT_USER_GROUPS } from './types';

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
      const userGroups = { userGroups: groups };
      console.log(userGroups)
      localStorage.setItem('userGroups', JSON.stringify(userGroups));
      console.log(userGroups);
      dispatch(setCurrentUserGroups(groups));
    });
  };
}
