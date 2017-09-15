import { SET_NEW_GROUP_MESSAGES } from '../actions/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_NEW_GROUP_MESSAGES:
      return action.newGroupMessages;
    default: return state;
  }
};

