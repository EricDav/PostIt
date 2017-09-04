import { SET_CURRENT_PAGE } from '../actions/types';

export default (state = 1, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.pageNumber;
    default: return state;
  }
};
