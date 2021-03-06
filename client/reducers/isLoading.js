import { IS_LOADING } from '../actions/ActionTypes';


export default (state = false, action = {}) => {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading;
    default: return state;
  }
};
