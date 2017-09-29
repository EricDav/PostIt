import { CLEAR_ERROR } from './ActionTypes';

export function error(error) {
 return {
    type: CLEAR_ERROR,
    error
 }
}

export function Loading(isLoadind) {
    return {
        type: 'IS_LOADING',
        isLoadind
    }
}

/**
 * @description set messages piority
 * 
 * @param  {array} piority
 * @return {object} returns object
 */
export function clearError() {
  return (dispatch) => {
    dispatch(error({}));
  };
}

export function isLoading(isLoading) {
    return (dispatch) => {
        dispatch(willLoad(isLoading));
    }
}