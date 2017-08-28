import { SET_NAVBAR_RIGHT_VIEW } from './types';

/**
 * @param  {number} viewNumber
 * @description set view number action
 * @return {object} returns object
 */
export function setView(viewNumber) {
  return {
    type: SET_NAVBAR_RIGHT_VIEW,
    viewNumber
  };
}

/**
 * @param  {number} viewNumber
 * @description set view number action creator
 * @return {object} returns object
 */
export function setRightNavBarView(viewNumber) {
  return dispatch => {
    dispatch(setView(viewNumber));
  };
}
