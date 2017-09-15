import { SET_TEXT_INPUT } from '../actions/ActionTypes';

export default (state = '', action = {}) => {
  switch (action.type) {
    case SET_TEXT_INPUT:
      return action.text;
    default: return state;
  }
};
