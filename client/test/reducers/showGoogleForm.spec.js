import expect from 'expect';
import * as AuthAction from '../../actions/AuthAction';
import showGoogledForm from '../../reducers/showGoogleForm';

describe('Google form Reducer', () => {
  it('should should set google form', () => {
    const initialState = {
      fullName: '',
      email: '',
      showForm: true
    };
    const googleUser = {
      fullName: 'Alienyi David',
      email: 'alienyidavid@andela.com',
      showForm: true
    };
    const action = AuthAction.setGoogleForm(googleUser);
    const newState = showGoogledForm(initialState, action);
    expect(newState.email).toEqual('alienyidavid@andela.com');
    expect(newState.fullName).toEqual('Alienyi David');
  });
  it('should return initial state for invalid type', () => {
    const initialState = {
      fullName: '',
      email: '',
      showForm: true
    };
    const googleUser = {
      fullName: 'Alienyi David',
      email: 'alienyidavid@andela.com',
      showForm: true
    };
    const action = {
      type: 'WRONG',
      googleUser
    };
    const newState = showGoogledForm(initialState, action);
    expect(newState.email).toEqual('');
    expect(newState.fullName).toEqual('');
  });
});
