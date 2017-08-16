import { SET_LAST_SEEN_MESSAGE } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_LAST_SEEN_MESSAGE:
      return action.group;
    default: return state;
  }
};
