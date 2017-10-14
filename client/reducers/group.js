import { SET_CURRENT_GROUP, UPDATE_GROUP_DATA } from '../actions/ActionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return action.group;
    case UPDATE_GROUP_DATA:
      return action.updatedGroupData;
    default: return state;
  }
};

