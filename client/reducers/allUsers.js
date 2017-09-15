import { SET_ALL_USERS } from '../actions/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.allUsers;
    default: return state;
  }
};
