import { SET_CURRENT_GROUP } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return action.group;
    default: return state;
  }
};

