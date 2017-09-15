import { SHOW_DASHBOARD_PAGE, SHOW_INITIAL_DASHBOARD_PAGE } from '../actions/ActionTypes';

export default (state = 0, action = {}) => {
  switch (action.type) {
    case SHOW_DASHBOARD_PAGE:
      return action.showForm;
    case SHOW_INITIAL_DASHBOARD_PAGE:
      return state;
    default: return state;
  }
};
