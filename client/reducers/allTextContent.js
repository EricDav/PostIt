import { TEXT_CONTENT } from '../actions/ActionTypes';

export default (state = '', action = {}) => {
  switch (action.type) {
    case TEXT_CONTENT:
      return action.textContents;
    default: return state;
  }
};
