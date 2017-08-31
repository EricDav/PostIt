import { SET_SHOW_UPDATE_USER_PAGE } from '../actions/types';

export default (state = false, action = {}) => {
  switch (action.type) {
    case SET_SHOW_UPDATE_USER_PAGE:
      return action.show;
    default: return state;
  }
};
