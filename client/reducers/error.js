import { SET_ERROR_MESSAGE } from '../actions/ActionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.error;
    default: return state;
  }
};
