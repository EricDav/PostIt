import { SET_LAST_SEEN_MESSAGE } from '../actions/ActionTypes';

export default (state = 0, action = {}) => {
  switch (action.type) {
    case SET_LAST_SEEN_MESSAGE:
      return action.groupMessageSeenLast;
    default: return state;
  }
};
