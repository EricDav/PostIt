import { SET_CURRENT_GROUP } from './types';

export function setCurrentUser(group) {
  return {
    type: SET_CURRENT_GROUP,
    group
  };
}

export function setGroup(group) {
  return dispatch => {
    dispatch(setCurrentUser(group));
  };
}
