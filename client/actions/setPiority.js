import { SET_PIORITY_LEVEL } from './types';

/**
 * @description saction creator for setting current group
 * 
 * @param  {array} piority
 * @return {object} returns object
 */
export function setPiority(piority) {
  return {
    type: SET_PIORITY_LEVEL,
    piority
  };
}

/**
 * @description set messages piority
 * 
 * @param  {array} piority
 * @return {object} returns object
 */
export function piorityLevel(piority) {
  return (dispatch) => {
    dispatch(setPiority(piority));
  };
}
