import { OFF_SET } from '../actions/ActionTypes';

export default (state = { offset: 0 }, action = {}) => {
  switch (action.type) {
    case OFF_SET:
      return action.offset;
    default: return state;
  }
};

