import { SET_CURRENT_GROUP } from '../actions/types';

export default (state = {name: 'Select or Create a Group'}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return action.group;
    default: return state;
  }
};

