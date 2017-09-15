import { SET_PIORITY_LEVEL } from '../actions/ActionTypes';

export default (state = '', action = {}) => {
  switch (action.type) {
    case SET_PIORITY_LEVEL:
      return action.piority;
    default: return state;
  }
};
