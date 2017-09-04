import { SET_CURRENT_GROUP, UPDATE_GROUP_DATA } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return action.group;
    case UPDATE_GROUP_DATA:
      return {
        name: action.updatedGroupData.name,
        description: action.updatedGroupData.description,
        id: state.id,
        creator: state.creator,
        createdAt: state.createdAt,
        updatedAt: state.updatedAt
      };
    default: return state;
  }
};

