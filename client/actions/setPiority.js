import { SET_PIORITY_LEVEL } from './types';

export function setPiority(piority) {
  return {
    type: SET_PIORITY_LEVEL,
    piority
  }
}

export function piorityLevel(piority) {
  return dispatch => {
    dispatch(setPiority(piority));
  };
}
