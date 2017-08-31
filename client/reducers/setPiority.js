import { SET_PIORITY_LEVEL } from '../actions/types';

export default (state = '', action = {}) => {
  switch (action.type) {
    case SET_PIORITY_LEVEL:
      return action.piority;
    default: return state;
  }
};
