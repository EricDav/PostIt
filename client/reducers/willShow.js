import { WILL_SHOW } from '../actions/types';

export default (state = false, action = {}) => {
  switch (action.type) {
    case WILL_SHOW:
      return action.willShow;
    default: return state;
  }
};
