import { SET_CURRENT_PAGE } from '../actions/ActionTypes';

export default (state = 1, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.pageNumber;
    default: return state;
  }
};
