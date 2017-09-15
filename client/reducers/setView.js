import { SET_NAVBAR_RIGHT_VIEW } from '../actions/ActionTypes';

export default (state = 1, action = {}) => {
  switch (action.type) {
    case SET_NAVBAR_RIGHT_VIEW:
      return action.viewNumber;
    default: return state;
  }
};
