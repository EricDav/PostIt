import { SET_NAVBAR_RIGHT_VIEW } from './types';

export function setView(viewNumber) {
  return {
    type: SET_NAVBAR_RIGHT_VIEW,
    viewNumber
  };
}

export function setRightNavBarView(viewNumber) {
  return dispatch => {
    dispatch(setView(viewNumber));
  };
}
