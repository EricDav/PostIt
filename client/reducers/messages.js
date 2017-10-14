import { SET_CURRENT_GROUP_MESSAGES, ADD_MESSAGE } from
  '../actions/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP_MESSAGES:
      return action.messages;
    case ADD_MESSAGE:
      return [
        ...state,
        action.message
      ];
    default: return state;
  }
};
