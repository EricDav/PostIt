import { SHOW_INITIAL_DASHBOARD_PAGE } from '../actions/ActionTypes';

export default (state = 0, action = {}) => {
  switch (action.type) {
    case SHOW_INITIAL_DASHBOARD_PAGE:
      return action.initialPage;
    default: return state;
  }
};
