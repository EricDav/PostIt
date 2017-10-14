import { SET_NAV_BARS } from '../actions/ActionTypes';

export default (state = false, action = {}) => {
  switch (action.type) {
    case SET_NAV_BARS:
      return action.shouldHide;
    default: return state;
  }
};
