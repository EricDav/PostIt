import { ERROR, CLEAR_ERROR } from '../actions/ActionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ERROR:
      return action.error;
    case CLEAR_ERROR:
      return action.error;
    default: return state;
  }
};
