import { SET_CURRENT_USER_GROUPS, ADD_GROUP } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER_GROUPS:
      return action.groups;
    case ADD_GROUP:
      return [
        ...state,
        action.addedGroup
      ];
    default: return state;
  }
};
