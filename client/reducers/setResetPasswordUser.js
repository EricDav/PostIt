import { RESET_PASSWORD_USER } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_PASSWORD_USER :
      return action.resetPasswordUser;
    default: return state;
  }
};
