import { SET_CURRENT_USER } from '../actions/ActionTypes';

const initialState = {
  isAuthenticated: false,
  user: { currentUser: { userName: '',
    fullName: '' } }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: action.user.currentUser.userName !== '',
        user: action.user
      };
    default:
      return state;
  }
};
