import { SET_CURRENT_GROUP } from './types';

/**
 * @param  {object} group
 * @description current group action
 * @return {object} returns object
 */
export function setCurrentUser(group) {
  return {
    type: SET_CURRENT_GROUP,
    group
  };
}

/**
 * @param  {object} group
 * @description saction creator for setting current group
 * @return {object} returns object
 */
export function setGroup(group) {
  return dispatch => {
    dispatch(setCurrentUser(group));
  };
}
