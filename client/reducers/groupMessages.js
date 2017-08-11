import { SET_CURRENT_GROUP_MESSAGES } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP_MESSAGES:
      return action.messages;
    default: return state;
  }
};