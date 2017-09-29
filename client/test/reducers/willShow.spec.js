import expect from 'expect';
import * as UserAction from '../../actions/UserAction';
import willShow from '../../reducers/willShow';

describe('Willshow Reducer', () => {
  it('should set page for email confirmation', () => {
    const initialState = false;
    const action = UserAction.willShowResetPasswordPage(true);
    const newState = willShow(initialState, action);
    expect(newState).toEqual(true);
  });
  it('should return initial state for invalid type', () => {
    const initialState = false;
    const show = true;
    const action = {
      type: 'WRONG',
      show
    };
    const newState = willShow(initialState, action);
    expect(newState).toEqual(false);
  });
});
