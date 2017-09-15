import { SET_GOOGLE_FORM } from '../actions/ActionTypes';

const initialState = {
  fullName: '',
  email: '',
  showForm: true
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GOOGLE_FORM:
      return action.googledata;
    default: return state;
  }
};
