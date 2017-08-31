import { SET_RESET_PASSWORD_USER_PAGE } from '../actions/types';

export default (state = false, action = {}) => {
  switch (action.type) {
    case SET_RESET_PASSWORD_USER_PAGE:
      return action.show;
    default: return state;
  }
};
