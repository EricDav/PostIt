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
        isAuthenticated: action.user.currentUser.username !== '',
        user: action.user
      };
    default:
      return state;
  }
};
