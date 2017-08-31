import { SET_ERROR_MESSAGE } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.error;
    default: return state;
  }
};
