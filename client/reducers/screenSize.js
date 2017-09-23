import { SCREEN_SIZE } from '../actions/ActionTypes';

export default (state = false, action = {}) => {
  switch (action.type) {
    case SCREEN_SIZE:
      return action.screenSize;
    default: return state;
  }
};
