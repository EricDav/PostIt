import expect from 'expect';
import * as UserAction from '../../actions/UserAction';
import setResetPasswordUser from '../../reducers/setResetPasswordUser';

describe('initialDashboard page Reducer', () => {
  it('should set the initialdashboard page', () => {
    const initialState = {};
    const user = {
      email: 'alienyi@me.com',
      sZN: 'e6456738267dhnhbnmdnbah'
    };
    const action = UserAction.setResetPasswordUser(user);
    const newState = setResetPasswordUser(initialState, action);
    expect(newState.email).toEqual('alienyi@me.com');
  });
   it('should return initial state for invalid type', () => {
    const initialState = {};
    const user = {
      email: 'alienyi@me.com',
      sZN: 'e6456738267dhnhbnmdnbah'
    };
    const action = {
      type: 'WRONG',
      user
    };
    const newState = setResetPasswordUser(initialState, action);
    expect(Object.keys(newState).length).toEqual(0);
  });
});
