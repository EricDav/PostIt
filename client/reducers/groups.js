import { SET_CURRENT_USER_GROUPS, ADD_GROUP, DELETE_GROUP,
  UPDATE_CURRENT_GROUP } from '../actions/ActionTypes';
import { deleteGroup, updateGroup } from '../helpers';

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
    case UPDATE_CURRENT_GROUP:
      return updateGroup(state, action.updateGroupData);
    default: return state;
  }
};
