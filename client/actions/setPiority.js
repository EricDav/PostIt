import { SET_PIORITY_LEVEL } from './types';

/**
 * @param  {array} piority
 * @description saction creator for setting current group
 * @return {object} returns object
 */
export function setPiority(piority) {
  return {
    type: SET_PIORITY_LEVEL,
    piority
  };
}

/**
 * @param  {array} piority
 * @description set messages piority 
 * @return {object} returns object
 */
export function piorityLevel(piority) {
  return dispatch => {
    dispatch(setPiority(piority));
  }
}
