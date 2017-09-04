import { SET_CURRENT_USER_GROUPS, ADD_GROUP, DELETE_GROUP } from '../actions/types';
import deleteGroup from '../helpers/deleteGroup';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER_GROUPS:
      return action.groups;
    case ADD_GROUP:
      return [
        ...state,
        action.addedGroup
      ];
    case DELETE_GROUP:
      return deleteGroup(state, action.groupData.groupId);
    default: return state;
  }
};
