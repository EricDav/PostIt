import { SET_SEARCHED_USERS } from '../actions/ActionTypes';

export default (state = { mathchedUsers: [] }, action = {}) => {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return action.searchedUsers;
    default: return state;
  }
};
