import { SET_CURRENT_GROUP_MEMBERS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_GROUP_MEMBERS:
      return action.members;
    default: return state;
  }
};
