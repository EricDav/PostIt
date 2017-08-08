import { SET_CURRENT_USER_GROUPS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER_GROUPS:
      return action.groups;
    default: return state;
  }
};
