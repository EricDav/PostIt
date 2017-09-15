import { SET_CURRENT_GROUP_MEMBERS, ADD_USER } from '../actions/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP_MEMBERS:
      return action.members;
    case ADD_USER:
      return [
        ...state,
        action.user
      ];
    default: return state;
  }
};
