import { SET_INITIAL_NEW_MESSAGES } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_INITIAL_NEW_MESSAGES:
      return action.initialNewMessages;
    default: return state;
  }
};
