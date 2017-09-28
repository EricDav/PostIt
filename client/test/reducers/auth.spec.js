import expect from 'expect';
import * as AuthAction from '../../actions/AuthAction';
import auth from '../../reducers/auth';

describe('Auth Reducer', () => {
  it('should set the current user when passed with ', () => {
    const initialState = {
      isAuthenticated: false,
      user: { currentUser: { userName: '',
        fullName: '' } }
    };
    const user = { currentUser: {
      userName: 'Pythagoras',
      fullName: 'Alienyi David',
      phoneNumber: '07010724574',
      email: 'alienyidavid@gmail.com'
    }
    };
    const action = AuthAction.setCurrentUser(user);
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user.currentUser.userName).toEqual('Pythagoras');
    expect(newState.user.currentUser.email).toEqual('alienyidavid@gmail.com');
  });
   it('should return initial state for invalid type', () => {
    const initialState = {
      isAuthenticated: false,
      user: { currentUser: { userName: '',
        fullName: '' } }
    };
    const user = { currentUser: {
      userName: 'Pythagoras',
      fullName: 'Alienyi David',
      phoneNumber: '07010724574',
      email: 'alienyidavid@gmail.com'
    }
    };
    const action = {
      type: 'WRONG',
      user
    }
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user.currentUser.userName).toEqual('');
    //expect(newState.user.currentUser.email).toEqual('');
  });
});
