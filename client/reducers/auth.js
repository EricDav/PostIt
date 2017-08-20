import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: { currentUser: { username: '',
    fullname: '' } }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !(Object.keys(action.user).length === 0),
        user: action.user
      };
    default:
      return state;
  }
};
