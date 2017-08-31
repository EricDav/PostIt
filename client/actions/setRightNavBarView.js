import { SET_NAVBAR_RIGHT_VIEW } from './types';

/**
 * @description set view number action
 * 
 * @param  {number} viewNumber
 * @return {object} returns object
 */
export function setView(viewNumber) {
  return {
    type: SET_NAVBAR_RIGHT_VIEW,
    viewNumber
  };
}

/**
 * @description set view number action creator
 * @param  {number} viewNumber
 * @return {object} returns object
 */
export function setRightNavBarView(viewNumber) {
  return dispatch => {
    dispatch(setView(viewNumber));
  };
}
