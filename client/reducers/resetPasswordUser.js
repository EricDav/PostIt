import { RESET_PASSWORD_USER } from '../actions/ActionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_PASSWORD_USER :
      return action.resetPasswordUser;
    default: return state;
  }
};
